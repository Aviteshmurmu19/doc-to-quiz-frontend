// client/src/services/apiClient.js

// const API_URL = "http://localhost:3001/api/generate";
// This now works for both local development (with a proxy) and production
const BASE_URL = import.meta.env.VITE_SOME_KEY || "http://localhost:3001";
console.log("BASE_URL", BASE_URL);
const API_URL = `${BASE_URL}/api/generate`;

export const generateQuiz = async (textContent) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ textContent }),
    });

    if (!response.ok) {
      // Try to get a meaningful error from the server's response
      const errorData = await response.json();
      throw new Error(
        errorData.error || "An unknown error occurred on the server."
      );
    }

    return response.json(); // This will be our { questions: [...] } object
  } catch (error) {
    console.error("Error calling generateQuiz API:", error);
    // Re-throw the error so the component that called it can handle it
    throw error;
  }
};
