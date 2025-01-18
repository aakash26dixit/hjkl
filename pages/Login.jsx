"use client";
import { React, useRef, useEffect, useState } from 'react';
import animationData from '../assets/casino_json.json';
import unlock from '../assets/unlock.json';
import Link from 'next/link';
import { useRouter } from 'next/router';
import './login.css';
import dynamic from "next/dynamic";
// import '../app/globals.css';
import { db } from "../firebase/firebase-config";
import { collection, getDocs } from "firebase/firestore";

const Player = dynamic(() => import("@lottiefiles/react-lottie-player"), { ssr: false });
const ClimbingBoxLoader = dynamic(() => import("react-spinners").then((mod) => mod.ClimbingBoxLoader), { ssr: false });

const Login = () => {
    const router = useRouter();
    const navbarToggleRef = useRef(null);
    const sidebarRef = useRef(null);
    const usersCollectionRef = collection(db, "roulette-users");
    const [name, setName] = useState("");
    const [users, setUsers] = useState([]);
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [dbIndex, setDbIndex] = useState(0);
    const [checkboxChecked, setCheckboxChecked] = useState(false);
    const [showAlert, setShowAlert] = useState(false); // state to manage alert visibility
    const [isClient, setIsClient] = useState(false); // track if code is running on client

    const handleCheckboxChange = (event) => {
        // Handle checkbox state change if needed
        console.log('Checkbox checked:', event.target.checked);
        setCheckboxChecked(event.target.checked); // Update checkbox state
    };

    useEffect(() => {
        // This ensures that we are on the client side before interacting with document or localStorage
        setIsClient(true); // set to true once component mounts (only on client)
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);

    useEffect(() => {
        const getUsers = async () => {
            const data = await getDocs(usersCollectionRef);
            setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id, key: doc.id })));
        };
        getUsers();
    }, []);

    // const navigateNext = () => {
    //     if (!checkboxChecked) {
    //         setShowAlert(true); // Show alert if checkbox is not checked
    //         return;
    //     }

    //     try {
    //         for (var i = 0; i < users.length; i++) {
    //             if (users[i].username.toString() === name && users[i].password.toString() === password) {
    //                 localStorage.setItem('username', users[i].username);
    //                 router.push('/Roulette');
    //                 break;
    //             } else {
    //                 // Handle invalid login if needed
    //             }
    //         }
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    const navigateNext = () => {
        if (!checkboxChecked) {
            setShowAlert(true); // Show alert if checkbox is not checked
            return;
        }
    
        try {
            // for (var i = 0; i < users.length; i++) {
            //     if (users[i].username.toString() === name && users[i].password.toString() === password) {
            //         if (typeof window !== "undefined") { // Check if running on client
            //             localStorage.setItem('username', users[i].username);
            //         }
            if (typeof window !== 'undefined' && typeof localStorage !== 'undefined' && typeof window !== 'undefined') {
                router.push('/Roulette');
            }
                    // break;
                // } else {
                //     // Handle invalid login if needed
                // }
            // }
        } catch (error) {
            console.error(error);
        }
    };
    

    if (!isClient) {
        return null; // Avoid rendering the component on the server
    }

    return isLoading ? (
        <div className="loader">
            <ClimbingBoxLoader size={30} color={'#F37A24'} loading={isLoading} />
        </div>
    ) : (
        <>
            <Navbar toggleRef={navbarToggleRef} />
            <Sidebar sidebarRef={sidebarRef} />
            <div className='container'>
                <div className='top-image'>
                    <div style={{ width: '300px' }}>
                        <Player
                            autoplay
                            loop
                            src={animationData}
                            style={{ height: 300, width: 300 }}
                            speed={0.2}
                        />
                    </div>
                </div>
                <div className='content-container'>
                    <div className='image-container'>
                        <div className='image'>
                            <div className='form'>
                                <div className="login-title">
                                    <h2 className="contact-us">Unlock</h2>
                                    <Player
                                        className='unlock-lottie'
                                        autoplay
                                        loop
                                        src={unlock}
                                        style={{ width: '50px', height: '50px' }}
                                        speed={0.2}
                                    />
                                </div>

                                <p className="contact-us-message">Join the adventure now and discover what awaits you here!</p>
                                <form>
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="Name"
                                            className='name'
                                            id="name"
                                            name="name"
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="password"
                                            className="contact"
                                            placeholder="Contact"
                                            id="email"
                                            name="number"
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <input
                                            type="checkbox"
                                            id="termsCheckbox"
                                            onChange={handleCheckboxChange}
                                        />
                                        <label htmlFor="termsCheckbox" style={{ marginLeft: '8px', marginTop: '10px', color: 'white' }}>
                                            I agree to the
                                            <a href="/terms" style={{ marginLeft: '4px', color: 'white' }}>
                                                Terms and Conditions
                                            </a>
                                        </label>
                                    </div>
                                </form>

                                {/* Display Alert if checkbox is not checked */}
                                {showAlert && (
                                    <div style={{ color: 'red', marginTop: '10px' }}>
                                        Please agree to the terms and conditions to proceed.
                                    </div>
                                )}
                            </div>

                            <button onClick={() => navigateNext()}>LOG IN</button>
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
    );
};

function Navbar({ toggleRef }) {
    return (
        <section className="navbar">
            <div className="logo"></div>
            <div className="navbar-content">
                <div ref={toggleRef} className="navbar-toggle">&#9776;</div>
                <div id="navbar-links" className="navbar-links">
                    <a href="/">HOME</a>
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
            <a href="/">HOME</a>
            <a href="#about">ABOUT</a>
            <a href="#services">SERVICES</a>
            <Link href="/contact">CONTACT</Link>
            <Link href="/login">LOGIN</Link>
        </div>
    );
}

export default Login;
