import json
import os
import re

from openai import OpenAI, APIError, RateLimitError
from ..logic.prompts import SYSTEM_PROMPT
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

    user_prompt = (
        f"Generate the schedule for the following data:\n"
        f"Tasks: {json.dumps(tasks)}\n"
        f"Energy forecast: {json.dumps(energy_forecast)}"
    )

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": user_prompt}
            ]
        )
    except RateLimitError as exc:
        raise TimeoutError("API rate limit exceeded") from exc
    except APIError as exc:
        raise RuntimeError(f"API call failed: {exc}") from exc

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
