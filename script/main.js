// Main UI Logic
import { loadExercises } from "./api.js";
import {
  initializeFilters,
  selectedTypeFilters,
  selectedMuscleFilters,
  selectedDifficultyFilters,
} from "./filters.js";
import { initializeModal, showExerciseDetails } from "./modal.js";

// Variables to store data
let allExercises = [];
let filteredExercises = [];

// Get elements from HTML
const searchInput = document.getElementById("searchInput");
const exerciseGrid = document.getElementById("exerciseGrid");
const resultsCount = document.getElementById("resultsCount");

// Filter and search exercises
function showFilteredExercises() {
  let searchText = searchInput.value.toLowerCase();
  filteredExercises = [];

  for (let i = 0; i < allExercises.length; i++) {
    let exercise = allExercises[i];
    let matchesSearch = true;
    let matchesFilters = true;

    // Check search text
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
            <button class="view-details-btn">
                View Details
            </button>
        `;

    // Add click event to the button
    let button = card.querySelector(".view-details-btn");
    button.addEventListener("click", function () {
      showExerciseDetails(exercise);
    });

    exerciseGrid.appendChild(card);
  }
}

// Show loading state
function showLoadingState() {
  exerciseGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: rgb(107, 114, 128);">
            <i class="fa-solid fa-spinner fa-spin" style="font-size: 3rem; margin-bottom: 1rem;"></i>
            <p style="font-size: 1.125rem; font-weight: 500;">Loading exercises...</p>
        </div>
    `;
}

// Show error state
function showErrorState(errorMessage) {
  exerciseGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: rgb(220, 38, 38);">
            <i class="fa-solid fa-triangle-exclamation" style="font-size: 3rem; margin-bottom: 1rem;"></i>
            <p style="font-size: 1.125rem; font-weight: 500;">Error loading exercises</p>
            <p style="font-size: 0.875rem; margin-top: 0.5rem;">${errorMessage}</p>
        </div>
    `;
}

// Initialize the app
async function initializeApp() {
  // Show loading state
  showLoadingState();

  // Load exercises from API
  try {
    allExercises = await loadExercises();
    displayExercises(allExercises);
  } catch (error) {
    showErrorState(error.message);
  }

  initializeFilters(showFilteredExercises);
  initializeModal();

  searchInput.addEventListener("input", showFilteredExercises);
}

// Start the app when page loads
window.addEventListener("DOMContentLoaded", initializeApp);
