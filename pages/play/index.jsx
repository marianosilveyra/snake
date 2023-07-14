import Button from "../../components/Button"
import Snake from "../../components/Snake"
import Arrows from "../../components/Arrows"
import { useSnakeMovement } from "../../hooks"

export default function () {
  const [
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
  ] = useSnakeMovement()

  return (
    <div className="flex h-screen pt-14">
      <div className="self-center">
        <div className="flex justify-between mb-2">
          <Button
            onCLick={setGameState}
            text={state === "playing" ? "Pause" : "Play"}
            disabled={false}
            className="bg-fucsia-default text-white mr-1"
          />
          <Button
            onCLick={() => setWalls((walls) => !walls)}
            text={walls ? "Walls on" : "Walls off"}
            disabled={state === "playing"}
            className={`${walls ? "!bg-violet-light text-white" : "bg-white"}`}
          />
        </div>
        <div className="flex justify-between mb-2">
          <Button
            onCLick={() => setLevel("easy")}
            text={"Easy"}
            disabled={state === "playing"}
            className={level === "easy" ? "!bg-violet-light text-white mr-1" : "bg-white mr-1"}
          />
          <Button
            onCLick={() => setLevel("medium")}
            text={"Medium"}
            disabled={state === "playing"}
            className={level === "medium" ? "!bg-violet-light text-white mr-1" : "bg-white mr-1"}
          />
          <Button
            onCLick={() => setLevel("hard")}
            text={"Hard"}
            disabled={state === "playing"}
            className={level === "hard" ? "!bg-violet-light text-white" : "bg-white"}
          />
        </div>
        <div
          className={`mt-4 border-2 ${walls ? " border-black-dark" : "border-transparent"} ${state === "loose" && walls ? "!border-red-500" : ""}`}
        >
          <div className={`relative h-[304px] w-[304px] border-2 bg-gray-default `}>
            {rows.map((i) => columns.map((j) => <Snake top={i} left={j} grid={grid} state={state} key={"" + i + j} />))}
          </div>
        </div>
        <div className="w-full p-2">
          <div className="flex justify-between">
            <p>Score</p>
            <p>{Math.round(currentScore)}</p>
          </div>
          <div className={`flex justify-between ${newHighScore ? "font-bold text-green-700 animate-bounce" : ""}`}>
            <p>{newHighScore ? "New highest score!" : "Highest score"}</p>
            <p>{currentScore > highestScore ? Math.round(currentScore) : Math.round(highestScore)}</p>
          </div>
        </div>
        <div className="lg:hidden">
          <Arrows setDirection={setDirection} />
        </div>
      </div>
    </div>
  )
}
