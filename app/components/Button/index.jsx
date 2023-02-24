import Link from "next/link"

export default function Button({ href, onCLick, text, disabled = false, className }) {
    return (
        <div className={`font-semibold text-center p-2 rounded-lg w-full ${disabled ? "!bg-gray-300 !text-gray-400" : ""} ${className}`}>
            {href ? <Link disabled={disabled} href={href}>{text}</Link> : <button disabled={disabled} onClick={onCLick}>{text}</button>}
        </div>
    )
}
