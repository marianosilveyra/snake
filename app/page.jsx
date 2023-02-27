"use client"

import links from "./components/Navigation/links"
import Button from "./components/Button"
import Snake from "./assets/svg/snake.jsx"

export default function HomePage() {
    return (
        <div className="mt-12 flex flex-col justify-center">
            <h1 className="text-2xl font-bold text-center mb-6">Welcome to Snake</h1>
            <Button href={links[1].route} text="NEW GAME" className="bg-violet-light text-white" />
            <div className="w-full h-36 mt-4 flex justify-center align-middle">
                <Snake />
            </div>
        </div>
    )
}
