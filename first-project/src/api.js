// Base URL of backend
const API_URL = "http://localhost:5000";

/* ================================
   GET ALL INTERNSHIPS
================================ */

export const getInternships = async () => {
  try {
    const response = await fetch(`${API_URL}/internships`);

    if (!response.ok) {
      throw new Error("Failed to fetch internships");
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Error fetching internships:", error);
    return [];
  }
};


/* ================================
   APPLY FOR INTERNSHIP
================================ */

export const applyInternship = async (user_id, internship_id) => {
  try {
    const response = await fetch(`${API_URL}/apply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: user_id,
        internship_id: internship_id
      })
    });

    if (!response.ok) {
      throw new Error("Application failed");
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Error applying for internship:", error);
    return { success: false, message: "Application failed" };
  }
};


/* ================================
   GET APPLIED INTERNSHIPS
================================ */

export const getApplications = async () => {
  try {
    const response = await fetch(`${API_URL}/applications`);

    if (!response.ok) {
      throw new Error("Failed to fetch applications");
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Error fetching applications:", error);
    return [];
  }
};