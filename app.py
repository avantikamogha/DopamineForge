from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import sys
import os

# This ensures Flask can see the 'src' folder for imports
sys.path.append(os.path.join(os.path.dirname(__file__), 'src'))

# Import your scheduler function
# Update 'generate_smart_schedule' if your function has a different name
from logic.planner import generate_smart_schedule 

app = Flask(__name__)
CORS(app) # Allows your Vite app (port 5173) to talk to Flask (port 5000)

@app.route('/api/forge', methods=['POST'])
def forge():
    data = request.json
    raw_input = data.get('tasks', '')
    
    # If the user sent a string (paragraph) instead of a list, 
    # we pass it as a single 'task' for the AI to deconstruct.
    if isinstance(raw_input, str):
        tasks_to_process = [{"task_description": raw_input}]
    else:
        tasks_to_process = raw_input

    try:
        schedule = generate_smart_schedule(tasks_to_process, data.get('energy', {}))
        return jsonify(schedule), 200
    except Exception as e:
        print(f"Error: {e}") # This shows in your Python terminal
        return jsonify({"error": str(e)}), 500
    
if __name__ == '__main__':
    app.run(debug=True, port=5000)