import { updateScores } from "@/utils/updateScores"
import { useEffect, useState } from "react"

export default function Prueba() {
  const [scores, setScores] = useState([])
  useEffect(() => {
    const fetchScores = async () => {
      try {
        const scoresData = await getScores()
        setScores(scoresData)
      } catch (error) {
        console.error("An error occurred while fetching scores:", error)
      }
    }

    fetchScores()
  }, [])
  return (
    <div className="w-full flex items-center justify-center mt-24">
      <button onClick={() => updateScores({ player: "nanodeployado", score: 3 })}>Click</button>
    </div>
  )
}
