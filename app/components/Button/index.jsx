import Link from "next/link"
import { motion } from "framer-motion"

export default function Button({ href, onCLick, text, disabled = false, className, animate }) {
    return (
        <motion.div
            drag={animate}
            dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
            animate={animate ? { scale: [1, 1.1, 1] } : {}}
            transition={animate ? { duration: 1, repeat: Infinity } : {}}
            className={`transition ease-in-out lg:delay-75 lg:hover:-translate-y-[2px] lg:hover:scale-105 duration-75 font-semibold text-center rounded-lg w-full ${
                disabled ? "bg-gray-300 text-gray-400" : ""
            } ${className}`}
        >
            {href ? (
                <Link disabled={disabled} href={href}>
                    <p className="p-2">{text}</p>
                </Link>
            ) : (
                <button className="p-2 w-full" disabled={disabled} onClick={onCLick}>
                    {text}
                </button>
            )}
        </motion.div>
    )
}
