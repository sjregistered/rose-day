import React, { useRef, useState, useEffect, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, PerspectiveCamera, Stars, Html } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'

function Tree() {
    return (
        <group position={[0, -2, 0]}>
            {/* Trunk */}
            <mesh position={[0, 1.5, 0]}>
                <cylinderGeometry args={[0.2, 0.4, 3, 8]} />
                <meshStandardMaterial color="#5D4037" />
            </mesh>
            {/* Foliage */}
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <mesh position={[0, 3.5, 0]}>
                    <sphereGeometry args={[1.5, 16, 16]} />
                    <meshStandardMaterial color="#2E7D32" />
                </mesh>
            </Float>
            {/* Tree Name Label */}
            <Html position={[0, 5.0, 0]} center>
                <div style={{
                    color: 'white',
                    background: 'rgba(0,0,0,0.6)',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontFamily: 'Arial',
                    fontSize: '12px',
                    whiteSpace: 'nowrap'
                }}>
                    Rose Tree 🌹
                </div>
            </Html>
            {/* Roses on tree */}
            {[...Array(12)].map((_, i) => (
                <mesh
                    key={i}
                    position={[
                        Math.sin(i) * 1.2,
                        3 + Math.cos(i * 0.5) * 1,
                        Math.cos(i) * 1.2
                    ]}
                >
                    <sphereGeometry args={[0.12, 8, 8]} />
                    <meshStandardMaterial color={i % 3 === 0 ? "#2196F3" : "#D50000"} />
                </mesh>
            ))}
        </group>
    )
}

function Character({ position, color, name, isProposing, onPluck }: { position: [number, number, number], color: string, name: string, isProposing?: boolean, onPluck?: () => void }) {
    const group = useRef<THREE.Group>(null)
    const body = useRef<THREE.Mesh>(null)
    const leftLeg = useRef<THREE.Mesh>(null)
    const rightLeg = useRef<THREE.Mesh>(null)
    const arm = useRef<THREE.Mesh>(null)

    useEffect(() => {
        if (isProposing && group.current && arm.current && leftLeg.current && rightLeg.current && body.current) {
            const tl = gsap.timeline()

            // 1. Walk to tree (simple slide)
            tl.to(group.current.position, { x: 0.5, z: 0.5, duration: 2, ease: "power1.inOut" })

            // 2. Pluck rose (lift arm)
            tl.to(arm.current.rotation, { x: -Math.PI / 2, duration: 0.5 })
            tl.call(() => onPluck?.())
            tl.to(arm.current.rotation, { x: 0, duration: 0.5 }) // Lower arm holding rose

            // 3. Kneel Animation
            // Lower body slightly less than before to keep right leg up
            tl.to(group.current.position, { y: -1.2, duration: 1, ease: "power2.out" }, "kneel")

            // Rotate left leg backward (Extend it back like a lunge/kneel)
            // Rotate around the hip (top)
            tl.to(leftLeg.current.rotation, { x: Math.PI / 3, duration: 1 }, "kneel")
            tl.to(leftLeg.current.position, { z: -0.5, y: -0.3, duration: 1 }, "kneel")

            // Bend right leg forward
            tl.to(rightLeg.current.rotation, { x: -Math.PI / 3, duration: 1 }, "kneel")
            tl.to(rightLeg.current.position, { z: 0.4, y: -0.1, duration: 1 }, "kneel")

            // Propose (lift arm slightly)
            tl.to(arm.current.rotation, { x: -Math.PI / 3, duration: 0.5 })
        }
    }, [isProposing, onPluck])

    return (
        <group ref={group} position={position}>
            {/* Name Label */}
            <Html position={[0, 2.2, 0]} center>
                <div style={{
                    color: 'white',
                    background: 'rgba(0,0,0,0.6)',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontFamily: 'Arial',
                    fontSize: '10px',
                    whiteSpace: 'nowrap'
                }}>
                    {name}
                </div>
            </Html>

            {/* Head */}
            <mesh position={[0, 1.6, 0]}>
                <sphereGeometry args={[0.25, 16, 16]} />
                <meshStandardMaterial color="#FFE0BD" />
            </mesh>

            {/* Body (Torso) */}
            <mesh ref={body} position={[0, 1.0, 0]}>
                <boxGeometry args={[0.4, 0.7, 0.2]} />
                <meshStandardMaterial color={color} />
            </mesh>

            {/* Left Leg */}
            <mesh ref={leftLeg} position={[-0.1, 0.3, 0]}>
                <boxGeometry args={[0.15, 0.7, 0.15]} />
                <meshStandardMaterial color="#333" />
            </mesh>

            {/* Right Leg */}
            <mesh ref={rightLeg} position={[0.1, 0.3, 0]}>
                <boxGeometry args={[0.15, 0.7, 0.15]} />
                <meshStandardMaterial color="#333" />
            </mesh>

            {/* Arm */}
            <mesh ref={arm} position={[0.25, 1.2, 0]} rotation={[0, 0, 0]}>
                <boxGeometry args={[0.1, 0.6, 0.1]} />
                <meshStandardMaterial color={color} />
            </mesh>
        </group>
    )
}

function Scene({ onShowProposal }: { onShowProposal: () => void }) {
    const [isAnimating, setIsAnimating] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => setIsAnimating(true), 1500)
        return () => clearTimeout(timer)
    }, [])

    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 1, 8]} fov={50} />
            <ambientLight intensity={0.6} />
            <pointLight position={[10, 10, 10]} intensity={1} castShadow />
            <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />

            <Tree />

            {/* User (Saurabh) */}
            <Character
                position={[-2.5, -2, 1]}
                color="#1565C0"
                name="Saurabh"
                isProposing={isAnimating}
                onPluck={() => setTimeout(onShowProposal, 1500)}
            />

            {/* Annu */}
            <Character
                position={[-1.0, -2, 1.0]}
                color="#C2185B"
                name="Annu"
            />

            {/* Ground */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
                <planeGeometry args={[20, 20]} />
                <meshStandardMaterial color="#1b5e20" />
            </mesh>
        </>
    )
}

export default function Proposal3D({ onShowProposal }: { onShowProposal: () => void }) {
    return (
        <div className="three-canvas-container">
            <Canvas
                gl={{
                    antialias: true,
                    powerPreference: "default",
                    failIfMajorPerformanceCaveat: false
                }}
                onCreated={({ gl }) => {
                    gl.setClearColor('#1a237e')
                }}
            >
                <Suspense fallback={null}>
                    <Scene onShowProposal={onShowProposal} />
                </Suspense>
            </Canvas>
        </div>
    )
}

