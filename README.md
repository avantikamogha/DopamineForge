# DopamineForge

**DopamineForge** is an AI-powered productivity assistant that optimizes task planning based on user energy levels and reinforces consistency through gamified rewards.

---

## Overview

Traditional productivity tools assume consistent performance throughout the day. In reality, human energy fluctuates.

DopamineForge addresses this gap by combining:

* Voice-based journaling
* Energy prediction using behavioral data
* AI-driven task recommendations
* Gamified reward mechanisms

The result is a system that aligns tasks with natural energy cycles, improving both efficiency and user engagement.

---

## Key Features

### Voice Journaling

* Capture user input through voice
* Convert speech to text in real time
* Store entries with timestamps for analysis

### Energy Prediction

* Analyze historical activity and contextual signals
* Predict current and upcoming energy levels
* Enable adaptive task scheduling

### Intelligent Task Planning

* Recommend tasks based on:

  * Predicted energy levels
  * Task difficulty and category
  * Deadlines and priorities
* Reduce cognitive overload and improve task alignment

### Gamification Layer (Dopamine Menu)

* Provide rewards upon task completion
* Randomized incentives to maintain engagement
* Reinforce positive productivity behavior

---

## System Workflow

1. User records a voice journal entry
2. Speech is transcribed and stored
3. Energy prediction model evaluates user state
4. Task recommendation engine suggests optimal tasks
5. User completes task
6. Reward is generated and presented

---

## Architecture

**Frontend**

* User interface for journaling, task display, and rewards

**Backend**

* Handles data processing, storage, and API orchestration

**AI Components**

* Energy Prediction Model (behavioral pattern-based)
* LLM-based Task Recommendation Engine

**Database**

* Stores user logs, tasks, and interaction history

---

## Technology Stack

* **Frontend:** React
* **Backend:** Node.js / Python
* **Database:** Firebase
* **Speech-to-Text:** Web Speech API / Whisper
* **AI/ML:**

  * Energy Prediction: heuristic or lightweight ML model
  * Task Planning: LLM (e.g., OpenAI / Gemini)

---

## Sample Interaction

```json
{
  "input": "I feel tired and unfocused",
  "predicted_energy": 3,
  "recommended_task": "Email Cleanup",
  "reward": "Listen to a song"
}
```

---

## Design Principles

* **Energy-Aware Productivity**: Align tasks with cognitive capacity
* **Simplicity First**: Focus on usability over complexity
* **Behavioral Reinforcement**: Use rewards to sustain engagement
* **Modular Architecture**: Enable easy iteration and scaling

---

## Future Enhancements

* Personalized energy modeling using user-specific data
* Streaks, experience points (XP), and leveling systems
* Mood and sentiment detection from voice input
* Calendar and task management integrations
* Advanced analytics dashboard

---

## Demo Objective

Deliver a functional prototype demonstrating:

* Voice input processing
* Energy prediction
* Context-aware task recommendations
* Reward-based feedback loop

---

## Contributors

* Member 1 – UI & Integration
* Member 2 – AI Model
* Member 3 – LLM & Gamification

---

## Conclusion

DopamineForge rethinks productivity by integrating behavioral insights with AI-driven decision-making. By aligning tasks with user energy and reinforcing progress through rewards, it creates a more sustainable and engaging productivity experience.
