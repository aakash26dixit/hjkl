"use client"
import { React, useEffect, useRef, useState } from 'react';
import './contact.css';
// import '../app/globals.css'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import envelopeImage from '../assets/envelope.png';
// import { Link } from 'react-router-dom';
import Link from 'next/link';
import { ClimbingBoxLoader } from 'react-spinners';

const Contact = () => {
    const navbarToggleRef = useRef(null);
    const sidebarRef = useRef(null);

    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
    }, [])

    useEffect(() => {
        const toggleSidebar = () => {
            if (sidebarRef.current) {
                sidebarRef.current.classList.toggle('active');
            }
        };

        const navbarToggle = navbarToggleRef.current;
        if (navbarToggle) {
            navbarToggle.addEventListener('click', toggleSidebar);
        }

        // Cleanup function
        return () => {
            if (navbarToggle) {
                navbarToggle.removeEventListener('click', toggleSidebar);
            }
        };

    }, [])

    return (
        <>
            {
                isLoading ? (
                    <div className="loader">
                        <ClimbingBoxLoader size={30} color={'#F37A24'} loading={isLoading} />
                    </div>
                ) : <>
                    <Navbar toggleRef={navbarToggleRef} />
                    <Sidebar sidebarRef={sidebarRef} />
                    <div className='container'>
                        <div className='top-image'>
                            <LazyLoadImage
                                className='lazyImage'
                                src={envelopeImage}
                                effect="blur" // Optional: add a blur effect while loading
                            />
                        </div>

                        <div className='content-container'>
                            <div className='image-container'>
                                <div className='image'>
                                    <div className='form'>
                                        <h2 className="contact-us">Contact Us</h2>
                                        <p className="contact-us-message">Have questions? Reach out to us—<br />we're here to help!</p>
                                        <form>
                                            <div>
                                                <input type="text" placeholder="Name" className='name' id="name" name="name" required />
                                            </div>
                                            <div>
                                                <input type="number" className="contact" placeholder="contact" id="email" name="email" required />
                                            </div>
                                            <div>
                                                <textarea id="message" className="message" name="message" required></textarea>
                                            </div>
                                        </form>
                                    </div>
                                    <button type="submit">SEND</button>
                                    <div className="glass-pieces">
                                        <div className="glass-piece-1"></div>
                                        <div className="glass-piece-2"></div>
                                        <div className="glass-piece-3"></div>
                                        <div className="glass-piece-4"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }

        </>
    );
};

function Navbar({ toggleRef }) {
    return (
        <section className="navbar" >
            <div className="logo">

            </div>
            <div className="navbar-content">
                <div ref={toggleRef} className="navbar-toggle">&#9776;</div>
                <div id="navbar-links" className="navbar-links">
                    <a href="#home">HOME</a>
                    <a href="#about">ABOUT</a>
                    <a href="#services">SERVICES</a>
                    <Link href="/contact">CONTACT</Link>
                    <Link href="/login">LOGIN</Link>
                </div>
            </div>
        </section>
    );
}

function Sidebar({ sidebarRef }) {
    return (
        <div ref={sidebarRef} id="sidebar" className="sidebar">
            <a href="#home">HOME</a>
            <a href="#about">ABOUT</a>
            <a href="#services">SERVICES</a>
            <Link href="/contact">CONTACT</Link>
            <Link href="/login">LOGIN</Link>
        </div>
    );
}


export default Contact;
