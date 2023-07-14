export const getScores = async () => {
  try {
    const response = await fetch("/api/getScoresApi")
    const scoresData = await response.json()
    return scoresData
  } catch (error) {
    console.error("An error occurred while fetching scores:", error)
  }
}
