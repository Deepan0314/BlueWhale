import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import Logo from "../assets/Secondary-Logo_Haierah-01-transparent.png";
export default function LoadingScreen({ onComplete }) {
    const containerRef = useRef(null);
    const lettersRef = useRef([]);
    const lineIndicatorRef = useRef(null);
    const subTextRef = useRef(null);
    const screenRef = useRef(null);

    const [isAnimationDone, setIsAnimationDone] = useState(false);

    // Logo word characters array
    const logoText = "HAIRA";

    const onCompleteRef = useRef(onComplete);
    onCompleteRef.current = onComplete;

    useLayoutEffect(() => {
        let ctx;
        try {
            // Create GSAP animation context for unified memory management
            ctx = gsap.context(() => {
                // 1. ANIME EACH LOGO LETTER ELEVATION & SHARPNESS
                // Letter elements transition: blur(15px) -> sharp, opacity 0 -> 1, translate Y from 25px -> 0
                const activeLetters = lettersRef.current.filter(Boolean);
                gsap.fromTo(
                    activeLetters,
                    {
                        opacity: 0,
                        filter: "blur(15px)",
                        y: 25
                    },
                    {
                        opacity: 1,
                        filter: "blur(0px)",
                        y: 0,
                        duration: 1.3,
                        stagger: 0.12,
                        ease: "power3.out",
                        delay: 0.2
                    }
                );

                // 2. LUXURY LOADING LINE PROGRESSION
                // Grows from left to right (origin left) over 1.8 seconds with power2.inOut curve
                if (lineIndicatorRef.current) {
                    gsap.fromTo(
                        lineIndicatorRef.current,
                        { scaleX: 0 },
                        {
                            scaleX: 1,
                            duration: 1.8,
                            ease: "power2.inOut",
                            delay: 0.7,
                            onComplete: () => {
                                // Slight aesthetic pause to maximize preloader impact before revealing
                                gsap.delayedCall(0.3, () => {
                                    triggerExitTransition();
                                });
                            }
                        }
                    );
                }

                // 3. BRAND SUBTEXT DECORATION
                // Slowly fades in below the loading line
                if (subTextRef.current) {
                    gsap.fromTo(
                        subTextRef.current,
                        { opacity: 0, y: 15 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 1.4,
                            ease: "power2.out",
                            delay: 1.3
                        }
                    );
                }

                // 4. TRANSITIONAL SLIDE OUT REVEALER
                function triggerExitTransition() {
                    const targets = [
                        ...activeLetters,
                        lineIndicatorRef.current ? lineIndicatorRef.current.parentElement : null,
                        subTextRef.current
                    ].filter(Boolean);

                    // First, fade the loader content elements slightly to focus the slide
                    gsap.to(targets, {
                        opacity: 0,
                        y: -15,
                        duration: 0.8,
                        ease: "power3.inOut"
                    });

                    // Pull the entire white screen background upward to reveal the homepage
                    gsap.to(screenRef.current, {
                        yPercent: -100,
                        duration: 1.4,
                        ease: "power4.inOut",

                        onComplete: () => {
                            setIsAnimationDone(true);
                            onCompleteRef.current();
                        }
                    });
                }

            }, containerRef);
        } catch (error) {
            console.warn("GSAP context setup skipped/errored in LoadingScreen:", error);
            // Fallback immediately to reveal app in case GSAP fails
            onCompleteRef.current();
        }

        // Garbage clean on component unmount
        return () => {
            if (ctx && typeof ctx.revert === "function") {
                ctx.revert();
            }
        };
    }, []);

    // If slide is completed, drop panel completely from DOM tree
    if (isAnimationDone) return null;

    return (
        <div
            id="preloader-overlay"
            ref={containerRef}
            className="fixed inset-0 z-50 overflow-hidden pointer-events-none"
        >
            {/* Fullscreen white card */}
            <div
                id="loading-main-panel"
                ref={screenRef}
                className="w-full h-full bg-white flex flex-col items-center justify-center pointer-events-auto"
            >
                <div className="flex flex-col items-center">
                    {/* Logo letters line */}
                    <div className="flex justify-center items-center">
                       <img
                          id="haira-logo"
                          ref={(el) => {
                               lettersRef.current[0] = el;
                        }}
                        src={Logo}
                        alt="HAIERAH"
                        className="w-[420px] md:w-[520px] lg:w-[600px] object-contain select-none"
                        />
                    </div>

                    {/* Thin luxury loading line container */}
                    <div id="loading-line-track" className="w-48 md:w-60 h-[1px] bg-neutral-100 mt-8 relative overflow-hidden">
                        <div
                            id="loading-line-indicator"
                            ref={lineIndicatorRef}
                            className="absolute left-0 top-0 h-full w-full bg-neutral-950 origin-left scale-x-0"
                        ></div>
                    </div>

                    {/* Brand Concept sub caption */}
                    <p
                        id="loading-luxury-label"
                        ref={subTextRef}
                        className="text-stone-400 text-[10px] md:text-xs uppercase tracking-[0.4em] mt-5 font-light"
                    >
                        Luxury Fashion
                    </p>
                </div>
            </div>
        </div>
    );
}
