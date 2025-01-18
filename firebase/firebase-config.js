// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhfgfGCTn0nIlVA6ikm6w74PB2T5w21Vk",
  authDomain: "roulette-beta-75828.firebaseapp.com",
  projectId: "roulette-beta-75828",
  storageBucket: "roulette-beta-75828.firebasestorage.app",
  messagingSenderId: "475661954812",
  appId: "1:475661954812:web:7efa41b362580681f87179"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

const FirebaseConfigPage = () => {
  return <div>Initializing Firebase...</div>;
};

export default FirebaseConfigPage;