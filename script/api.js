import { API_KEY, API_URL } from "./env.js";

// Load exercises from API using async/await
export async function loadExercises() {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "X-Api-Key": API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error("API is currently down");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
