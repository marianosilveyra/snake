import Link from "next/link"
import links from "./links"

export default function Navigation() {
    return (
        <header>
            <nav className="bg-blue-300 py-4 flex justify-center">
                <div className="container w-full max-w-[1092px]">
                    <div className="flex flex-wrap justify-center px-4">
                        <div className="w-full max-w-[1092px]">
                            <ul className="flex">
                                {links.map(({ label, route }) => (
                                    <li key={route} className="mr-4">
                                        <Link href={route}>{label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}
