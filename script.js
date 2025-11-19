// Sample data
const sampleExercises = [
  {
    name: "Incline Hammer Curls",
    type: "strength",
    muscle: "biceps",
    equipment: "dumbbell",
    difficulty: "beginner",
  },
  {
    name: "Wide-grip barbell curl",
    type: "strength",
    muscle: "biceps",
    equipment: "barbell",
    difficulty: "beginner",
  },
  {
    name: "Bench Press",
    type: "strength",
    muscle: "chest",
    equipment: "barbell",
    difficulty: "intermediate",
  },
  {
    name: "Push-ups",
    type: "strength",
    muscle: "chest",
    equipment: "body_only",
    difficulty: "beginner",
  },
  {
    name: "Squats",
    type: "strength",
    muscle: "quadriceps",
    equipment: "body_only",
    difficulty: "beginner",
  },
  {
    name: "Deadlift",
    type: "strength",
    muscle: "lower_back",
    equipment: "barbell",
    difficulty: "intermediate",
  },
];

// Filter options
const filterOptions = {
  type: [
    "cardio",
    "olympic_weightlifting",
    "plyometrics",
    "powerlifting",
    "strength",
    "stretching",
  ],
  muscle: [
    "abdominals",
    "abductors",
    "biceps",
    "calves",
    "chest",
    "forearms",
    "glutes",
    "hamstrings",
    "lats",
    "lower_back",
    "middle_back",
    "quadriceps",
    "shoulders",
    "traps",
    "triceps",
  ],
  difficulty: ["beginner", "intermediate", "expert"],
  equipment: [
    "bands",
    "barbell",
    "body_only",
    "cable",
    "dumbbell",
    "e-z_curl_bar",
    "exercise_ball",
    "foam_roll",
    "kettlebells",
    "machine",
    "medicine_ball",
    "other",
  ],
};

// State
const selectedFilters = {
  type: [],
  muscle: [],
  difficulty: [],
  equipment: [],
};

// Initialize filters
function initFilters() {
  Object.keys(filterOptions).forEach((category) => {
    const container = document.getElementById(`${category}Filters`);
    filterOptions[category].forEach((option) => {
      const label = document.createElement("label");
      label.className = "filter-option";
      label.innerHTML = `
                        <input type="checkbox" data-category="${category}" data-value="${option}">
                        <span>${option.replace(/_/g, " ")}</span>
                    `;
      container.appendChild(label);

      // Add event listener
      const checkbox = label.querySelector("input");
      checkbox.addEventListener("change", (e) => {
        toggleFilter(category, option, e.target.checked);
        label.classList.toggle("selected", e.target.checked);
      });
    });
  });
}

// Toggle filter
function toggleFilter(category, value, checked) {
  if (checked) {
    selectedFilters[category].push(value);
  } else {
    selectedFilters[category] = selectedFilters[category].filter(
      (v) => v !== value
    );
  }
  updateFilterCounts();
}

// Update filter counts
function updateFilterCounts() {
  const totalCount = Object.values(selectedFilters).reduce(
    (sum, arr) => sum + arr.length,
    0
  );

  document.getElementById("activeFiltersCount").textContent = totalCount;
  document
    .getElementById("filterCount")
    .classList.toggle("hidden", totalCount === 0);
  document
    .getElementById("clearAllBtn")
    .classList.toggle("active", totalCount > 0);

  Object.keys(selectedFilters).forEach((category) => {
    const count = selectedFilters[category].length;
    const countEl = document.getElementById(`${category}Count`);
    countEl.textContent = count > 0 ? `(${count})` : "";
  });
}

// Clear all filters
document.getElementById("clearAllBtn").addEventListener("click", () => {
  Object.keys(selectedFilters).forEach((category) => {
    selectedFilters[category] = [];
  });
  document.querySelectorAll(".filter-option input").forEach((cb) => {
    cb.checked = false;
  });
  document.querySelectorAll(".filter-option").forEach((label) => {
    label.classList.remove("selected");
  });
  updateFilterCounts();
});

// Render exercises
function renderExercises() {
  const grid = document.getElementById("exerciseGrid");
  grid.innerHTML = "";

  sampleExercises.forEach((exercise) => {
    const card = document.createElement("div");
    card.className = "exercise-card";
    card.innerHTML = `
                    <h3>${exercise.name}</h3>
                    <div class="exercise-badges">
                        <span class="badge badge-type">${exercise.type}</span>
                        <span class="badge badge-muscle">${
                          exercise.muscle
                        }</span>
                        <span class="badge badge-difficulty">${
                          exercise.difficulty
                        }</span>
                    </div>
                    <div class="exercise-equipment">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                        </svg>
                        <span>${exercise.equipment.replace(/_/g, " ")}</span>
                    </div>
                    <button class="view-details-btn">View Details</button>
                `;
    grid.appendChild(card);
  });

  document.getElementById("resultsCount").textContent = sampleExercises.length;
}

// Initialize
initFilters();
renderExercises();
updateFilterCounts();
