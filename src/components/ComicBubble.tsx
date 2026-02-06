import React from 'react'

interface ComicBubbleProps {
    text: string
    onComplete?: () => void
}

export default function ComicBubble({ text }: ComicBubbleProps) {
    return (
        <div className="comic-bubble-container fade-in">
            <div className="comic-bubble-cloud">
                <p className="bubble-text">{text}</p>
                <div className="bubble-tail-1"></div>
                <div className="bubble-tail-2"></div>
            </div>
        </div>
    )
}
