import fs from "fs"
import path from "path"

const scoresFilePath = path.join(process.cwd(), "data", "scores.json")

const addScore = (player, score) => {
  // Read the existing scores from the JSON file
  const scoresData = fs.readFileSync(scoresFilePath, "utf-8")
  let scores = JSON.parse(scoresData)

  // Check if the player already exists in the scores array
  const playerIndex = scores.findIndex((item) => item.hasOwnProperty(player))

  if (playerIndex !== -1) {
    // If the player exists, update their highest score
    scores[playerIndex][player].highestScore = Math.max(scores[playerIndex][player].highestScore, score)
  } else {
    // If the player doesn't exist, add a new entry
    const newEntry = {
      [player]: {
        highestScore: score,
      },
    }
    scores.push(newEntry)
  }

  // Write the updated scores back to the JSON file
  fs.writeFileSync(scoresFilePath, JSON.stringify(scores))
}

export default addScore
