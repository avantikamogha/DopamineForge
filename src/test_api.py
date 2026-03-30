import os
import google.generativeai as genai
from dotenv import load_dotenv

# 1. Load the secret key from your .env file
load_dotenv()
api_key = os.getenv("GOOGLE_API_KEY")

# 2. Configure the AI
genai.configure(api_key=api_key)
model = genai.GenerativeModel('gemini-3-flash-preview') # Use 'flash' for speed

# 3. Test Call
try:
    response = model.generate_content("Give me a 1-sentence motivational quote for a student developer.")
    print("✅ API Connection Successful!")
    print(f"AI Response: {response.text}")
except Exception as e:
    print(f"❌ Error: {e}")