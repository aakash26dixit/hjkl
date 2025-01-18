import React, { useEffect, useState } from 'react'
import   './profile.css'
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";
import Image from 'next/image'

const Profile = () => {

    const [userName, setUserName] = useState("")
    const [balance, setBalance] = useState("")
    const [contact, setContact] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            await getRecord();
        };

        fetchData();
    }, []);

    const getRecord = async () => {
        const data = localStorage.getItem('username') || '';
        
        const q = query(collection(db, "roulette-users"), where("username", "==", data));

        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            setUserName(doc.data().username)
            setBalance(doc.data().amount)
            setContact(doc.data().contact)
        });
    }

    return (
        <div className="profileContainer">
            <div className="profileCard">
                <div className="profileHeader">
                    <Image
                        src="/assets/account.png"
                        width={50}
                        height={50}
                        alt="User profile icon"
                        className="profileImage"
                    />
                    <h2 className="profileTitle">{userName}</h2>
                </div>

                <div className="profileDetails">
                    <div className="infoRow">
                        <span className="infoLabel">Contact:</span>
                        <span className="infoValue">{contact}</span>
                    </div>
                    <div className="infoRow">
                        <span className="infoLabel">Balance:</span>
                        <span className="infoValue">{balance}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;
