import random

# The "Source of Truth" 
DOPAMINE_MENU = {
    "quick_reset": [
        {"activity": "3-minute deep breathing", "icon": "🧘", "duration": "3m"},
        {"activity": "Cold water hydration hit", "icon": "💧", "duration": "1m"},
        {"activity": "5 Jumping Jacks (Reset!)", "icon": "⚡", "duration": "1m"},
        {"activity": "Listen to 1 High-Energy song", "icon": "🎵", "duration": "4m"},
        {"activity": "Box Breathing (4-4-4-4)", "icon": "🌬️", "duration": "2m"}
    ],
    "sensory_shift": [
        {"activity": "10-minute nature walk", "icon": "🌳", "duration": "10m"},
        {"activity": "Fresh Tea/Coffee break", "icon": "☕", "duration": "7m"},
        {"activity": "Read 2 pages of a book", "icon": "📖", "duration": "5m"},
        {"activity": "Quick 5-minute doodle", "icon": "🎨", "duration": "5m"}
    ],
    "deep_recharge": [
        {"activity": "20-minute power nap", "icon": "😴", "duration": "20m"},
        {"activity": "Watch 1 'Watch Later' video", "icon": "📺", "duration": "10m"},
        {"activity": "Favorite healthy snack", "icon": "🍎", "duration": "10m"},
        {"activity": "15-minute friend chat", "icon": "📞", "duration": "15m"}
    ]
}

def get_fallback_reward(category="quick_reset"):
    """Used if the AI fails. Defaulted to quick_reset for safety."""
    options = DOPAMINE_MENU.get(category, DOPAMINE_MENU["quick_reset"])
    return random.choice(options)