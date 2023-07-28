import fs from "fs/promises";
import path from "path";

const scoresFilePath = path.join(process.cwd(), "data", "scores.json");

const updateScoresApi = async (req, res) => {
  console.log("pasé por acá")
  if (req.method === "POST") {
    const { player, score } = req.body;

    try {
      // Read the existing scores from the JSON file
      const scoresData = await fs.readFile(scoresFilePath, "utf-8");
      let scores = JSON.parse(scoresData);
      console.log({scores})

      // Check if the player already exists in the scores array
      const playerIndex = scores.findIndex((item) => item.hasOwnProperty(player));

      if (playerIndex !== -1) {
        // If the player exists, update their highest score
        scores[playerIndex][player].highestScore = Math.max(
          scores[playerIndex][player].highestScore,
          score
        );
      } else {
        // If the player doesn't exist, add a new entry
        const newEntry = {
          [player]: {
            highestScore: score,
          },
        };
        scores.push(newEntry);
      }

      console.log({scoresUpdated: scores})

      // Write the updated scores back to the JSON file
      console.log({scoresFilePath})
      await fs.writeFile(scoresFilePath, JSON.stringify(scores));

      res.status(200).json({ message: "Score saved successfully!" });
    } catch (error) {
      console.error("An error occurred while saving the score:", error);
      res.status(500).json({ error: "Failed to save score." });
    }
  } else {
    res.status(405).json({ error: "Method not allowed." });
  }
};

export default updateScoresApi;
