"use client";

import React, { useEffect, useRef } from "react";
import '../pages/wealthGrow.css';
import coinStack from '../assets/coin_stack.json';
import lottie from "lottie-web"; // Import lottie-web

const WealthGrowSection = () => {
    const animationContainer = useRef(null);

    useEffect(() => {
        if (typeof window !== "undefined" && animationContainer.current) {
            // Initialize the animation when the component mounts
            const animation = lottie.loadAnimation({
                container: animationContainer.current, // Specify the container where animation will render
                renderer: "svg", // Render as an SVG
                loop: true, // Loop the animation
                autoplay: true, // Start automatically
                animationData: coinStack, // Pass in the Lottie JSON data
                rendererSettings: {
                    preserveAspectRatio: "xMidYMid slice",
                },
            });

            // Clean up the animation when the component unmounts
            return () => {
                animation.destroy();
            };
        }
    }, []);

    return (
        <div className="container_wealth_grow">
            <div ref={animationContainer} style={{ height: "10rem", width: "10rem" }} />
            <section className="coins-message">
                Watch your coins stack up—your path to wealth starts here!
            </section>
        </div>
    );
};

export default WealthGrowSection;
