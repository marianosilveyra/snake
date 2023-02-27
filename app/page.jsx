"use client"

import links from "./components/Navigation/links"
import Button from "./components/Button"
import Snake from "./assets/svg/snake.jsx"
import {motion} from "framer-motion"

export default function HomePage() {
    return (
        <motion.div
            className="flex h-screen flex-col justify-center"
            drag
            dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
        >
            <div className="self-center">
                <h1 className="text-2xl font-bold text-center mb-6">Welcome to Snake</h1>
                <Button animate={true} href={links[1].route} text="NEW GAME" className="bg-fucsia-default text-white" />
                <div className="w-full h-36 mt-4 flex justify-center align-middle">
                    <Snake />
                </div>
            </div>
        </motion.div>
    )
}
