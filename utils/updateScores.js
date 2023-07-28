export const updateScores = async ({player, score}) => {
  try {
    const response = await fetch("/api/updateScoresApi", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ player, score }),
    });

    console.log(response)

    if (response.ok) {
      console.log("Score saved successfully!");
    } else {
      console.error("Failed to save score.");
    }
  } catch (error) {
    console.error("An error occurred while saving the score:", error);
  }
};
