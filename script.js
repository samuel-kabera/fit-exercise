const API_KEY = "LJ5m7sOrrJyHcLVIc0ZSdw==dKFraRJL3sIAFYkl";
const API_URL = "https://api.api-ninjas.com/v1/exercises";

// Filter Options
const types = [
  "cardio",
  "olympic_weightlifting",
  "plyometrics",
  "powerlifting",
  "strength",
  "stretching",
  "strongman",
];

const muscles = [
  "abdominals",
  "abductors",
  "adductors",
  "biceps",
  "calves",
  "chest",
  "forearms",
  "glutes",
  "hamstrings",
  "lats",
  "lower_back",
  "middle_back",
  "neck",
  "quadriceps",
  "traps",
  "triceps",
];

const difficulties = ["beginner", "intermediate", "expert"];

const equipments = [
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
];

// Variables to store data
let allExercises = [];
let selectedTypeFilters = [];
let selectedMuscleFilters = [];
let selectedDifficultyFilters = [];
let selectedEquipmentFilters = [];

// Get elements from HTML
const searchInput = document.getElementById("searchInput");
const clearAllBtn = document.getElementById("clearAllBtn");
const filterCount = document.getElementById("filterCount");
const activeFiltersCount = document.getElementById("activeFiltersCount");
const typeFilters = document.getElementById("typeFilters");
const muscleFilters = document.getElementById("muscleFilters");
const difficultyFilters = document.getElementById("difficultyFilters");
const exerciseGrid = document.getElementById("exerciseGrid");
const resultsCount = document.getElementById("resultsCount");
const typeCount = document.getElementById("typeCount");
const muscleCount = document.getElementById("muscleCount");
const difficultyCount = document.getElementById("difficultyCount");
const equipmentCount = document.getElementById("equipmentCount");

// Create filter checkboxes
function createFilterCheckboxes() {
  // Create type filters
  for (let i = 0; i < types.length; i++) {
    let label = document.createElement("label");
    label.className = "filter-option";
    label.innerHTML = `
            <input type="checkbox" data-category="type" data-value="${
              types[i]
            }">
            <span>${types[i].replace(/_/g, " ")}</span>
        `;
    typeFilters.appendChild(label);
  }

  // muscle filters
  for (let i = 0; i < muscles.length; i++) {
    let label = document.createElement("label");
    label.className = "filter-option";
    label.innerHTML = `
            <input type="checkbox" data-category="muscle" data-value="${
              muscles[i]
            }">
            <span>${muscles[i].replace(/_/g, " ")}</span>
        `;
    muscleFilters.appendChild(label);
  }

  // difficulty filters
  for (let i = 0; i < difficulties.length; i++) {
    let label = document.createElement("label");
    label.className = "filter-option";
    label.innerHTML = `
            <input type="checkbox" data-category="difficulty" data-value="${
              difficulties[i]
            }">
            <span>${difficulties[i].replace(/_/g, " ")}</span>
        `;
    difficultyFilters.appendChild(label);
  }

  // equipment filters
  for (let i = 0; i < equipments.length; i++) {
    let label = document.createElement("label");
    label.className = "filter-option";
    label.innerHTML = `
            <input type="checkbox" data-category="equipment" data-value="${
              equipments[i]
            }">
            <span>${equipments[i].replace(/_/g, " ")}</span>
        `;
  }
}

function addCheckboxListeners() {
  let checkboxes = document.querySelectorAll(".filter-option input");

  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener("change", function () {
      let category = this.getAttribute("data-category");
      let value = this.getAttribute("data-value");
      let label = this.parentElement;

      if (this.checked) {
        if (category === "type") {
          selectedTypeFilters.push(value);
        } else if (category === "muscle") {
          selectedMuscleFilters.push(value);
        } else if (category === "difficulty") {
          selectedDifficultyFilters.push(value);
        } else if (category === "equipment") {
          selectedEquipmentFilters.push(value);
        }
        label.classList.add("selected");
      } else {
        // Remove from selected filters
        if (category === "type") {
          selectedTypeFilters = selectedTypeFilters.filter((f) => f !== value);
        } else if (category === "muscle") {
          selectedMuscleFilters = selectedMuscleFilters.filter(
            (f) => f !== value
          );
        } else if (category === "difficulty") {
          selectedDifficultyFilters = selectedDifficultyFilters.filter(
            (f) => f !== value
          );
        } else if (category === "equipment") {
          selectedEquipmentFilters = selectedEquipmentFilters.filter(
            (f) => f !== value
          );
        }
        label.classList.remove("selected");
      }

      updateFilterCounts();
      showFilteredExercises();
    });
  }
}

function updateFilterCounts() {
  let total =
    selectedTypeFilters.length +
    selectedMuscleFilters.length +
    selectedDifficultyFilters.length +
    selectedEquipmentFilters.length;

  activeFiltersCount.textContent = total;

  if (total > 0) {
    filterCount.classList.remove("hidden");
    clearAllBtn.classList.add("active");
  } else {
    filterCount.classList.add("hidden");
    clearAllBtn.classList.remove("active");
  }

  // Update individual counts
  if (selectedTypeFilters.length > 0) {
    typeCount.textContent = "(" + selectedTypeFilters.length + ")";
  } else {
    typeCount.textContent = "";
  }

  if (selectedMuscleFilters.length > 0) {
    muscleCount.textContent = "(" + selectedMuscleFilters.length + ")";
  } else {
    muscleCount.textContent = "";
  }

  if (selectedDifficultyFilters.length > 0) {
    difficultyCount.textContent = "(" + selectedDifficultyFilters.length + ")";
  } else {
    difficultyCount.textContent = "";
  }

  if (selectedEquipmentFilters.length > 0) {
    equipmentCount.textContent = "(" + selectedEquipmentFilters.length + ")";
  } else {
    equipmentCount.textContent = "";
  }
}

function clearAllFilters() {
  selectedTypeFilters = [];
  selectedMuscleFilters = [];
  selectedDifficultyFilters = [];
  selectedEquipmentFilters = [];

  let checkboxes = document.querySelectorAll(".filter-option input");
  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].checked = false;
  }

  let labels = document.querySelectorAll(".filter-option");
  for (let i = 0; i < labels.length; i++) {
    labels[i].classList.remove("selected");
  }

  updateFilterCounts();
  showFilteredExercises();
}

function searchExercises() {
  showFilteredExercises();
}

function showFilteredExercises() {
  let searchText = searchInput.value.toLowerCase();
  let filteredExercises = [];

  for (let i = 0; i < allExercises.length; i++) {
    let exercise = allExercises[i];
    let matchesSearch = true;
    let matchesFilters = true;

    if (searchText !== "") {
      let nameMatch = exercise.name.toLowerCase().includes(searchText);
      let typeMatch = exercise.type.toLowerCase().includes(searchText);
      let muscleMatch = exercise.muscle.toLowerCase().includes(searchText);
      let equipmentMatch = exercise.equipment
        .toLowerCase()
        .includes(searchText);
      let difficultyMatch = exercise.difficulty
        .toLowerCase()
        .includes(searchText);

      matchesSearch =
        nameMatch ||
        typeMatch ||
        muscleMatch ||
        equipmentMatch ||
        difficultyMatch;
    }

    // Check type filter
    if (selectedTypeFilters.length > 0) {
      let typeMatches = false;
      for (let j = 0; j < selectedTypeFilters.length; j++) {
        if (exercise.type === selectedTypeFilters[j]) {
          typeMatches = true;
          break;
        }
      }
      if (!typeMatches) {
        matchesFilters = false;
      }
    }

    // Check muscle filter
    if (selectedMuscleFilters.length > 0) {
      let muscleMatches = false;
      for (let j = 0; j < selectedMuscleFilters.length; j++) {
        if (exercise.muscle === selectedMuscleFilters[j]) {
          muscleMatches = true;
          break;
        }
      }
      if (!muscleMatches) {
        matchesFilters = false;
      }
    }

    // Check difficulty filter
    if (selectedDifficultyFilters.length > 0) {
      let difficultyMatches = false;
      for (let j = 0; j < selectedDifficultyFilters.length; j++) {
        if (exercise.difficulty === selectedDifficultyFilters[j]) {
          difficultyMatches = true;
          break;
        }
      }
      if (!difficultyMatches) {
        matchesFilters = false;
      }
    }

    // Check equipment filter
    if (selectedEquipmentFilters.length > 0) {
      let equipmentMatches = false;
      for (let j = 0; j < selectedEquipmentFilters.length; j++) {
        if (exercise.equipment === selectedEquipmentFilters[j]) {
          equipmentMatches = true;
          break;
        }
      }
      if (!equipmentMatches) {
        matchesFilters = false;
      }
    }

    if (matchesSearch && matchesFilters) {
      filteredExercises.push(exercise);
    }
  }

  displayExercises(filteredExercises);
}

// Display exercises on page
function displayExercises(exercises) {
  exerciseGrid.innerHTML = "";
  resultsCount.textContent = exercises.length;

  if (exercises.length === 0) {
    exerciseGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: rgb(107, 114, 128);">
                <i class="fa-solid fa-dumbbell" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.3;"></i>
                <p style="font-size: 1.125rem; font-weight: 500;">No exercises found</p>
                <p style="font-size: 0.875rem; margin-top: 0.5rem;">Try adjusting your filters or search query</p>
            </div>
        `;
    return;
  }

  for (let i = 0; i < exercises.length; i++) {
    let exercise = exercises[i];

    let card = document.createElement("div");
    card.className = "exercise-card";

    card.innerHTML = `
            <h3>${exercise.name}</h3>
            <div class="exercise-badges">
                <span class="badge badge-type">
                    <i class="fa-solid fa-tag"></i>
                    ${exercise.type}
                </span>
                <span class="badge badge-muscle">
                    <i class="fa-solid fa-heart-pulse"></i>
                    ${exercise.muscle}
                </span>
                <span class="badge badge-difficulty">
                    <i class="fa-solid fa-signal"></i>
                    ${exercise.difficulty}
                </span>
            </div>
            <div class="exercise-equipment">
                <i class="fa-solid fa-dumbbell"></i>
                <span>${exercise.equipment.replace(/_/g, " ")}</span>
            </div>
            <button class="view-details-btn" onclick="showDetails(${i})">
                View Details
            </button>
        `;

    exerciseGrid.appendChild(card);
  }
}

// Show exercise details
function showDetails(index) {
  let exercise = allExercises[index];
  let message = "Exercise: " + exercise.name + "\n\n";
  message += "Type: " + exercise.type + "\n";
  message += "Muscle: " + exercise.muscle + "\n";
  message += "Equipment: " + exercise.equipment + "\n";
  message += "Difficulty: " + exercise.difficulty + "\n\n";
  message +=
    "Instructions: " + (exercise.instructions || "No instructions available");

  alert(message);
}

// Load exercises from API
function loadExercises() {
  fetch(API_URL, {
    method: "GET",
    headers: {
      "X-Api-Key": API_KEY,
    },
  })
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Failed to load exercises");
      }
      return response.json();
    })
    .then(function (data) {
      allExercises = data;
      displayExercises(allExercises);
    })
    .catch(function (error) {
      console.error("Error:", error);
      exerciseGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: rgb(220, 38, 38);">
                <i class="fa-solid fa-triangle-exclamation" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                <p style="font-size: 1.125rem; font-weight: 500;">Error loading exercises</p>
                <p style="font-size: 0.875rem; margin-top: 0.5rem;">${error.message}</p>
            </div>
        `;
    });
}

// Start the app when page loads
window.addEventListener("DOMContentLoaded", function () {
  createFilterCheckboxes();
  addCheckboxListeners();
  loadExercises();

  // Add search listener
  searchInput.addEventListener("input", searchExercises);

  // Add clear all listener
  clearAllBtn.addEventListener("click", clearAllFilters);
});
