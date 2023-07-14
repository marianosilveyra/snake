export default function Snake({ top, left, grid, state }) {
  const type = grid[left][top][0]
  const classNames = {
    head: state === "loose" ? "bg-red-900 rounded opacity-75" : "bg-black-dark rounded",
    body: state === "loose" ? "bg-red-500 opacity-75" : "bg-green-700",
    food: state === "playing" || state === "pause" ? "bg-red-700 border border-white !h-3 !w-3 rounded-full" : "",
  }

  return (
    <div
      style={{ top: 15 * top, left: 15 * left, transition: "background-color 0.1s" }}
      className={`absolute z-10 h-[15px] w-[15px] ${classNames[type] || ""}`}
    />
  )
}
