"use client"

import { useEffect, useRef, useState } from "react"
import Button from "../components/Button"

const Snake = ({ top, left, grid, state }) => {
    const type = grid[left][top][0]
    const classNames = {
        head: state === "loose" ? "bg-red-900" : "bg-black",
        body: state === "loose" ? "bg-red-500" : "bg-gray-500",
        food: state === "playing" ? "bg-red-700 border border-white" : "",
        loose: "bg-red-900",
    }

    return <div style={{ top: 15 * top, left: 15 * left }} className={`absolute h-3 w-3 ${classNames[type] || ""}`} />
}

const createMoreFood = (limit, grid, setGrid, setMoreFood) => {
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

const ArrowButton = ({ className, rotate, onClick }) => (
    <button onClick={onClick} className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ${className}`}>
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transform ${rotate}`} viewBox="0 0 20 20" fill="currentColor">
            <path
                fillRule="evenodd"
                d="M10.707,5.293c0.391,-0.391 1.023,-0.391 1.414,0l4.586,4.586c0.391,0.391 0.391,1.023 0,1.414l-4.586,4.586c-0.391,0.391 -1.023,0.391 -1.414,0c-0.391,-0.391 -0.391,-1.023 0,-1.414l3.293,-3.293l-3.293,-3.293c-0.391,-0.391 -0.391,-1.023 0,-1.414Z"
            />
        </svg>
    </button>
)

const Arrows = ({ setDirection }) => (
    <div className="flex flex-col items-center w-full">
        <ArrowButton className="w-fit justify-self-center rounded" rotate="-rotate-90" onClick={() => setDirection("top")} />
        <div className="w-full flex justify-between ">
            <ArrowButton className="rounded" rotate="rotate-180" onClick={() => setDirection("left")} />
            <ArrowButton className="rounded" rotate="rotate-0" onClick={() => setDirection("right")} />
        </div>
        <ArrowButton className="w-fit rounded" rotate="rotate-90" onClick={() => setDirection("bottom")} />
    </div>
)

export default function () {
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
    const levels = {
        easy: 100,
        medium: 70,
        hard: 40,
    }
    const [level, setLevel] = useState(levels["medium"])
    const [state, setState] = useState("start")
    const [highestScore, setHighestScore] = useState(initialSnakeLength - 2)

    const advance = {
        top: () => setTop((top) => (top === 0 ? limit - 1 : top - 1)),
        bottom: () => setTop((top) => (top === limit - 1 ? 0 : top + 1)),
        right: () => setLeft((left) => (left === limit - 1 ? 0 : left + 1)),
        left: () => setLeft((left) => (left === 0 ? limit - 1 : left - 1)),
    }

    const newGame = () => {
        setGrid(initialGrid)
        setState("playing")
        setSnakeLength(initialSnakeLength)
        setDirection(initialDirection)
        setMoreFood(true)
        setTop(0)
        setLeft(0)
    }

    useEffect(() => {
        let interval
        if (didMountRef.current && state === "playing") {
            advance[direction]()
            interval = setInterval(() => {
                advance[direction]()
            }, level)
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
            setGrid((grid) =>
                columns.map((i) =>
                    rows.map((j) => {
                        const oldType = grid[i][j][0]
                        const oldCycles = grid[i][j][1]
                        let type
                        let cycles

                        if (i === left && j === top) {
                            type = "head"
                            if (oldType === "food") {
                                setSnakeLength(snakeLength + 1)
                                setMoreFood(true)
                            } else if (oldType === "body") {
                                setState("loose")
                                if (snakeLength - initialSnakeLength > highestScore) {
                                    setHighestScore(snakeLength - initialSnakeLength)
                                }
                            }
                        } else if (oldType === "body" && oldCycles > snakeLength - 3) {
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

    return (
        <div className="mt-4 lg:mt-16">
            <div className="flex justify-between mb-2">
                <Button onCLick={newGame} text={state === "start" ? "START GAME" : "START AGAIN" } disabled={state === "playing"} className="bg-green-600" />
            </div>
            <div className="flex justify-between mb-2">
                <Button onCLick={() => setLevel(levels["easy"])} text={"Easy"} disabled={state === "playing"} className={level === levels["easy"] ? "!bg-orange-300 mr-1" : "bg-white mr-1"} />
                <Button onCLick={() => setLevel(levels["medium"])} text={"Medium"} disabled={state === "playing"} className={level === levels["medium"] ? "!bg-orange-300 mr-1" : "bg-white mr-1"} />
                <Button onCLick={() => setLevel(levels["hard"])} text={"Hard"} disabled={state === "playing"} className={level === levels["hard"] ? "!bg-orange-300" : "bg-white"} />
            </div>
            <div className="relative h-[300px] w-[300px] border-2 border-black">
                {rows.map((i) => columns.map((j) => <Snake top={i} left={j} grid={grid} state={state} key={"" + i + j} />))}
            </div>
            <div>
                <div className="flex justify-between">
                    <p>Score</p>
                    <p>{snakeLength - initialSnakeLength}</p>
                </div>
                <div className="flex justify-between">
                    <p>Highest score</p>
                    <p>{snakeLength - initialSnakeLength > highestScore ? snakeLength - initialSnakeLength : highestScore}</p>
                </div>
            </div>
            <div className="mt-4 lg:hidden">
                <Arrows setDirection={setDirection} />
            </div>
        </div>
    )
}
