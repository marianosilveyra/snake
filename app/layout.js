import Navigation from "./components/Navigation/Navigation"
import "./globals.css"

export default function RootLayout({ children }) {
    return (
        <html>
            <head>
                <title>Snake App</title>
            </head>

            <body className="flex flex-col justify-center w-full font-mono bg-gray-dark">
                <Navigation />

                <div className="flex w-full justify-center">
                    <div className="container max-w-[1092px]">
                        <div className="flex flex-wrap justify-center px-4">
                            <div>{children}</div>
                        </div>
                    </div>
                </div>
            </body>
        </html>
    )
}
