import json
import os
import re

from django import tasks
from django import tasks
from openai import OpenAI, APIError, RateLimitError
from logic.prompts import SYSTEM_PROMPT
from utils.rewards import DOPAMINE_MENU
from tenacity import retry, stop_after_attempt, wait_exponential, retry_if_exception_type


def _extract_json_from_text(text):
    text = (text or "").strip()

    if not text:
        raise ValueError("Model returned empty response")

    # direct JSON parse
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        pass

    # try to extract first JSON array/object from text fallback
    array_match = re.search(r"(\[.*\])", text, re.DOTALL)
    if array_match:
        return json.loads(array_match.group(1))

    object_match = re.search(r"(\{.*\})", text, re.DOTALL)
    if object_match:
        return json.loads(object_match.group(1))

    raise ValueError("Could not parse JSON from model text")


@retry(
    stop=stop_after_attempt(3),
    wait=wait_exponential(multiplier=1, min=2, max=10),
    retry=retry_if_exception_type(RateLimitError)
)

def generate_smart_schedule(tasks, energy_forecast):
    """Generate a smart schedule using GitHub Models API with gpt-4o-mini.

    Args:
      tasks: list of dicts with keys task_name, difficulty, duration.
      energy_forecast: dict mapping timeslots to energy labels.

    Returns:
      A Python list of dictionaries representing scheduled tasks.
    """
    client = OpenAI(
        base_url="https://models.inference.ai.azure.com",
        api_key=os.environ.get("GITHUB_TOKEN")
    )

    full_instruction = SYSTEM_PROMPT.replace("{REWARDS_MENU}", json.dumps(DOPAMINE_MENU))
    # Check if tasks is a string (from the textarea) or a list
    if isinstance(tasks, str):
        user_content = f"User Brain Dump: {tasks}. Extract specific tasks and schedule them."
    else:
        user_content = f"Tasks: {json.dumps(tasks)}"

    # In planner.py
    user_prompt = (
        f"ACTUAL USER INPUT TO PROCESS:\n"
        f"'{tasks}'\n\n"
        f"Current Energy Context: {json.dumps(energy_forecast)}\n"
        f"Constraint: Even if the input is short, expand it into a 48-hour plan."
    )
    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": full_instruction},
                {"role": "user", "content": f"INPUT: {tasks}\nENERGY: {json.dumps(energy_forecast)}"}
            ],
            temperature=0.1 # 3. NEW: Keep it low so the AI doesn't "hallucinate" new breaks
        )
    except Exception as e:
        # ... your error handling ...
        raise e

    model_text = response.choices[0].message.content
    if model_text is None:
        raise RuntimeError("API response is missing text")

    parsed = _extract_json_from_text(model_text)

    if isinstance(parsed, list):
        schedule = parsed
    elif isinstance(parsed, dict) and isinstance(parsed.get("schedule"), list):
        schedule = parsed["schedule"]
    else:
        raise ValueError("Expected schedule JSON as a list of objects")

    if not all(isinstance(item, dict) for item in schedule):
        raise ValueError("Parsed schedule is not a list of dictionaries")

    return schedule
