import json
import os
import re

import google.api_core.exceptions as api_exceptions
import google.genai as genai

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
    retry=retry_if_exception_type(api_exceptions.ResourceExhausted)
)
def generate_smart_schedule(tasks, energy_forecast):
    """Generate a smart schedule using Gemini-1.5-flash.

    Args:
      tasks: list of dicts with keys task_name, difficulty, duration.
      energy_forecast: dict mapping timeslots to energy labels.

    Returns:
      A Python list of dictionaries representing scheduled tasks.
    """
    client = genai.Client(api_key=os.getenv("GOOGLE_API_KEY"))

    user_prompt = (
        f"Generate the schedule for the following data:\n"
        f"Tasks: {json.dumps(tasks)}\n"
        f"Energy forecast: {json.dumps(energy_forecast)}"
    )

    try:
        response = client.models.generate_content(
            model="gemini-1.5-flash",
            contents=user_prompt,
            config={
                'system_instruction': SYSTEM_PROMPT
            }
        )
    except api_exceptions.DeadlineExceeded as exc:
        raise TimeoutError("Generative AI request timed out") from exc
    except api_exceptions.ServiceUnavailable as exc:
        raise TimeoutError("Generative AI service unavailable") from exc
    except api_exceptions.GoogleAPICallError as exc:
        raise RuntimeError(f"Generative AI API call failed: {exc}") from exc

    model_text = getattr(response, "text", None)
    if model_text is None:
        raise RuntimeError("Generative AI response is missing text")

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
