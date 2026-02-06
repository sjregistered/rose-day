import { useState, useEffect } from 'react'
import { SeedIcon, TreeIcon, RoseIcon } from './Icons'
import CelebrationOverlay from './CelebrationOverlay'
import CursiveText from './CursiveText'
import Proposal3D from './Proposal3D'
import ComicBubble from './ComicBubble'
import '../App.css'

type Stage = 'seed' | 'watering' | 'growing' | 'blooming' | 'intermediate' | 'transforming' | 'photo' | 'proposal' | 'slideshow-intro' | 'slideshow' | 'final-3d-scene' | 'mega-celebration' | 'celebration-yes' | 'celebration-surely'

interface Slide {
    image: string
    label: string
}

const SLIDES: Slide[] = [
    {
        image: '/slideshow/moon.jpg',
        label: "when we were coming to see our moon 🌙"
    },
    {
        image: '/slideshow/mithaai.jpg',
        label: "A man only needs this from his woman, the way she looks at me, uff...sau baar janam lu toh mujhe yahi bndi meri biwi roop mein mile...❤️😘"
    },
    {
        image: '/slideshow/aise_na_mujhe_tum_Dekho.jpeg',
        label: "Mere rang mein rangne waali, pari ho ya ho pariyon ki raani, ya fir ho meri prem kahani...😘"
    },
    {
        image: '/slideshow/the_day_we_met.jpeg',
        label: "Aa gayi thi doston wo meri inn baahon mein, aur kahi na jaane ka mann tha na icchha, mann toh yahii tha wahi jam jaau, chaadar ban meri tamanna ka...💁"
    },
    {
        image: '/slideshow/sarv_parivaar.jpeg',
        label: "Uska parivaar pyaara sa, uska parivaar ab mera parivaar, uski icchha, uski napasand, uske aansoo, uska sukh dukh sab ab humaara hua, mera sab uska hua...maii uska hua...💕"
    },
    {
        image: '/slideshow/she_ran_and_hugged_my_mom.jpeg',
        label: "Wo daud kar aayi aur meri mummy ke gale lag li, itna zada pyaar uff, maii bhii usi din sab ke saamne seene se laga leta iss bacchi ko waise toh...😜"
    },
    {
        image: '/slideshow/the_model_face.jpeg',
        label: "Maiiiiiii heroine hoooooon...maii heroineeeee hoooon... (btw black suits on you, babe ❤️❤️❤️❤️)"
    },
    {
        image: '/slideshow/jhalli.jpeg',
        label: "The jhalli yet beautifully elegantly naturallistically beautiful face 😎"
    },
    {
        image: '/slideshow/cute_toh_haii.jpeg',
        label: "Cutenesssss overloaded, she looks more than just beautiful!!"
    },
    {
        image: '/slideshow/always_gonna_hold_your_hand.jpeg',
        label: "Always gonna hold your hand, always gonna be there for you, always gonna love you...😍"
    },
    {
        image: '/slideshow/professionally_elegant.jpeg',
        label: "Professionally gorgeous beautiful lady on the flooooorrrrr, give her cut cut more...crazy, crazy kiya re...😄"
    },
    {
        image: '/slideshow/saree_waali_girl.jpeg',
        label: "Saree waali girl, tumhe dekh dekh kr hum din kaat rhe hain, ek din aayega jab tum rubaroo hoge aur hum bas tumhe saari raat sote huye ghoora karengey...☺️"
    },
    {
        image: '/slideshow/the_jhalli_ldki.jpeg',
        label: "The jhalli ldki, jise dekh kr maii khud ko rok nhii paata..."
    },
    {
        image: '/slideshow/do_bhai.jpeg',
        label: "Do bhai, Dono tabaahi...bhen unki ke toh kya hii kehne, keher dhaa rakhe hain har tasveer mein..."
    },
    {
        image: '/slideshow/she loved the roses.jpeg',
        label: "She loved the roses, she loved the way I looked at her, she loved the way I loved her, and I love the way she trusts me...😘"
    },
    {
        image: '/slideshow/rose.jpeg',
        label: "Roses are red, so a red rose is for you, you are more than just a rose, you made my life just like a fruit, sweet and juicy...😘"
    },
]

export default function RoseDay() {
    const [stage, setStage] = useState<Stage>('seed')

    const startJourney = () => {
        if (stage === 'seed') {
            setStage('watering')
        }
    }

    const startSlideshowIntro = () => {
        setStage('slideshow-intro')
    }

    const [currentSlide, setCurrentSlide] = useState(0)
    const [showFinalUI, setShowFinalUI] = useState(false)
    const [response, setResponse] = useState<'yes' | 'surely' | null>(null)

    const handleYes = () => {
        setStage('celebration-yes')
    }

    const handleSurelyYes = () => {
        setStage('celebration-surely')
    }

    useEffect(() => {
        if (stage === 'watering') {
            const timer = setTimeout(() => setStage('growing'), 2000)
            return () => clearTimeout(timer)
        }
        if (stage === 'growing') {
            const timer = setTimeout(() => setStage('blooming'), 4000) // Longer for sequential growth
            return () => clearTimeout(timer)
        }
        if (stage === 'blooming') {
            const timer = setTimeout(() => setStage('intermediate'), 4000) // Longer for sequential blooming
            return () => clearTimeout(timer)
        }
        if (stage === 'transforming') {
            const timer = setTimeout(() => setStage('photo'), 1500)
            return () => clearTimeout(timer)
        }
        if (stage === 'photo') {
            const timer = setTimeout(() => setStage('proposal'), 1000)
            return () => clearTimeout(timer)
        }
        if (stage === 'slideshow-intro') {
            const timer = setTimeout(() => setStage('slideshow'), 5500) // Intro text duration
            return () => clearTimeout(timer)
        }
    }, [stage])

    const isCelebration = stage === 'celebration-yes' || stage === 'celebration-surely' || stage === 'slideshow'
    const isSurely = stage === 'celebration-surely' || stage === 'slideshow'

    const nextSlide = () => {
        if (currentSlide === SLIDES.length - 1) {
            setStage('final-3d-scene')
        } else {
            setCurrentSlide((prev) => (prev + 1))
        }
    }

    return (
        <div className={`app-container ${stage === 'proposal' || isCelebration ? 'bg-rose' : 'bg-neutral'}`}>

            {/* Celebration Overlays */}
            {stage === 'celebration-yes' && <CelebrationOverlay type="mixed" />}
            {stage === 'celebration-surely' && <CelebrationOverlay type="red-dominant" />}
            {(stage === 'slideshow' || stage === 'mega-celebration') && <CelebrationOverlay type="red-dominant" isInfinite={true} />}

            <div className="content-wrapper">

                {/* Stage 1: Seed */}
                {stage === 'seed' && (
                    <div className="seed-container" onClick={startJourney}>
                        <div className="soil" />
                        <div className="seed-icon-wrapper">
                            <SeedIcon className="seed-icon grow-on-hover" />
                        </div>
                        <p className="hint-text">Click the seed to water it...</p>
                    </div>
                )}

                {/* Stage 1.5: Watering */}
                {stage === 'watering' && (
                    <div className="watering-container">
                        <div className="watering-pot">💧</div>
                        <div className="droplets">
                            <div className="drop drop-1">.</div>
                            <div className="drop drop-2">.</div>
                            <div className="drop drop-3">.</div>
                        </div>
                        <div className="seed-icon-wrapper static">
                            <SeedIcon className="seed-icon" />
                        </div>
                    </div>
                )}

                {/* Stage 2 & 3: Tree growing and Blooming */}
                {(stage === 'growing' || stage === 'blooming' || stage === 'intermediate') && (
                    <div className={`tree-container ${stage === 'transforming' ? 'fade-out' : ''}`}>
                        <div className={`tree-wrapper-enhanced ${stage === 'growing' ? 'growing' : 'grown'}`}>
                            <TreeIcon className="tree-svg-animated" />

                            {(stage === 'blooming' || stage === 'intermediate') && (
                                <div className="roses-overlay-enhanced">
                                    <RoseIcon className="rose-flower-seq rose-1" />
                                    <RoseIcon className="rose-flower-seq rose-2" />
                                    <RoseIcon className="rose-flower-seq rose-3" />
                                    <RoseIcon className="rose-flower-seq rose-4" />
                                    <RoseIcon className="rose-flower-seq rose-5" />
                                    <RoseIcon className="rose-flower-seq rose-6" />
                                </div>
                            )}
                        </div>

                        {/* Intermediate Modal */}
                        {stage === 'intermediate' && (
                            <div className="intermediate-modal-overlay">
                                <div className="intermediate-modal">
                                    <p className="modal-text">You saw these roses growing and saw tree having roses everywhere...</p>
                                    <p className="modal-text-bold">But would you like to see my rose?</p>
                                    <div className="modal-buttons">
                                        <button className="btn-modal" onClick={() => setStage('transforming')}>Yes</button>
                                        <button className="btn-modal highlight" onClick={startSlideshowIntro}>Yess Yesss</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Stage: Slideshow Intro */}
                {stage === 'slideshow-intro' && (
                    <div className="slideshow-intro-container">
                        <CursiveText
                            text="a gallery of these days, and I promise will make it every year...for you."
                            className="cursive-intro-text"
                            delay={70}
                        />
                    </div>
                )}

                {/* Stage 4, 5, Slideshow & Celebration: Photo + Proposal + Buttons */}
                {(['transforming', 'photo', 'proposal', 'slideshow', 'celebration-yes', 'celebration-surely'].includes(stage as string)) && (
                    <div className={`proposal-main-container ${stage === 'transforming' ? 'fade-in' : 'visible'}`}>

                        {/* Photo / Slideshow */}
                        <div className="photo-wrapper relative-container">
                            {stage === 'slideshow' ? (
                                <div className="slideshow-container" onClick={nextSlide}>
                                    <div className="slide-wrapper">
                                        <img src={SLIDES[currentSlide].image} alt="Slideshow" className="slide-image" />
                                    </div>
                                    <div className="slide-label-container">
                                        <CursiveText
                                            key={currentSlide}
                                            text={SLIDES[currentSlide].label}
                                            className="slide-label"
                                            delay={80}
                                        />
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <img src="/annu.jpg" alt="Annu" className={`main-photo ${isSurely ? 'photo-framed' : ''}`} />

                                    {/* Rose Frame for Surely Yes */}
                                    {isSurely && (
                                        <div className="rose-frame-overlay">
                                            <RoseIcon className="frame-rose frame-tl" />
                                            <RoseIcon className="frame-rose frame-tr" />
                                            <RoseIcon className="frame-rose frame-bl" />
                                            <RoseIcon className="frame-rose frame-br" />
                                        </div>
                                    )}
                                </>
                            )}
                        </div>

                        {/* Text and Buttons (Only visible in proposal/celebration) */}
                        {(stage === 'proposal' || isCelebration) && stage !== 'slideshow' && (
                            <div className="proposal-content fade-in-text">
                                <h1 className="proposal-text">Will you be my valentine, Annu?</h1>

                                {!isCelebration && (
                                    <div className="buttons-container">
                                        <button className="btn-yes" onClick={handleYes}>Yes</button>
                                        <button className="btn-surely" onClick={handleSurelyYes}>Surely Yes</button>
                                    </div>
                                )}

                                {isCelebration && (
                                    <h2 className="celebration-text">Happy Rose Day! ❤️</h2>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {/* Stage: Final 3D Scene */}
                {['final-3d-scene', 'mega-celebration'].includes(stage) && (
                    <div className="final-scene-wrapper fade-in">
                        <Proposal3D onShowProposal={() => {
                            setShowFinalUI(true)
                        }} />

                        {stage === 'final-3d-scene' && showFinalUI && (
                            <div className="proposal-ui-overlay fade-in">
                                <ComicBubble text="Happiest rose day, Annu Ji... will you be my rose, fruit, life partner, valentine, friend, wife..." />
                                <div className="input-container-final">
                                    <button className="btn-final" onClick={() => setStage('mega-celebration')}>Yes</button>
                                    <button className="btn-final" onClick={() => setStage('mega-celebration')}>Yes Yes Yes!</button>
                                </div>
                            </div>
                        )}

                        {stage === 'mega-celebration' && (
                            <div className="mega-celebration-overlay">
                                <div className="mega-modal">
                                    <h1 className="mega-title">Happiest Valentine Week & Rose Day</h1>
                                    <p className="mega-subtitle">Annu Ji... ❤️✨</p>
                                    <p style={{ marginTop: '20px', color: '#666' }}>You said YES! 🥳</p>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
