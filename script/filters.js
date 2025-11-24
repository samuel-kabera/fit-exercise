// Filter Logic and UI

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

// Variables to store selected filters
export let selectedTypeFilters = [];
export let selectedMuscleFilters = [];
export let selectedDifficultyFilters = [];

// Get filter elements
const clearAllBtn = document.getElementById("clearAllBtn");
const filterCount = document.getElementById("filterCount");
const activeFiltersCount = document.getElementById("activeFiltersCount");
const typeFilters = document.getElementById("typeFilters");
const muscleFilters = document.getElementById("muscleFilters");
const difficultyFilters = document.getElementById("difficultyFilters");
const typeCount = document.getElementById("typeCount");
const muscleCount = document.getElementById("muscleCount");
const difficultyCount = document.getElementById("difficultyCount");

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

  // Create muscle filters
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

  // Create difficulty filters
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
}

// Add event listeners to checkboxes
function addCheckboxListeners(onFilterChange) {
  let checkboxes = document.querySelectorAll(".filter-option input");

  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener("change", function () {
      let category = this.getAttribute("data-category");
      let value = this.getAttribute("data-value");
      let label = this.parentElement;

      if (this.checked) {
        // Add to selected filters
        if (category === "type") {
          selectedTypeFilters.push(value);
        } else if (category === "muscle") {
          selectedMuscleFilters.push(value);
        } else if (category === "difficulty") {
          selectedDifficultyFilters.push(value);
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
        }
        label.classList.remove("selected");
      }

      updateFilterCounts();
      onFilterChange();
    });
  }
}

// Update filter count badges
function updateFilterCounts() {
  let total =
    selectedTypeFilters.length +
    selectedMuscleFilters.length +
    selectedDifficultyFilters.length;

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
}

// Clear all selected filters
function clearAllFilters(onFilterChange) {
  selectedTypeFilters = [];
  selectedMuscleFilters = [];
  selectedDifficultyFilters = [];

  let checkboxes = document.querySelectorAll(".filter-option input");
  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].checked = false;
  }

  let labels = document.querySelectorAll(".filter-option");
  for (let i = 0; i < labels.length; i++) {
    labels[i].classList.remove("selected");
  }

  updateFilterCounts();
  onFilterChange();
}

// Initialize filters
export function initializeFilters(onFilterChange) {
  createFilterCheckboxes();
  addCheckboxListeners(onFilterChange);
  clearAllBtn.addEventListener("click", () => clearAllFilters(onFilterChange));
}
