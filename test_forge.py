import json
import os
from src.logic.planner import generate_smart_schedule

# Mock Data: One High-Difficulty task vs. Low Energy Curve
tasks = [
    {
        "task_id": "DEV_001",
        "task_name": "Fix Memory Leak in Backend",
        "difficulty": 5,
        "duration_mins": 120,
        "is_completed": False
    }
]

energy_forecast = {
    "14:00": 3,
    "15:00": 2,
    "16:00": 2
}

print("⚒️  Forging Schedule... Please wait (Tenacity retry active) ⚒️")

try:
    # Ensure your GOOGLE_API_KEY is set in your terminal environment
    schedule = generate_smart_schedule(tasks, energy_forecast)
    
    print("\n--- FORGE OUTPUT ---")
    print(json.dumps(schedule, indent=2))
    
    # Validation for Day 3 Goal
    if any(item.get("energy_status") == "Suboptimal" for item in schedule):
        print("\n✅ Success: AI correctly identified the energy mismatch!")
    else:
        print("\n⚠️  Warning: AI did not flag the suboptimal match.")

except Exception as e:
    print(f"\n❌ Forge Error: {e}")