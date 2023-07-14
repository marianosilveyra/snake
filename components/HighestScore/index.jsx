export default function HighestScore({highestScore}){
  return(
    <h3 className="text-center w-full mt-4 font-semibold">Highest score: {Math.round(highestScore)}</h3>
  )
}