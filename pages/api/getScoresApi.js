import fs from "fs"
import path from "path"

const scoresFilePath = path.join(process.cwd(), "data", "scores.json")

export default function handler(req, res) {
  const scoresData = fs.readFileSync(scoresFilePath, "utf-8")
  const scores = JSON.parse(scoresData)

  res.status(200).json(scores)
}
