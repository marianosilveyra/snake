export default function Arrows({ setDirection }) {

  const ArrowButton = ({ className, rotate, onClick }) => (
    <button onClick={onClick} className={`bg-violet-light text-white font-bold py-2 px-4 flex items-center justify-center ${className}`}>
      <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transform ${rotate}`} viewBox="0 0 20 20" fill="currentColor">
        <path
          fillRule="evenodd"
          d="M10.707,5.293c0.391,-0.391 1.023,-0.391 1.414,0l4.586,4.586c0.391,0.391 0.391,1.023 0,1.414l-4.586,4.586c-0.391,0.391 -1.023,0.391 -1.414,0c-0.391,-0.391 -0.391,-1.023 0,-1.414l3.293,-3.293l-3.293,-3.293c-0.391,-0.391 -0.391,-1.023 0,-1.414Z"
        />
      </svg>
    </button>
  )

  return (
    <div className="flex relative flex-col items-center w-full my-9">
      <ArrowButton
        className="absolute -top-[34px] z-10 w-20 h-16 justify-self-center rounded-full"
        rotate="-rotate-90"
        onClick={() => setDirection("top")}
      />
      <div className="w-full flex justify-between ">
        <ArrowButton className="w-20 h-16 rounded-full" rotate="rotate-180" onClick={() => setDirection("left")} />
        <ArrowButton className="w-20 h-16 rounded-full" rotate="rotate-0" onClick={() => setDirection("right")} />
      </div>
      <ArrowButton
        className="absolute -bottom-[34px] z-10 w-20 h-16 rounded-full"
        rotate="rotate-90"
        onClick={() => setDirection("bottom")}
      />
    </div>
  )
}
