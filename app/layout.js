"use client"

import React, { useState } from "react"
import Navigation from "./components/Navigation/Navigation"
import "./globals.css"

export const userContext = React.createContext()
export const userSetContext = React.createContext()

export default function RootLayout({ children }) {
    const [user, setUser] = useState(null)
    return (
        <html>
            <head>
                <title>Snake App</title>
            </head>

            <body className="flex flex-col justify-center w-full font-mono bg-blue-100">
                <Navigation />

                <div className="flex w-full justify-center">
                    <div className="container max-w-[1092px]">
                        <div className="flex flex-wrap justify-center px-4">
                            <userContext.Provider value={user}>
                                <userSetContext.Provider value={setUser}>{children}</userSetContext.Provider>
                            </userContext.Provider>
                        </div>
                    </div>
                </div>
            </body>
        </html>
    )
}
