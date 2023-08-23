import confetti from "canvas-confetti"
import { useEffect, useRef, useState } from "react"
import useCookie from "react-use-cookie"

export const createMoreFood = (limit, grid, setGrid, setMoreFood) => {
  let leftFood = Math.floor(Math.random() * limit)
  let topFood = Math.floor(Math.random() * limit)
  while (grid[leftFood][topFood][0] !== "empty") {
    leftFood = Math.floor(Math.random() * limit)
    topFood = Math.floor(Math.random() * limit)
  }
  const newGrid = [...grid]

  let foodCounter = 0

  grid.forEach((row) =>
    row.forEach((cell) => {
      if (cell[0] === "food") foodCounter++
    })
  )

  if (foodCounter === 0) {
    newGrid[leftFood][topFood] = ["food", 0]
    setGrid(newGrid)
    setMoreFood(false)
  }
}

export const useSnakeMovement = () => {
  const limit = 20
  const rows = []
  for (let i = 0; i < limit; i++) rows.push(i)
  const columns = []
  for (let i = 0; i < limit; i++) columns.push(i)

  const didMountRef = useRef(false)
  const initialDirection = "right"
  const [direction, setDirection] = useState(initialDirection)
  const [top, setTop] = useState(0)
  const [left, setLeft] = useState(0)
  const initialGrid = rows.map((i) => columns.map((j) => [i === 0 && j === 0 ? "head" : "empty", 0]))
  const [grid, setGrid] = useState(initialGrid)
  const initialSnakeLength = 2
  const [snakeLength, setSnakeLength] = useState(initialSnakeLength)
  const [moreFood, setMoreFood] = useState(true)
  const levelsSpeed = {
    easy: 170,
    medium: 140,
    hard: 110,
  }
  const [level, setLevel] = useState("medium")
  const [state, setState] = useState("start")
  const [currentScore, setCurrentScore] = useState(0)
  const [highestScore, setHighestScore] = useState(initialSnakeLength - 2)
  const [highestScoreFromCookie, setHighestScoreFromCookie] = useCookie("highestScore", highestScore)
  const [walls, setWalls] = useState(false)
  const [newHighScore, setNewHighScore] = useState(false)

  const advance = {
    top: () => setTop((top) => (top === 0 ? (walls ? setState("loose") : limit - 1) : top - 1)),
    bottom: () => setTop((top) => (top === limit - 1 ? (walls ? setState("loose") : 0) : top + 1)),
    right: () => setLeft((left) => (left === limit - 1 ? (walls ? setState("loose") : 0) : left + 1)),
    left: () => setLeft((left) => (left === 0 ? (walls ? setState("loose") : limit - 1) : left - 1)),
  }

  const updateCurrentScore = () => {
    const levelWeight = {
      easy: walls ? 1 : 0.75,
      medium: walls ? 1.25 : 1,
      hard: walls ? 1.5 : 1.25,
    }

    const additionalScore = levelWeight[level]

    setCurrentScore((currentScore) => currentScore + additionalScore)
  }

  const setGameState = () => {
    if (state === "playing") setState("pause")
    else if (state === "pause") setState("playing")
    else {
      setGrid(initialGrid)
      setState("playing")
      setSnakeLength(initialSnakeLength)
      setDirection(initialDirection)
      setMoreFood(true)
      setTop(0)
      setLeft(0)
    }
  }

  useEffect(() => {
    setHighestScore(highestScoreFromCookie)
  }, [highestScoreFromCookie])

  useEffect(() => {
    let interval
    if (didMountRef.current && state === "playing") {
      advance[direction]()
      interval = setInterval(() => {
        advance[direction]()
      }, levelsSpeed[level])
    } else {
      didMountRef.current = true
    }
    return () => clearInterval(interval)
  }, [direction, state])

  useEffect(() => {
    const handleKeyDown = {
      ArrowLeft: () => setDirection("left"),
      ArrowUp: () => setDirection("top"),
      ArrowRight: () => setDirection("right"),
      ArrowDown: () => setDirection("bottom"),
    }
    const eventListener = (e) => handleKeyDown[e.key]()
    window.addEventListener("keydown", eventListener)

    return () => {
      window.removeEventListener("keydown", eventListener)
    }
  }, [])

  useEffect(() => {
    if (state === "playing") {
      columns.forEach((i) =>
        rows.forEach((j) => {
          const oldType = grid[i][j][0]
          let type

          if (i === left && j === top) {
            type = "head"
            if (oldType === "food") {
              setSnakeLength(snakeLength + 1)
              setMoreFood(true)
              updateCurrentScore()
            } else if (oldType === "body") {
              setState("loose")
              setCurrentScore(0)
              if (currentScore > highestScore) {
                setHighestScore(currentScore)
                setNewHighScore(true)
                confetti()
                setTimeout(() => {
                  setNewHighScore(false)
                }, 4000)
                setHighestScoreFromCookie(currentScore)
              }
            }
          }
        })
      )

      setGrid((grid) =>
        columns.map((i) =>
          rows.map((j) => {
            const oldType = grid[i][j][0]
            const oldCycles = grid[i][j][1]
            let type
            let cycles
            if (i === left && j === top) {
              type = "head"
            } else if (oldType === "body" && oldCycles > snakeLength - 2) {
              type = "empty"
            } else if (oldType === "body" || oldType === "head") {
              if (snakeLength > 1) {
                type = "body"
                cycles = oldCycles + 1 || 1
              } else {
                type = "empty"
              }
            }
            return [type || oldType, cycles]
          })
        )
      )
    }
  }, [top, left])

  useEffect(() => {
    if (moreFood) createMoreFood(limit, grid, setGrid, setMoreFood)
  }, [moreFood])

  return {
    setGameState,
    state,
    walls,
    setWalls,
    level,
    setLevel,
    levelsSpeed,
    grid,
    snakeLength,
    initialSnakeLength,
    highestScore,
    setDirection,
    rows,
    columns,
    newHighScore,
    currentScore,
  }
}
