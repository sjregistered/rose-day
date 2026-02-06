import { useEffect, useState } from 'react'
import { RoseIcon } from './Icons'
import '../App.css'

interface CelebrationOverlayProps {
    type: 'mixed' | 'red-dominant'
    isInfinite?: boolean
}

interface RoseParticle {
    id: number
    x: number
    y: number
    size: number
    color: string
    delay: number
    duration: number
}

const COLORS_MIXED = ['#E1306C', '#FF69B4', '#FFC0CB', '#FFFFFF', '#FFD700']
const COLORS_RED_DOMINANT = ['#D50000', '#B71C1C', '#FF1744', '#D50000', '#FFFFFF']

export default function CelebrationOverlay({ type, isInfinite = false }: CelebrationOverlayProps) {
    const [roses, setRoses] = useState<RoseParticle[]>([])

    useEffect(() => {
        // Generate random roses
        const count = 80
        const newRoses: RoseParticle[] = []
        const colors = type === 'mixed' ? COLORS_MIXED : COLORS_RED_DOMINANT

        for (let i = 0; i < count; i++) {
            newRoses.push({
                id: i,
                x: Math.random() * 100, // vw
                y: Math.random() * 100, // vh
                size: Math.random() * 3 + 1, // rem
                color: colors[Math.floor(Math.random() * colors.length)],
                delay: Math.random() * 2,
                duration: Math.random() * 3 + 2
            })
        }
        setRoses(newRoses)
    }, [type])

    return (
        <div className="celebration-overlay">
            {roses.map((rose) => (
                <div
                    key={rose.id}
                    className={`celebration-rose-wrapper ${isInfinite ? 'infinite-celebration' : ''}`}
                    style={{
                        left: `${rose.x}vw`,
                        top: `${rose.y}vh`,
                        animationDelay: `${rose.delay}s`,
                        animationDuration: `${rose.duration}s`
                    }}
                >
                    <RoseIcon
                        style={{
                            fontSize: `${rose.size}rem`,
                            color: rose.color
                        }}
                    />
                </div>
            ))}
        </div>
    )
}
