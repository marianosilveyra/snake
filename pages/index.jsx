import links from "../components/Navigation/links"
import Button from "../components/Button"
import Snake from "../assets/svg/snake.jsx"
import { motion } from "framer-motion"
import reactUseCookie from "react-use-cookie"
import HighestScore from "../components/HighestScore"

export default function HomePage() {
    const [highestScoreFromCookie, setHighestScoreFromCookie] = reactUseCookie("highestScore", 0)
    return (
        <div className="flex h-screen flex-col justify-center">
            <div className="self-center">
                <motion.h1
                    drag
                    dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
                    initial={{ opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    animate={{ opacity: 1 }}
                    className="text-2xl font-bold text-center mb-6"
                >
                    Welcome to Snake
                </motion.h1>
                <Button animate={true} href={links[1].route} text="NEW GAME" className="bg-fucsia-default text-white" />
                <motion.div
                    drag
                    dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
                    animate={{ rotate: [-360, 360] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="w-full h-36 mt-4 flex justify-center align-middle"
                >
                    <Snake />
                </motion.div>
                <HighestScore highestScore={highestScoreFromCookie}/>
            </div>
        </div>
    )
}
