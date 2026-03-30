import os
from dotenv import load_dotenv
from src.logic.planner import generate_smart_schedule

# 1. Load your API Key
load_dotenv()

# 2. Create some "Fake" data to test
mock_tasks = [
    {"task_name": "Maths Assignment", "difficulty": 5, "duration": 60},
    {"task_name": "Check Emails", "difficulty": 1, "duration": 15}
]

mock_forecast = {
    "09:00-11:00": "High Energy",
    "14:00-15:00": "Low Energy"
}

# 3. Run the function
try:
    print("🧠 Asking Gemini to schedule...")
    schedule = generate_smart_schedule(mock_tasks, mock_forecast)
    
    print("\n--- YOUR SMART SCHEDULE ---")
    for item in schedule:
        print(f"🕒 {item['slot']} | ✅ {item['task_name']} ({item['difficulty']}/5)")
        
except Exception as e:
    print(f"❌ Something went wrong: {e}")