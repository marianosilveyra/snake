import Link from "next/link"

export default function Button({ href, onCLick, text, disabled = false, className }) {
    return (
        <div className={`transition ease-in-out lg:delay-75 lg:hover:-translate-y-[2px] lg:hover:scale-105 duration-75 font-semibold text-center rounded-lg w-full ${disabled ? "bg-gray-300 text-gray-400" : ""} ${className}`}>
            {href ? (
                <Link className="p-2" disabled={disabled} href={href}>
                    {text}
                </Link>
            ) : (
                <button className="p-2 w-full" disabled={disabled} onClick={onCLick}>
                    {text}
                </button>
            )}
        </div>
    )
}
