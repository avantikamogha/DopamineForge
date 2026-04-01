import json
from src.logic.planner import generate_smart_schedule
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

# Scenario: A Hard Task followed by a Low Energy window
tasks = [
    {"task_id": "HARD_1", "task_name": "Complex Bug Fixing", "difficulty": 5, "duration": "90m"},
    {"task_id": "HARD_2", "task_name": "System Architecture Design", "difficulty": 4, "duration": "60m"}
]

# 2. Very Low Energy Forecast
energy_forecast = {
    "09:00 - 10:30": 2,  # Crashing
    "10:30 - 11:30": 3   # Still Low
}

print("🧪 Testing Victory Reward & Dopamine Menu... 🧪")


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