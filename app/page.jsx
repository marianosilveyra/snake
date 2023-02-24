import links from "./components/Navigation/links";
import Button from "./components/Button";

export default function HomePage() {
    return (
        <div className="mt-12 flex flex-col justify-center">
            <h1 className="text-2xl font-bold text-center mb-6">Welcome to Snake</h1>
            <Button href={links[1].route} text="NEW GAME" className="bg-green-600"/>
        </div>
    )
}
