# FitExercise

A simple web app to browse and search exercises.

## What it does

- Browse exercises from the API Ninjas Exercise database
- Search for exercises by name
- Filter exercises by:
  - Type (cardio, strength, etc.)
  - Muscle group (biceps, chest, legs, etc.)
  - Difficulty (beginner, intermediate, expert)
- View exercise details and instructions

## How to use

1. Clone or download this repository
2. Open `index.html` in your browser
3. Start browsing exercises!

## Project Structure

```
├── index.html
├── styles.css
└── script/
    ├── env.js    # API Info (not committed)
    ├── api.js    # API Logic
    ├── modal.js  # Exercise Details Modal Logic
    ├── filters.js # Sidebar Filters Logic
    └── main.js   # Main UI logic
```

## API

This app uses the [API Ninjas Exercise API](https://api-ninjas.com/api/exercises) to fetch exercise data.

## Quick Links

- The app is live [here](https://fit-exercise.kaberasamuel.tech/)
- Watch the demo [here](https://www.loom.com/share/6176c08952e74ed0a5fcdecc0115e0cd)
