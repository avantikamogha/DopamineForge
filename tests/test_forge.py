import json
from src.logic.planner import generate_smart_schedule
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

tasks = [
    {
        "task_id": "DEV_999", 
        "task_name": "Emergency Backend Refactor", 
        "difficulty": 2,        # <--- High Difficulty
        "duration_mins": 45, 
        "is_completed": False   # <--- MUST BE FALSE TO SHOW UP
    }
]

# Scenario: Afternoon crash (Energy levels 1-10)
energy_forecast = {
    "16:00 - 17:00": 2          # <--- Low Energy
}

print("⚒️  Attempting to Forge with GitHub Models API... ⚒️")

try:
    # 2. RUN THE FUNCTION
    schedule = generate_smart_schedule(tasks, energy_forecast)
    
    # 3. VERIFY THE OUTPUT
    print("\n--- FORGE OUTPUT ---")
    print(json.dumps(schedule, indent=2))
    
    # Check if the AI respected the "Suboptimal" rule from your SYSTEM_PROMPT
    if any(item.get("energy_status") == "Suboptimal" for item in schedule):
        print("\n✅ SUCCESS: GPT-4o-mini correctly flagged the energy mismatch.")
    else:
        print("\n⚠️  WARNING: AI didn't flag 'Suboptimal'. Check your SYSTEM_PROMPT.")

except Exception as e:
    print(f"\n❌ FORGE FAILED: {e}")