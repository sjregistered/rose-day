import { useState, useEffect } from 'react'

interface CursiveTextProps {
    text: string
    className?: string
    onComplete?: () => void
    delay?: number
}

export default function CursiveText({ text, className = '', onComplete, delay = 50 }: CursiveTextProps) {
    const [displayedText, setDisplayedText] = useState('')
    const [index, setIndex] = useState(0)

    useEffect(() => {
        if (index < text.length) {
            const timer = setTimeout(() => {
                setDisplayedText((prev) => prev + text[index])
                setIndex((prev) => prev + 1)
            }, delay)
            return () => clearTimeout(timer)
        } else if (onComplete) {
            const timer = setTimeout(onComplete, 1000)
            return () => clearTimeout(timer)
        }
    }, [index, text, delay, onComplete])

    return (
        <span className={`${className} cursive-writing`}>
            {displayedText}
            <span className="cursor">|</span>
        </span>
    )
}
