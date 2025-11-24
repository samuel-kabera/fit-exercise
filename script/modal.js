// Modal functionality for showing exercise details

// Get modal elements
const exerciseModal = document.getElementById("exerciseModal");
const closeModalBtn = document.getElementById("closeModal");
const modalTitle = document.getElementById("modalTitle");
const modalType = document.getElementById("modalType");
const modalMuscle = document.getElementById("modalMuscle");
const modalEquipment = document.getElementById("modalEquipment");
const modalDifficulty = document.getElementById("modalDifficulty");
const modalInstructions = document.getElementById("modalInstructions");

// Show exercise details in modal
export function showExerciseDetails(exercise) {
  modalTitle.textContent = exercise.name;
  modalType.textContent = exercise.type;
  modalMuscle.textContent = exercise.muscle;
  modalEquipment.textContent = exercise.equipment.replace(/_/g, " ");
  modalDifficulty.textContent = exercise.difficulty;
  modalInstructions.textContent =
    exercise.instructions || "No instructions available";

  exerciseModal.classList.add("active");
  document.body.style.overflow = "hidden";
}

// Close modal
function closeExerciseModal() {
  exerciseModal.classList.remove("active");
  document.body.style.overflow = "auto";
}

// Initialize modal event listeners
export function initializeModal() {
  // Close button
  closeModalBtn.addEventListener("click", closeExerciseModal);

  // Close when clicking outside modal
  exerciseModal.addEventListener("click", function (e) {
    if (e.target === exerciseModal) {
      closeExerciseModal();
    }
  });

  // Close with Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && exerciseModal.classList.contains("active")) {
      closeExerciseModal();
    }
  });
}
