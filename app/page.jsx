"use client"

import links from "./components/Navigation/links"
import Button from "./components/Button"
import Snake from "./assets/svg/snake.jsx"

export default function HomePage() {
    return (
        <div className="flex h-screen flex-col justify-center">
            <div className="self-center">
                <h1 className="text-2xl font-bold text-center mb-6">Welcome to Snake</h1>
                <Button href={links[1].route} text="NEW GAME" className="bg-fucsia-default text-white" />
                <div className="w-full h-36 mt-4 flex justify-center align-middle">
                    <Snake />
                </div>
            </div>
        </div>
    )
}
