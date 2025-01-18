"use client";
import dynamic from 'next/dynamic';
import React, { useEffect, useRef } from "react";
import "./uipage.css";

const WealthGrowSection = dynamic(() => import('./WealthGrowSection'), { ssr: false });
const Cards = dynamic(() => import('./Cards'), { ssr: false });
const Footer = dynamic(() => import('./Footer'), { ssr: false });

const UiPage = () => {
    const navbarToggleRef = useRef(null);
    const sidebarRef = useRef(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const toggleSidebar = () => {
                if (sidebarRef.current) {
                    sidebarRef.current.classList.toggle("active");
                }
            };

            const navbarToggle = navbarToggleRef.current;
            if (navbarToggle) {
                navbarToggle.addEventListener("click", toggleSidebar);
            }

            return () => {
                if (navbarToggle) {
                    navbarToggle.removeEventListener("click", toggleSidebar);
                }
            };
        }
    }, []);

    return (
        <div className="App">
            <Navbar toggleRef={navbarToggleRef} />
            <Content sidebarRef={sidebarRef} />
            <WealthGrowSection />
            <Cards />
            <WealthGrowSection />
            <Footer />
        </div>
    );
};

function Navbar({ toggleRef }) {
    return (
        <section className="navbar">
            <div className="logo"></div>
            <div className="navbar-content">
                <div ref={toggleRef} className="navbar-toggle">
                    &#9776;
                </div>
                <div id="navbar-links" className="navbar-links">
                    <a href="/">HOME</a>
                    <a href="/Login">LOGIN</a>
                </div>
            </div>
        </section>
    );
}

function Sidebar({ sidebarRef }) {
    return (
        <div ref={sidebarRef} id="sidebar" className="sidebar">
            <a href="/">HOME</a>
            <a href="/Login">LOGIN</a>
        </div>
    );
}

function Content({ sidebarRef }) {
    return (
        <>
            <Sidebar sidebarRef={sidebarRef} />
            <Row />
        </>
    );
}

function Row() {
    return (
        <section className="one-row">
            <div className="background-container">
                <video autoPlay muted loop id="background-video">
                    <source src="/video.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div id="overlay"></div>
            </div>
            <div className="texts">
                <section className="big-text">
                    <p>
                        Low <br /> Risk
                    </p>
                </section>

                <section className="big-text2">
                    <p>
                        High <br /> Reward!
                    </p>
                </section>
            </div>
        </section>
    );
}

export default UiPage;
