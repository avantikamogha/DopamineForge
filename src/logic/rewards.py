import random

def get_dopamine_reward(task_difficulty):
    """
    Returns a reward suggestion based on the difficulty of the task completed.
    Difficulty 1-2: Quick 'Micro-breaks'
    Difficulty 3-4: Medium 'Refreshers'
    Difficulty 5: 'Grand Rewards'
    """
    
    rewards = {
        "micro": [
            "3-minute deep breathing session 🧘",
            "Drink a glass of cold water 💧",
            "Do 5 jumping jacks to reset ⚡",
            "Listen to ONE high-energy song 🎵"
        ],
        "medium": [
            "10-minute walk outside 🌳",
            "Make a fresh cup of tea or coffee ☕",
            "Read 2 pages of your favorite book 📖",
            "Quick 5-minute sketch or doodle 🎨"
        ],
        "grand": [
            "20-minute power nap 😴",
            "Watch a 10-minute YouTube video from your 'Watch Later' 📺",
            "Eat a favorite healthy snack 🍎",
            "Call a friend for a 15-minute chat 📞"
        ]
    }

    if task_difficulty <= 2:
        return random.choice(rewards["micro"])
    elif task_difficulty <= 4:
        return random.choice(rewards["medium"])
    else:
        return random.choice(rewards["grand"])