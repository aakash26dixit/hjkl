import React, { useEffect, useRef, useState, forwardRef } from 'react'
import styles from './betTable.module.css'
import { useRouter } from 'next/router'
import { gsap } from 'gsap'
import '../styles/globals.css'

// import '../'
// import '../app/globals.css';
import io from 'socket.io-client'
import Image from 'next/image'
import { collection, query, where, getDocs, updateDoc, doc, arrayUnion } from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import Modal from '../pages/Modal';
import MediaQueryModal from '../pages/MediaQueryModal'
import { Toaster, toast } from 'react-hot-toast'
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
// import { Doughnut } from 'react-chartjs-2';
// import {
//     Chart as ChartJS,
//     ArcElement, // Import the ArcElement for pie/doughnut charts
//     Tooltip,
//     Legend,
// } from 'chart.js';
import { isAuthenticated } from '../utils/auth';
const ClimbingBoxLoader = dynamic(() => import("react-spinners").then((mod) => mod.ClimbingBoxLoader), { ssr: false });


// ChartJS.register(ArcElement, Tooltip, Legend);


// import Modal from "@material-ui/core/Modal";
// const socket = io.connect("https://rouletteserver.onrender.com")
// const socket = io.connect("https://rouletteserver-4th-march.onrender.com/")
const socket = io.connect("https://rouletteserver-4th-march.onrender.com/")
// const socket = io.connect("http://localhost:3001/")

// const socket = io.connect("https://rouletteserver.onrender.com")
// const socket = io.connect("https://server-3fmn.onrender.com")
// const socket = io.connect("https://serverone-1.onrender.com")
// const socket = io.connect("https://casinoserver-m93w.onrender.com")
// const socket = io.connect("https://rouletteserver-4th-march.onrender.com")
const usersCollectionRef = collection(db, "roulette-users");

var doubleCount = 0;

const Roulette = () => {

    const router = useRouter()
    // const { data } = router.query;
    const { width, height } = useWindowSize();
    const [showConfetti, setShowConfetti] = useState(true);
    const [isStopping, setIsStopping] = useState(false);

    const [showPrompt, setShowPrompt] = useState(false);

    const [outcome, setOutcome] = useState("")

    const [users, setUsers] = useState([]); //dfui

    const [isMenuClicked, setIsMenuClicked] = useState(false)
    const [showBetsModal, setShowBetsModal] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [betHistory, setBetHistory] = useState(false)
    const [changePassword, setChangePassword] = useState(false)
    const [chgPwdCurrentPwd, setChgPwdCurrentPwd] = useState()
    const [chgPwdNewPwd, setChgPwdNewPwd] = useState()
    const [chgPwdConfNewPwd, setChgPwdConfNewPwd] = useState()
    const [depositWithdrawal, setDepositWithdrawal] = useState(false)

    const [betHistoryValues, setBetHistoryValues] = useState([])

    const [betLogs, setBetLogs] = useState([])
    const [lastWin, setLastWin] = useState(0)

    const [oneTwo, setOneTwo] = useState(0)
    const [twoThree, setTwoThree] = useState(0)
    const [fourFive, setFourFive] = useState(0)
    const [fiveSix, setFiveSix] = useState(0)
    const [sevenEight, setSevenEight] = useState(0)
    const [eightNine, setEightNine] = useState(0)
    const [tenEleven, setTenEleven] = useState(0)
    const [elevenTwelve, setElevenTwelve] = useState(0)
    const [thirteenFourteen, setThirteenFourteen] = useState(0)
    const [fourteenFifteen, setFourteenFifteen] = useState(0)
    const [sixteenSeventeen, setSixteenSeventeen] = useState(0)
    const [seventeenEighteen, setSeventeenEighteen] = useState(0)
    const [nineteenTwenty, setNineteenTwenty] = useState(0)
    const [twentyTwentyOne, setTwentyTwentyOne] = useState(0)
    const [twentyTwoTwentyThree, setTwentyTwoTwentyThree] = useState(0)
    const [twentyThreeTwentyFour, setTwentyThreeTwentyFour] = useState(0)
    const [twentyFiveTwentySix, setTwentyFiveTwentySix] = useState(0)
    const [twentySixTwentySeven, setTwentySixTwentySeven] = useState(0)
    const [twentyEightTwentyNine, setTwentyEightTwentyNine] = useState(0)
    const [twentyNineThirty, setTwentyNineThirty] = useState(0)
    const [thirtyOneThirtyTwo, setThirtyOneThirtyTwo] = useState(0)
    const [thirtyTwoThirtyThree, setThirtyTwoThirtyThree] = useState(0)
    const [thirtyFourThirtyFive, setthirtyFourThirtyFive] = useState(0)
    const [thirtyFiveThirtySix, setThirtyFiveThirtySix] = useState(0)
    var [secondsLeft, setSecondsLeft] = useState(20)

    const [changePasswordPossibilities, setChangePasswordPossibilities] = useState('')


    const [firstFour, setFirstFour] = useState(0)
    const [secondFour, setSecondFour] = useState(0)
    const [thirdFour, setThirdFour] = useState(0)
    const [fourthFour, setFourthFour] = useState(0)
    const [fifthFour, setFifthFour] = useState(0)
    const [sixthFour, setSixthFour] = useState(0)
    const [seventhFour, setSeventhFour] = useState(0)
    const [eighthFour, setEighthFour] = useState(0)
    const [ninthFour, setNinthFour] = useState(0)
    const [tenthFour, setTenthFour] = useState(0)
    const [eleventhFour, setEleventhFour] = useState(0)
    const [twelfthFour, setTwelfthFour] = useState(0)
    const [thirteenthFour, setThirteenthFour] = useState(0)
    const [fourteenthFour, setFourteenthFour] = useState(0)
    const [fifteenthFour, setFifteenthFour] = useState(0)
    const [sixteenthFour, setSixteenthFour] = useState(0)
    const [seventeenthFour, setSeventeenthFour] = useState(0)
    const [eighteenthFour, setEighteenthFour] = useState(0)
    const [nineteenthFour, setNineteenthFour] = useState(0)
    const [twentiethFour, setTwentiethFour] = useState(0)
    const [twentyFirstFour, setTwentyFirstFour] = useState(0)
    const [twentySecondFour, setTwentySecondFour] = useState(0)
    const [firstSix, setFirstSix] = useState(0)
    const [secondSix, setSecondSix] = useState(0)
    const [thirdSix, setThirdSix] = useState(0)
    const [fourthSix, setFourthSix] = useState(0)
    const [fifthSix, setFifthSix] = useState(0)
    const [sixthSix, setSixthSix] = useState(0)
    const [seventhSix, setSeventhSix] = useState(0)
    const [eighthSix, setEighthSix] = useState(0)
    const [ninthSix, setNinthSix] = useState(0)
    const [tenthSix, setTenthSix] = useState(0)
    const [eleventhSix, setEleventhSix] = useState(0)

    const [firstThree, setFirstThree] = useState(0)
    const [secondThree, setSecondThree] = useState(0)
    const [thirdThree, setThirdThree] = useState(0)
    const [fourthThree, setFourthThree] = useState(0)
    const [fifthThree, setFifthThree] = useState(0)
    const [sixthThree, setSixthThree] = useState(0)
    const [seventhThree, setSeventhThree] = useState(0)
    const [eighthThree, setEighthThree] = useState(0)
    const [ninthThree, setNinthThree] = useState(0)
    const [tenthThree, setTenthThree] = useState(0)
    const [eleventhThree, setEleventhThree] = useState(0)
    const [twelfthThree, setTwelfthThree] = useState(0)
    const [thirteenthThree, setThirteenthThree] = useState(0)
    const [fourteenthThree, setFourteenthThree] = useState(0)
    const [fifteenthThree, setFifteenthThree] = useState(0)

    const [val0, setVal0] = useState(0)
    const [val1, setVal1] = useState(0)
    const [val2, setVal2] = useState(0)
    const [val3, setVal3] = useState(0)
    const [val4, setVal4] = useState(0)
    const [val5, setVal5] = useState(0)
    const [val6, setVal6] = useState(0)
    const [val7, setVal7] = useState(0)
    const [val8, setVal8] = useState(0)
    const [val9, setVal9] = useState(0)
    const [val10, setVal10] = useState(0)
    const [val11, setVal11] = useState(0)
    const [val12, setVal12] = useState(0)
    const [val13, setVal13] = useState(0)
    const [val14, setVal14] = useState(0)
    const [val15, setVal15] = useState(0)
    const [val16, setVal16] = useState(0)
    const [val17, setVal17] = useState(0)
    const [val18, setVal18] = useState(0)
    const [val19, setVal19] = useState(0)
    const [val20, setVal20] = useState(0)
    const [val21, setVal21] = useState(0)
    const [val22, setVal22] = useState(0)
    const [val23, setVal23] = useState(0)
    const [val24, setVal24] = useState(0)
    const [val25, setVal25] = useState(0)
    const [val26, setVal26] = useState(0)
    const [val27, setVal27] = useState(0)
    const [val28, setVal28] = useState(0)
    const [val29, setVal29] = useState(0)
    const [val30, setVal30] = useState(0)
    const [val31, setVal31] = useState(0)
    const [val32, setVal32] = useState(0)
    const [val33, setVal33] = useState(0)
    const [val34, setVal34] = useState(0)
    const [val35, setVal35] = useState(0)
    const [val36, setVal36] = useState(0)

    const [first18, setFirst18] = useState(0)
    const [last18, setLast18] = useState(0)
    const [first12, setFirst12] = useState(0)
    const [mid12, setMid12] = useState(0)
    const [last12, setLast12] = useState(0)
    const [even, setEven] = useState(0)
    const [odd, setOdd] = useState(0)
    const [red, setRed] = useState(0)
    const [black, setBlack] = useState(0)
    const [col1, setCol1] = useState(0)
    const [col2, setCol2] = useState(0)
    const [col3, setCol3] = useState(0)
    const [zeroOne, setzeroOne] = useState(0)
    const [zeroTwo, setzeroTwo] = useState(0)
    const [zeroThree, setzeroThree] = useState(0)
    const [oneFour, setoneFour] = useState(0)
    const [twoFive, settwoFive] = useState(0)
    const [threeSix, setthreeSix] = useState(0)
    const [fourSeven, setfourSeven] = useState(0)
    const [fiveEight, setfiveEight] = useState(0)
    const [sixNine, setsixNine] = useState(0)
    const [sevenTen, setsevenTen] = useState(0)
    const [eightEleven, seteightEleven] = useState(0)
    const [nineTwelve, setnineTwelve] = useState(0)
    const [tenThirteen, settenThirteen] = useState(0)
    const [elevenFourteen, setelevenFourteen] = useState(0)
    const [twelveFifteen, settwelveFifteen] = useState(0)
    const [thirteenSixteen, setthirteenSixteen] = useState(0)
    const [fourteenSeventeen, setfourteenSeventeen] = useState(0)
    const [fifteenEighteen, setfifteenEighteen] = useState(0)
    const [sixteenNineteen, setsixteenNineteen] = useState(0)
    const [seventeenTwenty, setseventeenTwenty] = useState(0)
    const [eighteenTwentyOne, seteighteenTwentyOne] = useState(0)
    const [nineteenTwentyTwo, setnineteenTwentyTwo] = useState(0)
    const [twentyTwentyThree, settwentyTwentyThree] = useState(0)
    const [twentyOneTwentyFour, settwentyOneTwentyFour] = useState(0)
    const [twentyTwoTwentyFive, settwentyTwoTwentyFive] = useState(0)
    const [twentyThreeTwentySix, settwentyThreeTwentySix] = useState(0)
    const [twentyFourTwentySeven, settwentyFourTwentySeven] = useState(0)
    const [twentyFiveTwentyEight, settwentyFiveTwentyEight] = useState(0)
    const [twentySixTwentyNine, settwentySixTwentyNine] = useState(0)
    const [twentySevenThirty, settwentySevenThirty] = useState(0)
    const [twentyEightThirtyOne, settwentyEightThirtyOne] = useState(0)
    const [twentyNineThirtyTwo, settwentyNineThirtyTwo] = useState(0)
    const [thirtyThirtyThree, setthirtyThirtyThree] = useState(0)
    const [thirtyOneThirtyFour, setthirtyOneThirtyFour] = useState(0)
    const [thirtyTwoThirtyFive, setthirtyTwoThirtyFive] = useState(0)
    const [thirtyThreeThirtySix, setthirtyThreeThirtySix] = useState(0)

    const [zeroChips, setzeroChips] = useState([])
    const [oneChips, setoneChips] = useState([])
    const [twoChips, settwoChips] = useState([])
    const [threeChips, setthreeChips] = useState([])
    const [fourChips, setfourChips] = useState([])
    const [fiveChips, setfiveChips] = useState([])
    const [sixChips, setsixChips] = useState([])
    const [sevenChips, setsevenChips] = useState([])
    const [eightChips, seteightChips] = useState([])
    const [nineChips, setnineChips] = useState([])
    const [tenChips, settenChips] = useState([])
    const [elevenChips, setelevenChips] = useState([])
    const [twelveChips, settwelveChips] = useState([])
    const [thirteenChips, setthirteenChips] = useState([])
    const [fourteenChips, setfourteenChips] = useState([])
    const [fifteenChips, setfifteenChips] = useState([])
    const [sixteenChips, setsixteenChips] = useState([])
    const [seventeenChips, setseventeenChips] = useState([])
    const [eighteenChips, seteighteenChips] = useState([])
    const [nineteenChips, setnineteenChips] = useState([])
    const [twentyChips, settwentyChips] = useState([])
    const [twentyOneChips, settwentyOneChips] = useState([])
    const [twentyTwoChips, settwentyTwoChips] = useState([])
    const [twentyThreeChips, settwentyThreeChips] = useState([])
    const [twentyFourChips, settwentyFourChips] = useState([])
    const [twentyFiveChips, settwentyFiveChips] = useState([])
    const [twentySixChips, settwentySixChips] = useState([])
    const [twentySevenChips, settwentySevenChips] = useState([])
    const [twentyEightChips, settwentyEightChips] = useState([])
    const [twentyNineChips, settwentyNineChips] = useState([])
    const [thirtyChips, setthirtyChips] = useState([])
    const [thirtyOneChips, setthirtyOneChips] = useState([])
    const [thirtyTwoChips, setthirtyTwoChips] = useState([])
    const [thirtyThreeChips, setthirtyThreeChips] = useState([])
    const [thirtyFourChips, setthirtyFourChips] = useState([])
    const [thirtyFiveChips, setthirtyFiveChips] = useState([])
    const [thirtySixChips, setthirtySixChips] = useState([])

    const [firstFourChips, setFirstFourChips] = useState([])
    const [secondFourChips, setSecondFourChips] = useState([])
    const [thirdFourChips, setThirdFourChips] = useState([])
    const [fourthFourChips, setFourthFourChips] = useState([])
    const [fifthFourChips, setFifthFourChips] = useState([])
    const [sixthFourChips, setSixthFourChips] = useState([])
    const [seventhFourChips, setSeventhFourChips] = useState([])
    const [eighthFourChips, setEighthFourChips] = useState([])
    const [ninthFourChips, setNinthFourChips] = useState([])
    const [tenthFourChips, setTenthFourChips] = useState([])
    const [eleventhFourChips, setEleventhFourChips] = useState([])
    const [twelfthFourChips, setTwelfthFourChips] = useState([])
    const [thirteenthFourChips, setThirteenthFourChips] = useState([])
    const [fourteenthFourChips, setFourteenthFourChips] = useState([])
    const [fifteenthFourChips, setFifteenthFourChips] = useState([])
    const [sixteenthFourChips, setSixteenthFourChips] = useState([])
    const [seventeenthFourChips, setSeventeenthFourChips] = useState([])
    const [eighteenthFourChips, setEighteenthFourChips] = useState([])
    const [nineteenthFourChips, setNineteenthFourChips] = useState([])
    const [twentiethFourChips, setTwentiethFourChips] = useState([])
    const [twentyFirstFourChips, setTwentyFirstFourChips] = useState([])
    const [twentySecondFourChips, setTwentySecondFourChips] = useState([])

    const [firstSixChips, setFirstSixChips] = useState([])
    const [secondSixChips, setSecondSixChips] = useState([])
    const [thirdSixChips, setThirdSixChips] = useState([])
    const [fourthSixChips, setFourthSixChips] = useState([])
    const [fifthSixChips, setFifthSixChips] = useState([])
    const [sixthSixChips, setSixthSixChips] = useState([])
    const [seventhSixChips, setSeventhSixChips] = useState([])
    const [eighthSixChips, setEighthSixChips] = useState([])
    const [ninthSixChips, setNinthSixChips] = useState([])
    const [tenthSixChips, setTenthSixChips] = useState([])
    const [eleventhSixChips, setEleventhSixChips] = useState([])
    const [firstThreeChips, setFirstThreeChips] = useState([])
    const [secondThreeChips, setSecondThreeChips] = useState([])
    const [thirdThreeChips, setThirdThreeChips] = useState([])
    const [fourthThreeChips, setFourthThreeChips] = useState([])
    const [fifthThreeChips, setFifthThreeChips] = useState([])
    const [sixthThreeChips, setSixthThreeChips] = useState([])
    const [seventhThreeChips, setSeventhThreeChips] = useState([])
    const [eighthThreeChips, setEighthThreeChips] = useState([])
    const [ninthThreeChips, setNinthThreeChips] = useState([])
    const [tenthThreeChips, setTenthThreeChips] = useState([])
    const [eleventhThreeChips, setEleventhThreeChips] = useState([])
    const [twelfthThreeChips, setTwelfthThreeChips] = useState([])
    const [thirteenthThreeChips, setThirteenthThreeChips] = useState([])
    const [fourteenthThreeChips, setFourteenthThreeChips] = useState([])
    const [fifteenthThreeChips, setFifteenthThreeChips] = useState([])

    const [first18Chips, setFirst18Chips] = useState([])
    const [last18Chips, setLast18Chips] = useState([])
    const [first12Chips, setFirst12Chips] = useState([])
    const [mid12Chips, setMid12Chips] = useState([])
    const [last12Chips, setLast12Chips] = useState([])
    const [evenChips, setEvenChips] = useState([])
    const [oddChips, setOddChips] = useState([])
    const [redChips, setRedChips] = useState([])
    const [blackChips, setBlackChips] = useState([])
    const [col1Chips, setCol1Chips] = useState([])
    const [col2Chips, setCol2Chips] = useState([])
    const [col3Chips, setCol3Chips] = useState([])
    const [zeroOneChips, setzeroOneChips] = useState([])
    const [zeroTwoChips, setzeroTwoChips] = useState([])
    const [zeroThreeChips, setzeroThreeChips] = useState([])
    const [oneFourChips, setoneFourChips] = useState([])
    const [twoFiveChips, settwoFiveChips] = useState([])
    const [threeSixChips, setthreeSixChips] = useState([])
    const [fourSevenChips, setfourSevenChips] = useState([])
    const [fiveEightChips, setfiveEightChips] = useState([])
    const [sixNineChips, setsixNineChips] = useState([])
    const [sevenTenChips, setsevenTenChips] = useState([])
    const [eightElevenChips, seteightElevenChips] = useState([])
    const [nineTwelveChips, setnineTwelveChips] = useState([])
    const [tenThirteenChips, settenThirteenChips] = useState([])
    const [elevenFourteenChips, setelevenFourteenChips] = useState([])
    const [twelveFifteenChips, settwelveFifteenChips] = useState([])
    const [thirteenSixteenChips, setthirteenSixteenChips] = useState([])
    const [fourteenSeventeenChips, setfourteenSeventeenChips] = useState([])
    const [fifteenEighteenChips, setfifteenEighteenChips] = useState([])
    const [sixteenNineteenChips, setsixteenNineteenChips] = useState([])
    const [seventeenTwentyChips, setseventeenTwentyChips] = useState([])
    const [eighteenTwentyOneChips, seteighteenTwentyOneChips] = useState([])
    const [nineteenTwentyTwoChips, setnineteenTwentyTwoChips] = useState([])
    const [twentyTwentyThreeChips, settwentyTwentyThreeChips] = useState([])
    const [twentyOneTwentyFourChips, settwentyOneTwentyFourChips] = useState([])
    const [twentyTwoTwentyFiveChips, settwentyTwoTwentyFiveChips] = useState([])
    const [twentyThreeTwentySixChips, settwentyThreeTwentySixChips] = useState([])
    const [twentyFourTwentySevenChips, settwentyFourTwentySevenChips] = useState([])
    const [twentyFiveTwentyEightChips, settwentyFiveTwentyEightChips] = useState([])
    const [twentySixTwentyNineChips, settwentySixTwentyNineChips] = useState([])
    const [twentySevenThirtyChips, settwentySevenThirtyChips] = useState([])
    const [twentyEightThirtyOneChips, settwentyEightThirtyOneChips] = useState([])
    const [twentyNineThirtyTwoChips, settwentyNineThirtyTwoChips] = useState([])
    const [thirtyThirtyThreeChips, setthirtyThirtyThreeChips] = useState([])
    const [thirtyOneThirtyFourChips, setthirtyOneThirtyFourChips] = useState([])
    const [thirtyTwoThirtyFiveChips, setthirtyTwoThirtyFiveChips] = useState([])
    const [thirtyThreeThirtySixChips, setthirtyThreeThirtySixChips] = useState([])

    const [oneTwoChips, setOneTwoChips] = useState([])
    const [twoThreeChips, setTwoThreeChips] = useState([])
    const [fourFiveChips, setFourFiveChips] = useState([])
    const [fiveSixChips, setFiveSixChips] = useState([])
    const [sevenEightChips, setSevenEightChips] = useState([])
    const [eightNineChips, setEightNineChips] = useState([])
    const [tenElevenChips, setTenElevenChips] = useState([])
    const [elevenTwelveChips, setElevenTwelveChips] = useState([])
    const [thirteenFourteenChips, setThirteenFourteenChips] = useState([])
    const [fourteenFifteenChips, setFourteenFifteenChips] = useState([])
    const [sixteenSeventeenChips, setSixteenSeventeenChips] = useState([])
    const [seventeenEighteenChips, setSeventeenEighteenChips] = useState([])
    const [nineteenTwentyChips, setNineteenTwentyChips] = useState([])
    const [twentyTwentyOneChips, setTwentyTwentyOneChips] = useState([])
    const [twentyTwoTwentyThreeChips, setTwentyTwoTwentyThreeChips] = useState([])
    const [twentyThreeTwentyFourChips, setTwentyThreeTwentyFourChips] = useState([])
    const [twentyFiveTwentySixChips, setTwentyFiveTwentySixChips] = useState([])
    const [twentySixTwentySevenChips, setTwentySixTwentySevenChips] = useState([])
    const [twentyEightTwentyNineChips, setTwentyEightTwentyNineChips] = useState([])
    const [twentyNineThirtyChips, setTwentyNineThirtyChips] = useState([])
    const [thirtyOneThirtyTwoChips, setThirtyOneThirtyTwoChips] = useState([])
    const [thirtyTwoThirtyThreeChips, setThirtyTwoThirtyThreeChips] = useState([])
    const [thirtyFourThirtyFiveChips, setthirtyFourThirtyFiveChips] = useState([])
    const [thirtyFiveThirtySixChips, setThirtyFiveThirtySixChips] = useState([])

    const [emittedValues, setEmittedValues] = useState([]);

    const [lastFiftyNumbers, setLastFiftyNumbers] = useState([])


    const [amount, setAmount] = useState(0);

    const [initialAmount, setInitialAmount] = useState(amount)

    const [selectedChip, setSelectedChip] = useState(20)

    const [selectedStaticChip, setSelectedStaticChip] = useState(selectedChip)

    const animRef = useRef("")

    const delay = ms => new Promise(res => setTimeout(res, ms));

    var [bets, setBets] = useState([])

    const chipImagePaths = {
        20: '/brown_coin.png',
        50: '/coin_s_2.jpg',
        100: '/orange_coin.png',
        500: '/coin3.png',
        default: '/coin4.png',
    };

    const formatNumber = (num) => {
        if (num >= 10000) {
            return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K'; // Converts to thousands
        }
        return num;
    };

    function formatNumberWithCommas(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const chipSetters = [
        setzeroChips, setoneChips, settwoChips, setthreeChips, setfourChips,
        setfiveChips, setsixChips, setsevenChips, seteightChips, setnineChips,
        settenChips, setelevenChips, settwelveChips, setthirteenChips, setfourteenChips,
        setfifteenChips, setsixteenChips, setseventeenChips, seteighteenChips, setnineteenChips,
        settwentyChips, settwentyOneChips, settwentyTwoChips, settwentyThreeChips, settwentyFourChips,
        settwentyFiveChips, settwentySixChips, settwentySevenChips, settwentyEightChips, settwentyNineChips,
        setthirtyChips, setthirtyOneChips, setthirtyTwoChips, setthirtyThreeChips, setthirtyFourChips,
        setthirtyFiveChips, setthirtySixChips
    ];


    // ball content
    const numberDisplay = useRef("")
    const plDisplay = useRef("")
    const rotateBallHold = useRef("")
    const menuRef = useRef("")
    const tableRef = useRef("")
    const hideLinksRef = useRef()
    const lastWinRef = useRef()

    //number bet utils
    const zeroRef = useRef("")
    const oneRef = useRef("")
    const twoRef = useRef("")
    const threeRef = useRef("")
    const fourRef = useRef("")
    const fiveRef = useRef("")
    const sixRef = useRef("")
    const sevenRef = useRef("")
    const eightRef = useRef("")
    const nineRef = useRef("")
    const tenRef = useRef("")
    const elevenRef = useRef("")
    const twelveRef = useRef("")
    const thirteenRef = useRef("")
    const fourteenRef = useRef("")
    const fifteenRef = useRef("")
    const sixteenRef = useRef("")
    const seventeenRef = useRef("")
    const eighteenRef = useRef("")
    const nineteenRef = useRef("")
    const twentyRef = useRef("")
    const twentyoneRef = useRef("")
    const twentytwoRef = useRef("")
    const twentythreeRef = useRef("")
    const twentyfourRef = useRef("")
    const twentyfiveRef = useRef("")
    const twentysixRef = useRef("")
    const twentysevenRef = useRef("")
    const twentyeightRef = useRef("")
    const twentynineRef = useRef("")
    const thirtyRef = useRef("")
    const thirtyoneRef = useRef("")
    const thirtytwoRef = useRef("")
    const thirtythreeRef = useRef("")
    const thirtyfourRef = useRef("")
    const thirtyfiveRef = useRef("")
    const thirtysixRef = useRef("")

    const first12Ref = useRef("")
    const mid12Ref = useRef("")
    const last12Ref = useRef("")
    const first18Ref = useRef("")
    const last18Ref = useRef("")
    const redRef = useRef("")
    const blackRef = useRef("")
    const evennRef = useRef("")
    const oddRef = useRef("")
    const col1Ref = useRef("")
    const col2Ref = useRef("")
    const col3Ref = useRef("")


    const insideMid12Ref = useRef("")//Here is the dimensions of inner divs
    // Double number bets...
    const oneTwoRef = useRef("")
    const twoThreeRef = useRef("")
    const fourFiveRef = useRef("")
    const fiveSixRef = useRef("")
    const sevenEightRef = useRef("")
    const eightNineRef = useRef("")
    const tenElevenRef = useRef("")
    const elevenTwelveRef = useRef("")
    const thirteenFourteenRef = useRef("")
    const fourteenFifteenRef = useRef("")
    const sixteenSeventeenRef = useRef("")
    const seventeenEighteenRef = useRef("")
    const nineteenTwentyRef = useRef("")
    const twentyTwentyOneRef = useRef("")
    const twentyTwoTwentyThreeRef = useRef("")
    const twentyThreeTwentyFourRef = useRef("")
    const twentyFiveTwentySixRef = useRef("")
    const twentySixTwentySevenRef = useRef("")
    const twentyEightTwentyNineRef = useRef("")
    const twentyNineThirtyRef = useRef("")
    const thirtyOneThirtyTwoRef = useRef("")
    const thirtyTwoThirtyThreeRef = useRef("")
    const thirtyFourThirtyFiveRef = useRef("")
    const thirtyFiveThirtySixRef = useRef("")

    const zeroOneRef = useRef("")
    const zeroTwoRef = useRef("")
    const zeroThreeRef = useRef("")
    const oneFourRef = useRef("")
    const twoFiveRef = useRef("")
    const threeSixRef = useRef("")
    const fourSevenRef = useRef("")
    const fiveEightRef = useRef("")
    const sixNineRef = useRef("")
    const sevenTenRef = useRef("")
    const eightElevenRef = useRef("")
    const nineTwelveRef = useRef("")
    const tenThirteenRef = useRef("")
    const elevenFourteenRef = useRef("")
    const twelveFifteenRef = useRef("")
    const thirteenSixteenRef = useRef("")
    const fourteenSeventeenRef = useRef("")
    const fifteenEighteenRef = useRef("")
    const sixteenNineteenRef = useRef("")
    const seventeenTwentyRef = useRef("")
    const eighteenTwentyOneRef = useRef("")
    const nineteenTwentyTwoRef = useRef("")
    const twentyTwentyThreeRef = useRef("")
    const twentyOneTwentyFourRef = useRef("")
    const twentyTwoTwentyFiveRef = useRef("")
    const twentyThreeTwentySixRef = useRef("")
    const twentyFourTwentySevenRef = useRef("")
    const twentyFiveTwentyEightRef = useRef("")
    const twentySixTwentyNineRef = useRef("")
    const twentySevenThirtyRef = useRef("")
    const twentyEightThirtyOneRef = useRef("")
    const twentyNineThirtyTwoRef = useRef("")
    const thirtyThirtyThreeRef = useRef("")
    const thirtyOneThirtyFourRef = useRef("")
    const thirtyTwoThirtyFiveRef = useRef("")
    const thirtyThreeThirtySixRef = useRef("")

    const firstFourRef = useRef("")
    const secondFourRef = useRef("")
    const thirdFourRef = useRef("")
    const fourthFourRef = useRef("")
    const fifthFourRef = useRef("")
    const sixthFourRef = useRef("")
    const seventhFourRef = useRef("")
    const eighthFourRef = useRef("")
    const ninthFourRef = useRef("")
    const tenthFourRef = useRef("")
    const eleventhFourRef = useRef("")
    const twelfthFourRef = useRef("")
    const thirteenthFourRef = useRef("")
    const fourteenthFourRef = useRef("")
    const fifteenthFourRef = useRef("")
    const sixteenthFourRef = useRef("")
    const seventeenthFourRef = useRef("")
    const eighteenthFourRef = useRef("")
    const nineteenthFourRef = useRef("")
    const twentiethFourRef = useRef("")
    const twentyFirstFourRef = useRef("")
    const twentySecondFourRef = useRef("")
    const firstSixRef = useRef("")
    const secondSixRef = useRef("")
    const thirdSixRef = useRef("")
    const fourthSixRef = useRef("")
    const fifthSixRef = useRef("")
    const sixthSixRef = useRef("")
    const seventhSixRef = useRef("")
    const eighthSixRef = useRef("")
    const ninthSixRef = useRef("")
    const tenthSixRef = useRef("")
    const eleventhSixRef = useRef("")

    const firstThreeRef = useRef("")
    const secondThreeRef = useRef("")
    const thirdThreeRef = useRef("")
    const fourthThreeRef = useRef("")
    const fifthThreeRef = useRef("")
    const sixthThreeRef = useRef("")
    const seventhThreeRef = useRef("")
    const eighthThreeRef = useRef("")
    const ninthThreeRef = useRef("")
    const tenthThreeRef = useRef("")
    const eleventhThreeRef = useRef("")
    const twelfthThreeRef = useRef("")
    const thirteenthThreeRef = useRef("")
    const fourteenthThreeRef = useRef("")
    const fifteenthThreeRef = useRef("")

    //chips section

    var [isChipClicked, setIsChipClicked] = useState(true);
    const selectedStaticChipRef = useRef("")
    const twentyChip = useRef("")
    const fiftyChip = useRef("")
    const hundredChip = useRef("")
    const twoHundredChip = useRef("")
    const fiveHundredChip = useRef("")
    const thousandChip = useRef("")
    const tenThousandChip = useRef("")
    const fiftyThousandChip = useRef("")

    const clockRef = useRef("")
    const doughnutRef = useRef("")
    const [isAuthChecked, setIsAuthChecked] = useState(true);
    const [isLoading, setIsLoading] = useState(false)
    var t = true;

    const duration = 5000; // Duration in milliseconds
    const fadeDuration = 1000; // Time to gradually stop confetti (ms)

    var [T2, setT2] = useState(true)

    useEffect(() => {
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
        }, 1000)

    }, [])

    const incrementBy = (val) => {
        setSelectedChip(val);
        setSelectedStaticChip(val)
        if (val == 20) {

            twentyChip.current.style.zIndex = '100'
            fiftyChip.current.style.zIndex = '0'
            hundredChip.current.style.zIndex = '0'
            fiveHundredChip.current.style.zIndex = '0'
            thousandChip.current.style.zIndex = '0'
            selectedStaticChipRef.current.style.backgroundImage = 'url("/red_brown_coin.png")';



        } else if (val == 50) {
            twentyChip.current.style.zIndex = '0'
            fiftyChip.current.style.zIndex = '100'
            hundredChip.current.style.zIndex = '0'
            fiveHundredChip.current.style.zIndex = '0'
            thousandChip.current.style.zIndex = '0'
            selectedStaticChipRef.current.style.backgroundImage = 'url("/coin_s_2.jpg")';

        } else if (val == 100) {
            twentyChip.current.style.zIndex = '0'
            fiftyChip.current.style.zIndex = '0'
            hundredChip.current.style.zIndex = '100'
            fiveHundredChip.current.style.zIndex = '0'
            thousandChip.current.style.zIndex = '0'
            selectedStaticChipRef.current.style.backgroundImage = 'url("/orange_coin.png")';

        } else if (val == 500) {
            twentyChip.current.style.zIndex = '0'
            fiftyChip.current.style.zIndex = '0'
            hundredChip.current.style.zIndex = '0'
            fiveHundredChip.current.style.zIndex = '500'
            thousandChip.current.style.zIndex = '0'
            selectedStaticChipRef.current.style.backgroundImage = 'url("/coin3.png")';

        } else if (val == 1000) {
            twentyChip.current.style.zIndex = '0'
            fiftyChip.current.style.zIndex = '0'
            hundredChip.current.style.zIndex = '0'
            fiveHundredChip.current.style.zIndex = '0'
            thousandChip.current.style.zIndex = '100'
            selectedStaticChipRef.current.style.backgroundImage = 'url("/coin4.png")';

        }

    }

    const [confettiCount, setConfettiCount] = useState(-1);

    const closeModal = () => setShowModal(false)

    const getRecord = async () => {
        const data = localStorage.getItem('username') || '';

        const q = query(usersCollectionRef, where("username", "==", data));

        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            setAmount(doc.data().amount)
            setInitialAmount(amount)
        });
    }

    useEffect(() => {
        if (isAuthChecked) {
            if (lastWin > 0) {
                toast.success(`You win ${lastWin}`);

                triggerConfetti()
            }
        }
    }, [lastWin])

    useEffect(() => {
        if (isAuthChecked) {
            socket.on("data", async (arg) => {

                if (arg != null) {
                    setT2(false)

                    var i = arg.number;

                    setOutcome(i);
                    rotateBallHold.current.style.transition = "6s ease-in-out"
                    animRef.current.style.transform = "translate(280%,-500%) scale(4.0)"
                    animRef.current.style.zIndex = "100"
                    // animRef.current.style.height = "10rem"
                    // animRef.current.style.width = "12rem"
                    rotateBallHold.current.style.transform = "rotate(0deg)"

                    if (i == 0) {
                        rotateBallHold.current.style.transform = "rotate(-3727deg)"
                    } else if (i == 32) {
                        rotateBallHold.current.style.transform = "rotate(-3717deg)"
                    } else if (i == 15) {
                        rotateBallHold.current.style.transform = "rotate(-3708deg)"
                    } else if (i == 19) {
                        rotateBallHold.current.style.transform = `rotate(-3698deg)`
                    } else if (i == 4) {
                        rotateBallHold.current.style.transform = `rotate(-3688deg)`
                    } else if (i == 21) {
                        rotateBallHold.current.style.transform = `rotate(-3678deg)`
                    } else if (i == 2) {
                        rotateBallHold.current.style.transform = `rotate(-3668deg)`
                    } else if (i == 25) {
                        rotateBallHold.current.style.transform = `rotate(-3658deg)`
                    } else if (i == 17) {
                        rotateBallHold.current.style.transform = `rotate(-3649deg)`
                    } else if (i == 34) {
                        rotateBallHold.current.style.transform = "rotate(-3640deg)"
                    } else if (i == 6) {
                        rotateBallHold.current.style.transform = "rotate(-3630deg)"
                    } else if (i == 27) {
                        rotateBallHold.current.style.transform = "rotate(-3620deg)"
                    } else if (i == 13) {
                        rotateBallHold.current.style.transform = "rotate(-3610deg)"
                    } else if (i == 36) {
                        rotateBallHold.current.style.transform = "rotate(-3600deg)"
                    } else if (i == 11) {
                        rotateBallHold.current.style.transform = "rotate(-3590deg)"
                    } else if (i == 30) {
                        rotateBallHold.current.style.transform = "rotate(-3580deg)"
                    } else if (i == 8) {
                        rotateBallHold.current.style.transform = "rotate(-3571deg)"
                    } else if (i == 23) {
                        rotateBallHold.current.style.transform = "rotate(-3562deg)"
                    } else if (i == 10) {
                        rotateBallHold.current.style.transform = "rotate(-3553deg)"
                    } else if (i == 5) {
                        rotateBallHold.current.style.transform = "rotate(-3544deg)"
                    } else if (i == 24) {
                        rotateBallHold.current.style.transform = "rotate(-3532deg)"
                    } else if (i == 16) {
                        rotateBallHold.current.style.transform = "rotate(-3520deg)"
                    } else if (i == 33) {
                        rotateBallHold.current.style.transform = "rotate(-3512deg)"
                    } else if (i == 1) {
                        rotateBallHold.current.style.transform = "rotate(-3504deg)"
                    } else if (i == 20) {
                        rotateBallHold.current.style.transform = "rotate(-3493deg)"
                    } else if (i == 14) {
                        rotateBallHold.current.style.transform = "rotate(-3482deg)"
                    } else if (i == 31) {
                        rotateBallHold.current.style.transform = "rotate(-3473deg)"
                    } else if (i == 9) {
                        rotateBallHold.current.style.transform = "rotate(-3464deg)"
                    } else if (i == 22) {
                        rotateBallHold.current.style.transform = "rotate(-3454deg)"
                    } else if (i == 18) {
                        rotateBallHold.current.style.transform = "rotate(-3444deg)"
                    } else if (i == 29) {
                        rotateBallHold.current.style.transform = "rotate(-3434deg)"
                    } else if (i == 7) {
                        rotateBallHold.current.style.transform = "rotate(-3424deg)"
                    } else if (i == 28) {
                        rotateBallHold.current.style.transform = "rotate(-3414deg)"
                    } else if (i == 12) {
                        rotateBallHold.current.style.transform = "rotate(-3404deg)"
                    } else if (i == 35) {
                        rotateBallHold.current.style.transform = "rotate(-3396deg)"
                    } else if (i == 3) {
                        rotateBallHold.current.style.transform = "rotate(-3386deg)"
                    } else if (i == 26) {
                        rotateBallHold.current.style.transform = "rotate(-3376deg)"
                    }

                    await delay(10000)

                    rotateBallHold.current.style.transition = "0s"
                    rotateBallHold.current.style.transform = "rotate(0deg)"
                    animRef.current.style.transform = "translate(0%,0%) scale(-1.2)"
                    // animRef.current.style.height = "48px"
                    // animRef.current.style.width = "60px"

                    setEmittedValues(arg.emittedValues.slice(0, 200))

                    setT2(true)

                    setVal0(0)
                    setVal1(0)
                    setVal2(0)
                    setVal3(0)
                    setVal4(0)
                    setVal5(0)
                    setVal6(0)
                    setVal7(0)
                    setVal8(0)
                    setVal9(0)
                    setVal10(0)
                    setVal11(0)
                    setVal12(0)
                    setVal13(0)
                    setVal14(0)
                    setVal15(0)
                    setVal16(0)
                    setVal17(0)
                    setVal18(0)
                    setVal19(0)
                    setVal20(0)
                    setVal21(0)
                    setVal22(0)
                    setVal23(0)
                    setVal24(0)
                    setVal25(0)
                    setVal26(0)
                    setVal27(0)
                    setVal28(0)
                    setVal29(0)
                    setVal30(0)
                    setVal31(0)
                    setVal32(0)
                    setVal33(0)
                    setVal34(0)
                    setVal35(0)
                    setVal36(0)
                    setFirst18(0)
                    setLast18(0)
                    setFirst12(0)
                    setMid12(0)
                    setLast12(0)
                    setEven(0)
                    setOdd(0)
                    setRed(0)
                    setBlack(0)
                    setCol1(0)
                    setCol2(0)
                    setCol3(0)
                    setzeroOne(0)
                    setzeroTwo(0)
                    setzeroThree(0)
                    setoneFour(0)
                    settwoFive(0)
                    setthreeSix(0)
                    setfourSeven(0)
                    setfiveEight(0)
                    setsixNine(0)
                    setsevenTen(0)
                    seteightEleven(0)
                    setnineTwelve(0)
                    settenThirteen(0)
                    setelevenFourteen(0)
                    settwelveFifteen(0)
                    setthirteenSixteen(0)
                    setfourteenSeventeen(0)
                    setfifteenEighteen(0)
                    setsixteenNineteen(0)
                    setseventeenTwenty(0)
                    seteighteenTwentyOne(0)
                    setnineteenTwentyTwo(0)
                    settwentyTwentyThree(0)
                    settwentyOneTwentyFour(0)
                    settwentyTwoTwentyFive(0)
                    settwentyThreeTwentySix(0)
                    settwentyFourTwentySeven(0)
                    settwentyFiveTwentyEight(0)
                    settwentySixTwentyNine(0)
                    settwentySevenThirty(0)
                    settwentyEightThirtyOne(0)
                    settwentyNineThirtyTwo(0)
                    setthirtyThirtyThree(0)
                    setthirtyOneThirtyFour(0)
                    setthirtyTwoThirtyFive(0)
                    setthirtyThreeThirtySix(0)
                    doubleCount = 0;


                    // firstThreeRef.current.style.display = "none"


                    zeroRef.current.childNodes[1].style.display = "none"
                    zeroRef.current.childNodes[0].style.display = "block"
                    oneRef.current.childNodes[1].style.display = "none"
                    oneRef.current.childNodes[0].style.display = "block"
                    twoRef.current.childNodes[1].style.display = "none"
                    twoRef.current.childNodes[0].style.display = "block"
                    threeRef.current.childNodes[1].style.display = "none"
                    threeRef.current.childNodes[0].style.display = "block"
                    fourRef.current.childNodes[1].style.display = "none"
                    fourRef.current.childNodes[0].style.display = "block"
                    fiveRef.current.childNodes[1].style.display = "none"
                    fiveRef.current.childNodes[0].style.display = "block"
                    sixRef.current.childNodes[1].style.display = "none"
                    sixRef.current.childNodes[0].style.display = "block"
                    sevenRef.current.childNodes[1].style.display = "none"
                    sevenRef.current.childNodes[0].style.display = "block"
                    eightRef.current.childNodes[1].style.display = "none"
                    eightRef.current.childNodes[0].style.display = "block"
                    nineRef.current.childNodes[1].style.display = "none"
                    nineRef.current.childNodes[0].style.display = "block"
                    tenRef.current.childNodes[1].style.display = "none"
                    tenRef.current.childNodes[0].style.display = "block"
                    elevenRef.current.childNodes[1].style.display = "none"
                    elevenRef.current.childNodes[0].style.display = "block"
                    twelveRef.current.childNodes[1].style.display = "none"
                    twelveRef.current.childNodes[0].style.display = "block"
                    thirteenRef.current.childNodes[1].style.display = "none"
                    thirteenRef.current.childNodes[0].style.display = "block"
                    fourteenRef.current.childNodes[1].style.display = "none"
                    fourteenRef.current.childNodes[0].style.display = "block"
                    fifteenRef.current.childNodes[1].style.display = "none"
                    fifteenRef.current.childNodes[0].style.display = "block"
                    sixteenRef.current.childNodes[1].style.display = "none"
                    sixteenRef.current.childNodes[0].style.display = "block"
                    seventeenRef.current.childNodes[1].style.display = "none"
                    seventeenRef.current.childNodes[0].style.display = "block"
                    eighteenRef.current.childNodes[1].style.display = "none"
                    eighteenRef.current.childNodes[0].style.display = "block"
                    nineteenRef.current.childNodes[1].style.display = "none"
                    nineteenRef.current.childNodes[0].style.display = "block"
                    twentyRef.current.childNodes[1].style.display = "none"
                    twentyRef.current.childNodes[0].style.display = "block"
                    twentyoneRef.current.childNodes[1].style.display = "none"
                    twentyoneRef.current.childNodes[0].style.display = "block"
                    twentytwoRef.current.childNodes[1].style.display = "none"
                    twentytwoRef.current.childNodes[0].style.display = "block"
                    twentythreeRef.current.childNodes[1].style.display = "none"
                    twentythreeRef.current.childNodes[0].style.display = "block"
                    twentyfourRef.current.childNodes[1].style.display = "none"
                    twentyfourRef.current.childNodes[0].style.display = "block"
                    twentyfiveRef.current.childNodes[1].style.display = "none"
                    twentyfiveRef.current.childNodes[0].style.display = "block"
                    twentysixRef.current.childNodes[1].style.display = "none"
                    twentysixRef.current.childNodes[0].style.display = "block"
                    twentysevenRef.current.childNodes[1].style.display = "none"
                    twentysevenRef.current.childNodes[0].style.display = "block"
                    twentyeightRef.current.childNodes[1].style.display = "none"
                    twentyeightRef.current.childNodes[0].style.display = "block"
                    twentynineRef.current.childNodes[1].style.display = "none"
                    twentynineRef.current.childNodes[0].style.display = "block"
                    thirtyRef.current.childNodes[1].style.display = "none"
                    thirtyRef.current.childNodes[0].style.display = "block"
                    thirtyoneRef.current.childNodes[1].style.display = "none"
                    thirtyoneRef.current.childNodes[0].style.display = "block"
                    thirtytwoRef.current.childNodes[1].style.display = "none"
                    thirtytwoRef.current.childNodes[0].style.display = "block"
                    thirtythreeRef.current.childNodes[1].style.display = "none"
                    thirtythreeRef.current.childNodes[0].style.display = "block"
                    thirtyfourRef.current.childNodes[1].style.display = "none"
                    thirtyfourRef.current.childNodes[0].style.display = "block"
                    thirtyfiveRef.current.childNodes[1].style.display = "none"
                    thirtyfiveRef.current.childNodes[0].style.display = "block"
                    thirtysixRef.current.childNodes[1].style.display = "none"
                    thirtysixRef.current.childNodes[0].style.display = "block"


                    first12Ref.current.childNodes[0].style.display = "block"
                    first12Ref.current.childNodes[1].style.display = "none"
                    mid12Ref.current.childNodes[0].style.display = "block"
                    mid12Ref.current.childNodes[1].style.display = "none"
                    last12Ref.current.childNodes[0].style.display = "block"
                    last12Ref.current.childNodes[1].style.display = "none"
                    first18Ref.current.childNodes[0].style.display = "block"
                    first18Ref.current.childNodes[1].style.display = "none"
                    last18Ref.current.childNodes[0].style.display = "block"
                    last18Ref.current.childNodes[1].style.display = "none"
                    redRef.current.childNodes[0].style.display = "block"
                    redRef.current.childNodes[1].style.display = "none"
                    blackRef.current.childNodes[0].style.display = "block"
                    blackRef.current.childNodes[1].style.display = "none"

                    evennRef.current.childNodes[0].style.display = "block"
                    evennRef.current.childNodes[1].style.display = "none"

                    oddRef.current.childNodes[0].style.display = "block"
                    oddRef.current.childNodes[1].style.display = "none"
                    col1Ref.current.childNodes[0].style.display = "block"
                    col1Ref.current.childNodes[1].style.display = "none"
                    col2Ref.current.childNodes[0].style.display = "block"
                    col2Ref.current.childNodes[1].style.display = "none"
                    col3Ref.current.childNodes[0].style.display = "block"
                    col3Ref.current.childNodes[1].style.display = "none"

                    // oneTwoRef.current.style.display = "none"

                    // gsap.to(
                    //     oneTwoRef.current,
                    //     { x: -400, y: -400, display: "hidden", scale: 0, duration: 2, ease: 'power3.in' }
                    // );

                    // oneTwoRef.current.style.display 
                    setOneTwoChips([])
                    setzeroOneChips([])
                    setzeroTwoChips([])
                    setzeroThreeChips([])
                    setoneFourChips([])
                    settwoFiveChips([])
                    setthreeSixChips([])
                    setfourSevenChips([])
                    setfiveEightChips([])
                    setsixNineChips([])
                    setsevenTenChips([])
                    seteightElevenChips([])
                    setnineTwelveChips([])
                    settenThirteenChips([])
                    setelevenFourteenChips([])
                    settwelveFifteenChips([])
                    setthirteenSixteenChips([])
                    setfourteenSeventeenChips([])
                    setfifteenEighteenChips([])
                    setsixteenNineteenChips([])
                    setseventeenTwentyChips([])
                    seteighteenTwentyOneChips([])
                    setnineteenTwentyTwoChips([])
                    settwentyTwentyThreeChips([])
                    settwentyOneTwentyFourChips([])
                    settwentyTwoTwentyFiveChips([])
                    settwentyThreeTwentySixChips([])
                    settwentyFourTwentySevenChips([])
                    settwentyFiveTwentyEightChips([])
                    settwentySixTwentyNineChips([])
                    settwentySevenThirtyChips([])
                    settwentyEightThirtyOneChips([])
                    settwentyNineThirtyTwoChips([])
                    setthirtyThirtyThreeChips([])
                    setthirtyOneThirtyFourChips([])
                    setthirtyTwoThirtyFiveChips([])
                    setthirtyThreeThirtySixChips([])
                    setOneTwoChips([])
                    setTwoThreeChips([])
                    setFourFiveChips([])
                    setFiveSixChips([])
                    setSevenEightChips([])
                    setEightNineChips([])
                    setTenElevenChips([])
                    setElevenTwelveChips([])
                    setThirteenFourteenChips([])
                    setFourteenFifteenChips([])
                    setSixteenSeventeenChips([])
                    setSeventeenEighteenChips([])
                    setNineteenTwentyChips([])
                    setTwentyTwentyOneChips([])
                    setTwentyTwoTwentyThreeChips([])
                    setTwentyThreeTwentyFourChips([])
                    setTwentyFiveTwentySixChips([])
                    setTwentySixTwentySevenChips([])
                    setTwentyEightTwentyNineChips([])
                    setTwentyNineThirtyChips([])
                    setThirtyOneThirtyTwoChips([])
                    setThirtyTwoThirtyThreeChips([])
                    setthirtyFourThirtyFiveChips([])
                    setThirtyFiveThirtySixChips([])

                    setFirstFourChips([])
                    setSecondFourChips([])
                    setThirdFourChips([])
                    setFourthFourChips([])
                    setFifthFourChips([])
                    setSixthFourChips([])
                    setSeventhFourChips([])
                    setEighthFourChips([])
                    setNinthFourChips([])
                    setTenthFourChips([])
                    setEleventhFourChips([])
                    setTwelfthFourChips([])
                    setThirteenthFourChips([])
                    setFourteenthFourChips([])
                    setFifteenthFourChips([])
                    setSixteenthFourChips([])
                    setSeventeenthFourChips([])
                    setEighteenthFourChips([])
                    setNineteenthFourChips([])
                    setTwentiethFourChips([])
                    setTwentyFirstFourChips([])
                    setTwentySecondFourChips([])

                    setFirstSixChips([])
                    setSecondSixChips([])
                    setThirdSixChips([])
                    setFourthSixChips([])
                    setFifthSixChips([])
                    setSixthSixChips([])
                    setSeventhSixChips([])
                    setEighthSixChips([])
                    setNinthSixChips([])
                    setTenthSixChips([])
                    setEleventhSixChips([])
                    setFirstThreeChips([])
                    setSecondThreeChips([])
                    setThirdThreeChips([])
                    setFourthThreeChips([])
                    setFifthThreeChips([])
                    setSixthThreeChips([])
                    setSeventhThreeChips([])
                    setEighthThreeChips([])
                    setNinthThreeChips([])
                    setTenthThreeChips([])
                    setEleventhThreeChips([])
                    setTwelfthThreeChips([])
                    setThirteenthThreeChips([])
                    setFourteenthThreeChips([])

                    setOneTwo(0)
                    setTwoThree(0)
                    setFourFive(0)
                    setFiveSix(0)
                    setSevenEight(0)
                    setEightNine(0)
                    setTenEleven(0)
                    setElevenTwelve(0)
                    setThirteenFourteen(0)
                    setFourteenFifteen(0)
                    setSixteenSeventeen(0)
                    setSeventeenEighteen(0)
                    setNineteenTwenty(0)
                    setTwentyTwentyOne(0)
                    setTwentyTwoTwentyThree(0)
                    setTwentyThreeTwentyFour(0)
                    setTwentyFiveTwentySix(0)
                    setTwentySixTwentySeven(0)
                    setTwentyEightTwentyNine(0)
                    setTwentyNineThirty(0)
                    setThirtyOneThirtyTwo(0)
                    setThirtyTwoThirtyThree(0)
                    setthirtyFourThirtyFive(0)
                    setThirtyFiveThirtySix(0)

                    setFirstFour(0)
                    setSecondFour(0)
                    setThirdFour(0)
                    setFourthFour(0)
                    setFifthFour(0)
                    setSixthFour(0)
                    setSeventhFour(0)
                    setEighthFour(0)
                    setNinthFour(0)
                    setTenthFour(0)
                    setEleventhFour(0)
                    setTwelfthFour(0)
                    setThirteenthFour(0)
                    setFourteenthFour(0)
                    setFifteenthFour(0)
                    setSixteenthFour(0)
                    setSeventeenthFour(0)
                    setEighteenthFour(0)
                    setNineteenthFour(0)
                    setTwentiethFour(0)
                    setTwentyFirstFour(0)
                    setTwentySecondFour(0)

                    setFirstSix(0)
                    setSecondSix(0)
                    setThirdSix(0)
                    setFourthSix(0)
                    setFifthSix(0)
                    setSixthSix(0)
                    setSeventhSix(0)
                    setEighthSix(0)
                    setNinthSix(0)
                    setTenthSix(0)
                    setEleventhSix(0)
                    setFirstThree(0)
                    setSecondThree(0)
                    setThirdThree(0)
                    setFourthThree(0)
                    setFifthThree(0)
                    setSixthThree(0)
                    setSeventhThree(0)
                    setEighthThree(0)
                    setNinthThree(0)
                    setTenthThree(0)
                    setEleventhThree(0)
                    setTwelfthThree(0)
                    setThirteenthThree(0)
                    setFourteenthThree(0)

                    if (oneTwoRef.current.childNodes[0] != undefined) {
                        oneTwoRef.current.childNodes[0].display = "none"
                    }

                    if (twoThreeRef.current.childNodes[0] != undefined) {
                        twoThreeRef.current.childNodes[0].display = "none"
                    }

                    if (fourFiveRef.current.childNodes[0] != undefined) {
                        fourFiveRef.current.childNodes[0].display = "none"
                    }

                    if (fiveSixRef.current.childNodes[0] != undefined) {
                        fiveSixRef.current.childNodes[0].display = "none"
                    }

                    if (sevenEightRef.current.childNodes[0] != undefined) {
                        sevenEightRef.current.childNodes[0].display = "none"
                    }

                    if (eightNineRef.current.childNodes[0] != undefined) {
                        eightNineRef.current.childNodes[0].display = "none"
                    }

                    if (tenElevenRef.current.childNodes[0] != undefined) {
                        tenElevenRef.current.childNodes[0].display = "none"
                    }

                    if (elevenTwelveRef.current.childNodes[0] != undefined) {
                        elevenTwelveRef.current.childNodes[0].display = "none"
                    }

                    if (thirteenFourteenRef.current.childNodes[0] != undefined) {
                        thirteenFourteenRef.current.childNodes[0].display = "none"
                    }

                    if (fourteenFifteenRef.current.childNodes[0] != undefined) {
                        fourteenFifteenRef.current.childNodes[0].display = "none"
                    }

                    if (sixteenSeventeenRef.current.childNodes[0] != undefined) {
                        sixteenSeventeenRef.current.childNodes[0].display = "none"
                    }

                    if (seventeenEighteenRef.current.childNodes[0] != undefined) {
                        seventeenEighteenRef.current.childNodes[0].display = "none"
                    }

                    if (nineteenTwentyRef.current.childNodes[0] != undefined) {
                        nineteenTwentyRef.current.childNodes[0].display = "none"
                    }

                    if (twentyTwentyOneRef.current.childNodes[0] != undefined) {
                        twentyTwentyOneRef.current.childNodes[0].display = "none"
                    }

                    if (twentyTwoTwentyThreeRef.current.childNodes[0] != undefined) {
                        twentyTwoTwentyThreeRef.current.childNodes[0].display = "none"
                    }

                    if (twentyThreeTwentyFourRef.current.childNodes[0] != undefined) {
                        twentyThreeTwentyFourRef.current.childNodes[0].display = "none"
                    }

                    if (twentyFiveTwentySixRef.current.childNodes[0] != undefined) {
                        twentyFiveTwentySixRef.current.childNodes[0].display = "none"
                    }

                    if (twentySixTwentySevenRef.current.childNodes[0] != undefined) {
                        twentySixTwentySevenRef.current.childNodes[0].display = "none"
                    }

                    if (twentyEightTwentyNineRef.current.childNodes[0] != undefined) {
                        twentyEightTwentyNineRef.current.childNodes[0].display = "none"
                    }

                    if (twentyNineThirtyRef.current.childNodes[0] != undefined) {
                        twentyNineThirtyRef.current.childNodes[0].display = "none"
                    }

                    if (thirtyOneThirtyTwoRef.current.childNodes[0] != undefined) {
                        thirtyOneThirtyTwoRef.current.childNodes[0].display = "none"
                    }

                    if (thirtyTwoThirtyThreeRef.current.childNodes[0] != undefined) {
                        thirtyTwoThirtyThreeRef.current.childNodes[0].display = "none"
                    }

                    if (thirtyFourThirtyFiveRef.current.childNodes[0] != undefined) {
                        thirtyFourThirtyFiveRef.current.childNodes[0].display = "none"
                    }

                    if (thirtyFiveThirtySixRef.current.childNodes[0] != undefined) {
                        thirtyFiveThirtySixRef.current.childNodes[0].display = "none"
                    }


                    if (firstFourRef.current.childNodes[0] != undefined) {
                        firstFourRef.current.childNodes[0].display = "none"
                    }

                    if (secondFourRef.current.childNodes[0] != undefined) {
                        secondFourRef.current.childNodes[0].display = "none"
                    }

                    if (thirdFourRef.current.childNodes[0] != undefined) {
                        thirdFourRef.current.childNodes[0].display = "none"
                    }

                    if (fourthFourRef.current.childNodes[0] != undefined) {
                        fourthFourRef.current.childNodes[0].display = "none"
                    }

                    if (fifthFourRef.current.childNodes[0] != undefined) {
                        fifthFourRef.current.childNodes[0].display = "none"
                    }

                    if (sixthFourRef.current.childNodes[0] != undefined) {
                        sixthFourRef.current.childNodes[0].display = "none"
                    }

                    if (seventhFourRef.current.childNodes[0] != undefined) {
                        seventhFourRef.current.childNodes[0].display = "none"
                    }

                    if (eighthFourRef.current.childNodes[0] != undefined) {
                        eighthFourRef.current.childNodes[0].display = "none"
                    }

                    if (ninthFourRef.current.childNodes[0] != undefined) {
                        ninthFourRef.current.childNodes[0].display = "none"
                    }

                    if (tenthFourRef.current.childNodes[0] != undefined) {
                        tenthFourRef.current.childNodes[0].display = "none"
                    }

                    if (eleventhFourRef.current.childNodes[0] != undefined) {
                        eleventhFourRef.current.childNodes[0].display = "none"
                    }

                    if (twelfthFourRef.current.childNodes[0] != undefined) {
                        twelfthFourRef.current.childNodes[0].display = "none"
                    }

                    if (thirteenthFourRef.current.childNodes[0] != undefined) {
                        thirteenthFourRef.current.childNodes[0].display = "none"
                    }

                    if (fourteenthFourRef.current.childNodes[0] != undefined) {
                        fourteenthFourRef.current.childNodes[0].display = "none"
                    }

                    if (fifteenthFourRef.current.childNodes[0] != undefined) {
                        fifteenthFourRef.current.childNodes[0].display = "none"
                    }

                    if (sixteenthFourRef.current.childNodes[0] != undefined) {
                        sixteenthFourRef.current.childNodes[0].display = "none"
                    }

                    if (seventeenthFourRef.current.childNodes[0] != undefined) {
                        seventeenthFourRef.current.childNodes[0].display = "none"
                    }

                    if (eighteenthFourRef.current.childNodes[0] != undefined) {
                        eighteenthFourRef.current.childNodes[0].display = "none"
                    }

                    if (nineteenthFourRef.current.childNodes[0] != undefined) {
                        nineteenthFourRef.current.childNodes[0].display = "none"
                    }

                    if (twentiethFourRef.current.childNodes[0] != undefined) {
                        twentiethFourRef.current.childNodes[0].display = "none"
                    }

                    if (twentyFirstFourRef.current.childNodes[0] != undefined) {
                        twentyFirstFourRef.current.childNodes[0].display = "none"
                    }

                    if (twentySecondFourRef.current.childNodes[0] != undefined) {
                        twentySecondFourRef.current.childNodes[0].display = "none"
                    }

                    if (firstSixRef.current.childNodes[0] != undefined) {
                        firstSixRef.current.childNodes[0].display = "none"
                    }

                    if (secondSixRef.current.childNodes[0] != undefined) {
                        secondSixRef.current.childNodes[0].display = "none"
                    }

                    if (thirdSixRef.current.childNodes[0] != undefined) {
                        thirdSixRef.current.childNodes[0].display = "none"
                    }

                    if (fourthSixRef.current.childNodes[0] != undefined) {
                        fourthSixRef.current.childNodes[0].display = "none"
                    }

                    if (fifthSixRef.current.childNodes[0] != undefined) {
                        fifthSixRef.current.childNodes[0].display = "none"
                    }

                    if (sixthSixRef.current.childNodes[0] != undefined) {
                        sixthSixRef.current.childNodes[0].display = "none"
                    }

                    if (seventhSixRef.current.childNodes[0] != undefined) {
                        seventhSixRef.current.childNodes[0].display = "none"
                    }

                    if (eighthSixRef.current.childNodes[0] != undefined) {
                        eighthSixRef.current.childNodes[0].display = "none"
                    }

                    if (ninthSixRef.current.childNodes[0] != undefined) {
                        ninthSixRef.current.childNodes[0].display = "none"
                    }

                    if (tenthSixRef.current.childNodes[0] != undefined) {
                        tenthSixRef.current.childNodes[0].display = "none"
                    }

                    if (eleventhSixRef.current.childNodes[0] != undefined) {
                        eleventhSixRef.current.childNodes[0].display = "none"
                    }

                    if (firstThreeRef.current.childNodes[0] != undefined) {
                        firstThreeRef.current.childNodes[0].display = "none"
                    }

                    if (secondThreeRef.current.childNodes[0] != undefined) {
                        secondThreeRef.current.childNodes[0].display = "none"
                    }

                    if (thirdThreeRef.current.childNodes[0] != undefined) {
                        thirdThreeRef.current.childNodes[0].display = "none"
                    }

                    if (fourthThreeRef.current.childNodes[0] != undefined) {
                        fourthThreeRef.current.childNodes[0].display = "none"
                    }

                    if (fifthThreeRef.current.childNodes[0] != undefined) {
                        fifthThreeRef.current.childNodes[0].display = "none"
                    }

                    if (sixthThreeRef.current.childNodes[0] != undefined) {
                        sixthThreeRef.current.childNodes[0].display = "none"
                    }

                    if (seventhThreeRef.current.childNodes[0] != undefined) {
                        seventhThreeRef.current.childNodes[0].display = "none"
                    }

                    if (eighthThreeRef.current.childNodes[0] != undefined) {
                        eighthThreeRef.current.childNodes[0].display = "none"
                    }

                    if (ninthThreeRef.current.childNodes[0] != undefined) {
                        ninthThreeRef.current.childNodes[0].display = "none"
                    }

                    if (tenthThreeRef.current.childNodes[0] != undefined) {
                        tenthThreeRef.current.childNodes[0].display = "none"
                    }

                    if (eleventhThreeRef.current.childNodes[0] != undefined) {
                        eleventhThreeRef.current.childNodes[0].display = "none"
                    }

                    if (twelfthThreeRef.current.childNodes[0] != undefined) {
                        twelfthThreeRef.current.childNodes[0].display = "none"
                    }

                    if (thirteenthThreeRef.current.childNodes[0] != undefined) {
                        thirteenthThreeRef.current.childNodes[0].display = "none"
                    }

                    if (fourteenthThreeRef.current.childNodes[0] != undefined) {
                        fourteenthThreeRef.current.childNodes[0].display = "none"
                    }

                    setLastWin(0)



                    // twoThreeRef.current.style.display = "none"
                    // fourFiveRef.current.style.display = "none"
                    // fiveSixRef.current.style.display = "none"
                    // sevenEightRef.current.style.display = "none"
                    // eightNineRef.current.style.display = "none"
                    // tenElevenRef.current.style.display = "none"
                    // elevenTwelveRef.current.style.display = "none"
                    // thirteenFourteenRef.current.style.display = "none"
                    // fourteenFifteenRef.current.style.display = "none"
                    // sixteenSeventeenRef.current.style.display = "none"
                    // seventeenEighteenRef.current.style.display = "none"
                    // nineteenTwentyRef.current.style.display = "none"
                    // twentyTwentyOneRef.current.style.display = "none"
                    // twentyTwoTwentyThreeRef.current.style.display = "none"
                    // twentyThreeTwentyFourRef.current.style.display = "none"
                    // twentyFiveTwentySixRef.current.style.display = "none"
                    // twentySixTwentySevenRef.current.style.display = "none"
                    // twentyEightTwentyNineRef.current.style.display = "none"
                    // twentyNineThirtyRef.current.style.display = "none"
                    // thirtyOneThirtyTwoRef.current.style.display = "none"
                    // thirtyTwoThirtyThreeRef.current.style.display = "none"
                    // thirtyFourThirtyFiveRef.current.style.display = "none"
                    // thirtyFiveThirtySixRef.current.style.display = "none"
                    // zeroOneRef.current.style.display = "none"
                    // zeroTwoRef.current.style.display = "none"
                    // zeroThreeRef.current.style.display = "none"
                    // oneFourRef.current.style.display = "none"
                    // twoFiveRef.current.style.display = "none"
                    // threeSixRef.current.style.display = "none"
                    // fourSevenRef.current.style.display = "none"
                    // fiveEightRef.current.style.display = "none"
                    // sixNineRef.current.style.display = "none"
                    // sevenTenRef.current.style.display = "none"
                    // eightElevenRef.current.style.display = "none"
                    // nineTwelveRef.current.style.display = "none"
                    // tenThirteenRef.current.style.display = "none"
                    // elevenFourteenRef.current.style.display = "none"
                    // twelveFifteenRef.current.style.display = "none"
                    // thirteenSixteenRef.current.style.display = "none"
                    // fourteenSeventeenRef.current.style.display = "none"
                    // fifteenEighteenRef.current.style.display = "none"
                    // sixteenNineteenRef.current.style.display = "none"
                    // seventeenTwentyRef.current.style.display = "none"
                    // eighteenTwentyOneRef.current.style.display = "none"
                    // nineteenTwentyTwoRef.current.style.display = "none"
                    // twentyTwentyThreeRef.current.style.display = "none"
                    // twentyOneTwentyFourRef.current.style.display = "none"
                    // twentyTwoTwentyFiveRef.current.style.display = "none"
                    // twentyThreeTwentySixRef.current.style.display = "none"
                    // twentyFourTwentySevenRef.current.style.display = "none"
                    // twentyFiveTwentyEightRef.current.style.display = "none"
                    // twentySixTwentyNineRef.current.style.display = "none"
                    // twentySevenThirtyRef.current.style.display = "none"
                    // twentyEightThirtyOneRef.current.style.display = "none"
                    // twentyNineThirtyTwoRef.current.style.display = "none"
                    // thirtyThirtyThreeRef.current.style.display = "none"
                    // thirtyOneThirtyFourRef.current.style.display = "none"
                    // thirtyTwoThirtyFiveRef.current.style.display = "none"
                    // thirtyThreeThirtySixRef.current.style.display = "none"
                    // firstFourRef.current.style.display = "none"
                    // secondFourRef.current.style.display = "none"
                    // thirdFourRef.current.style.display = "none"
                    // fourthFourRef.current.style.display = "none"
                    // fifthFourRef.current.style.display = "none"
                    // sixthFourRef.current.style.display = "none"
                    // seventhFourRef.current.style.display = "none"
                    // eighthFourRef.current.style.display = "none"
                    // ninthFourRef.current.style.display = "none"
                    // tenthFourRef.current.style.display = "none"
                    // eleventhFourRef.current.style.display = "none"
                    // twelfthFourRef.current.style.display = "none"
                    // thirteenthFourRef.current.style.display = "none"
                    // fourteenthFourRef.current.style.display = "none"
                    // fifteenthFourRef.current.style.display = "none"
                    // sixteenthFourRef.current.style.display = "none"
                    // seventeenthFourRef.current.style.display = "none"
                    // eighteenthFourRef.current.style.display = "none"
                    // nineteenthFourRef.current.style.display = "none"
                    // twentiethFourRef.current.style.display = "none"
                    // twentyFirstFourRef.current.style.display = "none"
                    // twentySecondFourRef.current.style.display = "none"
                    // firstSixRef.current.style.display = "none"
                    // secondSixRef.current.style.display = "none"
                    // thirdSixRef.current.style.display = "none"
                    // fourthSixRef.current.style.display = "none"
                    // fifthSixRef.current.style.display = "none"
                    // sixthSixRef.current.style.display = "none"
                    // seventhSixRef.current.style.display = "none"
                    // eighthSixRef.current.style.display = "none"
                    // ninthSixRef.current.style.display = "none"
                    // tenthSixRef.current.style.display = "none"
                    // eleventhSixRef.current.style.display = "none"

                    // setT2(T2 == true ? T2 = false : T2 = true)
                } else {
                    socket.disconnect()
                }
            });

            return () => {
                socket.off("data");
                socket.disconnect()
            };
        }

    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') { // Check if window object is available (client-side only)
            const checkAuth = () => {
                const userLoggedIn = isAuthenticated(); // Check if user is logged in
                if (!userLoggedIn) {
                    router.replace('/Login'); // Redirect if not authenticated
                } else {
                    setIsAuthChecked(true); // Allow rendering if authenticated
                }
            };

            checkAuth();
        }
    }, [router]);


    useEffect(() => {

        if (isAuthChecked) {
            selectedStaticChipRef.current.style.backgroundImage = 'url("/assets/brown_coin.png")';

            twentyChip.current.style.backgroundImage = 'url("/assets/brown_coin.png")';
            twentyChip.current.style.backgroundSize = 'cover';
            twentyChip.current.style.width = '45px';
            twentyChip.current.style.height = '45px';
            twentyChip.current.style.zIndex = '100';

            fiftyChip.current.style.backgroundImage = 'url("/assets/coin_s_2.jpg")';
            fiftyChip.current.style.backgroundSize = 'cover';
            fiftyChip.current.style.width = '45px';
            fiftyChip.current.style.height = '45px';
            // fiftyChip.current.style.zIndex = '100';

            hundredChip.current.style.backgroundImage = 'url("/assets/orange_coin.png")';
            hundredChip.current.style.backgroundSize = 'cover';
            hundredChip.current.style.width = '45px';
            // hundredChip.current.style.height = '45px';

            fiveHundredChip.current.style.backgroundImage = 'url("/assets/coin3.png")';
            fiveHundredChip.current.style.backgroundSize = 'cover';
            fiveHundredChip.current.style.width = '45px';
            fiveHundredChip.current.style.height = '45px';
            // fiveHundredChip.current.style.zIndex = '100';

            thousandChip.current.style.backgroundImage = 'url("/assets/coin4.png")';
            thousandChip.current.style.backgroundSize = 'cover';
            thousandChip.current.style.width = '45px';
            thousandChip.current.style.height = '45px';
            // thousandChip.current.style.zIndex = '100';

            if (T2) {
                clockRef.current.style.display = "block"

                var inter = setInterval(() => {
                    setSecondsLeft(secondsLeft => Math.max(secondsLeft - 1, 0));
                }, 1000)

                return () => clearInterval(inter)

            } else {
                clockRef.current.style.display = "none"
                setSecondsLeft(19)
            } if (secondsLeft < 0) {
                setSecondsLeft(0)
            }
        }

    }, [T2])

    useEffect(() => {
        if (isAuthChecked) {
            const fetchData = async () => {
                await getRecord();
            };

            fetchData();
        }

    }, []);

    // useEffect(() => {
    //     // Check if amount is equal to 0 and show modal

    // }, [amount]);

    useEffect(() => {
        // Only run on client-side
        if (typeof window !== 'undefined') {
            if (isAuthChecked) {
                // Function to check if the user is on a laptop or tablet
                const checkDevice = () => {
                    const screenWidth = window.innerWidth;
                    // You may adjust the threshold values as needed
                    if (screenWidth > 426) {
                        setShowPrompt(true);
                    } else {
                        setShowPrompt(false);
                    }
                };

                // Call the function initially
                checkDevice();

                // Event listener to handle screen resize
                window.addEventListener('resize', checkDevice);

                // Clean up the event listener
                return () => {
                    window.removeEventListener('resize', checkDevice);
                };
            }
        }
    }, [isAuthChecked]);
    useEffect(() => {
        if (isAuthChecked) {
            gsap.fromTo(clockRef.current, { opacity: 0 }, { opacity: 1 })
        }
    }, [secondsLeft])

    useEffect(() => {
        if (isAuthChecked) {
            if (secondsLeft === 0) {
                doughnutRef.current.classList.remove('fade-in');
                doughnutRef.current.classList.add('fade-out');
            } else if (secondsLeft === 20) {
                doughnutRef.current.classList.remove('fade-out');
                doughnutRef.current.classList.add('fade-in');
            }
        }

    }, [secondsLeft]);

    useEffect(() => {
        if (isAuthChecked) {
            if (amount < 0) {
                setAmount(0);
            }
        }

    }, [amount]);

    useEffect(() => {
        if (isAuthChecked) {
            oneTwoRef.current.style.backgroundImage = `url("${oneTwoChips[oneTwoChips.length - 1]}")`;
            twoThreeRef.current.style.backgroundImage = `url("${twoThreeChips[twoThreeChips.length - 1]}")`;
            fourFiveRef.current.style.backgroundImage = `url("${fourFiveChips[fourFiveChips.length - 1]}")`;
            fiveSixRef.current.style.backgroundImage = `url("${fiveSixChips[fiveSixChips.length - 1]}")`;
            sevenEightRef.current.style.backgroundImage = `url("${sevenEightChips[sevenEightChips.length - 1]}")`;
            eightNineRef.current.style.backgroundImage = `url("${eightNineChips[eightNineChips.length - 1]}")`;
            tenElevenRef.current.style.backgroundImage = `url("${tenElevenChips[tenElevenChips.length - 1]}")`;
            elevenTwelveRef.current.style.backgroundImage = `url("${elevenTwelveChips[elevenTwelveChips.length - 1]}")`;
            thirteenFourteenRef.current.style.backgroundImage = `url("${thirteenFourteenChips[thirteenFourteenChips.length - 1]}")`;
            fourteenFifteenRef.current.style.backgroundImage = `url("${fourteenFifteenChips[fourteenFifteenChips.length - 1]}")`;
            sixteenSeventeenRef.current.style.backgroundImage = `url("${sixteenSeventeenChips[sixteenSeventeenChips.length - 1]}")`;
            seventeenEighteenRef.current.style.backgroundImage = `url("${seventeenEighteenChips[seventeenEighteenChips.length - 1]}")`;
            nineteenTwentyRef.current.style.backgroundImage = `url("${nineteenTwentyChips[nineteenTwentyChips.length - 1]}")`;
            twentyTwentyOneRef.current.style.backgroundImage = `url("${twentyTwentyOneChips[twentyTwentyOneChips.length - 1]}")`;
            twentyTwoTwentyThreeRef.current.style.backgroundImage = `url("${twentyTwoTwentyThreeChips[twentyTwoTwentyThreeChips.length - 1]}")`;
            twentyThreeTwentyFourRef.current.style.backgroundImage = `url("${twentyThreeTwentyFourChips[twentyThreeTwentyFourChips.length - 1]}")`;
            twentyFiveTwentySixRef.current.style.backgroundImage = `url("${twentyFiveTwentySixChips[twentyFiveTwentySixChips.length - 1]}")`;
            twentySixTwentySevenRef.current.style.backgroundImage = `url("${twentySixTwentySevenChips[twentySixTwentySevenChips.length - 1]}")`;
            twentyEightTwentyNineRef.current.style.backgroundImage = `url("${twentyEightTwentyNineChips[twentyEightTwentyNineChips.length - 1]}")`;
            twentyNineThirtyRef.current.style.backgroundImage = `url("${twentyNineThirtyChips[twentyNineThirtyChips.length - 1]}")`;
            thirtyOneThirtyTwoRef.current.style.backgroundImage = `url("${thirtyOneThirtyTwoChips[thirtyOneThirtyTwoChips.length - 1]}")`;
            thirtyTwoThirtyThreeRef.current.style.backgroundImage = `url("${thirtyTwoThirtyThreeChips[thirtyTwoThirtyThreeChips.length - 1]}")`;
            thirtyFourThirtyFiveRef.current.style.backgroundImage = `url("${thirtyFourThirtyFiveChips[thirtyFourThirtyFiveChips.length - 1]}")`;
            thirtyFiveThirtySixRef.current.style.backgroundImage = `url("${thirtyFiveThirtySixChips[thirtyFiveThirtySixChips.length - 1]}")`;
            zeroOneRef.current.style.backgroundImage = `url("${zeroOneChips[zeroOneChips.length - 1]}")`;
            zeroTwoRef.current.style.backgroundImage = `url("${zeroTwoChips[zeroTwoChips.length - 1]}")`;
            zeroThreeRef.current.style.backgroundImage = `url("${zeroThreeChips[zeroThreeChips.length - 1]}")`;
            oneFourRef.current.style.backgroundImage = `url("${oneFourChips[oneFourChips.length - 1]}")`;
            twoFiveRef.current.style.backgroundImage = `url("${twoFiveChips[twoFiveChips.length - 1]}")`;
            threeSixRef.current.style.backgroundImage = `url("${threeSixChips[threeSixChips.length - 1]}")`;
            fourSevenRef.current.style.backgroundImage = `url("${fourSevenChips[fourSevenChips.length - 1]}")`;
            fiveEightRef.current.style.backgroundImage = `url("${fiveEightChips[fiveEightChips.length - 1]}")`;
            sixNineRef.current.style.backgroundImage = `url("${sixNineChips[sixNineChips.length - 1]}")`;
            sevenTenRef.current.style.backgroundImage = `url("${sevenTenChips[sevenTenChips.length - 1]}")`;
            eightElevenRef.current.style.backgroundImage = `url("${eightElevenChips[eightElevenChips.length - 1]}")`;
            nineTwelveRef.current.style.backgroundImage = `url("${nineTwelveChips[nineTwelveChips.length - 1]}")`;
            tenThirteenRef.current.style.backgroundImage = `url("${tenThirteenChips[tenThirteenChips.length - 1]}")`;
            elevenFourteenRef.current.style.backgroundImage = `url("${elevenFourteenChips[elevenFourteenChips.length - 1]}")`;
            twelveFifteenRef.current.style.backgroundImage = `url("${twelveFifteenChips[twelveFifteenChips.length - 1]}")`;
            thirteenSixteenRef.current.style.backgroundImage = `url("${thirteenSixteenChips[thirteenSixteenChips.length - 1]}")`;
            fourteenSeventeenRef.current.style.backgroundImage = `url("${fourteenSeventeenChips[fourteenSeventeenChips.length - 1]}")`;
            fifteenEighteenRef.current.style.backgroundImage = `url("${fifteenEighteenChips[fifteenEighteenChips.length - 1]}")`;
            sixteenNineteenRef.current.style.backgroundImage = `url("${sixteenNineteenChips[sixteenNineteenChips.length - 1]}")`;
            seventeenTwentyRef.current.style.backgroundImage = `url("${seventeenTwentyChips[seventeenTwentyChips.length - 1]}")`;
            eighteenTwentyOneRef.current.style.backgroundImage = `url("${eighteenTwentyOneChips[eighteenTwentyOneChips.length - 1]}")`;
            nineteenTwentyTwoRef.current.style.backgroundImage = `url("${nineteenTwentyTwoChips[nineteenTwentyTwoChips.length - 1]}")`;
            twentyTwentyThreeRef.current.style.backgroundImage = `url("${twentyTwentyThreeChips[twentyTwentyThreeChips.length - 1]}")`;
            twentyOneTwentyFourRef.current.style.backgroundImage = `url("${twentyOneTwentyFourChips[twentyOneTwentyFourChips.length - 1]}")`;
            twentyTwoTwentyFiveRef.current.style.backgroundImage = `url("${twentyTwoTwentyFiveChips[twentyTwoTwentyFiveChips.length - 1]}")`;
            twentyThreeTwentySixRef.current.style.backgroundImage = `url("${twentyThreeTwentySixChips[twentyThreeTwentySixChips.length - 1]}")`;
            twentyFourTwentySevenRef.current.style.backgroundImage = `url("${twentyFourTwentySevenChips[twentyFourTwentySevenChips.length - 1]}")`;
            twentyFiveTwentyEightRef.current.style.backgroundImage = `url("${twentyFiveTwentyEightChips[twentyFiveTwentyEightChips.length - 1]}")`;
            twentySixTwentyNineRef.current.style.backgroundImage = `url("${twentySixTwentyNineChips[twentySixTwentyNineChips.length - 1]}")`;
            twentySevenThirtyRef.current.style.backgroundImage = `url("${twentySevenThirtyChips[twentySevenThirtyChips.length - 1]}")`;
            twentyEightThirtyOneRef.current.style.backgroundImage = `url("${twentyEightThirtyOneChips[twentyEightThirtyOneChips.length - 1]}")`;
            twentyNineThirtyTwoRef.current.style.backgroundImage = `url("${twentyNineThirtyTwoChips[twentyNineThirtyTwoChips.length - 1]}")`;
            thirtyThirtyThreeRef.current.style.backgroundImage = `url("${thirtyThirtyThreeChips[thirtyThirtyThreeChips.length - 1]}")`;
            thirtyOneThirtyFourRef.current.style.backgroundImage = `url("${thirtyOneThirtyFourChips[thirtyOneThirtyFourChips.length - 1]}")`;
            thirtyTwoThirtyFiveRef.current.style.backgroundImage = `url("${thirtyTwoThirtyFiveChips[thirtyTwoThirtyFiveChips.length - 1]}")`;
            thirtyThreeThirtySixRef.current.style.backgroundImage = `url("${thirtyThreeThirtySixChips[thirtyThreeThirtySixChips.length - 1]}")`;
            firstFourRef.current.style.backgroundImage = `url("${firstFourChips[firstFourChips.length - 1]}")`;
            secondFourRef.current.style.backgroundImage = `url("${secondFourChips[secondFourChips.length - 1]}")`;
            thirdFourRef.current.style.backgroundImage = `url("${thirdFourChips[thirdFourChips.length - 1]}")`;
            fourthFourRef.current.style.backgroundImage = `url("${fourthFourChips[fourthFourChips.length - 1]}")`;
            fifthFourRef.current.style.backgroundImage = `url("${fifthFourChips[fifthFourChips.length - 1]}")`;
            sixthFourRef.current.style.backgroundImage = `url("${sixthFourChips[sixthFourChips.length - 1]}")`;
            seventhFourRef.current.style.backgroundImage = `url("${seventhFourChips[seventhFourChips.length - 1]}")`;
            eighthFourRef.current.style.backgroundImage = `url("${eighthFourChips[eighthFourChips.length - 1]}")`;
            ninthFourRef.current.style.backgroundImage = `url("${ninthFourChips[ninthFourChips.length - 1]}")`;
            tenthFourRef.current.style.backgroundImage = `url("${tenthFourChips[tenthFourChips.length - 1]}")`;
            eleventhFourRef.current.style.backgroundImage = `url("${eleventhFourChips[eleventhFourChips.length - 1]}")`;
            twelfthFourRef.current.style.backgroundImage = `url("${twelfthFourChips[twelfthFourChips.length - 1]}")`;
            thirteenthFourRef.current.style.backgroundImage = `url("${thirteenthFourChips[thirteenthFourChips.length - 1]}")`;
            fourteenthFourRef.current.style.backgroundImage = `url("${fourteenthFourChips[fourteenthFourChips.length - 1]}")`;
            fifteenthFourRef.current.style.backgroundImage = `url("${fifteenthFourChips[fifteenthFourChips.length - 1]}")`;
            sixteenthFourRef.current.style.backgroundImage = `url("${sixteenthFourChips[sixteenthFourChips.length - 1]}")`;
            seventeenthFourRef.current.style.backgroundImage = `url("${seventeenthFourChips[seventeenthFourChips.length - 1]}")`;
            eighteenthFourRef.current.style.backgroundImage = `url("${eighteenthFourChips[eighteenthFourChips.length - 1]}")`;
            nineteenthFourRef.current.style.backgroundImage = `url("${nineteenthFourChips[nineteenthFourChips.length - 1]}")`;
            twentiethFourRef.current.style.backgroundImage = `url("${twentiethFourChips[twentiethFourChips.length - 1]}")`;
            twentySecondFourRef.current.style.backgroundImage = `url("${twentySecondFourChips[twentySecondFourChips.length - 1]}")`;
            firstSixRef.current.style.backgroundImage = `url("${firstSixChips[firstSixChips.length - 1]}")`;
            secondSixRef.current.style.backgroundImage = `url("${secondSixChips[secondSixChips.length - 1]}")`;
            thirdSixRef.current.style.backgroundImage = `url("${thirdSixChips[thirdSixChips.length - 1]}")`;
            fourthSixRef.current.style.backgroundImage = `url("${fourthSixChips[fourthSixChips.length - 1]}")`;
            fifthSixRef.current.style.backgroundImage = `url("${fifthSixChips[fifthSixChips.length - 1]}")`;
            sixthSixRef.current.style.backgroundImage = `url("${sixthSixChips[sixthSixChips.length - 1]}")`;
            seventhSixRef.current.style.backgroundImage = `url("${seventhSixChips[seventhSixChips.length - 1]}")`;
            eighthSixRef.current.style.backgroundImage = `url("${eighthSixChips[eighthSixChips.length - 1]}")`;
            ninthSixRef.current.style.backgroundImage = `url("${ninthSixChips[ninthSixChips.length - 1]}")`;
            tenthSixRef.current.style.backgroundImage = `url("${tenthSixChips[tenthSixChips.length - 1]}")`;
            eleventhSixRef.current.style.backgroundImage = `url("${eleventhSixChips[eleventhSixChips.length - 1]}")`;
            firstThreeRef.current.style.backgroundImage = `url("${firstThreeChips[firstThreeChips.length - 1]}")`;
            secondThreeRef.current.style.backgroundImage = `url("${secondThreeChips[secondThreeChips.length - 1]}")`;
            thirdThreeRef.current.style.backgroundImage = `url("${thirdThreeChips[thirdThreeChips.length - 1]}")`;
            fourthThreeRef.current.style.backgroundImage = `url("${fourthThreeChips[fourthThreeChips.length - 1]}")`;
            fifthThreeRef.current.style.backgroundImage = `url("${fifthThreeChips[fifthThreeChips.length - 1]}")`;
            sixthThreeRef.current.style.backgroundImage = `url("${sixthThreeChips[sixthThreeChips.length - 1]}")`;
            seventhThreeRef.current.style.backgroundImage = `url("${seventhThreeChips[seventhThreeChips.length - 1]}")`;
            eighthThreeRef.current.style.backgroundImage = `url("${eighthThreeChips[eighthThreeChips.length - 1]}")`;
            ninthThreeRef.current.style.backgroundImage = `url("${ninthThreeChips[ninthThreeChips.length - 1]}")`;
            tenthThreeRef.current.style.backgroundImage = `url("${tenthThreeChips[tenthThreeChips.length - 1]}")`;
            eleventhThreeRef.current.style.backgroundImage = `url("${eleventhThreeChips[eleventhThreeChips.length - 1]}")`;
            twelfthThreeRef.current.style.backgroundImage = `url("${twelfthThreeChips[twelfthThreeChips.length - 1]}")`;
            thirteenthThreeRef.current.style.backgroundImage = `url("${thirteenthThreeChips[thirteenthThreeChips.length - 1]}")`;
            fourteenthThreeRef.current.style.backgroundImage = `url("${fourteenthThreeChips[fourteenthThreeChips.length - 1]}")`;

        }

    }, [
        oneTwoChips,
        twoThreeChips,
        fourFiveChips,
        fiveSixChips,
        sevenEightChips,
        eightNineChips,
        tenElevenChips,
        elevenTwelveChips,
        thirteenFourteenChips,
        fourteenFifteenChips,
        sixteenSeventeenChips,
        seventeenEighteenChips,
        nineteenTwentyChips,
        twentyTwentyOneChips,
        twentyTwoTwentyThreeChips,
        twentyThreeTwentyFourChips,
        twentyFiveTwentySixChips,
        twentySixTwentySevenChips,
        twentyEightTwentyNineChips,
        twentyNineThirtyChips,
        thirtyOneThirtyTwoChips,
        thirtyTwoThirtyThreeChips,
        thirtyFourThirtyFiveChips,
        thirtyFiveThirtySixChips,
        zeroTwoChips,
        zeroThreeChips,
        oneFourChips,
        twoFiveChips,
        threeSixChips,
        fourSevenChips,
        fiveEightChips,
        sixNineChips,
        sevenTenChips,
        eightElevenChips,
        nineTwelveChips,
        tenThirteenChips,
        elevenFourteenChips,
        twelveFifteenChips,
        thirteenSixteenChips,
        fourteenSeventeenChips,
        fifteenEighteenChips,
        sixteenNineteenChips,
        seventeenTwentyChips,
        eighteenTwentyOneChips,
        nineteenTwentyTwoChips,
        twentyTwentyThreeChips,
        twentyOneTwentyFourChips,
        twentyTwoTwentyFiveChips,
        twentyThreeTwentySixChips,
        twentyFourTwentySevenChips,
        twentyFiveTwentyEightChips,
        twentySixTwentyNineChips,
        twentySevenThirtyChips,
        twentyEightThirtyOneChips,
        twentyNineThirtyTwoChips,
        thirtyThirtyThreeChips,
        thirtyOneThirtyFourChips,
        thirtyTwoThirtyFiveChips,
        thirtyThreeThirtySixChips,
        firstFourChips,
        secondFourChips,
        thirdFourChips,
        fourthFourChips,
        fifthFourChips,
        sixthFourChips,
        seventhFourChips,
        eighthFourChips,
        ninthFourChips,
        tenthFourChips,
        eleventhFourChips,
        twelfthFourChips,
        thirteenthFourChips,
        fourteenthFourChips,
        fifteenthFourChips,
        sixteenthFourChips,
        seventeenthFourChips,
        eighteenthFourChips,
        nineteenthFourChips,
        twentiethFourChips,
        twentySecondFourChips,
        firstSixChips,
        secondSixChips,
        thirdSixChips,
        fourthSixChips,
        fifthSixChips,
        sixthSixChips,
        seventhSixChips,
        eighthSixChips,
        ninthSixChips,
        tenthSixChips,
        eleventhSixChips,
        firstThreeChips,
        secondThreeChips,
        thirdThreeChips,
        fourthThreeChips,
        fifthThreeChips,
        sixthThreeChips,
        seventhThreeChips,
        eighthThreeChips,
        ninthThreeChips,
        tenthThreeChips,
        eleventhThreeChips,
        twelfthThreeChips,
        thirteenthThreeChips,
        fourteenthThreeChips,
    ]);

    const displayNumber = async () => {
        numberDisplay.current.style.opacity = "1"
        // if (outcome == 1 || outcome == 3 || outcome == 5 || outcome == 7 || outcome == 9 || outcome == 12 || outcome == 14 || outcome == 16 || outcome == 18 || outcome == 18 || outcome == 19 || outcome == 21 || outcome == 23 || outcome == 25 || outcome == 27 || outcome == 30 || outcome == 32 || outcome == 34 || outcome == 36) {
        //     numberDisplay.current.style.backgroundColor = "red"
        // } else if (outcome == 0) {
        //     numberDisplay.current.style.backgroundColor = "green"
        // } else {
        //     numberDisplay.current.style.backgroundColor = "black"
        // }





        // if (lastFiftyNumbers.length == 0) {
        //     setLastFiftyNumbers([{ key: lastFiftyNumbers.length, value: outcome }])
        // } else {
        //     setLastFiftyNumbers([...lastFiftyNumbers, { key: lastFiftyNumbers.length, value: outcome }])
        // }

        if (bets.length > 0) {
            winner()
        }
        await delay(5000)

        numberDisplay.current.style.opacity = "0"

    }

    const updateUserAmount = async (newAmount) => {
        try {
            if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
                const data = localStorage.getItem('username') || '';

                const q = query(collection(db, 'roulette-users'), where("username", '==', data));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {

                    const userDoc = querySnapshot.docs[0];

                    await updateDoc(doc(db, 'roulette-users', userDoc.id), { amount: newAmount });

                } else {
                    console.log('No user found with the specified condition');
                }

            }

        } catch (error) {
            console.error('Error updating amount:', error);
        }
    };

    const winner = async () => {
        if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
            const data = localStorage.getItem('username') || '';

            const q = query(usersCollectionRef, where("username", "==", data));

            const querySnapshot = await getDocs(query(usersCollectionRef, where("username", "==", data)));

            let updatedAmount = amount;

            for (var i = 0; i < bets.length; i++) {

                if (outcome == 0) {
                    setLastWin((val0 * 36) + (fourteenthThree * 12) + (fifteenthThree * 12) + (zeroOne * 17) + (zeroTwo * 17) + (even * 2) + (zeroThree * 17))

                    updatedAmount += (val0 * 36) + (fourteenthThree * 12) + (fifteenthThree * 12) + (zeroOne * 17) + (zeroTwo * 17) + (even * 2) + (zeroThree * 17)

                    await updateUserAmount(updatedAmount);

                    break;
                } else if (outcome == 1) {
                    setLastWin((val1 * 36) + (col1 * 3) + (oneFour * 17) + (firstSix * 6) + (firstFour * 9) + (zeroOne * 17) + (odd * 2) + (red * 2) + (firstThree * 12) + (thirteenthThree * 12) + (first12 * 3) + (oneTwo * 17) + (first18 * 2) + (oneFour * 17))

                    updatedAmount += (val1 * 36) + (col1 * 3) + (oneFour * 17) + (firstSix * 6) + (firstFour * 9) + (zeroOne * 17) + (odd * 2) + (red * 2) + (firstThree * 12) + (thirteenthThree * 12) + (first12 * 3) + (oneTwo * 17) + (first18 * 2) + (oneFour * 17)
                    await updateUserAmount(updatedAmount);
                    break;
                } else if (outcome == 2) {
                    setLastWin((val2 * 36) + (col2 * 3) + (firstSix * 6) + (first12 * 3) + (zeroTwo * 3) + (firstFour * 9) + (black * 2) + (secondFour * 9) + (firstThree * 12) + (thirteenthThree * 12) + (fourteenthThree * 12) + (oneTwo * 17) + (twoThree * 17) + (twoFive * 17) + (oneTwo * 17) + (first18 * 2) + (even * 2))

                    updatedAmount += (val2 * 36) + (col2 * 3) + (firstSix * 6) + (first12 * 3) + (zeroTwo * 3) + (firstFour * 9) + (black * 2) + (secondFour * 9) + (firstThree * 12) + (thirteenthThree * 12) + (fourteenthThree * 12) + (oneTwo * 17) + (twoThree * 17) + (twoFive * 17) + (oneTwo * 17) + (first18 * 2) + (even * 2)
                    await updateUserAmount(updatedAmount)
                    break;

                } else if (outcome == 3) {
                    setLastWin((val3 * 36) + (odd * 2) + (firstSix * 6) + (secondFour * 9) + (firstThree * 12) + (zeroThree * 17) + (twoThree * 17) + (threeSix * 17) + (red * 2) + (col3 * 3) + (first12 * 3) + (first18 * 2))

                    updatedAmount += (val3 * 36) + (odd * 2) + (firstSix * 6) + (secondFour * 9) + (firstThree * 12) + (zeroThree * 17) + (twoThree * 17) + (threeSix * 17) + (red * 2) + (col3 * 3) + (first12 * 3) + (first18 * 2)
                    await updateUserAmount(updatedAmount)
                    break;

                } else if (outcome == 4) {
                    setLastWin((val4 * 36) + (firstSix * 6) + (secondSix * 6) + (even * 2) + (firstFour * 9) + (thirdFour * 9) + (oneFour * 17) + (fourFive * 17) + (first12 * 3) + (first18 * 2) + (black * 2) + (col1 * 3) + (fourSeven * 17))

                    updatedAmount += (val4 * 36) + (firstSix * 6) + (secondSix * 6) + (even * 2) + (firstFour * 9) + (thirdFour * 9) + (oneFour * 17) + (fourFive * 17) + (first12 * 3) + (first18 * 2) + (black * 2) + (col1 * 3) + (fourSeven * 17)
                    await updateUserAmount(updatedAmount)
                    break;

                } else if (outcome == 5) {
                    setLastWin((val5 * 36) + (twoFive * 17) + (fourFive * 17) + (fiveSix * 17) + (fiveEight * 17) + (red * 2) + (secondThree * 12) + (secondFour * 9) + (odd * 2) + (col2 * 3) + (firstSix * 6) + (secondSix * 6) + (firstFour * 9) + (first12 * 3))

                    updatedAmount += (val5 * 36) + (twoFive * 17) + (fourFive * 17) + (fiveSix * 17) + (fiveEight * 17) + (red * 2) + (secondThree * 12) + (secondFour * 9) + (odd * 2) + (col2 * 3) + (firstSix * 6) + (secondSix * 6) + (firstFour * 9) + (first12 * 3)

                    await updateUserAmount(updatedAmount)

                    break;
                } else if (outcome == 6) {
                    setLastWin((val6 * 36) + (secondThree * 12) + (threeSix * 17) + (fiveSix * 17) + (sixNine * 17) + (secondFour * 9) + (fourthFour * 9) + (black * 2) + (even * 2) + (col3 * 3) + (firstSix * 6) + (secondSix * 6) + (secondFour * 9) + (first12 * 3) + (first18 * 3))


                    updatedAmount += (val6 * 36) + (secondThree * 12) + (threeSix * 17) + (fiveSix * 17) + (sixNine * 17) + (secondFour * 9) + (fourthFour * 9) + (black * 2) + (even * 2) + (col3 * 3) + (firstSix * 6) + (secondSix * 6) + (secondFour * 9) + (first12 * 3) + (first18 * 3)

                    await updateUserAmount(updatedAmount)
                    break;
                } else if (outcome == 7) {
                    setLastWin((val7 * 36) + (secondSix * 6) + (thirdSix * 6) + (thirdFour * 9) + (fifthFour * 9) + (thirdThree * 12) + (fourSeven * 17) + (sevenEight * 17) + (sevenTen * 17) + (red * 2) + (odd * 2) + (first12 * 3) + (first18 * 2) + (col1 * 3) + (secondFour * 9))

                    updatedAmount += (val7 * 36) + (secondSix * 6) + (thirdSix * 6) + (thirdFour * 9) + (fifthFour * 9) + (thirdThree * 12) + (fourSeven * 17) + (sevenEight * 17) + (sevenTen * 17) + (red * 2) + (odd * 2) + (first12 * 3) + (first18 * 2) + (col1 * 3) + (secondFour * 9)

                    await updateUserAmount(updatedAmount)

                    break;
                } else if (outcome == 8) {
                    setLastWin((val8 * 36) + (fiveEight * 17) + (sevenEight * 17) + (eightNine * 17) + (eightEleven * 17) + (black * 2) + (even * 2) + (col2 * 3) + (first12 * 3) + (first18 * 3) + (thirdThree * 12) + (thirdFour * 9) + (fourthFour * 9) + (fifthFour * 9) + (sixthFour * 9) + (thirdSix * 6) + (secondSix * 6))


                    updatedAmount += (val8 * 36) + (fiveEight * 17) + (sevenEight * 17) + (eightNine * 17) + (eightEleven * 17) + (black * 2) + (even * 2) + (col2 * 3) + (first12 * 3) + (first18 * 3) + (thirdThree * 12) + (thirdFour * 9) + (fourthFour * 9) + (fifthFour * 9) + (sixthFour * 9) + (thirdSix * 6) + (secondSix * 6)

                    await updateUserAmount(updatedAmount)
                    break;
                } else if (outcome == 9) {
                    setLastWin((val9 * 36) + (secondSix * 6) + (thirdSix * 6) + (fourthFour * 9) + (sixthFour * 9) + (secondSix * 6) + (thirdSix * 6) + (sixNine * 17) + (eightNine * 17) + (nineTwelve * 17) + (red * 2) + (odd * 2) + (first18 * 2) + (first12 * 3) + (col3 * 3))

                    updatedAmount += (val9 * 36) + (secondSix * 6) + (thirdSix * 6) + (fourthFour * 9) + (sixthFour * 9) + (secondSix * 6) + (thirdSix * 6) + (sixNine * 17) + (eightNine * 17) + (nineTwelve * 17) + (red * 2) + (odd * 2) + (first18 * 2) + (first12 * 3) + (col3 * 3)

                    await updateUserAmount(updatedAmount)
                    break;
                } else if (outcome == 10) {
                    setLastWin((val9 * 36) + (secondSix * 6) + (thirdSix * 6) + (fourthFour * 9) + (sixthFour * 9) + (secondSix * 6) + (thirdSix * 6) + (sixNine * 17) + (eightNine * 17) + (nineTwelve * 17) + (red * 2) + (odd * 2) + (first18 * 2) + (first12 * 3) + (col3 * 3))

                    updatedAmount += (val10 * 36) + (sevenTen * 17) + (tenEleven * 17) + (tenThirteen * 17) + (thirdSix * 6) + (fourthSix * 6) + (fifthFour * 9) + (seventhFour * 9) + (thirdThree * 12) + (black * 2) + (even * 2) + (first12 * 3) + (first18 * 2) + (col1 * 3)

                    await updateUserAmount(updatedAmount)

                    break;
                } else if (outcome == 11) {
                    setLastWin((val11 * 36) + (tenEleven * 17) + (eightEleven * 17) + (elevenTwelve * 17) + (elevenFourteen * 17) + (fifthFour * 9) + (sixthFour * 9) + (seventhFour * 9) + (eighthFour * 9) + (thirdSix * 6) + (fourthSix * 6) + (fourthThree * 12) + (col2 * 3) + (black * 2) + (first12 * 3) + (odd * 2))

                    updatedAmount += (val11 * 36) + (tenEleven * 17) + (eightEleven * 17) + (elevenTwelve * 17) + (elevenFourteen * 17) + (fifthFour * 9) + (sixthFour * 9) + (seventhFour * 9) + (eighthFour * 9) + (thirdSix * 6) + (fourthSix * 6) + (fourthThree * 12) + (col2 * 3) + (black * 2) + (first12 * 3) + (odd * 2)

                    await updateUserAmount(updatedAmount)

                    break;
                } else if (outcome == 12) {
                    setLastWin((val12 * 36) + (thirdSix * 6) + (fourthSix * 6) + (sixthFour * 9) + (eighthFour * 9) + (thirdThree * 12) + (nineTwelve * 17) + (elevenTwelve * 17) + (twelveFifteen * 17) + (red * 2) + (even * 2) + (first12 * 3) + (first18 * 3) + (col3 * 3))

                    updatedAmount += (val12 * 36) + (thirdSix * 6) + (fourthSix * 6) + (sixthFour * 9) + (eighthFour * 9) + (thirdThree * 12) + (nineTwelve * 17) + (elevenTwelve * 17) + (twelveFifteen * 17) + (red * 2) + (even * 2) + (first12 * 3) + (first18 * 3) + (col3 * 3)

                    await updateUserAmount(updatedAmount)

                    break;
                } else if (outcome == 13) {
                    setLastWin((val12 * 36) + (thirdSix * 6) + (fourthSix * 6) + (sixthFour * 9) + (eighthFour * 9) + (thirdThree * 12) + (nineTwelve * 17) + (elevenTwelve * 17) + (twelveFifteen * 17) + (red * 2) + (even * 2) + (first12 * 3) + (first18 * 3) + (col3 * 3))

                    updatedAmount += (val13 * 36) + (fourthSix * 6) + (fifthSix * 6) + (seventhFour * 9) + (ninthFour * 9) + (tenThirteen * 17) + (thirteenFourteen * 17) + (thirteenSixteen * 17) + (col1 * 3) + (black * 2) + (mid12 * 3) + (first18 * 2)

                    await updateUserAmount(updatedAmount)
                    break;
                } else if (outcome == 14) {
                    setLastWin((val14 * 36) + (thirteenFourteen * 17) + (elevenFourteen * 17) + (fourteenFifteen * 17) + (fourteenSeventeen * 17) + (seventhFour * 9) + (eighthFour * 9) + (ninthFour * 9) + (tenthFour * 9) + (fifthThree * 12) + (mid12 * 3) + (first18 * 2) + (even * 2) + (col2 * 3))

                    updatedAmount += (val14 * 36) + (thirteenFourteen * 17) + (elevenFourteen * 17) + (fourteenFifteen * 17) + (fourteenSeventeen * 17) + (seventhFour * 9) + (eighthFour * 9) + (ninthFour * 9) + (tenthFour * 9) + (fifthThree * 12) + (mid12 * 3) + (first18 * 2) + (even * 2) + (col2 * 3)

                    await updateUserAmount(updatedAmount)

                    break;
                } else if (outcome == 15) {
                    setLastWin((val15 * 36) + (twelveFifteen * 17) + (fourteenFifteen * 17) + (fifteenEighteen * 17) + (fourthSix * 6) + (fifthSix * 6) + (eighthFour * 9) + (tenthFour * 9) + (fifthThree * 12) + (black * 2) + (col3 * 3) + (odd * 2) + (mid12 * 3))

                    updatedAmount += (val15 * 36) + (twelveFifteen * 17) + (fourteenFifteen * 17) + (fifteenEighteen * 17) + (fourthSix * 6) + (fifthSix * 6) + (eighthFour * 9) + (tenthFour * 9) + (fifthThree * 12) + (black * 2) + (col3 * 3) + (odd * 2) + (mid12 * 3)

                    await updateUserAmount(updatedAmount)


                    break;
                } else if (outcome == 16) {
                    setLastWin((val16 * 36) + (thirteenSixteen * 17) + (sixteenSeventeen * 17) + (sixteenNineteen * 17) + (ninthFour * 9) + (eleventhFour * 9) + (fifthSix * 6) + (sixthSix * 6) + (sixthThree * 12) + (red * 2) + (col1 * 3) + (mid12 * 3) + (even * 2))

                    updatedAmount += (val16 * 36) + (thirteenSixteen * 17) + (sixteenSeventeen * 17) + (sixteenNineteen * 17) + (ninthFour * 9) + (eleventhFour * 9) + (fifthSix * 6) + (sixthSix * 6) + (sixthThree * 12) + (red * 2) + (col1 * 3) + (mid12 * 3) + (even * 2)

                    await updateUserAmount(updatedAmount)

                    break;
                } else if (outcome == 17) {
                    setLastWin((val17 * 36) + (fourteenSeventeen * 17) + (sixteenSeventeen * 17) + (seventeenEighteen * 17) + (seventeenTwenty * 17) + (fifthSix * 6) + (sixthSix * 6) + (ninthFour * 9) + (tenthFour * 9) + (eleventhFour * 9) + (twelfthFour * 9) + (sixthThree * 12) + (black * 2) + (mid12 * 3) + (first18 * 2) + (odd * 2) + (col2 * 3))

                    updatedAmount += (val17 * 36) + (fourteenSeventeen * 17) + (sixteenSeventeen * 17) + (seventeenEighteen * 17) + (seventeenTwenty * 17) + (fifthSix * 6) + (sixthSix * 6) + (ninthFour * 9) + (tenthFour * 9) + (eleventhFour * 9) + (twelfthFour * 9) + (sixthThree * 12) + (black * 2) + (mid12 * 3) + (first18 * 2) + (odd * 2) + (col2 * 3)

                    await updateUserAmount(updatedAmount)

                    break;
                } else if (outcome == 18) {
                    setLastWin((val18 * 36) + (fifteenEighteen * 17) + (seventeenEighteen * 17) + (eighteenTwentyOne * 17) + (fifthSix * 6) + (sixthSix * 6) + (tenthFour * 9) + (twelfthFour * 9) + (red * 2) + (even * 2) + (col3 * 3) + (mid12 * 3) + (first18 * 2))

                    updatedAmount += (val18 * 36) + (fifteenEighteen * 17) + (seventeenEighteen * 17) + (eighteenTwentyOne * 17) + (fifthSix * 6) + (sixthSix * 6) + (tenthFour * 9) + (twelfthFour * 9) + (red * 2) + (even * 2) + (col3 * 3) + (mid12 * 3) + (first18 * 2)

                    await updateUserAmount(updatedAmount)

                    break;
                } else if (outcome == 19) {
                    setLastWin((val19 * 36) + (sixteenNineteen * 17) + (nineteenTwenty * 17) + (nineteenTwentyTwo * 17) + (sixthSix * 6) + (seventhSix * 12) + (eleventhFour * 9) + (thirteenthFour * 9) + (seventhThree * 12) + (col1 * 3) + (mid12 * 3) + (red * 2) + (odd * 2) + (mid12 * 2) + (first18 * 2))

                    updatedAmount += (val19 * 36) + (sixteenNineteen * 17) + (nineteenTwenty * 17) + (nineteenTwentyTwo * 17) + (sixthSix * 6) + (seventhSix * 12) + (eleventhFour * 9) + (thirteenthFour * 9) + (seventhThree * 12) + (col1 * 3) + (mid12 * 3) + (red * 2) + (odd * 2) + (mid12 * 2) + (first18 * 2)

                    await updateUserAmount(updatedAmount)

                    break;
                } else if (outcome == 20) {
                    setLastWin((val20 * 36) + (seventeenTwenty * 17) + (nineteenTwenty * 17) + (twentyTwentyOne * 17) + (twentyTwentyThree * 17) + (black * 2) + (col2 * 3) + (even * 2) + (sixthSix * 6) + (seventhSix * 6) + (eleventhFour * 9) + (twelfthFour * 9) + (thirteenthFour * 9) + (fourteenthFour * 9) + (seventhThree * 12) + (mid12 * 3) + (col2 * 3) + (black * 2) + (even * 2) + (first18 * 2))

                    updatedAmount += (val20 * 36) + (seventeenTwenty * 17) + (nineteenTwenty * 17) + (twentyTwentyOne * 17) + (twentyTwentyThree * 17) + (black * 2) + (col2 * 3) + (even * 2) + (sixthSix * 6) + (seventhSix * 6) + (eleventhFour * 9) + (twelfthFour * 9) + (thirteenthFour * 9) + (fourteenthFour * 9) + (seventhThree * 12) + (mid12 * 3) + (col2 * 3) + (black * 2) + (even * 2) + (first18 * 2)

                    await updateUserAmount(updatedAmount)
                    break;
                } else if (outcome == 21) {

                    setLastWin((val21 * 36) + (eighteenTwentyOne * 17) + (twentyTwentyOne * 17) + (twentyOneTwentyFour * 17) + (sixthSix * 6) + (seventhSix * 6) + (twelfthFour * 9) + (fourteenthFour * 9) + (seventhThree * 12) + (red * 2) + (mid12 * 3) + (col3 * 3) + (odd * 2) + (first18 * 2))
                    updatedAmount += (val21 * 36) + (eighteenTwentyOne * 17) + (twentyTwentyOne * 17) + (twentyOneTwentyFour * 17) + (sixthSix * 6) + (seventhSix * 6) + (twelfthFour * 9) + (fourteenthFour * 9) + (seventhThree * 12) + (red * 2) + (mid12 * 3) + (col3 * 3) + (odd * 2) + (first18 * 2)

                    await updateUserAmount(updatedAmount)
                    break;
                } else if (outcome == 22) {
                    setLastWin((val22 * 36) + (nineteenTwentyTwo * 17) + (nineteenTwenty * 17) + (nineteenTwentyTwo * 17) + (seventhSix * 6) + (eighthSix * 6) + (thirteenthFour * 9) + (fifteenthFour * 9) + (eighthThree * 12) + (black * 2) + (col1 * 3) + (mid12 * 3) + (first18 * 2) + (even * 2))

                    updatedAmount += (val22 * 36) + (nineteenTwentyTwo * 17) + (nineteenTwenty * 17) + (nineteenTwentyTwo * 17) + (seventhSix * 6) + (eighthSix * 6) + (thirteenthFour * 9) + (fifteenthFour * 9) + (eighthThree * 12) + (black * 2) + (col1 * 3) + (mid12 * 3) + (first18 * 2) + (even * 2)

                    await updateUserAmount(updatedAmount)
                    break;
                } else if (outcome == 23) {

                    setLastWin((val23 * 36) + (twentyTwentyThree * 17) + (twentyTwoTwentyThree * 17) + (twentyThreeTwentyFour * 17) + (twentyThreeTwentySix * 17) + (eighthThree * 12) + (thirteenthFour * 9) + (fourteenthFour * 9) + (fifteenthFour * 9) + (sixteenthFour * 9) + (red * 2) + (col2 * 3) + (mid12 * 3) + (odd * 2) + (first18 * 2))
                    updatedAmount += (val23 * 36) + (twentyTwentyThree * 17) + (twentyTwoTwentyThree * 17) + (twentyThreeTwentyFour * 17) + (twentyThreeTwentySix * 17) + (eighthThree * 12) + (thirteenthFour * 9) + (fourteenthFour * 9) + (fifteenthFour * 9) + (sixteenthFour * 9) + (red * 2) + (col2 * 3) + (mid12 * 3) + (odd * 2) + (first18 * 2)

                    await updateUserAmount(updatedAmount)
                    break;
                } else if (outcome == 24) {
                    setLastWin((val24 * 36) + (seventhSix * 6) + (eighthSix * 6) + (eighthThree * 3) + (fourteenthFour * 9) + (sixteenthFour * 9) + (eighthThree * 12) + (twentyOneTwentyFour * 17) + (twentyThreeTwentyFour * 17) + (twentyFourTwentySeven * 17) + (even * 2) + (black * 2) + (col3 * 3) + (mid12 * 3) + (first18 * 2))

                    updatedAmount += (val24 * 36) + (seventhSix * 6) + (eighthSix * 6) + (eighthThree * 3) + (fourteenthFour * 9) + (sixteenthFour * 9) + (eighthThree * 12) + (twentyOneTwentyFour * 17) + (twentyThreeTwentyFour * 17) + (twentyFourTwentySeven * 17) + (even * 2) + (black * 2) + (col3 * 3) + (mid12 * 3) + (first18 * 2)

                    await updateUserAmount(updatedAmount)
                    break;
                } else if (outcome == 25) {

                    setLastWin((val25 * 36) + (twentyTwoTwentyFive * 17) + (twentyFiveTwentySix * 17) + (twentyFiveTwentyEight * 17) + (eighthSix * 12) + (ninthSix * 12) + (fifteenthFour * 9) + (seventeenthFour * 9) + (ninthThree * 12) + (last18 * 2) + (odd * 2) + (red * 2) + (col1 * 3) + (last12 * 3))
                    updatedAmount += (val25 * 36) + (twentyTwoTwentyFive * 17) + (twentyFiveTwentySix * 17) + (twentyFiveTwentyEight * 17) + (eighthSix * 12) + (ninthSix * 12) + (fifteenthFour * 9) + (seventeenthFour * 9) + (ninthThree * 12) + (last18 * 2) + (odd * 2) + (red * 2) + (col1 * 3) + (last12 * 3)

                    await updateUserAmount(updatedAmount)
                    break;
                } else if (outcome == 26) {

                    setLastWin((val26 * 36) + (twentyThreeTwentySix * 17) + (twentyFiveTwentySix * 17) + (twentySixTwentySeven * 17) + (twentySixTwentyNine * 17) + (eighthSix * 6) + (ninthSix * 6) + (ninthThree * 12) + (fifteenthFour * 9) + (sixteenthFour * 9) + (seventeenthFour * 9) + (eighteenthFour * 9) + (black * 2) + (col2 * 3) + (even * 2) + (last12 * 3) + (last18 * 2))
                    updatedAmount += (val26 * 36) + (twentyThreeTwentySix * 17) + (twentyFiveTwentySix * 17) + (twentySixTwentySeven * 17) + (twentySixTwentyNine * 17) + (eighthSix * 6) + (ninthSix * 6) + (ninthThree * 12) + (fifteenthFour * 9) + (sixteenthFour * 9) + (seventeenthFour * 9) + (eighteenthFour * 9) + (black * 2) + (col2 * 3) + (even * 2) + (last12 * 3) + (last18 * 2)

                    await updateUserAmount(updatedAmount)
                    break;
                } else if (outcome == 27) {

                    setLastWin((val27 * 36) + (twentyFourTwentySeven * 17) + (twentySixTwentySeven * 17) + (twentySevenThirty * 17) + (eighthSix * 6) + (ninthSix * 6) + (sixteenthFour * 9) + (eighteenthFour * 9) + (ninthThree * 12) + (odd * 2) + (red * 2) + (col3 * 3) + (last12 * 2))
                    updatedAmount += (val27 * 36) + (twentyFourTwentySeven * 17) + (twentySixTwentySeven * 17) + (twentySevenThirty * 17) + (eighthSix * 6) + (ninthSix * 6) + (sixteenthFour * 9) + (eighteenthFour * 9) + (ninthThree * 12) + (odd * 2) + (red * 2) + (col3 * 3) + (last12 * 2)

                    await updateUserAmount(updatedAmount)
                    break;
                } else if (outcome == 28) {

                    setLastWin((val28 * 36) + (ninthSix * 6) + (tenthSix * 6) + (seventeenthFour * 9) + (eighteenthFour * 9) + (tenthThree * 12) + (even * 2) + (black * 2) + (col1 * 3) + (last12 * 3))
                    updatedAmount += (val28 * 36) + (ninthSix * 6) + (tenthSix * 6) + (seventeenthFour * 9) + (eighteenthFour * 9) + (tenthThree * 12) + (even * 2) + (black * 2) + (col1 * 3) + (last12 * 3)

                    await updateUserAmount(updatedAmount)
                    break;
                } else if (outcome == 29) {

                    setLastWin((val29 * 36) + (ninthSix * 6) + (tenthSix * 6) + (seventeenthFour * 9) + (eighteenthFour * 9) + (nineteenthFour * 9) + (twentiethFour * 9) + (tenthThree * 12) + (odd * 2) + (col2 * 3) + (last12 * 3) + (last18 * 2) + (black * 2))
                    updatedAmount += (val29 * 36) + (ninthSix * 6) + (tenthSix * 6) + (seventeenthFour * 9) + (eighteenthFour * 9) + (nineteenthFour * 9) + (twentiethFour * 9) + (tenthThree * 12) + (odd * 2) + (col2 * 3) + (last12 * 3) + (last18 * 2) + (black * 2)

                    await updateUserAmount(updatedAmount)
                    break;
                } else if (outcome == 30) {

                    setLastWin((val30 * 36) + (twentySevenThirty * 17) + (twentyNineThirty * 17) + (thirtyThirtyThree * 17) + (ninthSix * 6) + (tenthSix * 6) + (eighteenthFour * 9) + (twentiethFour * 9) + (tenthThree * 12) + (red * 2) + (even * 2) + (col3 * 3) + (last12 * 3) + (last18 * 2))
                    updatedAmount += (val30 * 36) + (twentySevenThirty * 17) + (twentyNineThirty * 17) + (thirtyThirtyThree * 17) + (ninthSix * 6) + (tenthSix * 6) + (eighteenthFour * 9) + (twentiethFour * 9) + (tenthThree * 12) + (red * 2) + (even * 2) + (col3 * 3) + (last12 * 3) + (last18 * 2)

                    await updateUserAmount(updatedAmount)
                    break;
                } else if (outcome == 31) {

                    setLastWin((val31 * 36) + (twentyEightThirtyOne * 17) + (thirtyOneThirtyTwo * 17) + (thirtyOneThirtyFour * 17) + (tenthSix * 6) + (eleventhSix * 6) + (nineteenthFour * 9) + (twentyFirstFour * 9) + (eleventhThree * 12) + (odd * 2) + (black * 2) + (col1 * 3) + (last12 * 3) + (last18 * 2))
                    updatedAmount += (val31 * 36) + (twentyEightThirtyOne * 17) + (thirtyOneThirtyTwo * 17) + (thirtyOneThirtyFour * 17) + (tenthSix * 6) + (eleventhSix * 6) + (nineteenthFour * 9) + (twentyFirstFour * 9) + (eleventhThree * 12) + (odd * 2) + (black * 2) + (col1 * 3) + (last12 * 3) + (last18 * 2)
                    await updateUserAmount(updatedAmount)
                    break;
                } else if (outcome == 32) {

                    setLastWin((val32 * 36) + (thirtyOneThirtyTwo * 17) + (twentyNineThirtyTwo * 17) + (thirtyTwoThirtyThree * 17) + (thirtyTwoThirtyFive * 17) + (thirtyOneThirtyTwo * 17) + (tenthSix * 6) + (eleventhSix * 6) + (nineteenthFour * 9) + (twentiethFour * 9) + (twentyFirstFour * 9) + (twentySecondFour * 9) + (eleventhThree * 12) + (red * 2) + (even * 2) + (col2 * 3) + (last12 * 3) + (last18 * 12))
                    updatedAmount += (val32 * 36) + (thirtyOneThirtyTwo * 17) + (twentyNineThirtyTwo * 17) + (thirtyTwoThirtyThree * 17) + (thirtyTwoThirtyFive * 17) + (thirtyOneThirtyTwo * 17) + (tenthSix * 6) + (eleventhSix * 6) + (nineteenthFour * 9) + (twentiethFour * 9) + (twentyFirstFour * 9) + (twentySecondFour * 9) + (eleventhThree * 12) + (red * 2) + (even * 2) + (col2 * 3) + (last12 * 3) + (last18 * 12)
                    await updateUserAmount(updatedAmount)

                    break;
                } else if (outcome == 33) {

                    setLastWin((val33 * 36) + (thirtyThirtyThree * 17) + (thirtyTwoThirtyThree * 17) + (thirtyThreeThirtySix * 17) + (tenthSix * 6) + (eleventhSix * 6) + (twentiethFour * 9) + (twentySecondFour * 9) + (col3 * 3) + (last12 * 3) + (black * 2) + (odd * 2) + (last18 * 2))
                    updatedAmount += (val33 * 36) + (thirtyThirtyThree * 17) + (thirtyTwoThirtyThree * 17) + (thirtyThreeThirtySix * 17) + (tenthSix * 6) + (eleventhSix * 6) + (twentiethFour * 9) + (twentySecondFour * 9) + (col3 * 3) + (last12 * 3) + (black * 2) + (odd * 2) + (last18 * 2)
                    await updateUserAmount(updatedAmount)
                    break;
                } else if (outcome == 34) {

                    setLastWin((val34 * 36) + (thirtyOneThirtyFour * 17) + (thirtyFourThirtyFive * 17) + (eleventhSix * 6) + (twentyFirstFour * 9) + (twelfthThree * 12) + (even * 2) + (col1 * 3) + (last12 * 3) + (red * 2) + (last18 * 2))
                    updatedAmount += (val34 * 36) + (thirtyOneThirtyFour * 17) + (thirtyFourThirtyFive * 17) + (eleventhSix * 6) + (twentyFirstFour * 9) + (twelfthThree * 12) + (even * 2) + (col1 * 3) + (last12 * 3) + (red * 2) + (last18 * 2)
                    await updateUserAmount(updatedAmount)
                    break;
                } else if (outcome == 35) {

                    setLastWin((val35 * 36) + (eleventhSix * 6) + (twentyFirstFour * 9) + (twelfthThree * 12) + (thirtyTwoThirtyFive * 17) + (thirtyFourThirtyFive * 17) + (thirtyFiveThirtySix * 17) + (col2 * 3) + (last12 * 3) + (black * 2) + (odd * 2) + (last18 * 2))
                    updatedAmount += (val35 * 36) + (eleventhSix * 6) + (twentyFirstFour * 9) + (twelfthThree * 12) + (thirtyTwoThirtyFive * 17) + (thirtyFourThirtyFive * 17) + (thirtyFiveThirtySix * 17) + (col2 * 3) + (last12 * 3) + (black * 2) + (odd * 2) + (last18 * 2)
                    await updateUserAmount(updatedAmount)
                    break;
                } else if (outcome == 36) {

                    setLastWin((val36 * 36) + (thirtyThreeThirtySix * 17) + (thirtyFiveThirtySix * 17) + (eleventhSix * 6) + (twentyFirstFour * 9) + (twelfthThree * 12) + (red * 2) + (even * 2) + (last12 * 3) + (col3 * 3) + (last18 * 2))
                    updatedAmount += (val36 * 36) + (thirtyThreeThirtySix * 17) + (thirtyFiveThirtySix * 17) + (eleventhSix * 6) + (twentyFirstFour * 9) + (twelfthThree * 12) + (red * 2) + (even * 2) + (last12 * 3) + (col3 * 3) + (last18 * 2)
                    await updateUserAmount(updatedAmount)
                    // setAmount(amount + (val36 * 36) + (thirtyThreeThirtySix * 17) + (thirtyFiveThirtySix * 17) + (eleventhSix * 6) + (twentyFirstFour * 9) + (twelfthThree * 12) + (red * 2) + (even * 2) + (last12 * 3) + (col3 * 3) + (last18 * 2))
                    // await updateUserAmount(amount + (val36 * 36) + (thirtyThreeThirtySix * 17) + (thirtyFiveThirtySix * 17) + (eleventhSix * 6) + (twentyFirstFour * 9) + (twelfthThree * 12) + (red * 2) + (even * 2) + (last12 * 3) + (col3 * 3) + (last18 * 2))
                    break;
                }
            }

            for (var number of betHistoryValues) {
                await processBetHistory(outcome, number, querySnapshot);
            }

            setInitialAmount(updatedAmount); // Update initialAmount to match the updated amount
            setAmount(updatedAmount);

            setBetHistoryValues([])
            setBets([])

        }

    }

    const processBetHistory = async (outcome) => {
        if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
            const data = localStorage.getItem('username') || '';

            const collectionRef = collection(db, 'roulette-users');
            const q = query(collectionRef, where('username', '==', data));

            getDocs(q).then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    betHistoryValues.forEach(async value => {
                        console.log(value)
                        try {
                            await appendValueToDocument(doc, `number-${value.number} amount-${selectedChip} result-${outcome == value.number ? 'P' : 'L'}`);
                        } catch (error) {
                        }
                    });
                });
            }).catch(error => {
            });
        }

    };

    const appendValueToDocument = async (doc, value) => {
        await updateDoc(doc.ref, {
            betLogs: arrayUnion(value)
        });
    };

    const chartData = {
        datasets: [
            {
                data: [secondsLeft, 20 - secondsLeft], // Show remaining and elapsed time
                backgroundColor: ['#FFD700', 'white'], // Customize colors
                borderWidth: 0,
            },
        ],
    };

    const chartOptions = {
        cutout: '70%', // Increase cutout for a wider doughnut shape
        rotation: -90, // Start from the top
        circumference: 180, // Half-circle for a wide, semi-doughnut shape
        plugins: {
            tooltip: { enabled: false }, // Disable tooltip
        },
    };

    const doubleBets = async () => {
        if (T2) {
            if (bets.length > 0) {
                if ((amount - (
                    val0
                    + val1
                    + val2
                    + val3
                    + val4
                    + val5
                    + val6
                    + val7
                    + val8
                    + val9
                    + val10
                    + val11
                    + val12
                    + val13
                    + val14
                    + val15
                    + val16
                    + val17
                    + val18
                    + val19
                    + val20
                    + val21
                    + val22
                    + val23
                    + val24
                    + val25
                    + val26
                    + val27
                    + val28
                    + val29
                    + val30
                    + val31
                    + val32
                    + val33
                    + val34
                    + val35
                    + val36
                    + first18
                    + last18
                    + first12
                    + mid12
                    + last12
                    + even
                    + odd
                    + red
                    + black
                    + col1
                    + col2
                    + col3
                    + zeroOne
                    + zeroTwo
                    + zeroThree
                    + oneFour
                    + twoFive
                    + threeSix
                    + fourSeven
                    + fiveEight
                    + sixNine
                    + sevenTen
                    + eightEleven
                    + nineTwelve
                    + tenThirteen
                    + elevenFourteen
                    + twelveFifteen
                    + thirteenSixteen
                    + fourteenSeventeen
                    + fifteenEighteen
                    + sixteenNineteen
                    + seventeenTwenty
                    + eighteenTwentyOne
                    + nineteenTwentyTwo
                    + twentyTwentyThree
                    + twentyOneTwentyFour
                    + twentyTwoTwentyFive
                    + twentyThreeTwentySix
                    + twentyFourTwentySeven
                    + twentyFiveTwentyEight
                    + twentySixTwentyNine
                    + twentySevenThirty
                    + twentyEightThirtyOne
                    + twentyNineThirtyTwo
                    + thirtyThirtyThree
                    + thirtyOneThirtyFour
                    + thirtyTwoThirtyFive
                    + thirtyThreeThirtySix
                )) < 0) {
                } else {
                    setVal0(val0 * 2)
                    setVal1(val1 * 2)
                    setVal2(val2 * 2)
                    setVal3(val3 * 2)
                    setVal4(val4 * 2)
                    setVal5(val5 * 2)
                    setVal6(val6 * 2)
                    setVal7(val7 * 2)
                    setVal8(val8 * 2)
                    setVal9(val9 * 2)
                    setVal10(val10 * 2)
                    setVal11(val11 * 2)
                    setVal12(val12 * 2)
                    setVal13(val13 * 2)
                    setVal14(val14 * 2)
                    setVal15(val15 * 2)
                    setVal16(val16 * 2)
                    setVal17(val17 * 2)
                    setVal18(val18 * 2)
                    setVal19(val19 * 2)
                    setVal20(val20 * 2)
                    setVal21(val21 * 2)
                    setVal22(val22 * 2)
                    setVal23(val23 * 2)
                    setVal24(val24 * 2)
                    setVal25(val25 * 2)
                    setVal26(val26 * 2)
                    setVal27(val27 * 2)
                    setVal28(val28 * 2)
                    setVal29(val29 * 2)
                    setVal30(val30 * 2)
                    setVal31(val31 * 2)
                    setVal32(val32 * 2)
                    setVal33(val33 * 2)
                    setVal34(val34 * 2)
                    setVal35(val35 * 2)
                    setVal36(val36 * 2)
                    setFirst18(first18 * 2)
                    setLast18(last18 * 2)
                    setFirst12(first12 * 2)
                    setMid12(mid12 * 2)
                    setLast12(last12 * 2)
                    setEven(even * 2)
                    setOdd(odd * 2)
                    setRed(red * 2)
                    setBlack(black * 2)
                    setCol1(col1 * 2)
                    setCol2(col2 * 2)
                    setCol3(col3 * 2)
                    setzeroOne(zeroOne * 2)
                    setzeroTwo(zeroTwo * 2)
                    setzeroThree(zeroThree * 2)
                    setoneFour(oneFour * 2)
                    settwoFive(twoFive * 2)
                    setthreeSix(threeSix * 2)
                    setfourSeven(fourSeven * 2)
                    setfiveEight(fiveEight * 2)
                    setsixNine(sixNine * 2)
                    setsevenTen(sevenTen * 2)
                    seteightEleven(eightEleven * 2)
                    setnineTwelve(nineTwelve * 2)
                    settenThirteen(tenThirteen * 2)
                    setelevenFourteen(elevenFourteen * 2)
                    settwelveFifteen(twelveFifteen * 2)
                    setthirteenSixteen(thirteenSixteen * 2)
                    setfourteenSeventeen(fourteenSeventeen * 2)
                    setfifteenEighteen(fifteenEighteen * 2)
                    setsixteenNineteen(sixteenNineteen * 2)
                    setseventeenTwenty(seventeenTwenty * 2)
                    seteighteenTwentyOne(eighteenTwentyOne * 2)
                    setnineteenTwentyTwo(nineteenTwentyTwo * 2)
                    settwentyTwentyThree(twentyTwentyThree * 2)
                    settwentyOneTwentyFour(twentyOneTwentyFour * 2)
                    settwentyTwoTwentyFive(twentyTwoTwentyFive * 2)
                    settwentyThreeTwentySix(twentyThreeTwentySix * 2)
                    settwentyFourTwentySeven(twentyFourTwentySeven * 2)
                    settwentyFiveTwentyEight(twentyFiveTwentyEight * 2)
                    settwentySixTwentyNine(twentySixTwentyNine * 2)
                    settwentySevenThirty(twentySevenThirty * 2)
                    settwentyEightThirtyOne(twentyEightThirtyOne * 2)
                    settwentyNineThirtyTwo(twentyNineThirtyTwo * 2)
                    setthirtyThirtyThree(thirtyThirtyThree * 2)
                    setthirtyOneThirtyFour(thirtyOneThirtyFour * 2)
                    setthirtyTwoThirtyFive(thirtyTwoThirtyFive * 2)
                    setthirtyThreeThirtySix(thirtyThreeThirtySix * 2)

                    setAmount(amount - (val0 + val1 + val2 + val3 + val4 + val5 + val6 + val7 + val8 + val9 + val10 + val11 + val12 + val13 + val14 + val15 + val16 + val17 + val18 + val19 + val20 + val21 + val22 + val23 + val24 + val25 + val26 + val27 + val28 + val29 + val30 + val31 + val32 + val33 + val34 + val35 + val36 + first18 + first12 + mid12 + last12 + even + odd + red + black + col1 + col2 + col3 + zeroOne + zeroTwo + zeroThree + oneFour + twoFive + threeSix + fourSeven + fiveEight + sixNine + sevenTen + eightEleven + nineTwelve + tenThirteen + elevenFourteen + twelveFifteen + thirteenSixteen + fourteenSeventeen + fifteenEighteen + sixteenNineteen + seventeenTwenty + eighteenTwentyOne + nineteenTwentyTwo + twentyTwentyThree + twentyOneTwentyFour + twentyTwoTwentyFive + twentyThreeTwentySix + twentyFourTwentySeven + twentyFiveTwentyEight + twentySixTwentyNine + twentySevenThirty + twentyEightThirtyOne + twentyNineThirtyTwo + thirtyThirtyThree + thirtyOneThirtyFour + thirtyTwoThirtyFive + thirtyThreeThirtySix))

                    var betLength = bets.length;



                    bets.some((bet) => {
                        try {
                            setBets(prevBets => {
                                var updatedBets = [...prevBets]; // Copy the previous state

                                if (bet.number == "1" && bet.isDoubled == false) {
                                    updatedBets.push({ number: bet.number, amount: val1, isDoubled: true })
                                }
                                if (bet.number == "2" && bet.isDoubled == false) {
                                    updatedBets.push({ number: bet.number, amount: val2, isDoubled: true })
                                }
                                return updatedBets;
                            })
                        } catch (e) {
                            console.log(e)
                        }

                    })

                    const getImagePath = (selectedChip) => {
                        return chipImagePaths[selectedChip] || chipImagePaths['default'];
                    };

                    for (let i = 0; i <= 36; i++) {
                        if (eval(`val${i}`) !== 0) { // Dynamically checking val0, val1, ..., val36
                            chipSetters[i](prevChips => {
                                const imagePath = getImagePath(selectedChip);
                                return [...prevChips, imagePath];
                            });
                        }
                    }
                }

            }
        } else { }
    }

    const undoBets = () => {


        if (T2) {
            if (bets.length > 0) {

                if (bets[bets.length - 1].number == '0') {
                    if (val0 <= selectedChip) {
                        zeroRef.current.childNodes[1].style.display = "none"
                        zeroRef.current.childNodes[0].style.display = "block"
                    }
                    setVal0(val0 - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                } if (bets[bets.length - 1].number == '1') {
                    console.log(`value ${val1}`)
                    if (oneChips.length == 1) {

                        oneRef.current.childNodes[1].style.display = "none"
                        oneRef.current.childNodes[0].style.display = "block"
                    }

                    setVal1(val1 - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setoneChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == '2') {
                    if (twoChips.length == 1) {
                        twoRef.current.childNodes[1].style.display = "none"
                        twoRef.current.childNodes[0].style.display = "block"
                    }
                    setVal2(val2 - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    settwoChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == '3') {
                    if (threeChips.length == 1) {
                        threeRef.current.childNodes[1].style.display = "none"
                        threeRef.current.childNodes[0].style.display = "block"
                    }
                    setVal3(val3 - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setthreeChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == '4') {
                    if (fourChips.length == 1) {
                        fourRef.current.childNodes[1].style.display = "none"
                        fourRef.current.childNodes[0].style.display = "block"
                    }
                    setVal4(val4 - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setfourChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == '5') {
                    if (fiveChips.length == 1) {
                        fiveRef.current.childNodes[1].style.display = "none"
                        fiveRef.current.childNodes[0].style.display = "block"
                    }
                    setVal5(val5 - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setfiveChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == '6') {
                    if (sixChips.length == 1) {
                        sixRef.current.childNodes[1].style.display = "none"
                        sixRef.current.childNodes[0].style.display = "block"
                    }
                    setVal6(val6 - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setsixChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == '7') {
                    if (sevenChips.length == 1) {
                        sevenRef.current.childNodes[1].style.display = "none"
                        sevenRef.current.childNodes[0].style.display = "block"
                    }
                    setVal7(val7 - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setsevenChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == '8') {
                    if (eightChips.length == 1) {
                        eightRef.current.childNodes[1].style.display = "none"
                        eightRef.current.childNodes[0].style.display = "block"
                    }
                    setVal8(val8 - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    seteightChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == '9') {
                    if (nineChips.length == 1) {
                        nineRef.current.childNodes[1].style.display = "none"
                        nineRef.current.childNodes[0].style.display = "block"
                    }
                    setVal9(val9 - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setnineChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == '10') {
                    if (tenChips.length == 1) {
                        tenRef.current.childNodes[1].style.display = "none"
                        tenRef.current.childNodes[0].style.display = "block"
                    }
                    setVal10(val10 - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    settenChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == '11') {
                    if (elevenChips.length == 1) {
                        elevenRef.current.childNodes[1].style.display = "none"
                        elevenRef.current.childNodes[0].style.display = "block"
                    }
                    setVal11(val11 - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setelevenChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == '12') {
                    if (twelveChips.length == 1) {
                        twelveRef.current.childNodes[1].style.display = "none"
                        twelveRef.current.childNodes[0].style.display = "block"
                    }
                    setVal12(val12 - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    settwelveChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });

                } if (bets[bets.length - 1].number == '13') {
                    if (thirteenChips.length == 1) {
                        thirteenRef.current.childNodes[1].style.display = "none"
                        thirteenRef.current.childNodes[0].style.display = "block"
                    }
                    setVal13(val13 - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setthirteenChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == '14') {
                    if (fourteenChips.length == 1) {
                        fourteenRef.current.childNodes[1].style.display = "none"
                        fourteenRef.current.childNodes[0].style.display = "block"
                    }
                    setVal14(val14 - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setfourteenChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == '15') {
                    if (fifteenChips.length == 1) {
                        fifteenRef.current.childNodes[1].style.display = "none"
                        fifteenRef.current.childNodes[0].style.display = "block"
                    }
                    setVal15(val15 - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setfifteenChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == '16') {
                    if (sixteenChips.length == 1) {
                        sixteenRef.current.childNodes[1].style.display = "none"
                        sixteenRef.current.childNodes[0].style.display = "block"
                    }
                    setVal16(val16 - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setsixteenChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == '17') {
                    if (seventeenChips.length == 1) {
                        seventeenRef.current.childNodes[1].style.display = "none"
                        seventeenRef.current.childNodes[0].style.display = "block"
                    }
                    setVal17(val17 - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setseventeenChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == '18') {
                    if (eighteenChips.length == 1) {
                        eighteenRef.current.childNodes[1].style.display = "none"
                        eighteenRef.current.childNodes[0].style.display = "block"
                    }
                    setVal18(val18 - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    seteighteenChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == '19') {
                    if (nineteenChips.length == 1) {
                        nineteenRef.current.childNodes[1].style.display = "none"
                        nineteenRef.current.childNodes[0].style.display = "block"
                    }
                    setVal19(val19 - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setnineteenChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == '20') {
                    if (twentyChips.length == 1) {
                        twentyRef.current.childNodes[1].style.display = "none"
                        twentyRef.current.childNodes[0].style.display = "block"
                    }
                    setVal20(val20 - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    settwentyChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == '21') {
                    if (twentyOneChips.length == 1) {
                        twentyoneRef.current.childNodes[1].style.display = "none"
                        twentyoneRef.current.childNodes[0].style.display = "block"
                    }
                    setVal21(val21 - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    settwentyOneChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == '22') {
                    if (twentyTwoChips.length == 1) {
                        twentytwoRef.current.childNodes[1].style.display = "none"
                        twentytwoRef.current.childNodes[0].style.display = "block"
                    }
                    setVal22(val22 - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    settwentyTwoChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == '23') {
                    if (twentyThreeChips.length == 1) {
                        twentythreeRef.current.childNodes[1].style.display = "none"
                        twentythreeRef.current.childNodes[0].style.display = "block"
                    }
                    setVal23(val23 - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    settwentyThreeChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == '24') {
                    if (twentyFourChips.length == 1) {
                        twentyfourRef.current.childNodes[1].style.display = "none"
                        twentyfourRef.current.childNodes[0].style.display = "block"
                    }
                    setVal24(val24 - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    settwentyFourChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == '25') {
                    if (twentyFiveChips.length == 1) {
                        twentyfiveRef.current.childNodes[1].style.display = "none"
                        twentyfiveRef.current.childNodes[0].style.display = "block"
                    }
                    setVal25(val25 - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    settwentyFiveChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == '26') {
                    if (twentySixChips.length == 1) {
                        twentysixRef.current.childNodes[1].style.display = "none"
                        twentysixRef.current.childNodes[0].style.display = "block"
                    }
                    setVal26(val26 - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    settwentySixChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == '27') {
                    if (twentySevenChips.length == 1) {
                        twentysevenRef.current.childNodes[1].style.display = "none"
                        twentysevenRef.current.childNodes[0].style.display = "block"
                    }
                    setVal27(val27 - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    settwentySevenChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == '28') {
                    if (twentyEightChips.length == 1) {
                        twentyeightRef.current.childNodes[1].style.display = "none"
                        twentyeightRef.current.childNodes[0].style.display = "block"
                    }
                    setVal28(val28 - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    settwentyEightChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == '29') {
                    if (twentyNineChips.length == 1) {
                        twentynineRef.current.childNodes[1].style.display = "none"
                        twentynineRef.current.childNodes[0].style.display = "block"
                    }
                    setVal29(val29 - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    settwentyNineChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == '30') {
                    if (thirtyChips.length == 1) {
                        thirtyRef.current.childNodes[1].style.display = "none"
                        thirtyRef.current.childNodes[0].style.display = "block"
                    }
                    setVal30(val30 - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setthirtyChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == '31') {
                    if (thirtyOneChips.length == 1) {
                        thirtyoneRef.current.childNodes[1].style.display = "none"
                        thirtyoneRef.current.childNodes[0].style.display = "block"
                    }
                    setVal31(val31 - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setthirtyOneChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == '32') {
                    if (thirtyTwoChips.length == 1) {
                        thirtytwoRef.current.childNodes[1].style.display = "none"
                        thirtytwoRef.current.childNodes[0].style.display = "block"
                    }
                    setVal32(val32 - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setthirtyTwoChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == '33') {
                    if (thirtyThreeChips.length == 1) {
                        thirtythreeRef.current.childNodes[1].style.display = "none"
                        thirtythreeRef.current.childNodes[0].style.display = "block"
                    }
                    setVal33(val33 - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setthirtyThreeChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == '34') {
                    if (thirtyFourChips.length == 1) {
                        thirtyfourRef.current.childNodes[1].style.display = "none"
                        thirtyfourRef.current.childNodes[0].style.display = "block"
                    }
                    setVal34(val34 - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setthirtyFourChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == '35') {
                    if (thirtyFiveChips.length == 1) {
                        thirtyfiveRef.current.childNodes[1].style.display = "none"
                        thirtyfiveRef.current.childNodes[0].style.display = "block"
                    }
                    setVal35(val35 - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setthirtyFiveChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == '36') {
                    if (thirtySixChips.length == 1) {
                        thirtysixRef.current.childNodes[1].style.display = "none"
                        thirtysixRef.current.childNodes[0].style.display = "block"
                    }
                    setVal36(val36 - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setthirtySixChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == '1&2') {
                    if (oneTwoChips.length == 1) {
                        oneTwoRef.current.style.display = "none"
                    }
                    setOneTwo(oneTwo - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setOneTwoChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == '2&3') {
                    if (twoThreeChips.length == 1) {
                        twoThreeRef.current.style.display = "none"
                    }
                    setTwoThree(twoThree - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setTwoThreeChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == '4&5') {
                    if (fourFiveChips.length == 1) {
                        fourFiveRef.current.style.display = "none"
                    }
                    setFourFive(fourFive - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setFourFiveChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == '5&6') {
                    if (fiveSixChips.length == 1) {
                        fiveSixRef.current.style.display = "none"
                    }
                    setFiveSix(fiveSix - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setFiveSixChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == '7&8') {
                    if (sevenEightChips.length == 1) {
                        sevenEightRef.current.style.display = "none"
                    }
                    setSevenEight(sevenEight - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setSevenEightChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == '8&9') {
                    if (eightNineChips.length == 1) {
                        eightNineRef.current.style.display = "none"
                    }
                    setEightNine(eightNine - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setEightNineChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == '10&11') {
                    if (tenElevenChips.length == 1) {
                        tenElevenRef.current.style.display = "none"
                    }
                    setTenEleven(tenEleven - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setTenElevenChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == '11&12') {
                    if (elevenTwelveChips.length == 1) {
                        elevenTwelveRef.current.style.display = "none"
                    }
                    setElevenTwelve(elevenTwelve - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setElevenTwelveChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == '13&14') {
                    if (thirteenFourteenChips.length == 1) {
                        thirteenFourteenRef.current.style.display = "none"
                    }
                    setThirteenFourteen(thirteenFourteen - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setThirteenFourteenChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == '14&15') {
                    if (fourteenFifteenChips.length == 1) {
                        fourteenFifteenRef.current.style.display = "none"
                    }
                    setFourteenFifteen(fourteenFifteen - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setFourteenFifteenChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == '16&17') {
                    if (sixteenSeventeenChips.length == 1) {
                        sixteenSeventeenRef.current.style.display = "none"
                    }
                    setSixteenSeventeen(sixteenSeventeen - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setSixteenSeventeenChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == '17&18') {
                    if (seventeenEighteenChips.length == 1) {
                        seventeenEighteenRef.current.style.display = "none"
                    }
                    setSeventeenEighteen(seventeenEighteen - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setSeventeenEighteenChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == '19&20') {
                    if (nineteenTwentyChips.length == 1) {
                        nineteenTwentyRef.current.style.display = "none"
                    }
                    setNineteenTwenty(nineteenTwenty - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setNineteenTwentyChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == '20&21') {
                    if (twentyTwentyOneChips.length == 1) {
                        twentyTwentyOneRef.current.style.display = "none"
                    }
                    setTwentyTwentyOne(twentyTwentyOne - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setTwentyTwentyOneChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == '22&23') {
                    if (twentyTwoTwentyThreeChips.length == 1) {
                        twentyTwoTwentyThreeRef.current.style.display = "none"
                    }
                    setTwentyTwoTwentyThree(twentyTwoTwentyThree - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setTwentyTwoTwentyThreeChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == '23&24') {
                    if (twentyThreeTwentyFourChips.length == 1) {
                        twentyThreeTwentyFourRef.current.style.display = "none"
                    }
                    setTwentyThreeTwentyFour(twentyThreeTwentyFour - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setTwentyThreeTwentyFourChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == '25&26') {
                    if (twentyFiveTwentySixChips.length == 1) {
                        twentyFiveTwentySixRef.current.style.display = "none"
                    }
                    setTwentyFiveTwentySix(twentyFiveTwentySix - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setTwentyFiveTwentySixChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == '26&27') {
                    if (twentySixTwentySevenChips.length == 1) {
                        twentySixTwentySevenRef.current.style.display = "none"
                    }
                    setTwentySixTwentySeven(twentySixTwentySeven - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setTwentySixTwentySevenChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == '28&29') {
                    if (twentyEightTwentyNineChips.length == 1) {
                        twentyEightTwentyNineRef.current.style.display = "none"
                    }
                    setTwentyEightTwentyNine(twentyEightTwentyNine - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setTwentyEightTwentyNineChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == '29&30') {
                    if (twentyNineThirtyChips.length == 1) {
                        twentyNineThirtyRef.current.style.display = "none"
                    }
                    setTwentyNineThirty(twentyNineThirty - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setTwentyNineThirtyChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == '31&32') {
                    if (thirtyOneThirtyTwoChips.length == 1) {
                        thirtyOneThirtyTwoRef.current.style.display = "none"
                    }
                    setThirtyOneThirtyTwo(thirtyOneThirtyTwo - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setThirtyOneThirtyTwoChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == '32&33') {
                    if (thirtyTwoThirtyThree <= selectedChip) {
                        thirtyTwoThirtyThreeRef.current.style.display = "none"
                    }
                    setThirtyTwoThirtyThree(thirtyTwoThirtyThree - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setThirtyTwoThirtyThreeChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == '34&35') {
                    if (thirtyFourThirtyFiveChips.length == 1) {
                        thirtyFourThirtyFiveRef.current.style.display = "none"
                    }
                    setthirtyFourThirtyFive(thirtyFourThirtyFive - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setthirtyFourThirtyFiveChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == '35&36') {
                    if (thirtyFiveThirtySixChips.length == 1) {
                        thirtyFiveThirtySixRef.current.style.display = "none"
                    }
                    setThirtyFiveThirtySix(thirtyFiveThirtySix - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setBets([...bets, { number: "35&36", amount: selectedChip }])
                    setThirtyFiveThirtySixChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == '0&1') {
                    if (zeroOne <= selectedChip) {
                        zeroOneRef.current.style.display = "none"
                    }
                    setzeroOne(zeroOne - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setBets([...bets, { number: "0&1", amount: selectedChip }])
                } if (bets[bets.length - 1].number == '0&2') {
                    if (zeroTwo <= selectedChip) {
                        zeroTwoRef.current.style.display = "none"
                    }
                    setzeroTwo(zeroTwo - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setBets([...bets, { number: "0&2", amount: selectedChip }])
                } if (bets[bets.length - 1].number == '0&3') {
                    if (zeroThree <= selectedChip) {
                        zeroThreeRef.current.style.display = "none"
                    }
                    setzeroThree(zeroThree - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setBets([...bets, { number: "0&3", amount: selectedChip }])
                } if (bets[bets.length - 1].number == '1&4') {
                    if (oneFourChips.length == 1) {
                        oneFourRef.current.style.display = "none"
                    }
                    setoneFour(oneFour - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setBets([...bets, { number: "1&4", amount: selectedChip }])
                    setoneFourChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == '2&5') {
                    if (twoFiveChips.length == 1) {
                        twoFiveRef.current.style.display = "none"
                    }
                    settwoFive(twoFive - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setBets([...bets, { number: "2&5", amount: selectedChip }])
                    settwoFiveChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == '3&6') {
                    if (threeSixChips.length == 1) {
                        threeSixRef.current.style.display = "none"
                    }
                    setthreeSix(threeSix - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setBets([...bets, { number: "3&6", amount: selectedChip }])
                    setthreeSixChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == '4&7') {
                    if (fourSevenChips.length == 1) {
                        fourSevenRef.current.style.display = "none"
                    }
                    setfourSeven(fourSeven - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setBets([...bets, { number: "4&7", amount: selectedChip }])
                    setfourSevenChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == '5&8') {
                    if (fiveEightChips.length == 1) {
                        fiveEightRef.current.style.display = "none"
                    }
                    setfiveEight(fiveEight - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setBets([...bets, { number: "5&8", amount: selectedChip }])
                    setfiveEightChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == '6&9') {
                    if (sixNineChips.length == 1) {
                        sixNineRef.current.style.display = "none"
                    }
                    setsixNine(sixNine - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setBets([...bets, { number: "6&9", amount: selectedChip }])
                    setsixNineChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == '7&10') {
                    if (sevenTenChips.length == 1) {
                        sevenTenRef.current.style.display = "none"
                    }
                    setsevenTen(sevenTen - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setBets([...bets, { number: "7&10", amount: selectedChip }])
                    setsevenTenChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == '8&11') {
                    if (eightElevenChips.length == 1) {
                        eightElevenRef.current.style.display = "none"
                    }
                    seteightEleven(eightEleven - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setBets([...bets, { number: "8&11", amount: selectedChip }])
                    seteightElevenChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == '9&12') {
                    if (nineTwelveChips.length == 1) {
                        nineTwelveRef.current.style.display = "none"
                    }
                    setnineTwelve(nineTwelve - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setBets([...bets, { number: "9&12", amount: selectedChip }])
                    setnineTwelveChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == '10&13') {
                    if (tenThirteenChips.length == 1) {
                        tenThirteenRef.current.style.display = "none"
                    }
                    settenThirteen(tenThirteen - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setBets([...bets, { number: "10&13", amount: selectedChip }])
                    settenThirteenChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == '11&14') {
                    if (elevenFourteenChips.length == 1) {
                        elevenFourteenRef.current.style.display = "none"
                    }
                    setelevenFourteen(elevenFourteen - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setBets([...bets, { number: "11&14", amount: selectedChip }])
                    setelevenFourteenChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });

                } if (bets[bets.length - 1].number == '12&15') {
                    if (twelveFifteenChips.length == 1) {
                        twelveFifteenRef.current.style.display = "none"
                    }
                    settwelveFifteen(twelveFifteen - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setBets([...bets, { number: "12&15", amount: selectedChip }])
                    settwelveFifteenChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == '13&16') {
                    if (thirteenSixteenChips.length == 1) {
                        thirteenSixteenRef.current.style.display = "none"
                    }
                    setthirteenSixteen(thirteenSixteen - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setBets([...bets, { number: "13&16", amount: selectedChip }])
                    setThirteenSixteenChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == '14&17') {
                    if (fourteenSeventeen.length == 1) {
                        fourteenSeventeenRef.current.style.display = "none"
                    }
                    setfourteenSeventeen(fourteenSeventeen - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setBets([...bets, { number: "14&17", amount: selectedChip }])
                    setfourteenSeventeen(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == '15&18') {
                    if (fifteenEighteenChips.length == 1) {
                        fifteenEighteenRef.current.style.display = "none"
                    }
                    setfifteenEighteen(fifteenEighteen - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setBets([...bets, { number: "15&18", amount: selectedChip }])
                    setfourteenSeventeenChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == '16&19') {
                    if (sixteenNineteenChips.length == 1) {
                        sixteenNineteenRef.current.style.display = "none"
                    }
                    setsixteenNineteen(sixteenNineteen - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setBets([...bets, { number: "16&19", amount: selectedChip }])
                    setsixteenNineteenChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == '17&20') {
                    if (seventeenTwentyChips.length == 1) {
                        seventeenTwentyRef.current.style.display = "none"
                    }
                    setseventeenTwenty(seventeenTwenty - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setBets([...bets, { number: "17&20", amount: selectedChip }])
                    setseventeenTwentyChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == '18&21') {
                    if (eighteenTwentyOneChips.length == 1) {
                        thirtyFiveThirtySixRef.current.style.display = "none"
                    }
                    seteighteenTwentyOne(eighteenTwentyOne - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setBets([...bets, { number: "18&21", amount: selectedChip }])
                    seteighteenTwentyOneChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == '19&22') {
                    if (nineteenTwentyTwoChips.length == 1) {
                        nineteenTwentyTwoRef.current.style.display = "none"
                    }
                    setnineteenTwentyTwo(nineteenTwentyTwo - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setBets([...bets, { number: "19&22", amount: selectedChip }])
                    setnineteenTwentyTwoChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == '20&23') {
                    if (twentyTwentyThreeChips.length == 1) {
                        twentyTwentyThreeRef.current.style.display = "none"
                    }
                    settwentyTwentyThree(twentyTwentyThree - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setBets([...bets, { number: "20&23", amount: selectedChip }])
                    setTwentyTwentyThreeChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == '21&24') {
                    if (twentyOneTwentyFourChips.length == 1) {
                        twentyOneTwentyFourRef.current.style.display = "none"
                    }
                    setthreeSix(twentyOneTwentyFour - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setBets([...bets, { number: "21&24", amount: selectedChip }])
                    settwentyOneTwentyFourChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == '22&25') {
                    if (twentyTwoTwentyFiveChips.length == 1) {
                        twentyTwoTwentyFiveRef.current.style.display = "none"
                    }
                    settwentyTwoTwentyFive(twentyTwoTwentyFive - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setBets([...bets, { number: "22&25", amount: selectedChip }])
                    settwentyTwoTwentyFiveChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == '23&26') {
                    if (twentyThreeTwentySixChips.length == 1) {
                        twentyThreeTwentySixRef.current.style.display = "none"
                    }
                    settwentyThreeTwentySix(twentyThreeTwentySix - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setBets([...bets, { number: "23&26", amount: selectedChip }])
                    settwentyThreeTwentySixChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == '24&27') {
                    if (twentyFourTwentySevenChips.length == 1) {
                        twentyFourTwentySevenRef.current.style.display = "none"
                    }
                    settwentyFourTwentySeven(twentyFourTwentySeven - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setBets([...bets, { number: "24&27", amount: selectedChip }])
                    settwentyFourTwentySevenChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == '25&28') {
                    if (twentyFiveTwentyEightChips.length == 1) {
                        twentyFiveTwentyEightRef.current.style.display = "none"
                    }
                    settwentyFiveTwentyEight(twentyFiveTwentyEight - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setBets([...bets, { number: "25&28", amount: selectedChip }])
                    settwentyFiveTwentyEightChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == '26&29') {
                    if (twentySixTwentyNineChips.length == 1) {
                        twentySixTwentyNineRef.current.style.display = "none"
                    }
                    twentySixTwentyNine(twentySixTwentyNine - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setBets([...bets, { number: "26&29", amount: selectedChip }])
                    settwentySixTwentyNineChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == '27&30') {
                    if (twentySevenThirtyChips.length == 1) {
                        twentySevenThirtyRef.current.style.display = "none"
                    }
                    settwentySevenThirty(twentySevenThirty - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setBets([...bets, { number: "27&30", amount: selectedChip }])
                    settwentySevenThirtyChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == '28&31') {
                    if (twentyEightThirtyOneChips.length == 1) {
                        twentyEightThirtyOneRef.current.style.display = "none"
                    }
                    settwentyEightThirtyOne(twentyEightThirtyOne - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setBets([...bets, { number: "28&31", amount: selectedChip }])
                    settwentyEightThirtyOneChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == '29&32') {
                    if (twentyNineThirtyTwoChips.length == 1) {
                        twentyNineThirtyTwoRef.current.style.display = "none"
                    }
                    settwentyNineThirtyTwo(twentyNineThirtyTwo - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setBets([...bets, { number: "29&32", amount: selectedChip }])
                    settwentyNineThirtyTwoChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == '30&33') {
                    if (thirtyThirtyThree.length == 1) {
                        thirtyThirtyThreeRef.current.style.display = "none"
                    }
                    setthirtyThirtyThree(thirtyThirtyThree - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setBets([...bets, { number: "30&33", amount: selectedChip }])
                    setthirtyThirtyThreeChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == '31&34') {
                    if (thirtyOneThirtyFourChips.length == 1) {
                        thirtyOneThirtyFourRef.current.style.display = "none"
                    }
                    setthirtyOneThirtyFour(thirtyOneThirtyFour - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setBets([...bets, { number: "31&34", amount: selectedChip }])
                    setthirtyOneThirtyFourChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == '32&35') {
                    if (thirtyTwoThirtyFiveChips.length == 1) {
                        thirtyTwoThirtyFiveRef.current.style.display = "none"
                    }
                    setthirtyTwoThirtyFive(thirtyTwoThirtyFive - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setBets([...bets, { number: "32&35", amount: selectedChip }])
                    setthirtyTwoThirtyFiveChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });

                } if (bets[bets.length - 1].number == '33&36') {
                    if (thirtyThreeThirtySixChips.length == 1) {
                        thirtyThreeThirtySixRef.current.style.display = "none"
                    }
                    setthirtyThreeThirtySix(thirtyThreeThirtySix - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setBets([...bets, { number: "33&36", amount: selectedChip }])
                    setthirtyThreeThirtySixChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == 'firstFour') {
                    if (firstFourChips.length == 1) {
                        firstFourRef.current.style.display = "none"
                    }
                    setFirstFour(firstFour - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setFirstFourChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == 'secondFour') {
                    if (secondFourChips.length == 1) {
                        secondFourRef.current.style.display = "none"
                    }
                    setSecondFour(secondFour - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setSecondFourChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == 'thirdFour') {
                    if (thirdFourChips.length == 1) {
                        thirdFourRef.current.style.display = "none"
                    }
                    setThirdFour(thirdFour - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setThirdFourChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == 'fourthFour') {
                    if (fourthFourChips.length == 1) {
                        fourthFourRef.current.style.display = "none"
                    }
                    setFourthFour(fourthFour - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                } if (bets[bets.length - 1].number == 'fifthFour') {
                    if (fifthFourChips.length == 1) {
                        fifthFourRef.current.style.display = "none"
                    }
                    setFifthFour(fifthFour - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setFifthFourChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == 'sixthFour') {
                    if (sixthFourChips.length == 1) {
                        sixthFourRef.current.style.display = "none"
                    }
                    setSixthFour(sixthFour - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setSixthFourChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == 'seventhFour') {
                    if (seventhFourChips.length == 1) {
                        seventhFourRef.current.style.display = "none"
                    }
                    setSeventhFour(seventhFour - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setSeventhFourChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == 'eighthFour') {
                    if (eighthFourChips.length == 1) {
                        eighthFourRef.current.style.display = "none"
                    }
                    setEighthFour(eighthFour - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setEighthFourChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == 'ninthFour') {
                    if (ninthFourChips.length == 1) {
                        ninthFourRef.current.style.display = "none"
                    }
                    setNinthFour(ninthFour - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setNinthFourChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == 'tenthFour') {
                    if (tenthFourChips.length == 1) {
                        tenthFourRef.current.style.display = "none"
                    }
                    setTenthFour(tenthFour - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setTenthFourChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == 'eleventhFour') {
                    if (eleventhFourChips.length == 1) {
                        eleventhFourRef.current.style.display = "none"
                    }
                    setEleventhFour(eleventhFour - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setEleventhFourChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == 'twelfthFour') {
                    if (twelfthFourChips.length == 1) {
                        twelfthFourRef.current.style.display = "none"
                    }
                    setTwelfthFour(twelfthFour - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setTwelfthFourChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == 'thirteenthFour') {
                    if (thirteenthFourChips.length == 1) {
                        thirteenthFourRef.current.style.display = "none"
                    }
                    setThirteenthFour(thirteenthFour - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setThirteenthFourChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == 'fourteenthFour') {
                    if (fourteenthFourChips.length == 1) {
                        fourteenthFourRef.current.style.display = "none"
                    }
                    setFourteenthFour(fourteenthFour - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setFourteenthFourChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == 'fifteenthFour') {
                    if (fifteenthFourChips.length == 1) {
                        fifteenthFourRef.current.style.display = "none"
                    }
                    setFifteenthFour(fifteenthFour - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setFifteenthFourChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == 'sixteenthFour') {
                    if (sixteenthFourChips.length == 1) {
                        sixteenthFourRef.current.style.display = "none"
                    }
                    setSixteenthFour(sixteenthFour - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setSixteenthFourChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == 'seventeenthFour') {
                    if (seventeenthFourChips.length == 1) {
                        seventeenthFourRef.current.style.display = "none"
                    }
                    setSeventeenthFour(seventeenthFour - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setSeventeenthFourChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == 'eighteenthFour') {
                    if (eighteenthFourChips.length == 1) {
                        eighteenthFourRef.current.style.display = "none"
                    }
                    setEighteenthFour(eighteenthFour - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setEighteenthFourChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == 'nineteenthFour') {
                    if (nineteenthFourChips.length == 1) {
                        nineteenthFourRef.current.style.display = "none"
                    }
                    setNineteenthFour(nineteenthFour - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setNineteenthFourChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == 'twentiethFour') {
                    if (twentiethFourChips.length == 1) {
                        twentiethFourRef.current.style.display = "none"
                    }
                    setTwentiethFour(twentiethFour - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setTwentiethFourChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == 'twentyFirstFour') {
                    if (twentyFirstFourChips.length == 1) {
                        twentyFirstFourRef.current.style.display = "none"
                    }
                    setTwentyFirstFour(twentyFirstFour - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setTwentyFirstFourChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == 'twentySecondFour') {
                    if (twentySecondFourChips.length == 1) {
                        twentySecondFourRef.current.style.display = "none"
                    }
                    setTwentySecondFour(twentySecondFour - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setTwentySecondFourChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == 'firstSix') {
                    if (firstSixChips.length == 1) {
                        firstSixRef.current.style.display = "none"
                    }
                    setFirstSix(firstSix - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setFirstSixChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == 'secondSix') {
                    console.log("inside")
                    if (secondSixChips.length == 1) {
                        secondSixRef.current.style.display = "none"
                    }
                    setSecondSix(secondSix - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setSecondSixChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == 'thirdSix') {
                    if (thirdSixChips.length == 1) {
                        thirdSixRef.current.style.display = "none"
                    }
                    setThirdSix(thirdSix - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setThirdSixChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == 'fourthSix') {
                    if (fourthSixChips.length == 1) {
                        fourthSixRef.current.style.display = "none"
                    }
                    setFourthSix(fourthSix - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setFourthSixChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == 'fifthSix') {
                    if (fifthSixChips.length == 1) {
                        fifthSixRef.current.style.display = "none"
                    }
                    setFifthSix(fifthSix - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setFifthSixChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == 'sixthSix') {
                    if (sixthSixChips.length == 1) {
                        sixthSixRef.current.style.display = "none"
                    }
                    setSixthSix(sixthSix - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setSixthSixChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == 'seventhSix') {
                    if (seventhSixChips.length == 1) {
                        seventhSixRef.current.style.display = "none"
                    }
                    setSeventhSix(seventhSix - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setSeventhSixChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == 'eighthSix') {
                    if (eighthSixChips.length == 1) {
                        eighthSixRef.current.style.display = "none"
                    }
                    setEighthSix(eighthSix - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setEighthSixChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == 'ninthSix') {
                    if (ninthSixChips.length == 1) {
                        ninthSixRef.current.style.display = "none"
                    }
                    setNinthSix(ninthSix - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setNinthSixChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == 'tenthSix') {
                    if (tenthSixChips.length == 1) {
                        tenthSixRef.current.style.display = "none"
                    }
                    setTenthSix(tenthSix - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setTenthSixChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == 'eleventhSix') {
                    if (eleventhSixChips.length == 1) {
                        eleventhSixRef.current.style.display = "none"
                    }
                    setEleventhSix(eleventhSix - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setEleventhSixChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == 'col1') {
                    if (col1Chips.length == 1) {
                        col1Ref.current.childNodes[1].style.display = "none"
                        col1Ref.current.childNodes[0].style.display = "block"
                    }
                    setCol1(col1 - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setCol1Chips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == 'col2') {
                    if (col2Chips.length == 1) {
                        col2Ref.current.childNodes[1].style.display = "none"
                        col2Ref.current.childNodes[0].style.display = "block"
                    }
                    setCol2(col2 - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setCol2Chips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == 'col3') {
                    if (col3Chips.length == 1) {
                        col3Ref.current.childNodes[1].style.display = "none"
                        col3Ref.current.childNodes[0].style.display = "block"
                    }
                    setCol3(col3 - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setCol3Chips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == 'first12') {
                    if (first12Chips.length == 1) {
                        first12Ref.current.childNodes[1].style.display = "none"
                        first12Ref.current.childNodes[0].style.display = "block"
                    }
                    setFirst12(first12 - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setFirst12Chips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == 'mid12') {
                    if (mid12Chips.length == 1) {
                        mid12Ref.current.childNodes[1].style.display = "none"
                        mid12Ref.current.childNodes[0].style.display = "block"
                    }
                    setMid12(mid12 - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setMid12Chips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == 'last12') {
                    if (last12Chips.length == 1) {
                        last12Ref.current.childNodes[1].style.display = "none"
                        last12Ref.current.childNodes[0].style.display = "block"
                    }
                    setLast12(last12 - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setLast12Chips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });

                } if (bets[bets.length - 1].number == 'first18') {
                    if (first18Chips.length == 1) {
                        first18Ref.current.childNodes[1].style.display = "none"
                        first18Ref.current.childNodes[0].style.display = "block"
                    }
                    setFirst18(first18 - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setFirst18Chips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == 'last18') {
                    if (last18Chips.length == 1) {
                        last18Ref.current.childNodes[1].style.display = "none"
                        last18Ref.current.childNodes[0].style.display = "block"
                    }
                    setLast18(last18 - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setLast18Chips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == 'red') {
                    if (redChips.length == 1) {
                        redRef.current.childNodes[1].style.display = "none"
                        redRef.current.childNodes[0].style.display = "block"
                    }
                    setRed(red - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setRedChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == 'black') {
                    if (blackChips.length == 1) {
                        blackRef.current.childNodes[1].style.display = "none"
                        blackRef.current.childNodes[0].style.display = "block"
                    }
                    setBlack(black - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setBlackChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == 'even') {
                    if (evenChips.length == 1) {
                        evennRef.current.childNodes[1].style.display = "none"
                        evennRef.current.childNodes[0].style.display = "block"
                    }
                    setEven(even - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setEvenChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == 'odd') {
                    if (oddChips.length == 1) {
                        oddRef.current.childNodes[1].style.display = "none"
                        oddRef.current.childNodes[0].style.display = "block"
                    }
                    setOdd(odd - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setOddChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == 'firstThree') {
                    if (firstThreeChips.length == 1) {
                        firstThreeRef.current.style.display = "none"
                    }
                    setFirstThree(odd - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setFirstThreeChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == 'secondThree') {
                    if (secondThreeChips.length == 1) {
                        secondThreeRef.current.style.display = "none"
                    }
                    setSecondThree(secondThree - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setSecondThreeChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == 'thirdThree') {
                    if (thirdThreeChips.length == 1) {
                        thirdThreeRef.current.style.display = "none"
                    }
                    setThirdThree(thirdThree - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setThirdThreeChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == 'fourthThree') {
                    if (fourthThreeChips.length == 1) {
                        fourthThreeRef.current.style.display = "none"
                    }
                    setFourthThree(fourthThree - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setFourthThreeChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == 'fifthThree') {
                    if (fifthThreeChips.length == 1) {
                        fifthThreeRef.current.style.display = "none"
                    }
                    setFifthThree(fifthThree - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setFifthThreeChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == 'sixthThree') {
                    if (sixthThreeChips.length == 1) {
                        sixthThreeRef.current.style.display = "none"
                    }
                    setSixthThree(sixthThree - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setSixthThreeChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == 'seventhThree') {
                    if (seventhThreeChips.length == 1) {
                        seventhThreeRef.current.style.display = "none"
                    }
                    setSeventhThree(seventhThree - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setSeventhThreeChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == 'eighthThree') {
                    if (eighthThreeChips.length == 1) {
                        eighthThreeRef.current.style.display = "none"
                    }
                    setEighthThree(eighthThree - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setEighthThreeChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == 'ninthThree') {
                    if (ninthThreeChips.length == 1) {
                        ninthThreeRef.current.style.display = "none"
                    }
                    setNinthThree(ninthThree - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setNinthThreeChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == 'tenthThree') {
                    if (tenthThreeChips.length == 1) {
                        tenthThreeRef.current.style.display = "none"
                    }
                    setTenthThree(tenthThree - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setTenthThreeChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == 'eleventhThree') {
                    if (eleventhThreeChips.length == 1) {
                        eleventhThreeRef.current.style.display = "none"
                    }
                    setEleventhThree(eleventhThree - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setEleventhThreeChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == 'twelfthThree') {
                    if (twelfthThreeChips.length == 1) {
                        twelfthThreeRef.current.style.display = "none"
                    }
                    setTwelfthThree(twelfthThree - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setTwelfthThreeChips(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == 'thirteenthThree') {
                    if (thirteenthThreeChips.length == 1) {
                        thirteenthThreeRef.current.style.display = "none"
                    }
                    setThirteenthThree(thirteenthThree - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                    setThirteenthThree(prevChips => {
                        const newChips = prevChips.slice(0, -1);
                        return newChips;
                    });
                } if (bets[bets.length - 1].number == 'fourteenthThree') {
                    if (fourteenthThree <= selectedChip) {
                        fourteenthThreeRef.current.style.display = "none"
                    }
                    setFourteenthThree(fourteenthThree - bets[bets.length - 1].amount)
                    setAmount(amount + bets[bets.length - 1].amount)
                }
                setBets(bets.slice(0, -1))
                setBetHistoryValues(prevArray => prevArray.slice(0, -1));

            } else { }
        } else {
        }
    }

    const numberClick = async (num, chip) => {

        if (T2 == true) {
            if (amount >= selectedChip && amount != undefined && secondsLeft != 0) {
                if (num == 0) {

                    setInitialAmount(amount)

                    zeroRef.current.childNodes[0].style.display = "none"
                    zeroRef.current.childNodes[1].style.display = "block"

                    setzeroChips(prevChips => {
                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });

                    val0 == 0 ? setVal0(selectedChip) : setVal0(val0 + selectedChip)
                    setBets([...bets, { number: "0", amount: selectedChip }])
                    setBetHistoryValues([...betHistoryValues, { number: 0, amount: selectedChip }])

                    setAmount((amount - (val0 + selectedChip)) + val0)

                }
                if (num == 1) {
                    setInitialAmount(amount)

                    oneRef.current.childNodes[0].style.display = "none"
                    oneRef.current.childNodes[1].style.display = "block"

                    setoneChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });

                    val1 == 0 ? setVal1(selectedChip) : setVal1(val1 + selectedChip)
                    setBets([...bets, { number: "1", amount: selectedChip }])
                    setBetHistoryValues([...betHistoryValues, { number: 1, amount: selectedChip }])

                    setAmount((amount - (val1 + selectedChip)) + val1)

                }

                else if (num == 2) {
                    setInitialAmount(amount)

                    twoRef.current.childNodes[1].style.display = "block"
                    twoRef.current.childNodes[0].style.display = "none"

                    val2 == 0 ? setVal2(selectedChip) : setVal2(val2 + selectedChip)

                    setBets([...bets, { number: "2", amount: selectedChip }])
                    setBetHistoryValues([...betHistoryValues, { number: 2, amount: selectedChip }])

                    settwoChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    setAmount((amount - (val2 + selectedChip)) + val2)

                }

                else if (num == 3) {
                    setInitialAmount(amount)
                    threeRef.current.childNodes[1].style.display = "block"
                    threeRef.current.childNodes[0].style.display = "none"

                    val3 == 0 ? setVal3(selectedChip) : setVal3(val3 + selectedChip)
                    setBets([...bets, { number: "3", amount: selectedChip }])
                    setBetHistoryValues([...betHistoryValues, { number: 3, amount: selectedChip }])

                    setthreeChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });


                    setAmount((amount - (val3 + selectedChip)) + val3)
                    // await updateUserAmount((amount - (val3 + selectedChip)) + val3)

                    // console.log(initialAmount)
                }

                else if (num == 4) {
                    setInitialAmount(amount)
                    fourRef.current.childNodes[1].style.display = "block"
                    fourRef.current.childNodes[0].style.display = "none"

                    val4 == 0 ? setVal4(selectedChip) : setVal4(val4 + selectedChip)
                    setBets([...bets, { number: "4", amount: selectedChip }])
                    setBetHistoryValues([...betHistoryValues, { number: 4, amount: selectedChip }])

                    setfourChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });


                    setAmount((amount - (val4 + selectedChip)) + val4)
                    // await updateUserAmount((amount - (val4 + selectedChip)) + val4)
                    // console.log(initialAmount)
                }
                else if (num == 5) {
                    setInitialAmount(amount)
                    fiveRef.current.childNodes[1].style.display = "block"
                    fiveRef.current.childNodes[0].style.display = "none"


                    val5 == 0 ? setVal5(selectedChip) : setVal5(val5 + selectedChip)
                    setBets([...bets, { number: "5", amount: selectedChip }])
                    setBetHistoryValues([...betHistoryValues, { number: 5, amount: selectedChip }])

                    setfiveChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    setAmount((amount - (val5 + selectedChip)) + val5)
                }

                else if (num == 6) {
                    setInitialAmount(amount)
                    sixRef.current.childNodes[1].style.display = "block"
                    sixRef.current.childNodes[0].style.display = "none"

                    val6 == 0 ? setVal6(selectedChip) : setVal6(val6 + selectedChip)

                    setBets([...bets, { number: "6", amount: selectedChip }])
                    setBetHistoryValues([...betHistoryValues, { number: 6, amount: selectedChip }])

                    setsixChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    setAmount((amount - (val6 + selectedChip)) + val6)
                    // await updateUserAmount((amount - (val6 + selectedChip)) + val6)
                }
                else if (num == 7) {
                    setInitialAmount(amount)
                    sevenRef.current.childNodes[1].style.display = "block"
                    sevenRef.current.childNodes[0].style.display = "none"

                    val7 == 0 ? setVal7(selectedChip) : setVal7(val7 + selectedChip)

                    setAmount((amount - (val7 + selectedChip)) + val7)
                    // await updateUserAmount((amount - (val7 + selectedChip)) + val7)
                    setBets([...bets, { number: "7", amount: selectedChip }])
                    setsevenChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });

                    setBetHistoryValues([...betHistoryValues, { number: 7, amount: selectedChip }])

                }
                else if (num == 8) {
                    setInitialAmount(amount)
                    eightRef.current.childNodes[1].style.display = "block"
                    eightRef.current.childNodes[0].style.display = "none"

                    val8 == 0 ? setVal8(selectedChip) : setVal8(val8 + selectedChip)

                    setBets([...bets, { number: "8", amount: selectedChip }])
                    setBetHistoryValues([...betHistoryValues, { number: 8, amount: selectedChip }])
                    seteightChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });

                    setAmount((amount - (val8 + selectedChip)) + val8)
                    // await updateUserAmount((amount - (val8 + selectedChip)) + val8)
                }

                else if (num == 9) {
                    setInitialAmount(amount)
                    nineRef.current.childNodes[1].style.display = "block"
                    nineRef.current.childNodes[0].style.display = "none"

                    val9 == 0 ? setVal9(selectedChip) : setVal9(val9 + selectedChip)

                    setAmount((amount - (val9 + selectedChip)) + val9)
                    // await updateUserAmount((amount - (val9 + selectedChip)) + val9)
                    setBetHistoryValues([...betHistoryValues, { number: 9, amount: selectedChip }])
                    setnineChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    setBets([...bets, { number: "9", amount: selectedChip }])
                }
                else if (num == 10) {
                    setInitialAmount(amount)
                    tenRef.current.childNodes[1].style.display = "block"
                    tenRef.current.childNodes[0].style.display = "none"

                    val10 == 0 ? setVal10(selectedChip) : setVal10(val10 + selectedChip)

                    setAmount((amount - (val10 + selectedChip)) + val10)
                    // await updateUserAmount((amount - (val10 + selectedChip)) + val10)
                    setBetHistoryValues([...betHistoryValues, { number: 10, amount: selectedChip }])
                    settenChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    setBets([...bets, { number: "10", amount: selectedChip }])
                }
                else if (num == 11) {
                    setInitialAmount(amount)
                    elevenRef.current.childNodes[1].style.display = "block"
                    elevenRef.current.childNodes[0].style.display = "none"

                    val11 == 0 ? setVal11(selectedChip) : setVal11(val11 + selectedChip)


                    setelevenChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    setAmount((amount - (val11 + selectedChip)) + val11)
                    // await updateUserAmount((amount - (val11 + selectedChip)) + val11)

                    setBets([...bets, { number: "11", amount: selectedChip }])
                    setBetHistoryValues([...betHistoryValues, { number: 11, amount: selectedChip }])


                }
                else if (num == 12) {
                    setInitialAmount(amount)
                    twelveRef.current.childNodes[1].style.display = "block"
                    twelveRef.current.childNodes[0].style.display = "none"

                    val12 == 0 ? setVal12(selectedChip) : setVal12(val12 + selectedChip)

                    settwelveChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    setAmount((amount - (val12 + selectedChip)) + val12)
                    // await updateUserAmount((amount - (val12 + selectedChip)) + val12)

                    setBets([...bets, { number: "12", amount: selectedChip }])
                    setBetHistoryValues([...betHistoryValues, { number: 12, amount: selectedChip }])

                }
                else if (num == 13) {
                    setInitialAmount(amount)
                    thirteenRef.current.childNodes[1].style.display = "block"
                    thirteenRef.current.childNodes[0].style.display = "none"

                    val13 == 0 ? setVal13(selectedChip) : setVal13(val13 + selectedChip)

                    setthirteenChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    setAmount((amount - (val13 + selectedChip)) + val13)
                    // await updateUserAmount((amount - (val13 + selectedChip)) + val13)

                    setBets([...bets, { number: "13", amount: selectedChip }])
                    setBetHistoryValues([...betHistoryValues, { number: 13, amount: selectedChip }])

                }
                else if (num == 14) {
                    setInitialAmount(amount)
                    fourteenRef.current.childNodes[1].style.display = "block"
                    fourteenRef.current.childNodes[0].style.display = "none"

                    val14 == 0 ? setVal14(selectedChip) : setVal14(val14 + selectedChip)

                    setfourteenChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    setAmount((amount - (val14 + selectedChip)) + val14)
                    // await updateUserAmount((amount - (val14 + selectedChip)) + val14)

                    setBets([...bets, { number: "14", amount: selectedChip }])
                    setBetHistoryValues([...betHistoryValues, { number: 14, amount: selectedChip }])

                }
                else if (num == 15) {
                    setInitialAmount(amount)
                    fifteenRef.current.childNodes[1].style.display = "block"
                    fifteenRef.current.childNodes[0].style.display = "none"

                    val15 == 0 ? setVal15(selectedChip) : setVal15(val15 + selectedChip)


                    setfifteenChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    setAmount((amount - (val15 + selectedChip)) + val15)
                    // await updateUserAmount((amount - (val15 + selectedChip)) + val15)

                    setBets([...bets, { number: "15", amount: selectedChip }])
                    setBetHistoryValues([...betHistoryValues, { number: 15, amount: selectedChip }])

                }
                else if (num == 16) {
                    setInitialAmount(amount)
                    sixteenRef.current.childNodes[1].style.display = "block"
                    sixteenRef.current.childNodes[0].style.display = "none"

                    val16 == 0 ? setVal16(selectedChip) : setVal16(val16 + selectedChip)
                    setsixteenChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    setAmount((amount - (val16 + selectedChip)) + val16)
                    // await updateUserAmount((amount - (val16 + selectedChip)) + val16)

                    setBets([...bets, { number: "16", amount: selectedChip }])
                    setBetHistoryValues([...betHistoryValues, { number: 16, amount: selectedChip }])

                } else if (num == 17) {
                    setInitialAmount(amount)
                    seventeenRef.current.childNodes[1].style.display = "block"
                    seventeenRef.current.childNodes[0].style.display = "none"

                    val17 == 0 ? setVal17(selectedChip) : setVal17(val17 + selectedChip)
                    setseventeenChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    setAmount((amount - (val17 + selectedChip)) + val17)
                    // await updateUserAmount((amount - (val17 + selectedChip)) + val17)

                    setBets([...bets, { number: "17", amount: selectedChip }])
                    setBetHistoryValues([...betHistoryValues, { number: 17, amount: selectedChip }])

                } else if (num == 18) {
                    setInitialAmount(amount)
                    eighteenRef.current.childNodes[1].style.display = "block"
                    eighteenRef.current.childNodes[0].style.display = "none"

                    val18 == 0 ? setVal18(selectedChip) : setVal18(val18 + selectedChip)
                    seteighteenChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    setAmount((amount - (val18 + selectedChip)) + val18)
                    // await updateUserAmount((amount - (val18 + selectedChip)) + val18)

                    setBets([...bets, { number: "18", amount: selectedChip }])
                    setBetHistoryValues([...betHistoryValues, { number: 18, amount: selectedChip }])


                } else if (num == 19) {
                    setInitialAmount(amount)
                    nineteenRef.current.childNodes[1].style.display = "block"
                    nineteenRef.current.childNodes[0].style.display = "none"

                    val19 == 0 ? setVal19(selectedChip) : setVal19(val19 + selectedChip)

                    setnineteenChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    setAmount((amount - (val19 + selectedChip)) + val19)
                    // await updateUserAmount((amount - (val19 + selectedChip)) + val19)

                    setBets([...bets, { number: "19", amount: selectedChip }])
                    setBetHistoryValues([...betHistoryValues, { number: 19, amount: selectedChip }])

                } else if (num == 20) {
                    setInitialAmount(amount)
                    twentyRef.current.childNodes[1].style.display = "block"
                    twentyRef.current.childNodes[0].style.display = "none"

                    val20 == 0 ? setVal20(selectedChip) : setVal20(val20 + selectedChip)

                    settwentyChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    setAmount((amount - (val20 + selectedChip)) + val20)
                    // await updateUserAmount((amount - (val20 + selectedChip)) + val20)
                    setBetHistoryValues([...betHistoryValues, { number: 20, amount: selectedChip }])

                    setBets([...bets, { number: "20", amount: selectedChip }])
                } else if (num == 21) {
                    setInitialAmount(amount)
                    twentyoneRef.current.childNodes[1].style.display = "block"
                    twentyoneRef.current.childNodes[0].style.display = "none"

                    val21 == 0 ? setVal21(selectedChip) : setVal21(val21 + selectedChip)

                    setAmount((amount - (val21 + selectedChip)) + val21)
                    // await updateUserAmount((amount - (val21 + selectedChip)) + val21)

                    settwentyOneChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    setBets([...bets, { number: "21", amount: selectedChip }])
                    setBetHistoryValues([...betHistoryValues, { number: 21, amount: selectedChip }])

                } else if (num == 22) {
                    setInitialAmount(amount)
                    twentytwoRef.current.childNodes[1].style.display = "block"
                    twentytwoRef.current.childNodes[0].style.display = "none"

                    val22 == 0 ? setVal22(selectedChip) : setVal22(val22 + selectedChip)

                    settwentyTwoChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    setAmount((amount - (val22 + selectedChip)) + val22)
                    // await updateUserAmount((amount - (val22 + selectedChip)) + val22)

                    setBets([...bets, { number: "22", amount: selectedChip }])
                    setBetHistoryValues([...betHistoryValues, { number: 22, amount: selectedChip }])

                } else if (num == 23) {
                    setInitialAmount(amount)
                    twentythreeRef.current.childNodes[1].style.display = "block"
                    twentythreeRef.current.childNodes[0].style.display = "none"

                    val23 == 0 ? setVal23(selectedChip) : setVal23(val23 + selectedChip)

                    settwentyThreeChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    setAmount((amount - (val23 + selectedChip)) + val23)
                    // await updateUserAmount((amount - (val23 + selectedChip)) + val23)

                    setBets([...bets, { number: "23", amount: selectedChip }])
                    setBetHistoryValues([...betHistoryValues, { number: 23, amount: selectedChip }])

                } else if (num == 24) {
                    setInitialAmount(amount)
                    twentyfourRef.current.childNodes[1].style.display = "block"
                    twentyfourRef.current.childNodes[0].style.display = "none"

                    val24 == 0 ? setVal24(selectedChip) : setVal24(val24 + selectedChip)


                    settwentyFourChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    setAmount((amount - (val24 + selectedChip)) + val24)
                    // await updateUserAmount((amount - (val24 + selectedChip)) + val24)

                    setBets([...bets, { number: "24", amount: selectedChip }])
                    setBetHistoryValues([...betHistoryValues, { number: 24, amount: selectedChip }])

                } else if (num == 25) {
                    setInitialAmount(amount)
                    twentyfiveRef.current.childNodes[1].style.display = "block"
                    twentyfiveRef.current.childNodes[0].style.display = "none"

                    val25 == 0 ? setVal25(selectedChip) : setVal25(val25 + selectedChip)


                    settwentyFiveChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    setAmount((amount - (val25 + selectedChip)) + val25)
                    // await updateUserAmount((amount - (val25 + selectedChip)) + val25)

                    setBets([...bets, { number: "25", amount: selectedChip }])
                    setBetHistoryValues([...betHistoryValues, { number: 25, amount: selectedChip }])

                } else if (num == 26) {
                    setInitialAmount(amount)
                    twentysixRef.current.childNodes[1].style.display = "block"
                    twentysixRef.current.childNodes[0].style.display = "none"

                    val26 == 0 ? setVal26(selectedChip) : setVal26(val26 + selectedChip)

                    settwentySixChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    setAmount(amount - (val26 + selectedChip))


                    setBets([...bets, { number: "26", amount: selectedChip }])
                    // await updateUserAmount((amount - (val26 + selectedChip)) + val26)

                    setBetHistoryValues([...betHistoryValues, { number: 26, amount: selectedChip }])

                } else if (num == 27) {
                    setInitialAmount(amount)
                    twentysevenRef.current.childNodes[1].style.display = "block"
                    twentysevenRef.current.childNodes[0].style.display = "none"

                    val27 == 0 ? setVal27(selectedChip) : setVal27(val27 + selectedChip)
                    settwentySevenChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    setAmount((amount - (val27 + selectedChip)) + val27)
                    // await updateUserAmount((amount - (val27 + selectedChip)) + val27)

                    setBets([...bets, { number: "27", amount: selectedChip }])
                    setBetHistoryValues([...betHistoryValues, { number: 27, amount: selectedChip }])

                } else if (num == 28) {
                    setInitialAmount(amount)
                    twentyeightRef.current.childNodes[1].style.display = "block"
                    twentyeightRef.current.childNodes[0].style.display = "none"

                    val28 == 0 ? setVal28(selectedChip) : setVal28(val28 + selectedChip)

                    settwentyEightChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    setAmount((amount - (val28 + selectedChip)) + val28)
                    // await updateUserAmount((amount - (val28 + selectedChip)) + val28)

                    setBets([...bets, { number: "28", amount: selectedChip }])
                    setBetHistoryValues([...betHistoryValues, { number: 28, amount: selectedChip }])

                } else if (num == 29) {
                    setInitialAmount(amount)
                    twentynineRef.current.childNodes[1].style.display = "block"
                    twentynineRef.current.childNodes[0].style.display = "none"

                    val29 == 0 ? setVal29(selectedChip) : setVal29(val29 + selectedChip)

                    settwentyNineChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    setAmount((amount - (val29 + selectedChip)) + val29)
                    // await updateUserAmount((amount - (val29 + selectedChip)) + val29)

                    setBets([...bets, { number: "29", amount: selectedChip }])
                    setBetHistoryValues([...betHistoryValues, { number: 29, amount: selectedChip }])

                } else if (num == 30) {
                    setInitialAmount(amount)
                    thirtyRef.current.childNodes[1].style.display = "block"
                    thirtyRef.current.childNodes[0].style.display = "none"

                    val30 == 0 ? setVal30(selectedChip) : setVal30(val30 + selectedChip)

                    setthirtyChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    setAmount((amount - (val30 + selectedChip)) + val30)
                    // await updateUserAmount((amount - (val30 + selectedChip)) + val30)

                    setBets([...bets, { number: "30", amount: selectedChip }])
                    setBetHistoryValues([...betHistoryValues, { number: 30, amount: selectedChip }])
                } else if (num == 31) {
                    setInitialAmount(amount)
                    thirtyoneRef.current.childNodes[1].style.display = "block"
                    thirtyoneRef.current.childNodes[0].style.display = "none"

                    val31 == 0 ? setVal31(selectedChip) : setVal31(val31 + selectedChip)

                    setthirtyOneChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    setAmount((amount - (val31 + selectedChip)) + val31)
                    // await updateUserAmount((amount - (val31 + selectedChip)) + val31)

                    setBets([...bets, { number: "31", amount: selectedChip }])
                    setBetHistoryValues([...betHistoryValues, { number: 31, amount: selectedChip }])

                } else if (num == 32) {
                    setInitialAmount(amount)
                    thirtytwoRef.current.childNodes[1].style.display = "block"
                    thirtytwoRef.current.childNodes[0].style.display = "none"

                    val32 == 0 ? setVal32(selectedChip) : setVal32(val32 + selectedChip)

                    setthirtyTwoChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    setAmount((amount - (val32 + selectedChip)) + val32)
                    // await updateUserAmount((amount - (val32 + selectedChip)) + val32)

                    setBets([...bets, { number: "32", amount: selectedChip }])
                    setBetHistoryValues([...betHistoryValues, { number: 32, amount: selectedChip }])

                } else if (num == 33) {
                    setInitialAmount(amount)
                    thirtythreeRef.current.childNodes[1].style.display = "block"
                    thirtythreeRef.current.childNodes[0].style.display = "none"

                    val33 == 0 ? setVal33(selectedChip) : setVal33(val33 + selectedChip)

                    setthirtyThreeChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });

                    setAmount((amount - (val33 + selectedChip)) + val33)
                    // await updateUserAmount((amount - (val33 + selectedChip)) + val33)

                    setBets([...bets, { number: "33", amount: selectedChip }])
                    setBetHistoryValues([...betHistoryValues, { number: 33, amount: selectedChip }])

                } else if (num == 34) {
                    setInitialAmount(amount)
                    thirtyfourRef.current.childNodes[1].style.display = "block"
                    thirtyfourRef.current.childNodes[0].style.display = "none"

                    val34 == 0 ? setVal34(selectedChip) : setVal15(val34 + selectedChip)

                    setthirtyFourChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    setAmount((amount - (val34 + selectedChip)) + val34)
                    // await updateUserAmount((amount - (val34 + selectedChip)) + val34)


                    setBets([...bets, { number: "34", amount: selectedChip }])
                    setBetHistoryValues([...betHistoryValues, { number: 34, amount: selectedChip }])

                }
                else if (num == 35) {
                    setInitialAmount(amount)
                    thirtyfiveRef.current.childNodes[1].style.display = "block"
                    thirtyfiveRef.current.childNodes[0].style.display = "none"

                    val35 == 0 ? setVal35(selectedChip) : setVal35(val35 + selectedChip)

                    setthirtyFiveChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    setAmount((amount - (val35 + selectedChip)) + val35)
                    // await updateUserAmount((amount - (val35 + selectedChip)) + val35)

                    setBets([...bets, { number: "35", amount: selectedChip }])
                    setBetHistoryValues([...betHistoryValues, { number: 35, amount: selectedChip }])

                } else if (num == 36) {
                    setInitialAmount(amount)
                    thirtysixRef.current.childNodes[1].style.display = "block"
                    thirtysixRef.current.childNodes[0].style.display = "none"

                    val36 == 0 ? setVal36(selectedChip) : setVal36(val36 + selectedChip)

                    setthirtySixChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    setAmount((amount - (val36 + selectedChip)) + val36)
                    // await updateUserAmount((amount - (val36 + selectedChip)) + val36)

                    setBets([...bets, { number: "36", amount: selectedChip }])
                    setBetHistoryValues([...betHistoryValues, { number: 36, amount: selectedChip }])

                } else if (num == '1&2') {

                    setAmount((amount - (oneTwo + selectedChip)) + oneTwo)
                    // await updateUserAmount((amount - (oneTwo + selectedChip)) + oneTwo)

                    setOneTwoChips(prevChips => {
                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' : '/coin4.png';

                        return [...prevChips, imagePath];
                    });

                    // oneTwoRef.current.style.backgroundImage = `url("${oneTwoChips[oneTwoChips.length - 1]}")`
                    // oneTwoRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : selectedChip == 100 ? 'url("/coin3.png")' : selectedChip == 500 ? 'url("/coin4.png")' : 'url("/coin4.png")'

                    oneTwoRef.current.style.backgroundSize = 'cover';
                    oneTwoRef.current.style.width = '30px';
                    oneTwoRef.current.style.height = '30px';
                    oneTwoRef.current.style.zIndex = '100';
                    oneTwo == 0 ? setOneTwo(selectedChip) : setOneTwo(oneTwo + selectedChip)
                    setBets([...bets, { number: "1&2", amount: selectedChip }])
                    setBetHistoryValues([...betHistoryValues, { number: 12, amount: selectedChip }])

                } else if (num == '2&3') {

                    setAmount((amount - (twoThree + selectedChip)) + twoThree)
                    // await updateUserAmount((amount - (twoThree + selectedChip)) + twoThree)
                    setTwoThreeChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    // twoThreeRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    twoThreeRef.current.style.backgroundSize = 'cover';
                    twoThreeRef.current.style.width = '30px';
                    twoThreeRef.current.style.height = '30px';
                    twoThreeRef.current.style.zIndex = '100';

                    // twoThreeRef.current.style.backgroundColor = "white"

                    twoThree == 0 ? setTwoThree(selectedChip) : setTwoThree(twoThree + selectedChip)
                    setBets([...bets, { number: "2&3", amount: selectedChip }])
                    setBetHistoryValues([...betHistoryValues, { number: 23, amount: selectedChip }])

                } else if (num == '4&5') {
                    setAmount((amount - (fourFive + selectedChip)) + fourFive)
                    // await updateUserAmount((amount - (fourFive + selectedChip)) + fourFive)

                    setFourFiveChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    // fourFiveRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    fourFiveRef.current.style.backgroundSize = 'cover';
                    fourFiveRef.current.style.width = '30px';
                    fourFiveRef.current.style.height = '30px';
                    fourFiveRef.current.style.zIndex = '100';

                    // fourFiveRef.current.style.border = "2px solid green"

                    fourFive == 0 ? setFourFive(selectedChip) : setFourFive(fourFive + selectedChip)
                    setBets([...bets, { number: "4&5", amount: selectedChip }])


                } else if (num == '5&6') {
                    setAmount((amount - (fiveSix + selectedChip)) + fiveSix)
                    // await updateUserAmount((amount - (fiveSix + selectedChip)) + fiveSix)
                    setFiveSixChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    // fiveSixRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    fiveSixRef.current.style.backgroundSize = 'cover';
                    fiveSixRef.current.style.width = '30px';
                    fiveSixRef.current.style.height = '30px';
                    fiveSixRef.current.style.zIndex = '100';

                    // fiveSixRef.current.style.backgroundColor = "white"

                    fiveSix == 0 ? setFiveSix(selectedChip) : setFiveSix(fiveSix + selectedChip)
                    setBets([...bets, { number: "5&6", amount: selectedChip }])
                } else if (num == '7&8') {
                    setAmount((amount - (sevenEight + selectedChip)) + sevenEight)
                    // await updateUserAmount((amount - (sevenEight + selectedChip)) + sevenEight)


                    setSevenEightChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });

                    sevenEightRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    sevenEightRef.current.style.backgroundSize = 'cover';
                    sevenEightRef.current.style.width = '30px';
                    sevenEightRef.current.style.height = '30px';
                    sevenEightRef.current.style.zIndex = '100';



                    // sevenEightRef.current.style.backgroundColor = "white"

                    sevenEight == 0 ? setSevenEight(selectedChip) : setSevenEight(sevenEight + selectedChip)

                    setBets([...bets, { number: "7&8", amount: selectedChip }])
                } else if (num == '8&9') {
                    setAmount((amount - (eightNine + selectedChip)) + eightNine)
                    // await updateUserAmount((amount - (eightNine + selectedChip)) + eightNine)

                    setEightNineChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });

                    eightNineRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    eightNineRef.current.style.backgroundSize = 'cover';
                    eightNineRef.current.style.width = '30px';
                    eightNineRef.current.style.height = '30px';
                    eightNineRef.current.style.zIndex = '100';

                    // eightNineRef.current.style.backgroundColor = "white"

                    eightNine == 0 ? setEightNine(selectedChip) : setEightNine(eightNine + selectedChip)
                    setBets([...bets, { number: "8&9", amount: selectedChip }])
                } else if (num == '10&11') {
                    setTenElevenChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';
                        return [...prevChips, imagePath];
                    });
                    setAmount((amount - (tenEleven + selectedChip)) + tenEleven)
                    // await updateUserAmount((amount - (tenEleven + selectedChip)) + tenEleven)

                    tenElevenRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    tenElevenRef.current.style.backgroundSize = 'cover';
                    tenElevenRef.current.style.width = '30px';
                    tenElevenRef.current.style.height = '30px';
                    tenElevenRef.current.style.zIndex = '100';

                    // tenElevenRef.current.style.backgroundColor = "white"

                    tenEleven == 0 ? setTenEleven(selectedChip) : setTenEleven(tenEleven + selectedChip)
                    setBets([...bets, { number: "10&11", amount: selectedChip }])
                } else if (num == '11&12') {
                    setElevenTwelveChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    setAmount((amount - (elevenTwelve + selectedChip)) + elevenTwelve)
                    // await updateUserAmount((amount - (elevenTwelve + selectedChip)) + elevenTwelve)

                    elevenTwelveRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    elevenTwelveRef.current.style.backgroundSize = 'cover';
                    elevenTwelveRef.current.style.width = '30px';
                    elevenTwelveRef.current.style.height = '30px';
                    elevenTwelveRef.current.style.zIndex = '100';

                    // elevenTwelveRef.current.style.backgroundColor = "white"

                    elevenTwelve == 0 ? setElevenTwelve(selectedChip) : setElevenTwelve(elevenTwelve + selectedChip)
                    setBets([...bets, { number: "11&12", amount: selectedChip }])
                } else if (num == '13&14') {
                    setThirteenFourteenChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    setAmount((amount - (thirteenFourteen + selectedChip)) + thirteenFourteen)
                    // await updateUserAmount((amount - (thirteenFourteen + selectedChip)) + thirteenFourteen)

                    thirteenFourteenRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    thirteenFourteenRef.current.style.backgroundSize = 'cover';
                    thirteenFourteenRef.current.style.width = '30px';
                    thirteenFourteenRef.current.style.height = '30px';
                    thirteenFourteenRef.current.style.zIndex = '100';

                    // thirteenFourteenRef.current.style.backgroundColor = "white"

                    thirteenFourteen == 0 ? setThirteenFourteen(selectedChip) : setThirteenFourteen(thirteenFourteen + selectedChip)
                    setBets([...bets, { number: "13&14", amount: selectedChip }])
                } else if (num == '14&15') {
                    setFourteenFifteenChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    setAmount((amount - (fourteenFifteen + selectedChip)) + fourteenFifteen)
                    // await updateUserAmount((amount - (fourteenFifteen + selectedChip)) + fourteenFifteen)
                    fourteenFifteenRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    fourteenFifteenRef.current.style.backgroundSize = 'cover';
                    fourteenFifteenRef.current.style.width = '30px';
                    fourteenFifteenRef.current.style.height = '30px';
                    fourteenFifteenRef.current.style.zIndex = '100';

                    fourteenFifteen == 0 ? setFourteenFifteen(selectedChip) : setFourteenFifteen(fourteenFifteen + selectedChip)
                    setBets([...bets, { number: "14&15", amount: selectedChip }])
                } else if (num == '16&17') {
                    setSixteenSeventeenChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    setAmount((amount - (sixteenSeventeen + selectedChip)) + sixteenSeventeen)
                    // await updateUserAmount((amount - (sixteenSeventeen + selectedChip)) + sixteenSeventeen)

                    sixteenSeventeenRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    sixteenSeventeenRef.current.style.backgroundSize = 'cover';
                    sixteenSeventeenRef.current.style.width = '30px';
                    sixteenSeventeenRef.current.style.height = '30px';
                    sixteenSeventeenRef.current.style.zIndex = '100';

                    // sixteenSeventeenRef.current.style.backgroundColor = "white"

                    sixteenSeventeen == 0 ? setSixteenSeventeen(selectedChip) : setSixteenSeventeen(sixteenSeventeen + selectedChip)
                    setBets([...bets, { number: "16&17", amount: selectedChip }])
                } else if (num == '17&18') {
                    setSeventeenEighteenChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    setAmount((amount - (seventeenEighteen + selectedChip)) + seventeenEighteen)
                    // await updateUserAmount((amount - (seventeenEighteen + selectedChip)) + seventeenEighteen)

                    // seventeenEighteenRef.current.style.backgroundColor = "white"

                    seventeenEighteenRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    seventeenEighteenRef.current.style.backgroundSize = 'cover';
                    seventeenEighteenRef.current.style.width = '30px';
                    seventeenEighteenRef.current.style.height = '30px';
                    seventeenEighteenRef.current.style.zIndex = '100';

                    seventeenEighteen == 0 ? setSeventeenEighteen(selectedChip) : setSeventeenEighteen(seventeenEighteen + selectedChip)
                    setBets([...bets, { number: "17&18", amount: selectedChip }])
                } else if (num == '19&20') {
                    setNineteenTwentyChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    setAmount((amount - (nineteenTwenty + selectedChip)) + nineteenTwenty)
                    // await updateUserAmount((amount - (nineteenTwenty + selectedChip)) + nineteenTwenty)

                    // nineteenTwentyRef.current.style.backgroundColor = "white"

                    nineteenTwentyRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    nineteenTwentyRef.current.style.backgroundSize = 'cover';
                    nineteenTwentyRef.current.style.width = '30px';
                    nineteenTwentyRef.current.style.height = '30px';
                    nineteenTwentyRef.current.style.zIndex = '100';

                    nineteenTwenty == 0 ? setNineteenTwenty(selectedChip) : setNineteenTwenty(nineteenTwenty + selectedChip)
                    setBets([...bets, { number: "19&20", amount: selectedChip }])
                } else if (num == '20&21') {
                    setTwentyTwentyOneChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    setAmount((amount - (twentyTwentyOne + selectedChip)) + twentyTwentyOne)
                    // await updateUserAmount((amount - (twentyTwentyOne + selectedChip)) + twentyTwentyOne)

                    // twentyTwentyOneRef.current.style.backgroundColor = "white"

                    twentyTwentyOneRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    twentyTwentyOneRef.current.style.backgroundSize = 'cover';
                    twentyTwentyOneRef.current.style.width = '30px';
                    twentyTwentyOneRef.current.style.height = '30px';
                    twentyTwentyOneRef.current.style.zIndex = '100';

                    twentyTwentyOne == 0 ? setTwentyTwentyOne(selectedChip) : setTwentyTwentyOne(twentyTwentyOne + selectedChip)
                    setBets([...bets, { number: "20&21", amount: selectedChip }])
                } else if (num == '22&23') {
                    setTwentyTwoTwentyThreeChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    setAmount((amount - (twentyTwoTwentyThree + selectedChip)) + twentyTwoTwentyThree)
                    // await updateUserAmount((amount - (twentyTwoTwentyThree + selectedChip)) + twentyTwoTwentyThree)

                    twentyTwoTwentyThreeRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    twentyTwoTwentyThreeRef.current.style.backgroundSize = 'cover';
                    twentyTwoTwentyThreeRef.current.style.width = '30px';
                    twentyTwoTwentyThreeRef.current.style.height = '30px';
                    twentyTwoTwentyThreeRef.current.style.zIndex = '100';

                    twentyTwoTwentyThree == 0 ? setTwentyTwoTwentyThree(selectedChip) : setTwentyTwoTwentyThree(twentyTwoTwentyThree + selectedChip)
                    setBets([...bets, { number: "22&23", amount: selectedChip }])
                } else if (num == '23&24') {
                    setTwentyThreeTwentyFourChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    setAmount((amount - (twentyThreeTwentyFour + selectedChip)) + twentyThreeTwentyFour)
                    // await updateUserAmount((amount - (twentyThreeTwentyFour + selectedChip)) + twentyThreeTwentyFour)

                    twentyThreeTwentyFourRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    twentyThreeTwentyFourRef.current.style.backgroundSize = 'cover';
                    twentyThreeTwentyFourRef.current.style.width = '30px';
                    twentyThreeTwentyFourRef.current.style.height = '30px';
                    twentyThreeTwentyFourRef.current.style.zIndex = '100';
                    // twentyThreeTwentyFourRef.current.style.backgroundColor = "white"

                    twentyThreeTwentyFour == 0 ? setTwentyThreeTwentyFour(selectedChip) : setTwentyThreeTwentyFour(twentyThreeTwentyFour + selectedChip)
                    setBets([...bets, { number: "23&24", amount: selectedChip }])
                } else if (num == '25&26') {
                    setTwentyFiveTwentySixChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    setAmount((amount - (twentyFiveTwentySix + selectedChip)) + twentyFiveTwentySix)
                    // await updateUserAmount((amount - (twentyFiveTwentySix + selectedChip)) + twentyFiveTwentySix)

                    // twentyFiveTwentySixRef.current.style.backgroundColor = "white"

                    twentyFiveTwentySixRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    twentyFiveTwentySixRef.current.style.backgroundSize = 'cover';
                    twentyFiveTwentySixRef.current.style.width = '30px';
                    twentyFiveTwentySixRef.current.style.height = '30px';
                    twentyFiveTwentySixRef.current.style.zIndex = '100';

                    twentyFiveTwentySix == 0 ? setTwentyFiveTwentySix(selectedChip) : setTwentyFiveTwentySix(twentyFiveTwentySix + selectedChip)
                    setBets([...bets, { number: "25&26", amount: selectedChip }])
                } else if (num == '26&27') {
                    setTwentySixTwentySevenChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    setAmount((amount - (twentySixTwentySeven + selectedChip)) + twentySixTwentySeven)
                    // await updateUserAmount((amount - (twentySixTwentySeven + selectedChip)) + twentySixTwentySeven)

                    // twentySixTwentySevenRef.current.style.backgroundColor = "white"

                    twentySixTwentySevenRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    twentySixTwentySevenRef.current.style.backgroundSize = 'cover';
                    twentySixTwentySevenRef.current.style.width = '30px';
                    twentySixTwentySevenRef.current.style.height = '30px';
                    twentySixTwentySevenRef.current.style.zIndex = '100';

                    twentySixTwentySeven == 0 ? setTwentySixTwentySeven(selectedChip) : setTwentySixTwentySeven(twentySixTwentySeven + selectedChip)
                    setBets([...bets, { number: "26&27", amount: selectedChip }])
                } else if (num == '28&29') {
                    setTwentyEightTwentyNineChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    setAmount((amount - (twentyEightTwentyNine + selectedChip)) + twentyEightTwentyNine)
                    // await updateUserAmount((amount - (twentyEightTwentyNine + selectedChip)) + twentyEightTwentyNine)
                    // twentyEightTwentyNineRef.current.style.backgroundColor = "white"

                    twentyEightTwentyNineRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    twentyEightTwentyNineRef.current.style.backgroundSize = 'cover';
                    twentyEightTwentyNineRef.current.style.width = '30px';
                    twentyEightTwentyNineRef.current.style.height = '30px';
                    twentyEightTwentyNineRef.current.style.zIndex = '100';

                    twentyEightTwentyNine == 0 ? setTwentyEightTwentyNine(selectedChip) : setTwentyEightTwentyNine(twentyEightTwentyNine + selectedChip)
                    setBets([...bets, { number: "28&29", amount: selectedChip }])
                } else if (num == '29&30') {
                    setTwentyNineThirtyChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    setAmount((amount - (twentyNineThirty + selectedChip)) + twentyNineThirty)
                    // await updateUserAmount((amount - (twentyNineThirty + selectedChip)) + twentyNineThirty)
                    // twentyNineThirtyRef.current.style.backgroundColor = "white"
                    twentyNineThirtyRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    twentyNineThirtyRef.current.style.backgroundSize = 'cover';
                    twentyNineThirtyRef.current.style.width = '30px';
                    twentyNineThirtyRef.current.style.height = '30px';
                    twentyNineThirtyRef.current.style.zIndex = '100';

                    twentyNineThirty == 0 ? setTwentyNineThirty(selectedChip) : setTwentyNineThirty(twentyNineThirty + selectedChip)
                    setBets([...bets, { number: "29&30", amount: selectedChip }])
                } else if (num == '31&32') {
                    setThirtyOneThirtyTwoChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    setAmount((amount - (thirtyOneThirtyTwo + selectedChip)) + thirtyOneThirtyTwo)
                    // await updateUserAmount((amount - (thirtyOneThirtyTwo + selectedChip)) + thirtyOneThirtyTwo)

                    thirtyOneThirtyTwoRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    thirtyOneThirtyTwoRef.current.style.backgroundSize = 'cover';
                    thirtyOneThirtyTwoRef.current.style.width = '30px';
                    thirtyOneThirtyTwoRef.current.style.height = '30px';
                    thirtyOneThirtyTwoRef.current.style.zIndex = '100';
                    // thirtyOneThirtyTwoRef.current.style.backgroundColor = "white"

                    thirtyOneThirtyTwo == 0 ? setThirtyOneThirtyTwo(selectedChip) : setThirtyOneThirtyTwo(thirtyOneThirtyTwo + selectedChip)
                    setBets([...bets, { number: "31&32", amount: selectedChip }])
                } else if (num == '32&33') {
                    setThirtyTwoThirtyThreeChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    setAmount((amount - (thirtyTwoThirtyThree + selectedChip)) + thirtyTwoThirtyThree)
                    // await updateUserAmount((amount - (thirtyTwoThirtyThree + selectedChip)) + thirtyTwoThirtyThree)

                    thirtyTwoThirtyThreeRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    thirtyTwoThirtyThreeRef.current.style.backgroundSize = 'cover';
                    thirtyTwoThirtyThreeRef.current.style.width = '30px';
                    thirtyTwoThirtyThreeRef.current.style.height = '30px';
                    thirtyTwoThirtyThreeRef.current.style.zIndex = '100';

                    // thirtyTwoThirtyThreeRef.current.style.backgroundColor = "white"

                    thirtyTwoThirtyThree == 0 ? setThirtyTwoThirtyThree(selectedChip) : setThirtyTwoThirtyThree(thirtyTwoThirtyThree + selectedChip)
                    setBets([...bets, { number: "32&33", amount: selectedChip }])
                } else if (num == '34&35') {
                    setthirtyFourThirtyFiveChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    setAmount((amount - (thirtyFourThirtyFive + selectedChip)) + thirtyFourThirtyFive)
                    // await updateUserAmount((amount - (thirtyFourThirtyFive + selectedChip)) + thirtyFourThirtyFive)
                    thirtyFourThirtyFiveRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    thirtyFourThirtyFiveRef.current.style.backgroundSize = 'cover';
                    thirtyFourThirtyFiveRef.current.style.width = '30px';
                    thirtyFourThirtyFiveRef.current.style.height = '30px';
                    thirtyFourThirtyFiveRef.current.style.zIndex = '100';
                    // thirtyFourThirtyFiveRef.current.style.backgroundColor = "white"

                    thirtyFourThirtyFive == 0 ? setthirtyFourThirtyFive(selectedChip) : setthirtyFourThirtyFive(thirtyFourThirtyFive + selectedChip)
                    setBets([...bets, { number: "34&35", amount: selectedChip }])
                } else if (num == '35&36') {
                    setThirtyFiveThirtySixChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    setAmount((amount - (thirtyFiveThirtySix + selectedChip)) + thirtyFiveThirtySix)
                    // await updateUserAmount((amount - (thirtyFiveThirtySix + selectedChip)) + thirtyFiveThirtySix)

                    thirtyFiveThirtySixRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    thirtyFiveThirtySixRef.current.style.backgroundSize = 'cover';
                    thirtyFiveThirtySixRef.current.style.width = '30px';
                    thirtyFiveThirtySixRef.current.style.height = '30px';
                    thirtyFiveThirtySixRef.current.style.zIndex = '100';

                    // thirtyFiveThirtySixRef.current.style.backgroundColor = "white"

                    thirtyFiveThirtySix == 0 ? setThirtyFiveThirtySix(selectedChip) : setThirtyFiveThirtySix(thirtyFiveThirtySix + selectedChip)
                    setBets([...bets, { number: "35&36", amount: selectedChip }])
                } else if (num == '0&1') {
                    setAmount((amount - (zeroOne + selectedChip)) + zeroOne)
                    // await updateUserAmount((amount - (zeroOne + selectedChip)) + zeroOne)
                    // zeroOneRef.current.style.backgroundColor = "white"

                    setzeroOneChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });

                    zeroOneRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    zeroOneRef.current.style.backgroundSize = 'cover';
                    zeroOneRef.current.style.width = '30px';
                    zeroOneRef.current.style.height = '30px';
                    zeroOneRef.current.style.zIndex = '100';

                    zeroOne == 0 ? setzeroOne(selectedChip) : setzeroOne(zeroOne + selectedChip)
                    setBets([...bets, { number: "0&1", amount: selectedChip }])
                } else if (num == '0&2') {
                    setAmount((amount - (zeroTwo + selectedChip)) + zeroTwo)
                    // await updateUserAmount((amount - (zeroTwo + selectedChip)) + zeroTwo)

                    setzeroTwoChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    zeroTwoRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    zeroTwoRef.current.style.backgroundSize = 'cover';
                    zeroTwoRef.current.style.width = '30px';
                    zeroTwoRef.current.style.height = '30px';
                    zeroTwoRef.current.style.zIndex = '100';

                    // zeroTwoRef.current.style.backgroundColor = "white"

                    zeroTwo == 0 ? setzeroTwo(selectedChip) : setzeroTwo(zeroTwo + selectedChip)
                    setBets([...bets, { number: "0&2", amount: selectedChip }])
                } else if (num == '0&3') {
                    setAmount((amount - (zeroThree + selectedChip)) + zeroThree)
                    // await updateUserAmount((amount - (zeroThree + selectedChip)) + zeroThree)

                    setzeroThreeChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });

                    zeroThreeRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    zeroThreeRef.current.style.backgroundSize = 'cover';
                    zeroThreeRef.current.style.width = '30px';
                    zeroThreeRef.current.style.height = '30px';
                    zeroThreeRef.current.style.zIndex = '100';

                    // zeroThreeRef.current.style.backgroundColor = "white"

                    zeroThree == 0 ? setzeroThree(selectedChip) : setzeroThree(zeroThree + selectedChip)
                    setBets([...bets, { number: "0&3", amount: selectedChip }])
                } else if (num == '1&4') {
                    setAmount((amount - (oneFour + selectedChip)) + oneFour)
                    // await updateUserAmount((amount - (oneFour + selectedChip)) + oneFour)

                    setoneFourChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });

                    oneFourRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    oneFourRef.current.style.backgroundSize = 'cover';
                    oneFourRef.current.style.width = '30px';
                    oneFourRef.current.style.height = '30px';
                    oneFourRef.current.style.zIndex = '100';

                    // oneFourRef.current.style.backgroundColor = "white"

                    oneFour == 0 ? setoneFour(selectedChip) : setoneFour(oneFour + selectedChip)
                    setBets([...bets, { number: "1&4", amount: selectedChip }])
                } else if (num == '2&5') {
                    setAmount((amount - (twoFive + selectedChip)) + twoFive)
                    // await updateUserAmount((amount - (twoFive + selectedChip)) + twoFive)
                    // twoFiveRef.current.style.backgroundColor = "white"

                    settwoFiveChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });

                    twoFiveRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    twoFiveRef.current.style.backgroundSize = 'cover';
                    twoFiveRef.current.style.width = '30px';
                    twoFiveRef.current.style.height = '30px';
                    twoFiveRef.current.style.zIndex = '100';

                    twoFive == 0 ? settwoFive(selectedChip) : settwoFive(twoFive + selectedChip)
                    setBets([...bets, { number: "2&5", amount: selectedChip }])
                } else if (num == '3&6') {
                    setAmount((amount - (threeSix + selectedChip)) + threeSix)
                    // await updateUserAmount((amount - (threeSix + selectedChip)) + threeSix)

                    setthreeSixChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });

                    threeSixRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    threeSixRef.current.style.backgroundSize = 'cover';
                    threeSixRef.current.style.width = '30px';
                    threeSixRef.current.style.height = '30px';
                    threeSixRef.current.style.zIndex = '100';

                    // threeSixRef.current.style.backgroundColor = "white"

                    threeSix == 0 ? setthreeSix(selectedChip) : setthreeSix(threeSix + selectedChip)
                    setBets([...bets, { number: "3&6", amount: selectedChip }])
                } else if (num == '4&7') {
                    setAmount((amount - (fourSeven + selectedChip)) + fourSeven)
                    // await updateUserAmount((amount - (fourSeven + selectedChip)) + fourSeven)
                    // fourSevenRef.current.style.backgroundColor = "white"

                    setfourSevenChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });

                    fourSevenRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    fourSevenRef.current.style.backgroundSize = 'cover';
                    fourSevenRef.current.style.width = '30px';
                    fourSevenRef.current.style.height = '30px';
                    fourSevenRef.current.style.zIndex = '100';

                    fourSeven == 0 ? setfourSeven(selectedChip) : setfourSeven(fourSeven + selectedChip)
                } else if (num == '5&8') {
                    // fiveEightRef.current.style.backgroundColor = "white"
                    setAmount((amount - (fiveEight + selectedChip)) + fiveEight)
                    // await updateUserAmount((amount - (fiveEight + selectedChip)) + fiveEight)

                    setfiveEightChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });

                    fiveEightRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    fiveEightRef.current.style.backgroundSize = 'cover';
                    fiveEightRef.current.style.width = '30px';
                    fiveEightRef.current.style.height = '30px';
                    fiveEightRef.current.style.zIndex = '100';

                    fiveEight == 0 ? setfiveEight(selectedChip) : setfiveEight(fiveEight + selectedChip)
                    setBets([...bets, { number: "5&8", amount: selectedChip }])
                } else if (num == '6&9') {
                    setAmount((amount - (sixNine + selectedChip)) + sixNine)
                    // await updateUserAmount((amount - (sixNine + selectedChip)) + sixNine)
                    // sixNineRef.
                    //     current.style.backgroundColor = "white"

                    setsixNineChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });

                    sixNineRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    sixNineRef.current.style.backgroundSize = 'cover';
                    sixNineRef.current.style.width = '30px';
                    sixNineRef.current.style.height = '30px';
                    sixNineRef.current.style.zIndex = '100';

                    sixNine == 0 ? setsixNine(selectedChip) : setsixNine(sixNine + selectedChip)
                    setBets([...bets, { number: "6&9", amount: selectedChip }])
                } else if (num == '7&10') {
                    setAmount((amount - (sevenTen + selectedChip)) + sevenTen)
                    // await updateUserAmount((amount - (sevenTen + selectedChip)) + sevenTen)

                    setsevenTenChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    sevenTenRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    sevenTenRef.current.style.backgroundSize = 'cover';
                    sevenTenRef.current.style.width = '30px';
                    sevenTenRef.current.style.height = '30px';
                    sevenTenRef.current.style.zIndex = '100';

                    // sevenTenRef.current.style.backgroundColor = "white"

                    sevenTen == 0 ? setsevenTen(selectedChip) : setsevenTen(sevenTen + selectedChip)
                    setBets([...bets, { number: "7&10", amount: selectedChip }])
                } else if (num == '8&11') {
                    setAmount((amount - (eightEleven + selectedChip)) + eightEleven)
                    // await updateUserAmount((amount - (eightEleven + selectedChip)) + eightEleven)

                    seteightElevenChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });

                    eightElevenRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    eightElevenRef.current.style.backgroundSize = 'cover';
                    eightElevenRef.current.style.width = '30px';
                    eightElevenRef.current.style.height = '30px';
                    eightElevenRef.current.style.zIndex = '100';

                    // eightElevenRef.current.style.backgroundColor = "white"

                    eightEleven == 0 ? seteightEleven(selectedChip) : setThirtyFiveThirtySix(eightEleven + selectedChip)
                    setBets([...bets, { number: "8&11", amount: selectedChip }])
                } else if (num == '9&12') {
                    setAmount(amount - (nineTwelve + selectedChip))

                    setnineTwelveChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });

                    nineTwelveRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'

                    // await updateUserAmount((amount - (nineTwelve + selectedChip)) + nineTwelve)
                    nineTwelveRef.current.style.backgroundSize = 'cover';
                    nineTwelveRef.current.style.width = '30px';
                    nineTwelveRef.current.style.height = '30px';
                    nineTwelveRef.current.style.zIndex = '100';

                    // nineTwelveRef.current.style.backgroundColor = "white"

                    nineTwelve == 0 ? setnineTwelve(selectedChip) : setnineTwelve(nineTwelve + selectedChip)
                    setBets([...bets, { number: "9&12", amount: selectedChip }])
                } else if (num == '10&13') {
                    setAmount((amount - (tenThirteen + selectedChip)) + tenThirteen)
                    // await updateUserAmount((amount - (tenThirteen + selectedChip)) + tenThirteen)
                    settenThirteenChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    tenThirteenRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    tenThirteenRef.current.style.backgroundSize = 'cover';
                    tenThirteenRef.current.style.width = '30px';
                    tenThirteenRef.current.style.height = '30px';
                    tenThirteenRef.current.style.zIndex = '100';

                    // tenThirteenRef.current.style.backgroundColor = "white"

                    tenThirteen == 0 ? settenThirteen(selectedChip) : settenThirteen(tenThirteen + selectedChip)
                    setBets([...bets, { number: "10&13", amount: selectedChip }])
                } else if (num == '11&14') {
                    setAmount((amount - (elevenFourteen + selectedChip)) + elevenFourteen)
                    // await updateUserAmount((amount - (elevenFourteen + selectedChip)) + elevenFourteen)
                    setelevenFourteenChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    elevenFourteenRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    elevenFourteenRef.current.style.backgroundSize = 'cover';
                    elevenFourteenRef.current.style.width = '30px';
                    elevenFourteenRef.current.style.height = '30px';
                    elevenFourteenRef.current.style.zIndex = '100';

                    // elevenFourteenRef.current.style.backgroundColor = "white"

                    elevenFourteen == 0 ? setelevenFourteen(selectedChip) : setelevenFourteen(elevenFourteen + selectedChip)
                    setBets([...bets, { number: "11&14", amount: selectedChip }])
                } else if (num == '12&15') {
                    setAmount((amount - (twelveFifteen + selectedChip)) + twelveFifteen)
                    // await updateUserAmount((amount - (twelveFifteen + selectedChip)) + twelveFifteen)
                    // twelveFifteenRef.current.style.backgroundColor = "white"
                    settwelveFifteenChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    twelveFifteenRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    twelveFifteenRef.current.style.backgroundSize = 'cover';
                    twelveFifteenRef.current.style.width = '30px';
                    twelveFifteenRef.current.style.height = '30px';
                    twelveFifteenRef.current.style.zIndex = '100';

                    twelveFifteen == 0 ? settwelveFifteen(selectedChip) : settwelveFifteen(twelveFifteen + selectedChip)
                    setBets([...bets, { number: "12&15", amount: selectedChip }])
                } else if (num == '13&16') {
                    setAmount((amount - (thirteenSixteen + selectedChip)) + thirteenSixteen)
                    // await updateUserAmount((amount - (thirteenSixteen + selectedChip)) + thirteenSixteen)
                    setthirteenSixteenChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    thirteenSixteenRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    thirteenSixteenRef.current.style.backgroundSize = 'cover';
                    thirteenSixteenRef.current.style.width = '30px';
                    thirteenSixteenRef.current.style.height = '30px';
                    thirteenSixteenRef.current.style.zIndex = '100';

                    // thirteenSixteenRef.current.style.backgroundColor = "white"

                    thirteenSixteen == 0 ? setthirteenSixteen(selectedChip) : setthirteenSixteen(thirteenSixteen + selectedChip)
                    setBets([...bets, { number: "13&16", amount: selectedChip }])
                } else if (num == '14&17') {
                    setAmount((amount - (fourteenSeventeen + selectedChip)) + fourteenSeventeen)
                    // await updateUserAmount((amount - (fourteenSeventeen + selectedChip)) + fourteenSeventeen)
                    // fourteenSeventeenRef.current.style.backgroundColor = "white"
                    setfourteenSeventeenChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    fourteenSeventeenRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    fourteenSeventeenRef.current.style.backgroundSize = 'cover';
                    fourteenSeventeenRef.current.style.width = '30px';
                    fourteenSeventeenRef.current.style.height = '30px';
                    fourteenSeventeenRef.current.style.zIndex = '100';

                    fourteenSeventeen == 0 ? setfourteenSeventeen(selectedChip) : setfourteenSeventeen(fourteenSeventeen + selectedChip)
                    setBets([...bets, { number: "14&17", amount: selectedChip }])
                } else if (num == '15&18') {
                    // fifteenEighteenRef.current.style.backgroundColor = "white"
                    setAmount((amount - (fifteenEighteen + selectedChip)) + fifteenEighteen)
                    // await updateUserAmount((amount - (fifteenEighteen + selectedChip)) + fifteenEighteen)
                    setfifteenEighteenChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    fifteenEighteenRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    fifteenEighteenRef.current.style.backgroundSize = 'cover';
                    fifteenEighteenRef.current.style.width = '30px';
                    fifteenEighteenRef.current.style.height = '30px';
                    fifteenEighteenRef.current.style.zIndex = '100';

                    fifteenEighteen == 0 ? setfifteenEighteen(selectedChip) : setfifteenEighteen(fifteenEighteen + selectedChip)
                    setBets([...bets, { number: "15&18", amount: selectedChip }])
                } else if (num == '16&19') {
                    setsixteenNineteenChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    // sixteenNineteenRef.current.style.backgroundColor = "white"
                    setAmount((amount - (sixteenNineteen + selectedChip)) + sixteenNineteen)
                    // await updateUserAmount((amount - (sixteenNineteen + selectedChip)) + sixteenNineteen)

                    sixteenNineteenRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    sixteenNineteenRef.current.style.backgroundSize = 'cover';
                    sixteenNineteenRef.current.style.width = '30px';
                    sixteenNineteenRef.current.style.height = '30px';
                    sixteenNineteenRef.current.style.zIndex = '100';

                    sixteenNineteen == 0 ? setsixteenNineteen(selectedChip) : setsixteenNineteen(sixteenNineteen + selectedChip)
                    setBets([...bets, { number: "16&19", amount: selectedChip }])
                } else if (num == '17&20') {
                    setseventeenTwentyChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    // seventeenTwentyRef.current.style.backgroundColor = "white"
                    setAmount((amount - (seventeenTwenty + selectedChip)) + seventeenTwenty)
                    // await updateUserAmount((amount - (seventeenTwenty + selectedChip)) + seventeenTwenty)

                    seventeenTwentyRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    seventeenTwentyRef.current.style.backgroundSize = 'cover';
                    seventeenTwentyRef.current.style.width = '30px';
                    seventeenTwentyRef.current.style.height = '30px';
                    seventeenTwentyRef.current.style.zIndex = '100';

                    seventeenTwenty == 0 ? setseventeenTwenty(selectedChip) : setseventeenTwenty(seventeenTwenty + selectedChip)
                    setBets([...bets, { number: "17&20", amount: selectedChip }])
                } else if (num == '18&21') {
                    seteighteenTwentyOneChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    // eighteenTwentyOneRef.current.style.backgroundColor = "white"
                    setAmount((amount - (eighteenTwentyOne + selectedChip)) + eighteenTwentyOne)
                    // await updateUserAmount((amount - (eighteenTwentyOne + selectedChip)) + eighteenTwentyOne)

                    eighteenTwentyOneRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    eighteenTwentyOneRef.current.style.backgroundSize = 'cover';
                    eighteenTwentyOneRef.current.style.width = '30px';
                    eighteenTwentyOneRef.current.style.height = '30px';
                    eighteenTwentyOneRef.current.style.zIndex = '100';

                    eighteenTwentyOne == 0 ? seteighteenTwentyOne(selectedChip) : seteighteenTwentyOne(eighteenTwentyOne + selectedChip)
                    setBets([...bets, { number: "18&21", amount: selectedChip }])
                } else if (num == '19&22') {
                    setnineteenTwentyTwoChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    // nineteenTwentyTwoRef.current.style.backgroundColor = "white"
                    setAmount((amount - (nineteenTwentyTwo + selectedChip)) + nineteenTwentyTwo)
                    // await updateUserAmount((amount - (nineteenTwentyTwo + selectedChip)) + nineteenTwentyTwo)

                    nineteenTwentyTwoRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    nineteenTwentyTwoRef.current.style.backgroundSize = 'cover';
                    nineteenTwentyTwoRef.current.style.width = '30px';
                    nineteenTwentyTwoRef.current.style.height = '30px';
                    nineteenTwentyTwoRef.current.style.zIndex = '100';

                    nineteenTwentyTwo == 0 ? setnineteenTwentyTwo(selectedChip) : setnineteenTwentyTwo(nineteenTwentyTwo + selectedChip)
                    setBets([...bets, { number: "19&22", amount: selectedChip }])
                } else if (num == '20&23') {
                    // twentyTwentyThreeRef.current.style.backgroundColor = "white"
                    setAmount((amount - (twentyTwentyThree + selectedChip)) + twentyTwentyThree)
                    // await updateUserAmount((amount - (twentyTwentyThree + selectedChip)) + twentyTwentyThree)
                    settwentyTwentyThreeChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    twentyTwentyThreeRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    twentyTwentyThreeRef.current.style.backgroundSize = 'cover';
                    twentyTwentyThreeRef.current.style.width = '30px';
                    twentyTwentyThreeRef.current.style.height = '30px';
                    twentyTwentyThreeRef.current.style.zIndex = '100';

                    twentyTwentyThree == 0 ? settwentyTwentyThree(selectedChip) : settwentyTwentyThree(twentyTwentyThree + selectedChip)
                    setBets([...bets, { number: "20&23", amount: selectedChip }])
                } else if (num == '21&24') {
                    // twentyOneTwentyFourRef.current.style.backgroundColor = "white"

                    settwentyOneTwentyFourChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    twentyOneTwentyFourRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    twentyOneTwentyFourRef.current.style.backgroundSize = 'cover';
                    twentyOneTwentyFourRef.current.style.width = '30px';
                    twentyOneTwentyFourRef.current.style.height = '30px';
                    twentyOneTwentyFourRef.current.style.zIndex = '100';
                    setAmount((amount - (twentyOneTwentyFour + selectedChip)) + twentyOneTwentyFour)
                    // await updateUserAmount((amount - (twentyOneTwentyFour + selectedChip)) + twentyOneTwentyFour)

                    twentyOneTwentyFour == 0 ? settwentyOneTwentyFour(selectedChip) : settwentyOneTwentyFour(twentyOneTwentyFour + selectedChip)
                    setBets([...bets, { number: "21&24", amount: selectedChip }])
                } else if (num == '22&25') {
                    // twentyTwoTwentyFiveRef.current.style.backgroundColor = "white"
                    settwentyTwoTwentyFiveChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    twentyTwoTwentyFiveRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    twentyTwoTwentyFiveRef.current.style.backgroundSize = 'cover';
                    twentyTwoTwentyFiveRef.current.style.width = '30px';
                    twentyTwoTwentyFiveRef.current.style.height = '30px';
                    twentyTwoTwentyFiveRef.current.style.zIndex = '100';

                    setAmount((amount - (twentyTwoTwentyFive + selectedChip)) + twentyTwoTwentyFive)
                    // await updateUserAmount((amount - (twentyTwoTwentyFive + selectedChip)) + twentyTwoTwentyFive)

                    twentyTwoTwentyFive == 0 ? settwentyTwoTwentyFive(selectedChip) : settwentyTwoTwentyFive(twentyTwoTwentyFive + selectedChip)
                    setBets([...bets, { number: "22&25", amount: selectedChip }])
                } else if (num == '23&26') {
                    // twentyThreeTwentySixRef.current.style.backgroundColor = "white"
                    settwentyThreeTwentySixChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });

                    twentyThreeTwentySixRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    twentyThreeTwentySixRef.current.style.backgroundSize = 'cover';
                    twentyThreeTwentySixRef.current.style.width = '30px';
                    twentyThreeTwentySixRef.current.style.height = '30px';
                    twentyThreeTwentySixRef.current.style.zIndex = '100';

                    setAmount((amount - (twentyThreeTwentySix + selectedChip)) + twentyThreeTwentySix)
                    // await updateUserAmount((amount - (twentyThreeTwentySix + selectedChip)) + twentyThreeTwentySix)

                    twentyThreeTwentySix == 0 ? settwentyThreeTwentySix(selectedChip) : settwentyThreeTwentySix(twentyThreeTwentySix + selectedChip)
                    setBets([...bets, { number: "23&26", amount: selectedChip }])
                } else if (num == '24&27') {
                    // twentyFourTwentySevenRef.current.style.backgroundColor = "white"
                    settwentyFourTwentySevenChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    twentyFourTwentySevenRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    twentyFourTwentySevenRef.current.style.backgroundSize = 'cover';
                    twentyFourTwentySevenRef.current.style.width = '30px';
                    twentyFourTwentySevenRef.current.style.height = '30px';
                    twentyFourTwentySevenRef.current.style.zIndex = '100';

                    setAmount((amount - (twentyFourTwentySeven + selectedChip)) + twentyFourTwentySeven)
                    // await updateUserAmount((amount - (twentyFourTwentySeven + selectedChip)) + twentyFourTwentySeven)

                    twentyFourTwentySeven == 0 ? settwentyFourTwentySeven(selectedChip) : settwentyFourTwentySeven(twentyFourTwentySeven + selectedChip)
                    setBets([...bets, { number: "24&27", amount: selectedChip }])
                } else if (num == '25&28') {
                    // twentyFiveTwentyEightRef.current.style.backgroundColor = "white"
                    settwentyFiveTwentyEightChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    twentyFiveTwentyEightRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    twentyFiveTwentyEightRef.current.style.backgroundSize = 'cover';
                    twentyFiveTwentyEightRef.current.style.width = '30px';
                    twentyFiveTwentyEightRef.current.style.height = '30px';
                    twentyFiveTwentyEightRef.current.style.zIndex = '100';

                    setAmount((amount - (twentyFiveTwentyEight + selectedChip)) + twentyFiveTwentyEight)
                    // await updateUserAmount((amount - (twentyFiveTwentyEight + selectedChip)) + twentyFiveTwentyEight)

                    twentyFiveTwentyEight == 0 ? settwentyFiveTwentyEight(selectedChip) : settwentyFiveTwentyEight(twentyFiveTwentyEight + selectedChip)
                    setBets([...bets, { number: "25&28", amount: selectedChip }])
                } else if (num == '26&29') {
                    // twentySixTwentyNineRef.current.style.backgroundColor = "white"
                    settwentySixTwentyNineChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    twentySixTwentyNineRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    twentySixTwentyNineRef.current.style.backgroundSize = 'cover';
                    twentySixTwentyNineRef.current.style.width = '30px';
                    twentySixTwentyNineRef.current.style.height = '30px';
                    twentySixTwentyNineRef.current.style.zIndex = '100';

                    setAmount((amount - (twentySixTwentyNine + selectedChip)) + twentySixTwentyNine)
                    // await updateUserAmount((amount - (twentySixTwentyNine + selectedChip)) + twentySixTwentyNine)

                    twentySixTwentyNine == 0 ? settwentySixTwentyNine(selectedChip) : settwentySixTwentyNine(twentySixTwentyNine + selectedChip)
                    setBets([...bets, { number: "26&29", amount: selectedChip }])
                } else if (num == '27&30') {
                    // twentySevenThirtyRef.current.style.backgroundColor = "white"
                    settwentySevenThirtyChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });

                    twentySevenThirtyRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    twentySevenThirtyRef.current.style.backgroundSize = 'cover';
                    twentySevenThirtyRef.current.style.width = '30px';
                    twentySevenThirtyRef.current.style.height = '30px';
                    twentySevenThirtyRef.current.style.zIndex = '100';

                    setAmount((amount - (twentySevenThirty + selectedChip)) + twentySevenThirty)
                    // await updateUserAmount((amount - (twentySevenThirty + selectedChip)) + twentySevenThirty)

                    twentySevenThirty == 0 ? settwentySevenThirty(selectedChip) : settwentySevenThirty(twentySevenThirty + selectedChip)
                    setBets([...bets, { number: "27&30", amount: selectedChip }])
                } else if (num == '28&31') {
                    setAmount((amount - (twentyEightThirtyOne + selectedChip)) + twentyEightThirtyOne)
                    // await updateUserAmount((amount - (twentyEightThirtyOne + selectedChip)) + twentyEightThirtyOne)
                    // twentyEightThirtyOneRef.current.style.backgroundColor = "white"
                    settwentyEightThirtyOneChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    twentyEightThirtyOneRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    twentyEightThirtyOneRef.current.style.backgroundSize = 'cover';
                    twentyEightThirtyOneRef.current.style.width = '30px';
                    twentyEightThirtyOneRef.current.style.height = '30px';
                    twentyEightThirtyOneRef.current.style.zIndex = '100';

                    twentyEightThirtyOne == 0 ? settwentyEightThirtyOne(selectedChip) : settwentyEightThirtyOne(twentyEightThirtyOne + selectedChip)
                    setBets([...bets, { number: "28&31", amount: selectedChip }])
                } else if (num == '29&32') {
                    settwentyNineThirtyTwoChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    setAmount((amount - (twentyNineThirtyTwo + selectedChip)) + twentyNineThirtyTwo)
                    // await updateUserAmount((amount - (twentyNineThirtyTwo + selectedChip)) + twentyNineThirtyTwo)
                    // twentyNineThirtyTwoRef.current.style.backgroundColor = "white"
                    twentyNineThirtyTwoRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    twentyNineThirtyTwoRef.current.style.backgroundSize = 'cover';
                    twentyNineThirtyTwoRef.current.style.width = '30px';
                    twentyNineThirtyTwoRef.current.style.height = '30px';
                    twentyNineThirtyTwoRef.current.style.zIndex = '100';


                    twentyNineThirtyTwo == 0 ? settwentyNineThirtyTwo(selectedChip) : settwentyNineThirtyTwo(twentyNineThirtyTwo + selectedChip)
                    setBets([...bets, { number: "29&32", amount: selectedChip }])
                } else if (num == '30&33') {
                    // thirtyThirtyThreeRef.current.style.backgroundColor = "white"
                    setthirtyThirtyThreeChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    thirtyThirtyThreeRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    thirtyThirtyThreeRef.current.style.backgroundSize = 'cover';
                    thirtyThirtyThreeRef.current.style.width = '30px';
                    thirtyThirtyThreeRef.current.style.height = '30px';
                    thirtyThirtyThreeRef.current.style.zIndex = '100';

                    setAmount((amount - (thirtyThirtyThree + selectedChip)) + thirtyThirtyThree)
                    // await updateUserAmount((amount - (thirtyThirtyThree + selectedChip)) + thirtyThirtyThree)

                    thirtyThirtyThree == 0 ? setthirtyThirtyThree(selectedChip) : setthirtyThirtyThree(thirtyThirtyThree + selectedChip)
                    setBets([...bets, { number: "30&33", amount: selectedChip }])
                } else if (num == '31&34') {
                    // thirtyOneThirtyFourRef.current.style.backgroundColor = "white"
                    setthirtyOneThirtyFourChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    thirtyOneThirtyFourRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    thirtyOneThirtyFourRef.current.style.backgroundSize = 'cover';
                    thirtyOneThirtyFourRef.current.style.width = '30px';
                    thirtyOneThirtyFourRef.current.style.height = '30px';
                    thirtyOneThirtyFourRef.current.style.zIndex = '100';

                    setAmount((amount - (thirtyOneThirtyFour + selectedChip)) + thirtyOneThirtyFour)
                    // await updateUserAmount((amount - (thirtyOneThirtyFour + selectedChip)) + thirtyOneThirtyFour)

                    thirtyOneThirtyFour == 0 ? setthirtyOneThirtyFour(selectedChip) : setthirtyOneThirtyFour(thirtyOneThirtyFour + selectedChip)
                    setBets([...bets, { number: "31&34", amount: selectedChip }])
                } else if (num == '32&35') {
                    // thirtyTwoThirtyFiveRef.current.style.backgroundColor = "white"
                    setthirtyTwoThirtyFiveChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    thirtyTwoThirtyFiveRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    thirtyTwoThirtyFiveRef.current.style.backgroundSize = 'cover';
                    thirtyTwoThirtyFiveRef.current.style.width = '30px';
                    thirtyTwoThirtyFiveRef.current.style.height = '30px';
                    thirtyTwoThirtyFiveRef.current.style.zIndex = '100';

                    setAmount((amount - (thirtyTwoThirtyFive + selectedChip)) + thirtyTwoThirtyFive)
                    // await updateUserAmount((amount - (thirtyTwoThirtyFive + selectedChip)) + thirtyTwoThirtyFive)

                    thirtyTwoThirtyFive == 0 ? setthirtyTwoThirtyFive(selectedChip) : setthirtyTwoThirtyFive(thirtyTwoThirtyFive + selectedChip)
                    setBets([...bets, { number: "32&35", amount: selectedChip }])
                } else if (num == '33&36') {
                    // thirtyThreeThirtySixRef.current.style.backgroundColor = "white"
                    setthirtyThreeThirtySixChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    thirtyThreeThirtySixRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    thirtyThreeThirtySixRef.current.style.backgroundSize = 'cover';
                    thirtyThreeThirtySixRef.current.style.width = '30px';
                    thirtyThreeThirtySixRef.current.style.height = '30px';
                    thirtyThreeThirtySixRef.current.style.zIndex = '100';

                    setAmount((amount - (thirtyThreeThirtySix + selectedChip)) + thirtyThreeThirtySix)
                    // await updateUserAmount((amount - (thirtyThreeThirtySix + selectedChip)) + thirtyThreeThirtySix)

                    thirtyThreeThirtySix == 0 ? setthirtyThreeThirtySix(selectedChip) : setthirtyThreeThirtySix(thirtyThreeThirtySix + selectedChip)
                    setBets([...bets, { number: "33&36", amount: selectedChip }])
                } else if (num == 'firstFour') {
                    // firstFourRef.current.style.backgroundColor = "white"
                    setFirstFourChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    firstFourRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    firstFourRef.current.style.backgroundSize = 'cover';
                    firstFourRef.current.style.width = '30px';
                    firstFourRef.current.style.height = '30px';
                    firstFourRef.current.style.zIndex = '100';

                    setAmount((amount - (firstFour + selectedChip)) + firstFour)
                    // await updateUserAmount((amount - (firstFour + selectedChip)) + firstFour)

                    firstFour == 0 ? setFirstFour(selectedChip) : setFirstFour(firstFour + selectedChip)
                    setBets([...bets, { number: "firstFour", amount: selectedChip }])
                } else if (num == 'secondFour') {
                    setSecondFourChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    // secondFourRef.current.style.backgroundColor = "white"
                    setAmount((amount - (secondFour + selectedChip)) + secondFour)
                    // await updateUserAmount((amount - (secondFour + selectedChip)) + secondFour)

                    secondFourRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    secondFourRef.current.style.backgroundSize = 'cover';
                    secondFourRef.current.style.width = '30px';
                    secondFourRef.current.style.height = '30px';
                    secondFourRef.current.style.zIndex = '100';

                    secondFour == 0 ? setSecondFour(selectedChip) : setSecondFour(secondFour + selectedChip)
                    setBets([...bets, { number: "secondFour", amount: selectedChip }])
                } else if (num == 'thirdFour') {
                    // thirdFourRef.current.style.backgroundColor = "white"
                    setThirdFourChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    thirdFourRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    thirdFourRef.current.style.backgroundSize = 'cover';
                    thirdFourRef.current.style.width = '30px';
                    thirdFourRef.current.style.height = '30px';
                    thirdFourRef.current.style.zIndex = '100';

                    setAmount((amount - (thirdFour + selectedChip)) + thirdFour)
                    // await updateUserAmount((amount - (thirdFour + selectedChip)) + thirdFour)

                    thirdFour == 0 ? setThirdFour(selectedChip) : setThirdFour(thirdFour + selectedChip)
                    setBets([...bets, { number: "thirdFour", amount: selectedChip }])
                } else if (num == 'fourthFour') {
                    // fourthFourRef.current.style.backgroundColor = "white"
                    setFourthFourChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    fourthFourRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    fourthFourRef.current.style.backgroundSize = 'cover';
                    fourthFourRef.current.style.width = '30px';
                    fourthFourRef.current.style.height = '30px';
                    fourthFourRef.current.style.zIndex = '100';

                    setAmount((amount - (fourthFour + selectedChip)) + fourthFour)
                    // await updateUserAmount((amount - (fourthFour + selectedChip)) + fourthFour)

                    fourthFour == 0 ? setFourthFour(selectedChip) : setFourthFour(fourthFour + selectedChip)
                    setBets([...bets, { number: "fourthFour", amount: selectedChip }])
                } else if (num == 'fifthFour') {
                    // fifthFourRef.current.style.backgroundColor = "white"
                    setFifthFourChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    fifthFourRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    fifthFourRef.current.style.backgroundSize = 'cover';
                    fifthFourRef.current.style.width = '30px';
                    fifthFourRef.current.style.height = '30px';
                    fifthFourRef.current.style.zIndex = '100';

                    setAmount((amount - (fifthFour + selectedChip)) + fifthFour)
                    // await updateUserAmount((amount - (fifthFour + selectedChip)) + fifthFour)

                    fifthFour == 0 ? setFifthFour(selectedChip) : setFifthFour(fifthFour + selectedChip)
                    setBets([...bets, { number: "fifthFour", amount: selectedChip }])
                } else if (num == 'sixthFour') {
                    // sixthFourRef.current.style.backgroundColor = "white"
                    setSixthFourChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    sixthFourRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    sixthFourRef.current.style.backgroundSize = 'cover';
                    sixthFourRef.current.style.width = '30px';
                    sixthFourRef.current.style.height = '30px';
                    sixthFourRef.current.style.zIndex = '100';

                    setAmount((amount - (sixthFour + selectedChip)) + sixthFour)
                    // await updateUserAmount((amount - (sixthFour + selectedChip)) + sixthFour)

                    sixthFour == 0 ? setSixthFour(selectedChip) : setSixthFour(sixthFour + selectedChip)
                    setBets([...bets, { number: "sixthFour", amount: selectedChip }])
                } else if (num == 'seventhFour') {
                    // seventhFourRef.current.style.backgroundColor = "white"
                    setSeventhFourChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    seventhFourRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    seventhFourRef.current.style.backgroundSize = 'cover';
                    seventhFourRef.current.style.width = '30px';
                    seventhFourRef.current.style.height = '30px';
                    seventhFourRef.current.style.zIndex = '100';

                    setAmount((amount - (seventhFour + selectedChip)) + seventhFour)
                    // await updateUserAmount((amount - (seventhFour + selectedChip)) + seventhFour)

                    seventhFour == 0 ? setSeventhFour(selectedChip) : setSeventhFour(seventhFour + selectedChip)
                    setBets([...bets, { number: "seventhFour", amount: selectedChip }])
                } else if (num == 'eighthFour') {
                    // eighthFourRef.current.style.backgroundColor = "white"
                    setAmount((amount - (eighthFour + selectedChip)) + eighthFour)
                    // await updateUserAmount((amount - (eighthFour + selectedChip)) + eighthFour)
                    setEighthFourChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    eighthFourRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    eighthFourRef.current.style.backgroundSize = 'cover';
                    eighthFourRef.current.style.width = '30px';
                    eighthFourRef.current.style.height = '30px';
                    eighthFourRef.current.style.zIndex = '100';

                    eighthFour == 0 ? setEighthFour(selectedChip) : setEighthFour(eighthFour + selectedChip)
                    setBets([...bets, { number: "eighthFour", amount: selectedChip }])
                } else if (num == 'ninthFour') {
                    // ninthFourRef.current.style.backgroundColor = "white"
                    setAmount((amount - (ninthFour + selectedChip)) + ninthFour)
                    // await updateUserAmount((amount - (ninthFour + selectedChip)) + ninthFour)
                    setNinthFourChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    ninthFourRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    ninthFourRef.current.style.backgroundSize = 'cover';
                    ninthFourRef.current.style.width = '30px';
                    ninthFourRef.current.style.height = '30px';
                    ninthFourRef.current.style.zIndex = '100';

                    ninthFour == 0 ? setNinthFour(selectedChip) : setNinthFour(ninthFour + selectedChip)
                    setBets([...bets, { number: "ninthFour", amount: selectedChip }])
                } else if (num == 'tenthFour') {
                    // tenthFourRef.current.style.backgroundColor = "white"
                    setAmount((amount - (tenthFour + selectedChip)) + tenthFour)
                    // await updateUserAmount((amount - (tenthFour + selectedChip)) + tenthFour)
                    setTenthFourChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    tenthFourRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    tenthFourRef.current.style.backgroundSize = 'cover';
                    tenthFourRef.current.style.width = '30px';
                    tenthFourRef.current.style.height = '30px';
                    tenthFourRef.current.style.zIndex = '100';
                    tenthFour == 0 ? setTenthFour(selectedChip) : setTenthFour(tenthFour + selectedChip)
                    setBets([...bets, { number: "tenthFour", amount: selectedChip }])
                } else if (num == 'eleventhFour') {
                    // eleventhFourRef.current.style.backgroundColor = "white"
                    setEleventhFourChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    setAmount((amount - (eleventhFour + selectedChip)) + eleventhFour)
                    // await updateUserAmount((amount - (eleventhFour + selectedChip)) + eleventhFour)
                    eleventhFourRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    eleventhFourRef.current.style.backgroundSize = 'cover';
                    eleventhFourRef.current.style.width = '30px';
                    eleventhFourRef.current.style.height = '30px';
                    eleventhFourRef.current.style.zIndex = '100';


                    eleventhFour == 0 ? setEleventhFour(selectedChip) : setEleventhFour(eleventhFour + selectedChip)
                    setBets([...bets, { number: "eleventhFour", amount: selectedChip }])
                } else if (num == 'twelfthFour') {
                    // twelfthFourRef.current.style.backgroundColor = "white"
                    setTwelfthFourChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    setAmount((amount - (twelfthFour + selectedChip)) + twelfthFour)
                    // await updateUserAmount((amount - (twelfthFour + selectedChip)) + twelfthFour)

                    twelfthFourRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    twelfthFourRef.current.style.backgroundSize = 'cover';
                    twelfthFourRef.current.style.width = '30px';
                    twelfthFourRef.current.style.height = '30px';
                    twelfthFourRef.current.style.zIndex = '100';

                    twelfthFour == 0 ? setTwelfthFour(selectedChip) : setTwelfthFour(twelfthFour + selectedChip)
                    setBets([...bets, { number: "twelfthFour", amount: selectedChip }])
                } else if (num == 'thirteenthFour') {
                    setThirteenthFourChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    // thirteenthFourRef.current.style.backgroundColor = "white"
                    setAmount((amount - (thirteenthFour + selectedChip)) + thirteenthFour)
                    // await updateUserAmount((amount - (thirteenthFour + selectedChip)) + thirteenthFour)

                    thirteenthFourRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    thirteenthFourRef.current.style.backgroundSize = 'cover';
                    thirteenthFourRef.current.style.width = '30px';
                    thirteenthFourRef.current.style.height = '30px';
                    thirteenthFourRef.current.style.zIndex = '100';

                    thirteenthFour == 0 ? setThirteenthFour(selectedChip) : setThirteenthFour(thirteenthFour + selectedChip)
                    setBets([...bets, { number: "thirteenthFour", amount: selectedChip }])
                } else if (num == 'fourteenthFour') {
                    setFourteenthFourChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    // fourteenthFourRef.current.style.backgroundColor = "white"
                    setAmount((amount - (fourteenthFour + selectedChip)) + fourteenthFour)
                    // await updateUserAmount((amount - (fourteenthFour + selectedChip)) + fourteenthFour)

                    fourteenthFourRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    fourteenthFourRef.current.style.backgroundSize = 'cover';
                    fourteenthFourRef.current.style.width = '30px';
                    fourteenthFourRef.current.style.height = '30px';
                    fourteenthFourRef.current.style.zIndex = '100';

                    fourteenthFour == 0 ? setFourteenthFour(selectedChip) : setFourteenthFour(fourteenthFour + selectedChip)
                    setBets([...bets, { number: "fourteenthFour", amount: selectedChip }])
                } else if (num == 'fifteenthFour') {
                    // fifteenthFourRef.current.style.backgroundColor = "white"
                    setFifteenthFourChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    fifteenthFourRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    fifteenthFourRef.current.style.backgroundSize = 'cover';
                    fifteenthFourRef.current.style.width = '30px';
                    fifteenthFourRef.current.style.height = '30px';
                    fifteenthFourRef.current.style.zIndex = '100';

                    setAmount((amount - (fifteenthFour + selectedChip)) + fifteenthFour)
                    // await updateUserAmount((amount - (fifteenthFour + selectedChip)) + fifteenthFour)

                    fifteenthFour == 0 ? setFifteenthFour(selectedChip) : setFifteenthFour(fifteenthFour + selectedChip)
                    setBets([...bets, { number: "fifteenthFour", amount: selectedChip }])
                } else if (num == 'sixteenthFour') {
                    // sixteenthFourRef.current.style.backgroundColor = "white"
                    setSixteenthFourChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    sixteenthFourRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    sixteenthFourRef.current.style.backgroundSize = 'cover';
                    sixteenthFourRef.current.style.width = '30px';
                    sixteenthFourRef.current.style.height = '30px';
                    sixteenthFourRef.current.style.zIndex = '100';

                    setAmount((amount - (sixteenthFour + selectedChip)) + sixteenthFour)
                    // await updateUserAmount((amount - (sixteenthFour + selectedChip)) + sixteenthFour)

                    sixteenthFour == 0 ? setSixteenthFour(selectedChip) : setSixteenthFour(sixteenthFour + selectedChip)
                    setBets([...bets, { number: "sixteenthFour", amount: selectedChip }])
                } else if (num == 'seventeenthFour') {
                    // seventeenthFourRef.current.style.backgroundColor = "white"
                    setSeventeenthFourChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    seventeenthFourRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    seventeenthFourRef.current.style.backgroundSize = 'cover';
                    seventeenthFourRef.current.style.width = '30px';
                    seventeenthFourRef.current.style.height = '30px';
                    seventeenthFourRef.current.style.zIndex = '100';

                    setAmount((amount - (seventeenthFour + selectedChip)) + seventeenthFour)
                    // await updateUserAmount((amount - (seventeenthFour + selectedChip)) + seventeenthFour)

                    seventeenthFour == 0 ? setSeventeenthFour(selectedChip) : seventeenthFour(seventeenthFour + selectedChip)
                    setBets([...bets, { number: "seventeenthFour", amount: selectedChip }])
                } else if (num == 'eighteenthFour') {
                    setEighteenthFourChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    // eighteenthFourRef.current.style.backgroundColor = "white"

                    eighteenthFourRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    eighteenthFourRef.current.style.backgroundSize = 'cover';
                    eighteenthFourRef.current.style.width = '30px';
                    eighteenthFourRef.current.style.height = '30px';
                    eighteenthFourRef.current.style.zIndex = '100';

                    setAmount((amount - (eighteenthFour + selectedChip)) + eighteenthFour)
                    // await updateUserAmount((amount - (eighteenthFour + selectedChip)) + eighteenthFour)

                    eighteenthFour == 0 ? setEighteenthFour(selectedChip) : setEighteenthFour(eighteenthFour + selectedChip)
                    setBets([...bets, { number: "eighteenthFour", amount: selectedChip }])
                } else if (num == 'nineteenthFour') {
                    setNineteenthFourChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    // nineteenthFourRef.current.style.backgroundColor = "white"

                    nineteenthFourRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    nineteenthFourRef.current.style.backgroundSize = 'cover';
                    nineteenthFourRef.current.style.width = '30px';
                    nineteenthFourRef.current.style.height = '30px';
                    nineteenthFourRef.current.style.zIndex = '100';

                    setAmount((amount - (nineteenthFour + selectedChip)) + nineteenthFour)
                    // await updateUserAmount((amount - (nineteenthFour + selectedChip)) + nineteenthFour)

                    nineteenthFour == 0 ? setNineteenthFour(selectedChip) : setNineteenthFour(nineteenthFour + selectedChip)
                    setBets([...bets, { number: "nineteenthFour", amount: selectedChip }])
                } else if (num == 'twentiethFour') {
                    setTwentiethFourChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    // twentiethFourRef.current.style.backgroundColor = "white"
                    setAmount((amount - (twentiethFour + selectedChip)) + twentiethFour)
                    // await updateUserAmount((amount - (twentiethFour + selectedChip)) + twentiethFour)

                    twentiethFourRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    twentiethFourRef.current.style.backgroundSize = 'cover';
                    twentiethFourRef.current.style.width = '30px';
                    twentiethFourRef.current.style.height = '30px';
                    twentiethFourRef.current.style.zIndex = '100';

                    twentiethFour == 0 ? setTwentiethFour(selectedChip) : setTwentiethFour(twentiethFour + selectedChip)
                    setBets([...bets, { number: "twentiethFour", amount: selectedChip }])
                } else if (num == 'twentyFirstFour') {
                    setTwentyFirstFourChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    // twentyFirstFourRef.current.style.backgroundColor = "white"
                    setAmount((amount - (twentyFirstFour + selectedChip)) + twentyFirstFour)
                    // await updateUserAmount((amount - (twentyFirstFour + selectedChip)) + twentyFirstFour)

                    twentyFirstFourRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    twentyFirstFourRef.current.style.backgroundSize = 'cover';
                    twentyFirstFourRef.current.style.width = '30px';
                    twentyFirstFourRef.current.style.height = '30px';
                    twentyFirstFourRef.current.style.zIndex = '100';

                    twentyFirstFour == 0 ? setTwentyFirstFour(selectedChip) : setTwentyFirstFour(twentyFirstFour + selectedChip)
                    setBets([...bets, { number: "twentyFirstFour", amount: selectedChip }])
                } else if (num == 'twentySecondFour') {
                    setTwentySecondFourChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    // twentySecondFourRef.current.style.backgroundColor = "white"
                    twentySecondFourRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    twentySecondFourRef.current.style.backgroundSize = 'cover';
                    twentySecondFourRef.current.style.width = '30px';
                    twentySecondFourRef.current.style.height = '30px';
                    twentySecondFourRef.current.style.zIndex = '100';
                    setAmount((amount - (twentySecondFour + selectedChip)) + twentySecondFour)
                    // await updateUserAmount((amount - (twentySecondFour + selectedChip)) + twentySecondFour)

                    twentySecondFour == 0 ? setTwentySecondFour(selectedChip) : setTwentySecondFour(twentySecondFour + selectedChip)
                    setBets([...bets, { number: "twentySecondFour", amount: selectedChip }])
                } else if (num == 'firstSix') {
                    setFirstSixChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    // firstSixRef.current.style.backgroundColor = "white"

                    firstSixRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    firstSixRef.current.style.backgroundSize = 'cover';
                    firstSixRef.current.style.width = '30px';
                    firstSixRef.current.style.height = '30px';
                    firstSixRef.current.style.zIndex = '100';
                    setAmount((amount - (firstSix + selectedChip)) + firstSix)
                    // await updateUserAmount((amount - (firstSix + selectedChip)) + firstSix)

                    firstSix == 0 ? setFirstSix(selectedChip) : setFirstSix(firstSix + selectedChip)
                    setBets([...bets, { number: "firstSix", amount: selectedChip }])
                } else if (num == 'secondSix') {
                    setSecondSixChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    // secondSixRef.current.style.backgroundColor = "white"

                    secondSixRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    secondSixRef.current.style.backgroundSize = 'cover';
                    secondSixRef.current.style.width = '30px';
                    secondSixRef.current.style.height = '30px';
                    secondSixRef.current.style.zIndex = '100';

                    setAmount((amount - (secondSix + selectedChip)) + secondSix)
                    // await updateUserAmount((amount - (secondSix + selectedChip)) + secondSix)

                    secondSix == 0 ? setSecondSix(selectedChip) : setSecondSix(secondSix + selectedChip)
                    setBets([...bets, { number: "secondSix", amount: selectedChip }])
                } else if (num == 'thirdSix') {
                    setThirdSixChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    // thirdSixRef.current.style.backgroundColor = "white"

                    thirdSixRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    thirdSixRef.current.style.backgroundSize = 'cover';
                    thirdSixRef.current.style.width = '30px';
                    thirdSixRef.current.style.height = '30px';
                    thirdSixRef.current.style.zIndex = '100';

                    setAmount((amount - (thirdSix + selectedChip)) + thirdSix)
                    // await updateUserAmount((amount - (thirdSix + selectedChip)) + thirdSix)

                    thirdSix == 0 ? setThirdSix(selectedChip) : setThirdSix(thirdSix + selectedChip)
                    setBets([...bets, { number: "thirdSix", amount: selectedChip }])
                } else if (num == 'fourthSix') {
                    setFourthSixChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    // fourthSixRef.current.style.backgroundColor = "white"

                    fourthSixRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    fourthSixRef.current.style.backgroundSize = 'cover';
                    fourthSixRef.current.style.width = '30px';
                    fourthSixRef.current.style.height = '30px';
                    fourthSixRef.current.style.zIndex = '100';

                    setAmount((amount - (fourthSix + selectedChip)) + fourthSix)
                    // await updateUserAmount((amount - (fourthSix + selectedChip)) + fourthSix)

                    fourthSix == 0 ? setFourthSix(selectedChip) : setFourthSix(fourthSix + selectedChip)
                    setBets([...bets, { number: "fourthSix", amount: selectedChip }])
                } else if (num == 'fifthSix') {
                    setFifthSixChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    // fifthSixRef.current.style.backgroundColor = "white"

                    fifthSixRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    fifthSixRef.current.style.backgroundSize = 'cover';
                    fifthSixRef.current.style.width = '30px';
                    fifthSixRef.current.style.height = '30px';
                    fifthSixRef.current.style.zIndex = '100';

                    setAmount((amount - (fifthSix + selectedChip)) + fifthSix)
                    // await updateUserAmount((amount - (fifthSix + selectedChip)) + fifthSix)

                    fifthSix == 0 ? setFifthSix(selectedChip) : setFifthSix(fifthSix + selectedChip)
                    setBets([...bets, { number: "fifthSix", amount: selectedChip }])
                } else if (num == 'sixthSix') {
                    // sixthSixRef.current.style.backgroundColor = "white"
                    setSixthSixChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    sixthSixRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    sixthSixRef.current.style.backgroundSize = 'cover';
                    sixthSixRef.current.style.width = '30px';
                    sixthSixRef.current.style.height = '30px';
                    sixthSixRef.current.style.zIndex = '100';

                    setAmount((amount - (sixthSix + selectedChip)) + sixthSix)
                    // await updateUserAmount((amount - (sixthSix + selectedChip)) + sixthSix)

                    sixthSix == 0 ? setSixthSix(selectedChip) : setSixthSix(sixthSix + selectedChip)
                    setBets([...bets, { number: "sixthSix", amount: selectedChip }])
                } else if (num == 'seventhSix') {
                    // seventhSixRef.current.style.backgroundColor = "white"
                    setSeventhSixChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    seventhSixRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    seventhSixRef.current.style.backgroundSize = 'cover';
                    seventhSixRef.current.style.width = '30px';
                    seventhSixRef.current.style.height = '30px';
                    seventhSixRef.current.style.zIndex = '100';

                    setAmount((amount - (seventhSix + selectedChip)) + seventhSix)
                    // await updateUserAmount((amount - (seventhSix + selectedChip)) + seventhSix)

                    seventhSix == 0 ? setSeventhSix(selectedChip) : setSeventhSix(seventhSix + selectedChip)
                    setBets([...bets, { number: "seventhSix", amount: selectedChip }])
                } else if (num == 'eighthSix') {
                    // eighthSixRef.current.style.backgroundColor = "white"
                    setEighthSixChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    eighthSixRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    eighthSixRef.current.style.backgroundSize = 'cover';
                    eighthSixRef.current.style.width = '30px';
                    eighthSixRef.current.style.height = '30px';
                    eighthSixRef.current.style.zIndex = '100';
                    setAmount((amount - (eighthSix + selectedChip)) + eighthSix)
                    // await updateUserAmount((amount - (eighthSix + selectedChip)) + eighthSix)

                    eighthSix == 0 ? setEighthSix(selectedChip) : setEighthSix(eighthSix + selectedChip)
                    setBets([...bets, { number: "eighthSix", amount: selectedChip }])
                } else if (num == 'ninthSix') {
                    // ninthSixRef.current.style.backgroundColor = "white"
                    setNinthSixChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    ninthSixRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    ninthSixRef.current.style.backgroundSize = 'cover';
                    ninthSixRef.current.style.width = '30px';
                    ninthSixRef.current.style.height = '30px';
                    ninthSixRef.current.style.zIndex = '100';
                    setAmount((amount - (ninthSix + selectedChip)) + ninthSix)
                    // await updateUserAmount((amount - (ninthSix + selectedChip)) + ninthSix)

                    ninthSix == 0 ? setNinthSix(selectedChip) : setNinthSix(ninthSix + selectedChip)
                    setBets([...bets, { number: "ninthSix", amount: selectedChip }])
                } else if (num == 'tenthSix') {
                    // tenthSixRef.current.style.backgroundColor = "white"
                    setTenthSixChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    tenthSixRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    tenthSixRef.current.style.backgroundSize = 'cover';
                    tenthSixRef.current.style.width = '30px';
                    tenthSixRef.current.style.height = '30px';
                    tenthSixRef.current.style.zIndex = '100';

                    setAmount((amount - (tenthSix + selectedChip)) + tenthSix)
                    // await updateUserAmount((amount - (tenthSix + selectedChip)) + tenthSix)

                    tenthSix == 0 ? setTenthSix(selectedChip) : setTenthSix(tenthSix + selectedChip)
                    setBets([...bets, { number: "tenthSix", amount: selectedChip }])
                } else if (num == 'eleventhSix') {
                    // eleventhSixRef.current.style.backgroundColor = "white"
                    setEleventhSixChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    eleventhSixRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    eleventhSixRef.current.style.backgroundSize = 'cover';
                    eleventhSixRef.current.style.width = '30px';
                    eleventhSixRef.current.style.height = '30px';
                    eleventhSixRef.current.style.zIndex = '100';
                    setAmount((amount - (eleventhSix + selectedChip)) + eleventhSix)
                    // await updateUserAmount((amount - (eleventhSix + selectedChip)) + eleventhSix)

                    eleventhSix == 0 ? setEleventhSix(selectedChip) : setEleventhSix(eleventhSix + selectedChip)
                    setBets([...bets, { number: "eleventhSix", amount: selectedChip }])
                } else if (num == 'col1') {
                    setCol1Chips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    col1Ref.current.childNodes[1].style.display = "block"

                    col1Ref.current.childNodes[0].style.display = "none"

                    col1 == 0 ? setCol1(selectedChip) : setCol1(col1 + selectedChip)
                    setAmount((amount - (col1 + selectedChip)) + col1)
                    // await updateUserAmount((amount - (col1 + selectedChip)) + col1)


                    setBets([...bets, { number: "col1", amount: selectedChip }])
                } else if (num == 'col2') {
                    setCol2Chips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    col2Ref.current.childNodes[1].style.display = "block"
                    col2Ref.current.childNodes[0].style.display = "none"

                    col2 == 0 ? setCol2(selectedChip) : setCol2(col2 + selectedChip)
                    setAmount((amount - (col2 + selectedChip)) + col2)
                    // await updateUserAmount((amount - (col2 + selectedChip)) + col2)

                    setBets([...bets, { number: "col2", amount: selectedChip }])
                } else if (num == 'col3') {
                    setCol3Chips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    col3Ref.current.childNodes[1].style.display = "block"
                    col3Ref.current.childNodes[0].style.display = "none"

                    col3 == 0 ? setCol3(selectedChip) : setCol3(col3 + selectedChip)
                    setAmount((amount - (col3 + selectedChip)) + col3)
                    // await updateUserAmount((amount - (col3 + selectedChip)) + col3)

                    setBets([...bets, { number: "col3", amount: selectedChip }])
                } else if (num == 'first12') {
                    setFirst12Chips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    first12Ref.current.childNodes[1].style.display = "block"
                    first12Ref.current.childNodes[0].style.display = "none"

                    first12 == 0 ? setFirst12(selectedChip) : setFirst12(first12 + selectedChip)
                    setAmount((amount - (first12 + selectedChip)) + first12)
                    // await updateUserAmount((amount - (first12 + selectedChip)) + first12)

                    setBets([...bets, { number: "first12", amount: selectedChip }])

                } else if (num == 'mid12') {
                    setMid12Chips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    mid12Ref.current.childNodes[1].style.display = "block"
                    mid12Ref.current.childNodes[0].style.display = "none"

                    mid12 == 0 ? setMid12(selectedChip) : setMid12(mid12 + selectedChip)
                    setAmount((amount - (mid12 + selectedChip)) + mid12)
                    // await updateUserAmount((amount - (mid12 + selectedChip)) + mid12)

                    setBets([...bets, { number: "mid12", amount: selectedChip }])
                } else if (num == 'last12') {
                    setLast12Chips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    last12Ref.current.childNodes[1].style.display = "block"
                    last12Ref.current.childNodes[0].style.display = "none"

                    last12 == 0 ? setLast12(selectedChip) : setLast12(last12 + selectedChip)
                    setAmount((amount - (last12 + selectedChip)) + last12)
                    // await updateUserAmount((amount - (last12 + selectedChip)) + last12)


                    setBets([...bets, { number: "last12", amount: selectedChip }])
                } else if (num == 'first18') {
                    setFirst18Chips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    first18Ref.current.childNodes[1].style.display = "block"
                    first18Ref.current.childNodes[0].style.display = "none"

                    first18 == 0 ? setFirst18(selectedChip) : setFirst18(first18 + selectedChip)
                    setAmount((amount - (first18 + selectedChip)) + first18)
                    // await updateUserAmount((amount - (first18 + selectedChip)) + first18)

                    setBets([...bets, { number: "first18", amount: selectedChip }])
                } else if (num == 'last18') {
                    setLast18Chips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    last18Ref.current.childNodes[1].style.display = "block"
                    last18Ref.current.childNodes[0].style.display = "none"

                    last18 == 0 ? setLast18(selectedChip) : setLast18(last18 + selectedChip)
                    setAmount((amount - (last18 + selectedChip)) + last18)
                    // await updateUserAmount((amount - (last18 + selectedChip)) + last18)

                    setBets([...bets, { number: "last18", amount: selectedChip }])
                } else if (num == 'red') {
                    setRedChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    redRef.current.childNodes[1].style.display = "block"
                    redRef.current.childNodes[0].style.display = "none"

                    red == 0 ? setRed(selectedChip) : setRed(red + selectedChip)
                    setAmount((amount - (red + selectedChip)) + red)
                    // await updateUserAmount((amount - (red + selectedChip)) + red)

                    setBets([...bets, { number: "red", amount: selectedChip }])
                } else if (num == 'black') {
                    setBlackChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    blackRef.current.childNodes[1].style.display = "block"
                    blackRef.current.childNodes[0].style.display = "none"

                    black == 0 ? setBlack(selectedChip) : setBlack(black + selectedChip)
                    setAmount((amount - (black + selectedChip)) + black)
                    // await updateUserAmount((amount - (black + selectedChip)) + black)

                    setBets([...bets, { number: "black", amount: selectedChip }])
                } else if (num == 'even') {
                    setEvenChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    evennRef.current.childNodes[1].style.display = "block"
                    evennRef.current.childNodes[0].style.display = "none"

                    even == 0 ? setEven(selectedChip) : setEven(even + selectedChip)
                    setAmount(amount - (even + selectedChip) + even)

                    // await updateUserAmount((amount - (even + selectedChip)) + even)
                    setBets([...bets, { number: "even", amount: selectedChip }])
                } else if (num == 'odd') {
                    setOddChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    oddRef.current.childNodes[1].style.display = "block"
                    oddRef.current.childNodes[0].style.display = "none"

                    odd == 0 ? setOdd(selectedChip) : setOdd(odd + selectedChip)
                    setAmount((amount - (odd + selectedChip)) + odd)
                    // await updateUserAmount((amount - (odd + selectedChip)) + odd)

                    setBets([...bets, { number: "odd", amount: selectedChip }])
                } else if (num == 'firstThree') {
                    setFirstThreeChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    // firstThreeRef.current.style.backgroundColor = "white"
                    // firstThreeRef.current.style.background = "../public/brown_coin.png"
                    // firstThreeRef.current.style.backgroundColor = "white"
                    firstThreeRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    firstThreeRef.current.style.backgroundSize = 'cover';
                    firstThreeRef.current.style.width = '30px';
                    firstThreeRef.current.style.height = '30px';
                    firstThreeRef.current.style.zIndex = '100';

                    setAmount((amount - (firstThree + selectedChip)) + firstThree)
                    // await updateUserAmount((amount - (firstThree + selectedChip)) + firstThree)

                    firstThree == 0 ? setFirstThree(selectedChip) : setFirstThree(firstThree + selectedChip)
                    setBets([...bets, { number: "firstThree", amount: selectedChip }])
                } else if (num == 'secondThree') {

                    // secondThreeRef.current.style.backgroundColor = "white"
                    setSecondThreeChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });

                    secondThreeRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    secondThreeRef.current.style.backgroundSize = 'cover';
                    secondThreeRef.current.style.width = '30px';
                    secondThreeRef.current.style.height = '30px';
                    secondThreeRef.current.style.zIndex = '100';

                    setAmount((amount - (secondThree + selectedChip)) + secondThree)
                    // await updateUserAmount((amount - (secondThree + selectedChip)) + secondThree)

                    secondThree == 0 ? setSecondThree(selectedChip) : setSecondThree(secondThree + selectedChip)
                    setBets([...bets, { number: "secondThree", amount: selectedChip }])
                } else if (num == 'thirdThree') {
                    setThirdThreeChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    // thirdThreeRef.current.style.backgroundColor = "white"

                    thirdThreeRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    thirdThreeRef.current.style.backgroundSize = 'cover';
                    thirdThreeRef.current.style.width = '30px';
                    thirdThreeRef.current.style.height = '30px';
                    thirdThreeRef.current.style.zIndex = '100';

                    setAmount((amount - (thirdThree + selectedChip)) + thirdThree)
                    // await updateUserAmount((amount - (thirdThree + selectedChip)) + thirdThree)

                    thirdThree == 0 ? setThirdThree(selectedChip) : setThirdThree(thirdThree + selectedChip)
                    setBets([...bets, { number: "thirdThree", amount: selectedChip }])
                } else if (num == 'fourthThree') {
                    setFourthThreeChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    // fourthThreeRef.current.style.backgroundColor = "white"

                    fourthThreeRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    fourthThreeRef.current.style.backgroundSize = 'cover';
                    fourthThreeRef.current.style.width = '30px';
                    fourthThreeRef.current.style.height = '30px';
                    fourthThreeRef.current.style.zIndex = '100';

                    setAmount((amount - (fourthThree + selectedChip)) + fourthThree)
                    // await updateUserAmount((amount - (fourthThree + selectedChip)) + fourthThree)

                    fourthThree == 0 ? setFourthThree(selectedChip) : setFourthThree(fourthThree + selectedChip)
                    setBets([...bets, { number: "fourthThree", amount: selectedChip }])
                } else if (num == 'fifthThree') {
                    setFifthThreeChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    // fifthThreeRef.current.style.backgroundColor = "white"

                    fifthThreeRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    fifthThreeRef.current.style.backgroundSize = 'cover';
                    fifthThreeRef.current.style.width = '30px';
                    fifthThreeRef.current.style.height = '30px';
                    fifthThreeRef.current.style.zIndex = '100';

                    setAmount((amount - (fifthThree + selectedChip)) + fifthThree)
                    // await updateUserAmount((amount - (fifthThree + selectedChip)) + fifthThree)

                    fifthThree == 0 ? setFifthThree(selectedChip) : setFifthThree(fifthThree + selectedChip)
                    setBets([...bets, { number: "fifthThree", amount: selectedChip }])
                } else if (num == 'sixthThree') {
                    // sixthThreeRef.current.style.backgroundColor = "white"
                    setSixthThreeChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });

                    sixthThreeRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    sixthThreeRef.current.style.backgroundSize = 'cover';
                    sixthThreeRef.current.style.width = '30px';
                    sixthThreeRef.current.style.height = '30px';
                    sixthThreeRef.current.style.zIndex = '100';

                    setAmount((amount - (sixthThree + selectedChip)) + sixthThree)
                    // await updateUserAmount((amount - (sixthThree + selectedChip)) + sixthThree)

                    sixthThree == 0 ? setSixthThree(selectedChip) : setSixthThree(sixthThree + selectedChip)
                    setBets([...bets, { number: "sixthThree", amount: selectedChip }])
                } else if (num == 'seventhThree') {
                    setSeventhThreeChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    // seventhThreeRef.current.style.backgroundColor = "white"
                    seventhThreeRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    seventhThreeRef.current.style.backgroundSize = 'cover';
                    seventhThreeRef.current.style.width = '30px';
                    seventhThreeRef.current.style.height = '30px';
                    seventhThreeRef.current.style.zIndex = '100';


                    setAmount((amount - (seventhThree + selectedChip)) + seventhThree)
                    // await updateUserAmount((amount - (seventhThree + selectedChip)) + seventhThree)

                    seventhThree == 0 ? setSeventhThree(selectedChip) : setSeventhThree(seventhThree + selectedChip)
                    setBets([...bets, { number: "seventhThree", amount: selectedChip }])
                } else if (num == 'eighthThree') {
                    setEighthThreeChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    // eighthThreeRef.current.style.backgroundColor = "white"
                    eighthThreeRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    eighthThreeRef.current.style.backgroundSize = 'cover';
                    eighthThreeRef.current.style.width = '30px';
                    eighthThreeRef.current.style.height = '30px';
                    eighthThreeRef.current.style.zIndex = '100';


                    setAmount((amount - (eighthThree + selectedChip)) + eighthThree)
                    // await updateUserAmount((amount - (eighthThree + selectedChip)) + eighthThree)

                    eighthThree == 0 ? setEighthThree(selectedChip) : setEighthThree(eighthThree + selectedChip)
                    setBets([...bets, { number: "eighthThree", amount: selectedChip }])
                } else if (num == 'ninthThree') {
                    setNinthThreeChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    // ninthThreeRef.current.style.backgroundColor = "white"

                    ninthThreeRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    ninthThreeRef.current.style.backgroundSize = 'cover';
                    ninthThreeRef.current.style.width = '30px';
                    ninthThreeRef.current.style.height = '30px';
                    ninthThreeRef.current.style.zIndex = '100';

                    setAmount((amount - (ninthThree + selectedChip)) + ninthThree)
                    // await updateUserAmount((amount - (ninthThree + selectedChip)) + ninthThree)

                    ninthThree == 0 ? setNinthThree(selectedChip) : setNinthThree(ninthThree + selectedChip)
                    setBets([...bets, { number: "ninthThree", amount: selectedChip }])
                } else if (num == 'tenthThree') {
                    setTenthThreeChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    // tenthThreeRef.current.style.backgroundColor = "white"

                    tenthThreeRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    tenthThreeRef.current.style.backgroundSize = 'cover';
                    tenthThreeRef.current.style.width = '30px';
                    tenthThreeRef.current.style.height = '30px';
                    tenthThreeRef.current.style.zIndex = '100';

                    setAmount((amount - (tenthThree + selectedChip)) + tenthThree)
                    // await updateUserAmount((amount - (tenthThree + selectedChip)) + tenthThree)

                    tenthThree == 0 ? setTenthThree(selectedChip) : setTenthThree(tenthThree + selectedChip)
                    setBets([...bets, { number: "tenthThree", amount: selectedChip }])
                } else if (num == 'eleventhThree') {
                    setEleventhThreeChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    // eleventhThreeRef.current.style.backgroundColor = "white"

                    eleventhThreeRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    eleventhThreeRef.current.style.backgroundSize = 'cover';
                    eleventhThreeRef.current.style.width = '30px';
                    eleventhThreeRef.current.style.height = '30px';
                    eleventhThreeRef.current.style.zIndex = '100';

                    setAmount((amount - (eleventhThree + selectedChip)) + eleventhThree)
                    // await updateUserAmount((amount - (eleventhThree + selectedChip)) + eleventhThree)

                    eleventhThree == 0 ? setEleventhThree(selectedChip) : setEleventhThree(eleventhThree + selectedChip)
                    setBets([...bets, { number: "eleventhThree", amount: selectedChip }])
                } else if (num == 'twelfthThree') {
                    setTwelfthThreeChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    // twelfthThreeRef.current.style.backgroundColor = "white"
                    twelfthThreeRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    twelfthThreeRef.current.style.backgroundSize = 'cover';
                    twelfthThreeRef.current.style.width = '30px';
                    twelfthThreeRef.current.style.height = '30px';
                    twelfthThreeRef.current.style.zIndex = '100';


                    setAmount((amount - (twelfthThree + selectedChip)) + twelfthThree)
                    // await updateUserAmount((amount - (twelfthThree + selectedChip)) + twelfthThree)

                    twelfthThree == 0 ? setTwelfthThree(selectedChip) : setTwelfthThree(twelfthThree + selectedChip)
                    setBets([...bets, { number: "twelfthThree", amount: selectedChip }])
                } else if (num == 'thirteenthThree') {
                    setThirteenthThreeChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    // thirteenthThreeRef.current.style.backgroundColor = "white"
                    thirteenthThreeRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    thirteenthThreeRef.current.style.backgroundSize = 'cover';
                    thirteenthThreeRef.current.style.width = '30px';
                    thirteenthThreeRef.current.style.height = '30px';
                    thirteenthThreeRef.current.style.zIndex = '100';


                    setAmount((amount - (thirteenthThree + selectedChip)) + thirteenthThree)
                    // await updateUserAmount((amount - (thirteenthThree + selectedChip)) + thirteenthThree)

                    thirteenthThree == 0 ? setThirteenthThree(selectedChip) : setThirteenthThree(thirteenthThree + selectedChip)
                    setBets([...bets, { number: "thirteenthThree", amount: selectedChip }])
                } else if (num == 'fourteenthThree') {
                    setFourteenthThreeChips(prevChips => {

                        const imagePath =
                            selectedChip === 20 ? '/brown_coin.png' :
                                selectedChip === 50 ? '/coin_s_2.jpg' :
                                    selectedChip === 100 ? '/orange_coin.png' :
                                        selectedChip === 500 ? '/coin3.png' :
                                            '/coin4.png';

                        return [...prevChips, imagePath];
                    });
                    // fourteenthThreeRef.current.style.backgroundColor = "white"
                    fourteenthThreeRef.current.style.backgroundImage = selectedChip == 20 ? 'url("/brown_coin.png")' : selectedChip == 50 ? 'url("/orange_coin.png")' : 'url("/orange_coin.png")'
                    fourteenthThreeRef.current.style.backgroundSize = 'cover';
                    fourteenthThreeRef.current.style.width = '30px';
                    fourteenthThreeRef.current.style.height = '30px';
                    fourteenthThreeRef.current.style.zIndex = '100';

                    setAmount((amount - (fourteenthThree + selectedChip)) + fourteenthThree)

                    fourteenthThree == 0 ? setFourteenthThree(selectedChip) : setFourteenthThree(fourteenthThree + selectedChip)
                    setBets([...bets, { number: "fourteenthThree", amount: selectedChip }])
                }
            }

        } else { }
    }

    const chipSelection = () => {
        if (T2) {
            isChipClicked ? setIsChipClicked(false) : setIsChipClicked(true)
            if (isChipClicked) {
                twentyChip.current.style.transform = "translate(0,-3rem)"
                fiftyChip.current.style.transform = "translate(0,-6rem)"
                hundredChip.current.style.transform = "translate(0, -9rem)"

                tenThousandChip.current.style.transform = "translate(0,0)"
                fiveHundredChip.current.style.transform = "translate(0rem,-12rem)"
                fiveHundredChip.current.style.transform = "translate(0rem,-12rem)"
                thousandChip.current.style.transform = "translate(0,-15rem)"
                fiftyThousandChip.current.style.transform = "translate(0,0)"
                twoHundredChip.current.style.transform = "translate(0,0)"
            }
            else {
                twentyChip.current.style.transform = "translate(0,0)"
                fiftyChip.current.style.transform = "translate(0,0)"
                hundredChip.current.style.transform = "translate(0,0)"
                tenThousandChip.current.style.transform = "translate(0,0)"
                fiveHundredChip.current.style.transform = "translate(0,0)"
                thousandChip.current.style.transform = "translate(0,0)"
                fiftyThousandChip.current.style.transform = "translate(0,0)"
                twoHundredChip.current.style.transform = "translate(0,0)"
            }
        }
    }

    const updateMenu = () => {
        if (!isMenuClicked) {
            menuRef.current.style.width = "100vw"
            menuRef.current.style.height = "95vh"
            menuRef.current.style.display = "flex"
            hideLinksRef.current.style.display = "block"
        } else {
            menuRef.current.style.width = "0vw"
            menuRef.current.style.height = "100vh"
            hideLinksRef.current.style.display = "none"

        }
        setIsMenuClicked(!isMenuClicked)
        setChangePassword(false)
        setBetHistory(false)
    }

    const changePasswordFunction = async () => {

        if (chgPwdCurrentPwd == undefined || chgPwdNewPwd == undefined || chgPwdConfNewPwd == undefined) {
            setChangePasswordPossibilities("Please fill all the fields")
        } else {
            if (chgPwdNewPwd != chgPwdConfNewPwd) {
                setChangePasswordPossibilities("New Password and Confirm Password dont match")
            } else {
                if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
                    const data = localStorage.getItem('username') || '';

                    const q = query(usersCollectionRef, where("username", "==", data));

                    const datum = await getDocs(q);

                    setUsers(datum.docs.map((doc) => ({ ...doc.data(), id: doc.id, key: doc.id })))

                    for (var i = 0; i < users.length; i++) {

                        if (users[i].username == data) {

                            if (chgPwdCurrentPwd == users[i].password) {
                                const docRef = doc(db, 'roulette-users', users[i].id);

                                await updateDoc(docRef, { password: chgPwdConfNewPwd })
                                setChangePasswordPossibilities('Password saved')
                                setChangePassword(false)
                                break;
                            } else {
                                setChangePasswordPossibilities("Incorrect Current password")
                            }

                        } else {

                        }
                    }
                }

            }
        }

    }

    const handleNavigation = (path) => {
        if (typeof window !== 'undefined') {
            router.push({ pathname: path });
        }
    };


    const handleLogout = () => {
        if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
            localStorage.clear();
            router.push({ pathname: '/' });
        }
    };

    const triggerConfetti = () => {
        // Abruptly set the confetti count to max
        setConfettiCount(200);

        // Start reducing the confetti count smoothly after 1.5 seconds (half of 3 seconds)
        setTimeout(() => {
            const decreaseInterval = setInterval(() => {
                setConfettiCount((prevCount) => {
                    if (prevCount <= 0) {
                        clearInterval(decreaseInterval); // Stop reducing when confetti count is 0
                        return 0;
                    }
                    return prevCount - 10; // Decrease smoothly
                });
            }, 100); // Adjust the interval timing for a smoother stop
        }, duration / 2); // Start decreasing after 1.5 seconds
    };

    if (!isAuthChecked) {
        // Show a loading state while checking authentication
        return <div className="loader">
            <ClimbingBoxLoader size={30} color={'#F37A24'} loading={isLoading} />
        </div>
    }

    return (
        <>
            {/* {
                <Toaster />
            } */}

            {showPrompt && (
                <div>
                    <MediaQueryModal />
                </div>
            )}

            {showModal && <Modal closeModal={closeModal} />}

            <div className={styles.container}>
                {confettiCount > 0 && (
                    <Confetti
                        width={426}
                        height={1073}
                        colors={['#FFD700', '#FFDF00', '#F0E68C']} // Gold shades
                        numberOfPieces={confettiCount} // Control the number of confetti pieces
                    />
                )}

                <div className={styles.upper}>
                    <div className={styles.amountAndLastWin}>
                        <div className={styles.amount}>₹ {formatNumberWithCommas(amount)}</div>
                        {/* <div className={styles.lastWin} ref={lastWinRef}>Last bet: {lastWin}₹</div> */}
                    </div>
                    <div className={styles.secondsLeft} ref={clockRef} >{secondsLeft}</div>
                    <div>
                        <div className={`${styles.burger_menu} ${isMenuClicked ? styles.fullBackground : styles.noBackground}`} onClick={updateMenu}>
                            <div className={styles.burger_class} ></div>
                            <div className={styles.burger_class} ></div>
                            <div className={styles.burger_class} ></div>
                        </div>
                    </div>
                </div>
                <div className={styles.menu_class} ref={menuRef}>
                    <div className={styles.menu_items} >
                        <ol ref={hideLinksRef}>
                            <li onClick={() => handleNavigation('/BetHistory/BetHistory')}>Bet History</li>
                            <li onClick={() => handleNavigation('/TransactionHistory/TransactionHistory')}>Transaction History</li>
                            <li onClick={() => handleNavigation('/depositWithdraw')}>Deposit/Withdrawal</li>
                            <li onClick={() => handleNavigation('/Profile/Profile')}>My Profile</li>
                            <li onClick={handleLogout}>Logout</li>
                        </ol>
                    </div>

                </div>

                <div className={styles.table_and_combination_bets} ref={tableRef}>
                    <div style={{ color: 'white' }} className={`${styles.oneTwo} ${styles.middleElements}`} onClick={() => numberClick('1&2', 2)} ref={oneTwoRef} >{oneTwo == 0 ? "" : formatNumber(oneTwo)}</div>
                    <div style={{ color: 'white' }} className={`${styles.twoThree} ${styles.middleElements}`} onClick={() => numberClick('2&3', 2)} ref={twoThreeRef}>{twoThree == 0 ? "" : formatNumber(twoThree)}</div>
                    <div style={{ color: 'white' }} className={`${styles.fourFive} ${styles.middleElements}`} onClick={() => numberClick('4&5', 2)} ref={fourFiveRef}>{fourFive == 0 ? "" : formatNumber(fourFive)}</div>
                    <div style={{ color: 'white' }} className={`${styles.fiveSix} ${styles.middleElements}`} onClick={() => numberClick('5&6', 2)} ref={fiveSixRef}>{fiveSix == 0 ? "" : formatNumber(fiveSix)}</div>
                    <div style={{ color: 'white' }} className={`${styles.sevenEight} ${styles.middleElements}`} onClick={() => numberClick('7&8', 2)} ref={sevenEightRef}>{sevenEight == 0 ? "" : formatNumber(sevenEight)}</div>
                    <div style={{ color: 'white' }} className={`${styles.eightNine} ${styles.middleElements}`} onClick={() => numberClick('8&9', 2)} ref={eightNineRef}>{eightNine == 0 ? "" : formatNumber(eightNine)}</div>
                    <div style={{ color: 'white' }} className={`${styles.tenEleven} ${styles.middleElements}`} onClick={() => numberClick('10&11', 2)} ref={tenElevenRef}>{tenEleven == 0 ? "" : formatNumber(tenEleven)}</div>
                    <div style={{ color: 'white' }} className={`${styles.elevenTwelve} ${styles.middleElements}`} onClick={() => numberClick('11&12', 2)} ref={elevenTwelveRef}>{elevenTwelve == 0 ? "" : formatNumber(elevenTwelve)}</div>
                    <div style={{ color: 'white' }} className={`${styles.thirteenFourteen} ${styles.middleElements}`} onClick={() => numberClick('13&14', 2)} ref={thirteenFourteenRef}>{thirteenFourteen == 0 ? "" : formatNumber(thirteenFourteen)}</div>
                    <div style={{ color: 'white' }} className={`${styles.fourteenFifteen} ${styles.middleElements}`} onClick={() => numberClick('14&15', 2)} ref={fourteenFifteenRef}>{fourteenFifteen == 0 ? "" : formatNumber(fourteenFifteen)}</div>
                    <div style={{ color: 'white' }} className={`${styles.sixteenSeventeen} ${styles.middleElements}`} onClick={() => numberClick('16&17', 2)} ref={sixteenSeventeenRef}>{sixteenSeventeen == 0 ? "" : formatNumber(sixteenSeventeen)}</div>
                    <div style={{ color: 'white' }} className={`${styles.seventeenEighteen} ${styles.middleElements}`} onClick={() => numberClick('17&18', 2)} ref={seventeenEighteenRef}>{seventeenEighteen == 0 ? "" : formatNumber(seventeenEighteen)}</div>
                    <div style={{ color: 'white' }} className={`${styles.nineteenTwenty} ${styles.middleElements}`} onClick={() => numberClick('19&20', 2)} ref={nineteenTwentyRef}>{nineteenTwenty == 0 ? "" : formatNumber(nineteenTwenty)}</div>
                    <div style={{ color: 'white' }} className={`${styles.twentyTwentyOne} ${styles.middleElements}`} onClick={() => numberClick('20&21', 2)} ref={twentyTwentyOneRef}>{twentyTwentyOne == 0 ? "" : formatNumber(twentyTwentyOne)}</div>
                    <div style={{ color: 'white' }} className={`${styles.twentyTwoTwentyThree} ${styles.middleElements}`} onClick={() => numberClick('22&23', 2)} ref={twentyTwoTwentyThreeRef}>{twentyTwoTwentyThree == 0 ? "" : formatNumber(twentyTwoTwentyThree)}</div>
                    <div style={{ color: 'white' }} className={`${styles.twentyThreeTwentyFour} ${styles.middleElements}`} onClick={() => numberClick('23&24', 2)} ref={twentyThreeTwentyFourRef}>{twentyThreeTwentyFour == 0 ? "" : formatNumber(twentyThreeTwentyFour)}</div>
                    <div style={{ color: 'white' }} className={`${styles.twentyFiveTwentySix} ${styles.middleElements}`} onClick={() => numberClick('25&26', 2)} ref={twentyFiveTwentySixRef}>{twentyFiveTwentySix == 0 ? "" : formatNumber(twentyFiveTwentySix)}</div>
                    <div style={{ color: 'white' }} className={`${styles.twentySixTwentySeven} ${styles.middleElements}`} onClick={() => numberClick('26&27', 2)} ref={twentySixTwentySevenRef}>{twentySixTwentySeven == 0 ? "" : formatNumber(twentySixTwentySeven)}</div>
                    <div style={{ color: 'white' }} className={`${styles.twentyEightTwentyNine} ${styles.middleElements}`} onClick={() => numberClick('28&29', 2)} ref={twentyEightTwentyNineRef}>{twentyEightTwentyNine == 0 ? "" : formatNumber(twentyEightTwentyNine)}</div>
                    <div style={{ color: 'white' }} className={`${styles.twentyNineThirty} ${styles.middleElements}`} onClick={() => numberClick('29&30', 2)} ref={twentyNineThirtyRef}>{twentyNineThirty == 0 ? "" : formatNumber(twentyNineThirty)}</div>
                    <div style={{ color: 'white' }} className={`${styles.thirtyOneThirtyTwo} ${styles.middleElements}`} onClick={() => numberClick('31&32', 2)} ref={thirtyOneThirtyTwoRef}>{thirtyOneThirtyTwo == 0 ? "" : formatNumber(thirtyOneThirtyTwo)}</div>
                    <div style={{ color: 'white' }} className={`${styles.thirtyTwoThirtyThree} ${styles.middleElements}`} onClick={() => numberClick('32&33', 2)} ref={thirtyTwoThirtyThreeRef}>{thirtyTwoThirtyThree == 0 ? "" : formatNumber(thirtyTwoThirtyThree)}</div>
                    <div style={{ color: 'white' }} className={`${styles.thirtyFourThirtyFive} ${styles.middleElements}`} onClick={() => numberClick('34&35', 2)} ref={thirtyFourThirtyFiveRef}>{thirtyFourThirtyFive == 0 ? "" : formatNumber(thirtyFourThirtyFive)}</div>
                    <div style={{ color: 'white' }} className={`${styles.thirtyFiveThirtySix} ${styles.middleElements}`} onClick={() => numberClick('35&36', 2)} ref={thirtyFiveThirtySixRef}>{thirtyFiveThirtySix == 0 ? "" : formatNumber(thirtyFiveThirtySix)}</div>
                    <div style={{ color: 'white' }} className={`${styles.seventeenTwenty} ${styles.middleElements}`} onClick={() => numberClick('17&20', 2)} ref={seventeenTwentyRef}>{seventeenTwenty == 0 ? "" : formatNumber(seventeenTwenty)}</div>
                    <div style={{ color: 'white' }} className={`${styles.zeroOne} ${styles.middleElements}`} onClick={() => numberClick('0&1', 2)} ref={zeroOneRef}>{zeroOne == 0 ? "" : formatNumber(zeroOne)}</div>
                    <div style={{ color: 'white' }} className={`${styles.zeroTwo} ${styles.middleElements}`} onClick={() => numberClick('0&2', 2)} ref={zeroTwoRef}>{zeroTwo == 0 ? "" : formatNumber(zeroTwo)}</div>
                    <div style={{ color: 'white' }} className={`${styles.zeroThree} ${styles.middleElements}`} onClick={() => numberClick('0&3', 2)} ref={zeroThreeRef}>{zeroThree == 0 ? "" : formatNumber(zeroThree)}</div>
                    <div style={{ color: 'white' }} className={`${styles.oneFour} ${styles.middleElements}`} onClick={() => numberClick('1&4', 2)} ref={oneFourRef}>{oneFour == 0 ? "" : formatNumber(oneFour)}</div>
                    <div style={{ color: 'white' }} className={`${styles.twoFive} ${styles.middleElements}`} onClick={() => numberClick('2&5', 2)} ref={twoFiveRef}>{twoFive == 0 ? "" : formatNumber(twoFive)}</div>
                    <div style={{ color: 'white' }} className={`${styles.threeSix} ${styles.middleElements}`} onClick={() => numberClick('3&6', 2)} ref={threeSixRef}>{threeSix == 0 ? "" : formatNumber(threeSix)}</div>
                    <div style={{ color: 'white' }} className={`${styles.fourSeven} ${styles.middleElements}`} onClick={() => numberClick('4&7', 2)} ref={fourSevenRef}>{fourSeven == 0 ? "" : formatNumber(fourSeven)}</div>
                    <div style={{ color: 'white' }} className={`${styles.fiveEight} ${styles.middleElements}`} onClick={() => numberClick('5&8', 2)} ref={fiveEightRef}>{fiveEight == 0 ? "" : formatNumber(fiveEight)}</div>
                    <div style={{ color: 'white' }} className={`${styles.sixNine} ${styles.middleElements}`} onClick={() => numberClick('6&9', 2)} ref={sixNineRef}>{sixNine == 0 ? "" : formatNumber(sixNine)}</div>
                    <div style={{ color: 'white' }} className={`${styles.sevenTen} ${styles.middleElements}`} onClick={() => numberClick('7&10', 2)} ref={sevenTenRef}>{sevenTen == 0 ? "" : formatNumber(sevenTen)}</div>
                    <div style={{ color: 'white' }} className={`${styles.eightEleven} ${styles.middleElements}`} onClick={() => numberClick('8&11', 2)} ref={eightElevenRef}>{eightEleven == 0 ? "" : formatNumber(eightEleven)}</div>
                    <div style={{ color: 'white' }} className={`${styles.nineTwelve} ${styles.middleElements}`} onClick={() => numberClick('9&12', 2)} ref={nineTwelveRef}>{nineTwelve == 0 ? "" : formatNumber(nineTwelve)}</div>
                    <div style={{ color: 'white' }} className={`${styles.tenThirteen} ${styles.middleElements}`} onClick={() => numberClick('10&13', 2)} ref={tenThirteenRef}>{tenThirteen == 0 ? "" : formatNumber(tenThirteen)}</div>
                    <div style={{ color: 'white' }} className={`${styles.elevenFourteen} ${styles.middleElements}`} onClick={() => numberClick('11&14', 2)} ref={elevenFourteenRef}>{elevenFourteen == 0 ? "" : formatNumber(elevenFourteen)}</div>
                    <div style={{ color: 'white' }} className={`${styles.twelveFifteen} ${styles.middleElements}`} onClick={() => numberClick('12&15', 2)} ref={twelveFifteenRef}>{twelveFifteen == 0 ? "" : formatNumber(twelveFifteen)}</div>
                    <div style={{ color: 'white' }} className={`${styles.thirteenSixteen} ${styles.middleElements}`} onClick={() => numberClick('13&16', 2)} ref={thirteenSixteenRef}>{thirteenSixteen == 0 ? "" : formatNumber(thirteenSixteen)}</div>
                    <div style={{ color: 'white' }} className={`${styles.fourteenSeventeen} ${styles.middleElements}`} onClick={() => numberClick('14&17', 2)} ref={fourteenSeventeenRef}>{fourteenSeventeen == 0 ? "" : formatNumber(fourteenSeventeen)}</div>
                    <div style={{ color: 'white' }} className={`${styles.fifteenEighteen} ${styles.middleElements}`} onClick={() => numberClick('15&18', 2)} ref={fifteenEighteenRef}>{fifteenEighteen == 0 ? "" : formatNumber(fifteenEighteen)}</div>
                    <div style={{ color: 'white' }} className={`${styles.sixteenNineteen} ${styles.middleElements}`} onClick={() => numberClick('16&19', 2)} ref={sixteenNineteenRef}>{sixteenNineteen == 0 ? "" : formatNumber(sixteenNineteen)}</div>
                    <div style={{ color: 'white' }} className={`${styles.eighteenTwentyOne} ${styles.middleElements}`} onClick={() => numberClick('18&21', 2)} ref={eighteenTwentyOneRef}>{eighteenTwentyOne == 0 ? "" : formatNumber(eighteenTwentyOne)}</div>
                    <div style={{ color: 'white' }} className={`${styles.nineteenTwentyTwo} ${styles.middleElements}`} onClick={() => numberClick('19&22', 2)} ref={nineteenTwentyTwoRef}>{nineteenTwentyTwo == 0 ? "" : formatNumber(nineteenTwentyTwo)}</div>
                    <div style={{ color: 'white' }} className={`${styles.twentyTwentyThree} ${styles.middleElements}`} onClick={() => numberClick('20&23', 2)} ref={twentyTwentyThreeRef}>{twentyTwentyThree == 0 ? "" : formatNumber(twentyTwentyThree)}</div>
                    <div style={{ color: 'white' }} className={`${styles.twentyOneTwentyFour} ${styles.middleElements}`} onClick={() => numberClick('21&24', 2)} ref={twentyOneTwentyFourRef}>{twentyOneTwentyFour == 0 ? "" : formatNumber(twentyOneTwentyFour)}</div>
                    <div style={{ color: 'white' }} className={`${styles.twentyTwoTwentyFive} ${styles.middleElements}`} onClick={() => numberClick('22&25', 2)} ref={twentyTwoTwentyFiveRef}>{twentyTwoTwentyFive == 0 ? "" : formatNumber(twentyTwoTwentyFive)}</div>
                    <div style={{ color: 'white' }} className={`${styles.twentyThreeTwentySix} ${styles.middleElements}`} onClick={() => numberClick('23&26', 2)} ref={twentyThreeTwentySixRef}>{twentyThreeTwentySix == 0 ? "" : formatNumber(twentyThreeTwentySix)}</div>
                    <div style={{ color: 'white' }} className={`${styles.twentyFourTwentySeven} ${styles.middleElements}`} onClick={() => numberClick('24&27', 2)} ref={twentyFourTwentySevenRef}>{twentyFourTwentySeven == 0 ? "" : formatNumber(twentyFourTwentySeven)}</div>
                    <div style={{ color: 'white' }} className={`${styles.twentyFiveTwentyEight} ${styles.middleElements}`} onClick={() => numberClick('25&28', 2)} ref={twentyFiveTwentyEightRef}>{twentyFiveTwentyEight == 0 ? "" : formatNumber(twentyFiveTwentyEight)}</div>
                    <div style={{ color: 'white' }} className={`${styles.twentySixTwentyNine} ${styles.middleElements}`} onClick={() => numberClick('26&29', 2)} ref={twentySixTwentyNineRef}>{twentySixTwentyNine == 0 ? "" : formatNumber(twentySixTwentyNine)}</div>
                    <div style={{ color: 'white' }} className={`${styles.twentySevenThirty} ${styles.middleElements}`} onClick={() => numberClick('27&30', 2)} ref={twentySevenThirtyRef}>{twentySevenThirty == 0 ? "" : formatNumber(twentySevenThirty)}</div>
                    <div style={{ color: 'white' }} className={`${styles.twentyEightThirtyOne} ${styles.middleElements}`} onClick={() => numberClick('28&31', 2)} ref={twentyEightThirtyOneRef}>{twentyEightThirtyOne == 0 ? "" : formatNumber(twentyEightThirtyOne)}</div>
                    <div style={{ color: 'white' }} className={`${styles.twentyNineThirtyTwo} ${styles.middleElements}`} onClick={() => numberClick('29&32', 2)} ref={twentyNineThirtyTwoRef}>{twentyNineThirtyTwo == 0 ? "" : formatNumber(twentyNineThirtyTwo)}</div>
                    <div style={{ color: 'white' }} className={`${styles.thirtyThirtyThree} ${styles.middleElements}`} onClick={() => numberClick('30&33', 2)} ref={thirtyThirtyThreeRef}>{thirtyThirtyThree == 0 ? "" : formatNumber(thirtyThirtyThree)}</div>
                    <div style={{ color: 'white' }} className={`${styles.thirtyOneThirtyFour} ${styles.middleElements}`} onClick={() => numberClick('31&34', 2)} ref={thirtyOneThirtyFourRef}>{thirtyOneThirtyFour == 0 ? "" : formatNumber(thirtyOneThirtyFour)}</div>
                    <div style={{ color: 'white' }} className={`${styles.thirtyTwoThirtyFive} ${styles.middleElements}`} onClick={() => numberClick('32&35', 2)} ref={thirtyTwoThirtyFiveRef}>{thirtyTwoThirtyFive == 0 ? "" : formatNumber(thirtyTwoThirtyFive)}</div>
                    <div style={{ color: 'white' }} className={`${styles.thirtyThreeThirtySix} ${styles.middleElements}`} onClick={() => numberClick('33&36', 2)} ref={thirtyThreeThirtySixRef}>{thirtyThreeThirtySix == 0 ? "" : formatNumber(thirtyThreeThirtySix)}</div>
                    <div style={{ color: 'white' }} className={`${styles.firstfour} ${styles.middleElements}`} onClick={() => numberClick('firstFour', 2)} ref={firstFourRef}>{firstFour == 0 ? "" : formatNumber(firstFour)}</div>
                    <div style={{ color: 'white' }} className={`${styles.secondfour} ${styles.middleElements}`} onClick={() => numberClick('secondFour', 2)} ref={secondFourRef}>{secondFour == 0 ? "" : formatNumber(secondFour)}</div>
                    <div style={{ color: 'white' }} className={`${styles.thirdfour} ${styles.middleElements}`} onClick={() => numberClick('thirdFour', 2)} ref={thirdFourRef}>{thirdFour == 0 ? "" : formatNumber(thirdFour)}</div>
                    <div style={{ color: 'white' }} className={`${styles.fourthfour} ${styles.middleElements}`} onClick={() => numberClick('fourthFour', 2)} ref={fourthFourRef}>{fourthFour == 0 ? "" : formatNumber(fourthFour)}</div>
                    <div style={{ color: 'white' }} className={`${styles.fifthfour} ${styles.middleElements}`} onClick={() => numberClick('fifthFour', 2)} ref={fifthFourRef}>{fifthFour == 0 ? "" : formatNumber(fifthFour)}</div>
                    <div style={{ color: 'white' }} className={`${styles.sixthfour} ${styles.middleElements}`} onClick={() => numberClick('sixthFour', 2)} ref={sixthFourRef}>{sixthFour == 0 ? "" : formatNumber(sixthFour)}</div>
                    <div style={{ color: 'white' }} className={`${styles.seventhfour} ${styles.middleElements}`} onClick={() => numberClick('seventhFour', 2)} ref={seventhFourRef}>{seventhFour == 0 ? "" : formatNumber(seventhFour)}</div>
                    <div style={{ color: 'white' }} className={`${styles.eighthfour} ${styles.middleElements}`} onClick={() => numberClick('eighthFour', 2)} ref={eighthFourRef}>{eighthFour == 0 ? "" : formatNumber(eighthFour)}</div>
                    <div style={{ color: 'white' }} className={`${styles.ninthfour} ${styles.middleElements}`} onClick={() => numberClick('ninthFour', 2)} ref={ninthFourRef}>{ninthFour == 0 ? "" : formatNumber(ninthFour)}</div>
                    <div style={{ color: 'white' }} className={`${styles.tenthfour} ${styles.middleElements}`} onClick={() => numberClick('tenthFour', 2)} ref={tenthFourRef}>{tenthFour == 0 ? "" : formatNumber(tenthFour)}</div>
                    <div style={{ color: 'white' }} className={`${styles.eleventhfour} ${styles.middleElements}`} onClick={() => numberClick('eleventhFour', 2)} ref={eleventhFourRef}>{eleventhFour == 0 ? "" : formatNumber(eleventhFour)}</div>
                    <div style={{ color: 'white' }} className={`${styles.twelfthfour} ${styles.middleElements}`} onClick={() => numberClick('twelfthFour', 2)} ref={twelfthFourRef}>{twelfthFour == 0 ? "" : formatNumber(twelfthFour)}</div>
                    <div style={{ color: 'white' }} className={`${styles.thirteenthfour} ${styles.middleElements}`} onClick={() => numberClick('thirteenthFour', 2)} ref={thirteenthFourRef}>{thirteenthFour == 0 ? "" : formatNumber(thirteenthFour)}</div>
                    <div style={{ color: 'white' }} className={`${styles.fourteenthfour} ${styles.middleElements}`} onClick={() => numberClick('fourteenthFour', 2)} ref={fourteenthFourRef}>{fourteenthFour == 0 ? "" : formatNumber(fourteenthFour)}</div>
                    <div style={{ color: 'white' }} className={`${styles.fifteenthfour} ${styles.middleElements}`} onClick={() => numberClick('fifteenthFour', 2)} ref={fifteenthFourRef}>{fifteenthFour == 0 ? "" : formatNumber(fifteenthFour)}</div>
                    <div style={{ color: 'white' }} className={`${styles.sixteenthfour} ${styles.middleElements}`} onClick={() => numberClick('sixteenthFour', 2)} ref={sixteenthFourRef}>{sixteenthFour == 0 ? "" : formatNumber(sixteenthFour)}</div>
                    <div style={{ color: 'white' }} className={`${styles.seventeenthfour} ${styles.middleElements}`} onClick={() => numberClick('seventeenthFour', 2)} ref={seventeenthFourRef}>{seventeenthFour == 0 ? "" : formatNumber(seventeenthFour)}</div>
                    <div style={{ color: 'white' }} className={`${styles.eighteenthfour} ${styles.middleElements}`} onClick={() => numberClick('eighteenthFour', 2)} ref={eighteenthFourRef}>{eighteenthFour == 0 ? "" : formatNumber(eighteenthFour)}</div>
                    <div style={{ color: 'white' }} className={`${styles.nineteenthfour} ${styles.middleElements}`} onClick={() => numberClick('nineteenthFour', 2)} ref={nineteenthFourRef}>{nineteenthFour == 0 ? "" : formatNumber(nineteenthFour)}</div>
                    <div style={{ color: 'white' }} className={`${styles.twentiethfour} ${styles.middleElements}`} onClick={() => numberClick('twentiethFour', 2)} ref={twentiethFourRef}>{twentiethFour == 0 ? "" : formatNumber(twentiethFour)}</div>
                    <div style={{ color: 'white' }} className={`${styles.twentyFirstfour} ${styles.middleElements}`} onClick={() => numberClick('twentyFirstFour', 2)} ref={twentyFirstFourRef}>{twentyFirstFour == 0 ? "" : formatNumber(twentyFirstFour)}</div>
                    <div style={{ color: 'white' }} className={`${styles.twentySecondfour} ${styles.middleElements}`} onClick={() => numberClick('twentySecondFour', 2)} ref={twentySecondFourRef}>{twentySecondFour == 0 ? "" : formatNumber(twentySecondFour)}</div>

                    <div style={{ color: 'white' }} className={`${styles.firstSix} ${styles.middleElements}`} onClick={() => numberClick('firstSix', 2)} ref={firstSixRef}>{firstSix == 0 ? "" : formatNumber(firstSix)}</div>
                    <div style={{ color: 'white' }} className={`${styles.secondSix} ${styles.middleElements}`} onClick={() => numberClick('secondSix', 2)} ref={secondSixRef}>{secondSix == 0 ? "" : formatNumber(secondSix)}</div>
                    <div style={{ color: 'white' }} className={`${styles.thirdSix} ${styles.middleElements}`} onClick={() => numberClick('thirdSix', 2)} ref={thirdSixRef}>{thirdSix == 0 ? "" : formatNumber(thirdSix)}</div>
                    <div style={{ color: 'white' }} className={`${styles.fourthSix} ${styles.middleElements}`} onClick={() => numberClick('fourthSix', 2)} ref={fourthSixRef}>{fourthSix == 0 ? "" : formatNumber(fourthSix)}</div>
                    <div style={{ color: 'white' }} className={`${styles.fifthSix} ${styles.middleElements}`} onClick={() => numberClick('fifthSix', 2)} ref={fifthSixRef}>{fifthSix == 0 ? "" : formatNumber(fifthSix)}</div>
                    <div style={{ color: 'white' }} className={`${styles.sixthSix} ${styles.middleElements}`} onClick={() => numberClick('sixthSix', 2)} ref={sixthSixRef}>{sixthSix == 0 ? "" : formatNumber(sixthSix)}</div>
                    <div style={{ color: 'white' }} className={`${styles.seventhSix} ${styles.middleElements}`} onClick={() => numberClick('seventhSix', 2)} ref={seventhSixRef}>{seventhSix == 0 ? "" : formatNumber(seventhSix)}</div>
                    <div style={{ color: 'white' }} className={`${styles.eighthSix} ${styles.middleElements}`} onClick={() => numberClick('eighthSix', 2)} ref={eighthSixRef}>{eighthSix == 0 ? "" : formatNumber(eighthSix)}</div>
                    <div style={{ color: 'white' }} className={`${styles.ninthSix} ${styles.middleElements}`} onClick={() => numberClick('ninthSix', 2)} ref={ninthSixRef}>{ninthSix == 0 ? "" : formatNumber(ninthSix)}</div>
                    <div style={{ color: 'white' }} className={`${styles.tenthSix} ${styles.middleElements}`} onClick={() => numberClick('tenthSix', 2)} ref={tenthSixRef}>{tenthSix == 0 ? "" : formatNumber(tenthSix)}</div>
                    <div style={{ color: 'white' }} className={`${styles.eleventhSix} ${styles.middleElements}`} onClick={() => numberClick('eleventhSix', 2)} ref={eleventhSixRef}>{eleventhSix == 0 ? "" : formatNumber(eleventhSix)}</div>

                    <div style={{ color: 'white' }} className={`${styles.firstThree} ${styles.middleElements}`} onClick={() => numberClick('firstThree', 2)} ref={firstThreeRef}>{firstThree == 0 ? "" : formatNumber(firstThree)}</div>
                    <div style={{ color: 'white' }} className={`${styles.secondThree} ${styles.middleElements}`} onClick={() => numberClick('secondThree', 2)} ref={secondThreeRef}>{secondThree == 0 ? "" : formatNumber(secondThree)}</div>
                    <div style={{ color: 'white' }} className={`${styles.thirdThree} ${styles.middleElements}`} onClick={() => numberClick('thirdThree', 2)} ref={thirdThreeRef}>{thirdThree == 0 ? "" : formatNumber(thirdThree)}</div>
                    <div style={{ color: 'white' }} className={`${styles.fourthThree} ${styles.middleElements}`} onClick={() => numberClick('fourthThree', 2)} ref={fourthThreeRef}>{fourthThree == 0 ? "" : formatNumber(fourthThree)}</div>
                    <div style={{ color: 'white' }} className={`${styles.fifthThree} ${styles.middleElements}`} onClick={() => numberClick('fifthThree', 2)} ref={fifthThreeRef}>{fifthThree == 0 ? "" : formatNumber(fifthThree)}</div>
                    <div style={{ color: 'white' }} className={`${styles.sixthThree} ${styles.middleElements}`} onClick={() => numberClick('sixthThree', 2)} ref={sixthThreeRef}>{sixthThree == 0 ? "" : formatNumber(sixthThree)}</div>
                    <div style={{ color: 'white' }} className={`${styles.seventhThree} ${styles.middleElements}`} onClick={() => numberClick('seventhThree', 2)} ref={seventhThreeRef}>{seventhThree == 0 ? "" : formatNumber(seventhThree)}</div>
                    <div style={{ color: 'white' }} className={`${styles.eighthThree} ${styles.middleElements}`} onClick={() => numberClick('eighthThree', 2)} ref={eighthThreeRef}>{eighthThree == 0 ? "" : formatNumber(eighthThree)}</div>
                    <div style={{ color: 'white' }} className={`${styles.ninthThree} ${styles.middleElements}`} onClick={() => numberClick('ninthThree', 2)} ref={ninthThreeRef}>{ninthThree == 0 ? "" : formatNumber(ninthThree)}</div>
                    <div style={{ color: 'white' }} className={`${styles.tenthThree} ${styles.middleElements}`} onClick={() => numberClick('tenthThree', 2)} ref={tenthThreeRef}>{tenthThree == 0 ? "" : formatNumber(tenthThree)}</div>
                    <div style={{ color: 'white' }} className={`${styles.eleventhThree} ${styles.middleElements}`} onClick={() => numberClick('eleventhThree', 2)} ref={eleventhThreeRef}>{eleventhThree == 0 ? "" : formatNumber(eleventhThree)}</div>
                    <div style={{ color: 'white' }} className={`${styles.twelfthThree} ${styles.middleElements}`} onClick={() => numberClick('twelfthThree', 2)} ref={twelfthThreeRef}>{twelfthThree == 0 ? "" : formatNumber(twelfthThree)}</div>
                    <div style={{ color: 'white' }} className={`${styles.thirteenthThree} ${styles.middleElements}`} onClick={() => numberClick('thirteenthThree', 2)} ref={thirteenthThreeRef}>{thirteenthThree == 0 ? "" : formatNumber(thirteenthThree)}</div>
                    <div style={{ color: 'white' }} className={`${styles.fourteenthThree} ${styles.middleElements}`} onClick={() => numberClick('fourteenthThree', 2)} ref={fourteenthThreeRef}>{fourteenthThree == 0 ? "" : formatNumber(fourteenthThree)}</div>
                    <div ref={doughnutRef} className={`${secondsLeft === 0 ? 'fade-out' : 'fade-in'} ${styles.doughnut}`}>
                        {/* <Doughnut data={chartData} options={chartOptions} /> */}
                    </div>
                    {/* <div className={styles.clock} ref={clockRef}>{secondsLeft}</div> */}
                    <div className={styles.table_section}>
                        <div className={styles.table}>
                            <div className={styles.zerosection}>
                                <div className={styles.gap}></div>
                                <div className={styles.zeroText} onClick={() => numberClick(0, 2)} ref={zeroRef}>
                                    <div ref={zeroRef}>0</div>
                                    {/* <div className={`${styles.insideTwoHidden} ${styles.insideElement}`} >{val0}</div> */}
                                    <div className={`${styles.insideTwoHidden} ${styles.insideElement}`} >
                                        <div style={{ position: 'relative' }}>
                                            <Image
                                                src={selectedChip == 20
                                                    ? "/"
                                                    : selectedChip == 50
                                                        ? "/coin_s_2.jpg"
                                                        : selectedChip == 100
                                                            ? "/orange_coin.png"
                                                            : selectedChip == 500
                                                                ? "/coin3.png"
                                                                : "/coin4.png"}
                                                width={35}
                                                height={35}
                                                alt="Picture of the coin"
                                            />
                                            <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-30%, -60%)', color: 'white', fontWeight: 'bold' }}>
                                                {val0 == 0 ? "" : formatNumber(val0)}
                                            </p>
                                        </div>

                                        {/* <div>{val0}</div> */}
                                    </div>
                                </div>
                            </div>
                            <div className={styles.numberSection}>
                                <div className={styles.safeBets}>
                                    <div className={styles.safeBet1}>
                                        <div className={styles.safeBet1Left}>
                                            <div className={styles.safeBet1LeftOne} onClick={() => numberClick('first18', 2)} ref={first18Ref}>
                                                <div className={styles.first18}>
                                                    1st 18
                                                </div>
                                                <div className={`${styles.insideFirst18} ${styles.insideElement}`}>
                                                    <div style={{ position: 'relative' }}>
                                                        {<Image
                                                            src={first18Chips[first18Chips.length - 1]}
                                                            width={30}
                                                            height={30}
                                                            alt="Picture of the coin"
                                                        />}
                                                        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-30%, -60%)', color: 'white', }}>
                                                            {first18 == 0 ? "" : formatNumber(first18)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={styles.safeBet1LeftTwo} onClick={() => numberClick('even', 2)} ref={evennRef}>
                                                <div className={styles.even}>EVEN</div>
                                                <div className={`${styles.insideEven} ${styles.insideElement}`}>
                                                    <div style={{ position: 'relative' }}>
                                                        {<Image
                                                            src={evenChips[evenChips.length - 1]}
                                                            width={30}
                                                            height={30}
                                                            alt="Picture of the coin"
                                                        />}
                                                        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-30%, -60%)', color: 'white', fontWeight: 'bold' }}>
                                                            {even == 0 ? "" : formatNumber(even)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <div className={styles.safeBet1Right} onClick={() => numberClick('first12', 2)} ref={first12Ref}>
                                            <div className={styles.first12}>
                                                1st 12
                                            </div>
                                            <div className={`${styles.insideFirst12} ${styles.insideElement}`}>
                                                <div style={{ position: 'relative' }}>
                                                    {<Image
                                                        src={first12Chips[first12Chips.length - 1]}
                                                        width={30}
                                                        height={30}
                                                        alt="Picture of the coin"
                                                    />}
                                                    <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-30%, -60%)', color: 'white', fontWeight: 'bold' }}>
                                                        {first12 == 0 ? "" : formatNumber(first12)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.safeBet2}>
                                        <div className={styles.safeBet2Left}>
                                            <div className={styles.redd} onClick={() => numberClick('red', 2)} ref={redRef}>
                                                <div className={`${styles.red} ${styles.redText} `}>
                                                    RED
                                                </div>
                                                <div className={` ${styles.fontChange} ${styles.insideElement}`}>
                                                    <div style={{ position: 'relative' }}>
                                                        {<Image
                                                            src={redChips[redChips.length - 1]}
                                                            width={30}
                                                            height={30}
                                                            alt="Picture of the coin"
                                                        />}
                                                        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-30%, -60%)', color: 'white', fontWeight: 'bold' }}>
                                                            {red == 0 ? "" : formatNumber(red)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={styles.safeBet1LeftTwo} onClick={() => numberClick('black', 2)} ref={blackRef}>
                                                <div className={styles.black}>BLACK</div>
                                                <div className={`${styles.insideElement}`}>
                                                    <div style={{ position: 'relative' }}>
                                                        {<Image
                                                            src={blackChips[blackChips.length - 1]}
                                                            width={30}
                                                            height={30}
                                                            alt="Picture of the coin"
                                                        />}
                                                        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-30%, -60%)', color: 'white', fontWeight: 'bold' }}>
                                                            {black == 0 ? "" : formatNumber(black)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className={styles.safeBet2Right} onClick={() => numberClick('mid12', 2)} ref={mid12Ref}>
                                            <div className={styles.second12}  >2nd 12</div>
                                            <div className={`${styles.insideElement} ${styles.insideFirst18}`}>
                                                <div style={{ position: 'relative' }}>
                                                    {<Image
                                                        src={mid12Chips[mid12Chips.length - 1]}
                                                        width={30}
                                                        height={30}
                                                        alt="Picture of the coin"
                                                    />}
                                                    <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-30%, -60%)', color: 'white', fontWeight: 'bold' }}>
                                                        {mid12 == 0 ? "" : formatNumber(mid12)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.safeBet3}>
                                        <div className={styles.safeBet3Left}>
                                            <div className={styles.safeBet1LeftOne} onClick={() => numberClick('odd', 2)} ref={oddRef}>
                                                <div className={styles.oddText}>ODD</div>
                                                <div className={`${styles.odd} ${styles.insideElement}`}>
                                                    <div style={{ position: 'relative' }}>
                                                        {<Image
                                                            src={oddChips[oddChips.length - 1]}
                                                            width={30}
                                                            height={30}
                                                            alt="Picture of the coin"
                                                        />}
                                                        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-30%, -60%)', color: 'white', fontWeight: 'bold' }}>
                                                            {odd == 0 ? "" : formatNumber(odd)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={styles.safeBet1LeftTwo} onClick={() => numberClick('last18', 2)} ref={last18Ref}>
                                                <div className={styles.second18}>
                                                    2nd18
                                                </div>
                                                <div className={`${styles.last18} ${styles.insideElement}`}>
                                                    <div style={{ position: 'relative' }}>
                                                        {<Image
                                                            src={last18Chips[last18Chips.length - 1]}
                                                            width={30}
                                                            height={30}
                                                            alt="Picture of the coin"
                                                        />}
                                                        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-30%, -60%)', color: 'white', fontWeight: 'bold' }}>
                                                            {last18 == 0 ? "" : formatNumber(last18)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.safeBet3Right} onClick={() => numberClick('last12', 2)} ref={last12Ref}>
                                            <div className={styles.last12}>3rd 12</div>
                                            <div className={`${styles.insideElement} ${styles.fontChange}`}>
                                                <div style={{ position: 'relative' }}>
                                                    {<Image
                                                        src={last12Chips[last12Chips.length - 1]}
                                                        width={30}
                                                        height={30}
                                                        alt="Picture of the coin"
                                                    />}
                                                    <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-30%, -60%)', color: 'white', fontWeight: 'bold' }}>
                                                        {last12 == 0 ? "" : formatNumber(last12)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.mostNumbers}>
                                    <div className={styles.one} id={styles.one} onClick={() => numberClick(1, 2)} ref={oneRef}>
                                        <div className={styles.oneNumber}>1</div>
                                        <div className={`${styles.insideOneHidden} ${styles.insideElement}`}>
                                            <div style={{ position: 'relative' }}>
                                                {<Image
                                                    src={oneChips[oneChips.length - 1]}
                                                    width={30}
                                                    height={30}
                                                    alt="Picture of the coin"
                                                />}
                                                <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-55%, -60%)', color: 'white', fontWeight: 'bold' }}>
                                                    {val1 == 0 ? "" : formatNumber(val1)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.two} onClick={() => numberClick(2, 2)} ref={twoRef}>
                                        <div className={styles.twoNumber}>2</div>
                                        <div className={`${styles.insideHidden} ${styles.insideElement}`}>
                                            <div style={{ position: 'relative' }}>
                                                <Image
                                                    // src={selectedChip == 20
                                                    //     ? "/brown_coin.png"
                                                    //     : selectedChip == 50
                                                    //         ? "/coin_s_2.jpg"
                                                    //         : selectedChip == 100
                                                    //             ? "/orange_coin.png"
                                                    //             : selectedChip == 500
                                                    //                 ? "/coin3.png"
                                                    //                 : "/coin4.png"}
                                                    src={twoChips[twoChips.length - 1]}
                                                    width={35}
                                                    height={35}
                                                    alt="Picture of the coin"
                                                />
                                                <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-30%, -60%)', color: 'white', fontWeight: 'bold' }}>
                                                    {val2 == 0 ? "" : formatNumber(val2)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.three} onClick={() => numberClick(3, 2)} ref={threeRef}>
                                        <div className={styles.threeNumber}>3</div>
                                        {/* <div className={`${styles.insideThreeHidden} ${styles.insideElement}`}>{val3}</div> */}
                                        <div className={`${styles.insideThreeHidden} ${styles.insideElement}`}><div style={{ position: 'relative' }}>
                                            <Image
                                                // src={
                                                // selectedChip == 20
                                                //     ? "/brown_coin.png"
                                                //     : selectedChip == 50
                                                //         ? "/coin_s_2.jpg"
                                                //         : selectedChip == 100
                                                //             ? "/orange_coin.png"
                                                //             : selectedChip == 500
                                                //                 ? "/coin3.png"
                                                //                 : "/coin4.png"}

                                                src={threeChips[threeChips.length - 1]}
                                                width={35}
                                                height={35}
                                                alt="Picture of the coin"
                                            />
                                            <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-30%, -60%)', color: 'white', fontWeight: 'bold' }}>
                                                {val3 == 0 ? "" : formatNumber(val3)}
                                            </p>
                                        </div></div>
                                    </div>
                                    <div className={styles.four} onClick={() => numberClick(4, 2)} ref={fourRef}>
                                        <div className={styles.fourNumber}>4</div>
                                        {/* <div className={`${styles.insideFourHidden} ${styles.insideElement}`}>{val4}</div> */}
                                        <div className={`${styles.insideFourHidden} ${styles.insideElement}`}><div style={{ position: 'relative' }}>
                                            <Image
                                                // src={selectedChip == 20
                                                //     ? "/brown_coin.png"
                                                //     : selectedChip == 50
                                                //         ? "/coin_s_2.jpg"
                                                //         : selectedChip == 100
                                                //             ? "/orange_coin.png"
                                                //             : selectedChip == 500
                                                //                 ? "/coin3.png"
                                                //                 : "/coin4.png"}
                                                src={fourChips[fourChips.length - 1]}
                                                width={35}
                                                height={35}
                                                alt="Picture of the coin"
                                            />
                                            <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-30%, -60%)', color: 'white', fontWeight: 'bold' }}>
                                                {val4 == 0 ? "" : formatNumber(val4)}
                                            </p>
                                        </div></div>
                                    </div>
                                    <div className={styles.five} onClick={() => numberClick(5, 2)} ref={fiveRef}>
                                        <div className={styles.fiveNumber}>5</div>
                                        {/* <div className={`${styles.insideFiveHidden} ${styles.insideElement}`}>{val5}</div> */}
                                        <div className={`${styles.insideFiveHidden} ${styles.insideElement}`}><div style={{ position: 'relative' }}>
                                            <Image
                                                // src={selectedChip == 20
                                                //     ? "/brown_coin.png"
                                                //     : selectedChip == 50
                                                //         ? "/coin_s_2.jpg"
                                                //         : selectedChip == 100
                                                //             ? "/orange_coin.png"
                                                //             : selectedChip == 500
                                                //                 ? "/coin3.png"
                                                //                 : "/coin4.png"}
                                                src={fiveChips[fiveChips.length - 1]}
                                                width={35}
                                                height={35}
                                                alt="Picture of the coin"
                                            />
                                            <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-30%, -60%)', color: 'white', fontWeight: 'bold' }}>
                                                {val5 == 0 ? "" : formatNumber(val5)}
                                            </p>
                                        </div></div>
                                    </div>
                                    <div className={styles.six} onClick={() => numberClick(6, 2)} ref={sixRef}>
                                        <div className={styles.sixNumber}>6</div>
                                        {/* <div className={`${styles.insideSixHidden} ${styles.insideElement}`}>{val6}</div> */}
                                        <div className={`${styles.insideSixHidden} ${styles.insideElement}`}><div style={{ position: 'relative' }}>
                                            <Image
                                                // src={selectedChip == 20
                                                //     ? "/brown_coin.png"
                                                //     : selectedChip == 50
                                                //         ? "/coin_s_2.jpg"
                                                //         : selectedChip == 100
                                                //             ? "/orange_coin.png"
                                                //             : selectedChip == 500
                                                //                 ? "/coin3.png"
                                                //                 : "/coin4.png"}
                                                src={sixChips[sixChips.length - 1]}
                                                width={35}
                                                height={35}
                                                alt="Picture of the coin"
                                            />
                                            <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-30%, -60%)', color: 'white', fontWeight: 'bold' }}>
                                                {val6 == 0 ? "" : formatNumber(val6)}
                                            </p>
                                        </div></div>
                                    </div>
                                    <div className={styles.seven} onClick={() => numberClick(7, 2)} ref={sevenRef}>
                                        <div className={styles.sevenNumber}>7</div>
                                        {/* <div className={`${styles.insideSevenHidden} ${styles.insideElement}`}>{val7}</div> */}
                                        <div className={`${styles.insideSevenHidden} ${styles.insideElement}`}><div style={{ position: 'relative' }}>
                                            <Image
                                                // src={selectedChip == 20
                                                //     ? "/brown_coin.png"
                                                //     : selectedChip == 50
                                                //         ? "/coin_s_2.jpg"
                                                //         : selectedChip == 100
                                                //             ? "/orange_coin.png"
                                                //             : selectedChip == 500
                                                //                 ? "/coin3.png"
                                                //                 : "/coin4.png"}
                                                src={sevenChips[sevenChips.length - 1]}
                                                width={35}
                                                height={35}
                                                alt="Picture of the coin"
                                            />
                                            <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-30%, -60%)', color: 'white', fontWeight: 'bold' }}>
                                                {val7 == 0 ? "" : formatNumber(val7)}
                                            </p>
                                        </div></div>
                                    </div>
                                    <div className={styles.eight} onClick={() => numberClick(8, 2)} ref={eightRef}>
                                        <div className={styles.eightNumber}>8</div>
                                        {/* <div className={`${styles.insideEightHidden} ${styles.insideElement}`}>{val8}</div> */}
                                        <div className={`${styles.insideEightHidden} ${styles.insideElement}`}><div style={{ position: 'relative' }}>
                                            <Image
                                                // src={selectedChip == 20
                                                //     ? "/brown_coin.png"
                                                //     : selectedChip == 50
                                                //         ? "/coin_s_2.jpg"
                                                //         : selectedChip == 100
                                                //             ? "/orange_coin.png"
                                                //             : selectedChip == 500
                                                //                 ? "/coin3.png"
                                                //                 : "/coin4.png"}
                                                src={eightChips[eightChips.length - 1]}
                                                width={35}
                                                height={35}
                                                alt="Picture of the coin"
                                            />
                                            <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-30%, -60%)', color: 'white', fontWeight: 'bold' }}>
                                                {val8 == 0 ? "" : formatNumber(val8)}
                                            </p>
                                        </div></div>
                                    </div>
                                    <div className={styles.nine} onClick={() => numberClick(9, 2)} ref={nineRef}>
                                        <div className={styles.nineNumber}>9</div>
                                        {/* <div className={`${styles.insideNineHidden} ${styles.insideElement}`}>{val9}</div> */}
                                        <div className={`${styles.insideNineHidden} ${styles.insideElement}`}><div style={{ position: 'relative' }}>
                                            <Image
                                                // src={selectedChip == 20
                                                //     ? "/brown_coin.png"
                                                //     : selectedChip == 50
                                                //         ? "/coin_s_2.jpg"
                                                //         : selectedChip == 100
                                                //             ? "/orange_coin.png"
                                                //             : selectedChip == 500
                                                //                 ? "/coin3.png"
                                                //                 : "/coin4.png"}
                                                src={nineChips[nineChips.length - 1]}
                                                width={35}
                                                height={35}
                                                alt="Picture of the coin"
                                            />
                                            <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-30%, -60%)', color: 'white', fontWeight: 'bold' }}>
                                                {val9 == 0 ? "" : formatNumber(val9)}
                                            </p>
                                        </div></div>
                                    </div>
                                    <div className={styles.ten} onClick={() => numberClick(10, 2)} ref={tenRef}>
                                        <div className={styles.tenNumber}>10</div>
                                        {/* <div className={`${styles.insideTenHidden} ${styles.insideElement}`}>{val10}</div> */}
                                        <div className={`${styles.insideTenHidden} ${styles.insideElement}`}><div style={{ position: 'relative' }}>
                                            <Image
                                                // src={selectedChip == 20
                                                //     ? "/brown_coin.png"
                                                //     : selectedChip == 50
                                                //         ? "/coin_s_2.jpg"
                                                //         : selectedChip == 100
                                                //             ? "/orange_coin.png"
                                                //             : selectedChip == 500
                                                //                 ? "/coin3.png"
                                                //                 : "/coin4.png"}
                                                src={tenChips[tenChips.length - 1]}
                                                width={35}
                                                height={35}
                                                alt="Picture of the coin"
                                            />
                                            <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-30%, -60%)', color: 'white', fontWeight: 'bold' }}>
                                                {val10 == 0 ? "" : formatNumber(val10)}
                                            </p>
                                        </div></div>
                                    </div>
                                    <div className={styles.eleven} onClick={() => numberClick(11, 2)} ref={elevenRef}>
                                        <div className={styles.elevenNumber}>11</div>
                                        {/* <div className={`${styles.insideElevenHidden} ${styles.insideElement}`}>{val11}</div> */}
                                        <div className={`${styles.insideElevenHidden} ${styles.insideElement}`}><div style={{ position: 'relative' }}>
                                            <Image
                                                // src={selectedChip == 20
                                                //     ? "/brown_coin.png"
                                                //     : selectedChip == 50
                                                //         ? "/coin_s_2.jpg"
                                                //         : selectedChip == 100
                                                //             ? "/orange_coin.png"
                                                //             : selectedChip == 500
                                                //                 ? "/coin3.png"
                                                //                 : "/coin4.png"}
                                                src={elevenChips[elevenChips.length - 1]}
                                                width={35}
                                                height={35}
                                                alt="Picture of the coin"
                                            />
                                            <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-30%, -60%)', color: 'white', fontWeight: 'bold' }}>
                                                {val11 == 0 ? "" : formatNumber(val11)}
                                            </p>
                                        </div></div>
                                    </div>
                                    <div className={styles.twelve} onClick={() => numberClick(12, 2)} ref={twelveRef}>
                                        <div className={styles.twelveNumber}>12</div>
                                        {/* <div className={`${styles.insideTwelveHidden} ${styles.insideElement}`}>{val12}</div> */}
                                        <div className={`${styles.insideTwelveHidden} ${styles.insideElement}`}><div style={{ position: 'relative' }}>
                                            <Image
                                                // src={selectedChip == 20
                                                //     ? "/brown_coin.png"
                                                //     : selectedChip == 50
                                                //         ? "/coin_s_2.jpg"
                                                //         : selectedChip == 100
                                                //             ? "/orange_coin.png"
                                                //             : selectedChip == 500
                                                //                 ? "/coin3.png"
                                                //                 : "/coin4.png"}
                                                src={twelveChips[twelveChips.length - 1]}
                                                width={35}
                                                height={35}
                                                alt="Picture of the coin"
                                            />
                                            <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-30%, -60%)', color: 'white', fontWeight: 'bold' }}>
                                                {val12 == 0 ? "" : formatNumber(val12)}
                                            </p>
                                        </div></div>
                                    </div>
                                    <div className={styles.thirteen} onClick={() => numberClick(13, 2)} ref={thirteenRef}>
                                        <div className={styles.thirteenNumer}>13</div>
                                        {/* <div className={`${styles.insideThirteenHidden} ${styles.insideElement}`}>{val13}</div> */}
                                        <div className={`${styles.insideThirteenHidden} ${styles.insideElement}`}><div style={{ position: 'relative' }}>
                                            <Image
                                                // src={selectedChip == 20
                                                //     ? "/brown_coin.png"
                                                //     : selectedChip == 50
                                                //         ? "/coin_s_2.jpg"
                                                //         : selectedChip == 100
                                                //             ? "/orange_coin.png"
                                                //             : selectedChip == 500
                                                //                 ? "/coin3.png"
                                                //                 : "/coin4.png"}
                                                src={thirteenChips[thirteenChips.length - 1]}
                                                width={35}
                                                height={35}
                                                alt="Picture of the coin"
                                            />
                                            <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-30%, -60%)', color: 'white', fontWeight: 'bold' }}>
                                                {val13 == 0 ? "" : formatNumber(val13)}
                                            </p>
                                        </div></div>
                                    </div>
                                    <div className={styles.fourteen} onClick={() => numberClick(14, 2)} ref={fourteenRef}>
                                        <div className={styles.fourteenNumber}>14</div>
                                        {/* <div className={`${styles.insideFourteenHidden} ${styles.insideElement}`}>{val14}</div> */}
                                        <div className={`${styles.insideFourteenHidden} ${styles.insideElement}`}><div style={{ position: 'relative' }}>
                                            <Image
                                                // src={selectedChip == 20
                                                //     ? "/brown_coin.png"
                                                //     : selectedChip == 50
                                                //         ? "/coin_s_2.jpg"
                                                //         : selectedChip == 100
                                                //             ? "/orange_coin.png"
                                                //             : selectedChip == 500
                                                //                 ? "/coin3.png"
                                                //                 : "/coin4.png"}
                                                src={fourteenChips[fourteenChips.length - 1]}
                                                width={35}
                                                height={35}
                                                alt="Picture of the coin"
                                            />
                                            <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-30%, -60%)', color: 'white', fontWeight: 'bold' }}>
                                                {val14 == 0 ? "" : formatNumber(val14)}
                                            </p>
                                        </div></div>
                                    </div>
                                    <div className={styles.fifteen} onClick={() => numberClick(15, 2)} ref={fifteenRef}>
                                        <div className={styles.fifteenNumber}>15</div>
                                        {/* <div className={`${styles.insideFifteenHidden} ${styles.insideElement}`}>{val15}</div> */}
                                        <div className={`${styles.insideFifteenHidden} ${styles.insideElement}`}><div style={{ position: 'relative' }}>
                                            <Image
                                                // src={selectedChip == 20
                                                //     ? "/brown_coin.png"
                                                //     : selectedChip == 50
                                                //         ? "/coin_s_2.jpg"
                                                //         : selectedChip == 100
                                                //             ? "/orange_coin.png"
                                                //             : selectedChip == 500
                                                //                 ? "/coin3.png"
                                                //                 : "/coin4.png"}
                                                src={fifteenChips[fifteenChips.length - 1]}
                                                width={35}
                                                height={35}
                                                alt="Picture of the coin"
                                            />
                                            <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-30%, -60%)', color: 'white', fontWeight: 'bold' }}>
                                                {val15 == 0 ? "" : formatNumber(val15)}
                                            </p>
                                        </div></div>
                                    </div>
                                    <div className={styles.sixteen} onClick={() => numberClick(16, 2)} ref={sixteenRef}>
                                        <div className={styles.sixteenNumber}>16</div>
                                        {/* <div className={`${styles.insideSixteenHidden} ${styles.insideElement}`}>{val16}</div> */}
                                        <div className={`${styles.insideSixteenHidden} ${styles.insideElement}`}><div style={{ position: 'relative' }}>
                                            <Image
                                                // src={selectedChip == 20
                                                //     ? "/brown_coin.png"
                                                //     : selectedChip == 50
                                                //         ? "/coin_s_2.jpg"
                                                //         : selectedChip == 100
                                                //             ? "/orange_coin.png"
                                                //             : selectedChip == 500
                                                //                 ? "/coin3.png"
                                                //                 : "/coin4.png"}
                                                src={sixteenChips[sixteenChips.length - 1]}
                                                width={35}
                                                height={35}
                                                alt="Picture of the coin"
                                            />
                                            <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-30%, -60%)', color: 'white', fontWeight: 'bold' }}>
                                                {val16 == 0 ? "" : formatNumber(val16)}
                                            </p>
                                        </div></div>
                                    </div>
                                    <div className={styles.seventeen} onClick={() => numberClick(17, 2)} ref={seventeenRef}>
                                        <div className={styles.seventeenNumber}>17</div>
                                        {/* <div className={`${styles.insideSeventeenHidden} ${styles.insideElement}`}>{val17}</div> */}
                                        <div className={`${styles.insideSeventeenHidden} ${styles.insideElement}`}><div style={{ position: 'relative' }}>
                                            <Image
                                                // src={selectedChip == 20
                                                //     ? "/brown_coin.png"
                                                //     : selectedChip == 50
                                                //         ? "/coin_s_2.jpg"
                                                //         : selectedChip == 100
                                                //             ? "/orange_coin.png"
                                                //             : selectedChip == 500
                                                //                 ? "/coin3.png"
                                                //                 : "/coin4.png"}
                                                src={seventeenChips[seventeenChips.length - 1]}
                                                width={35}
                                                height={35}
                                                alt="Picture of the coin"
                                            />
                                            <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-30%, -60%)', color: 'white', fontWeight: 'bold' }}>
                                                {val17 == 0 ? "" : formatNumber(val17)}
                                            </p>
                                        </div></div>
                                    </div>
                                    <div className={styles.eighteen} onClick={() => numberClick(18, 2)} ref={eighteenRef}>
                                        <div className={styles.eighteenNumber}>18</div>
                                        {/* <div className={`${styles.insideEighteenHidden} ${styles.insideElement}`}>{val18}</div> */}
                                        <div className={`${styles.insideEighteenHidden} ${styles.insideElement}`}><div style={{ position: 'relative' }}>
                                            <Image
                                                // src={selectedChip == 20
                                                //     ? "/brown_coin.png"
                                                //     : selectedChip == 50
                                                //         ? "/coin_s_2.jpg"
                                                //         : selectedChip == 100
                                                //             ? "/orange_coin.png"
                                                //             : selectedChip == 500
                                                //                 ? "/coin3.png"
                                                //                 : "/coin4.png"}
                                                src={eighteenChips[eighteenChips.length - 1]}
                                                width={35}
                                                height={35}
                                                alt="Picture of the coin"
                                            />
                                            <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-30%, -60%)', color: 'white', fontWeight: 'bold' }}>
                                                {val18 == 0 ? "" : formatNumber(val18)}
                                            </p>
                                        </div></div>
                                    </div>
                                    <div className={styles.nineteen} onClick={() => numberClick(19, 2)} ref={nineteenRef}>
                                        <div className={styles.nineteenNumber}>19</div>
                                        {/* <div className={`${styles.insideNineteenHidden} ${styles.insideElement}`}>{val19}</div> */}
                                        <div className={`${styles.insideNineteenHidden} ${styles.insideElement}`}><div style={{ position: 'relative' }}>
                                            <Image
                                                // src={selectedChip == 20
                                                //     ? "/brown_coin.png"
                                                //     : selectedChip == 50
                                                //         ? "/coin_s_2.jpg"
                                                //         : selectedChip == 100
                                                //             ? "/orange_coin.png"
                                                //             : selectedChip == 500
                                                //                 ? "/coin3.png"
                                                //                 : "/coin4.png"}
                                                src={nineteenChips[nineteenChips.length - 1]}
                                                width={35}
                                                height={35}
                                                alt="Picture of the coin"
                                            />
                                            <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-30%, -60%)', color: 'white', fontWeight: 'bold' }}>
                                                {val19 == 0 ? "" : formatNumber(val19)}
                                            </p>
                                        </div></div>
                                    </div>
                                    <div className={styles.twentyNumber} onClick={() => numberClick(20, 2)} ref={twentyRef}>
                                        <div className={styles.twentyNumber}>20</div>
                                        {/* <div className={`${styles.insideTwentyHidden} ${styles.insideElement}`}>{val20}</div> */}
                                        <div className={`${styles.insideTwentyHidden} ${styles.insideElement}`}><div style={{ position: 'relative' }}>
                                            <Image
                                                // src={selectedChip == 20
                                                //     ? "/brown_coin.png"
                                                //     : selectedChip == 50
                                                //         ? "/coin_s_2.jpg"
                                                //         : selectedChip == 100
                                                //             ? "/orange_coin.png"
                                                //             : selectedChip == 500
                                                //                 ? "/coin3.png"
                                                //                 : "/coin4.png"}
                                                src={twentyChips[twentyChips.length - 1]}
                                                width={35}
                                                height={35}
                                                alt="Picture of the coin"
                                            />
                                            <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-30%, -60%)', color: 'white', fontWeight: 'bold' }}>
                                                {val20 == 0 ? "" : formatNumber(val20)}
                                            </p>
                                        </div></div>
                                    </div>
                                    <div className={styles.twentyOne} onClick={() => numberClick(21, 2)} ref={twentyoneRef}>
                                        <div className={styles.twentyOneNumber}>21</div>
                                        {/* <div className={`${styles.insideTwentyOneHidden} ${styles.insideElement}`}>{val21}</div> */}
                                        <div className={`${styles.insideTwentyOneHidden} ${styles.insideElement}`}><div style={{ position: 'relative' }}>
                                            <Image
                                                // src={selectedChip == 20
                                                //     ? "/brown_coin.png"
                                                //     : selectedChip == 50
                                                //         ? "/coin_s_2.jpg"
                                                //         : selectedChip == 100
                                                //             ? "/orange_coin.png"
                                                //             : selectedChip == 500
                                                //                 ? "/coin3.png"
                                                //                 : "/coin4.png"}
                                                src={twentyOneChips[twentyOneChips.length - 1]}
                                                width={35}
                                                height={35}
                                                alt="Picture of the coin"
                                            />
                                            <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-30%, -60%)', color: 'white', fontWeight: 'bold' }}>
                                                {val21 == 0 ? "" : formatNumber(val21)}
                                            </p>
                                        </div></div>
                                    </div>
                                    <div className={styles.twentyTwo} onClick={() => numberClick(22, 2)} ref={twentytwoRef}>
                                        <div className={styles.twentyTwoNumber}>22</div>
                                        {/* <div className={`${styles.insideTwentyTwoHidden} ${styles.insideElement}`}>{val22}</div> */}
                                        <div className={`${styles.insideTwentyTwoHidden} ${styles.insideElement}`}><div style={{ position: 'relative' }}>
                                            <Image
                                                // src={selectedChip == 20
                                                //     ? "/brown_coin.png"
                                                //     : selectedChip == 50
                                                //         ? "/coin_s_2.jpg"
                                                //         : selectedChip == 100
                                                //             ? "/orange_coin.png"
                                                //             : selectedChip == 500
                                                //                 ? "/coin3.png"
                                                //                 : "/coin4.png"}
                                                src={twentyTwoChips[twentyTwoChips.length - 1]}
                                                width={35}
                                                height={35}
                                                alt="Picture of the coin"
                                            />
                                            <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-30%, -60%)', color: 'white', fontWeight: 'bold' }}>
                                                {val22 == 0 ? "" : formatNumber(val22)}
                                            </p>
                                        </div></div>
                                    </div>
                                    <div className={styles.twentyThree} onClick={() => numberClick(23, 2)} ref={twentythreeRef}>
                                        <div className={styles.twentyThreeNumber}>23</div>
                                        {/* <div className={`${styles.insideTwentyThreeHidden} ${styles.insideElement}`}>{val23}</div> */}
                                        <div className={`${styles.insideTwentyThreeHidden} ${styles.insideElement}`}><div style={{ position: 'relative' }}>
                                            <Image
                                                // src={selectedChip == 20
                                                //     ? "/brown_coin.png"
                                                //     : selectedChip == 50
                                                //         ? "/coin_s_2.jpg"
                                                //         : selectedChip == 100
                                                //             ? "/orange_coin.png"
                                                //             : selectedChip == 500
                                                //                 ? "/coin3.png"
                                                //                 : "/coin4.png"}
                                                src={twentyThreeChips[twentyThreeChips.length - 1]}
                                                width={35}
                                                height={35}
                                                alt="Picture of the coin"
                                            />
                                            <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-30%, -60%)', color: 'white', fontWeight: 'bold' }}>
                                                {val23 == 0 ? "" : formatNumber(val23)}
                                            </p>
                                        </div></div>
                                    </div>
                                    <div className={styles.twentyFour} onClick={() => numberClick(24, 2)} ref={twentyfourRef}>
                                        <div className={styles.twentyFourNumber}>24</div>
                                        {/* <div className={`${styles.insideTwentyFourHidden} ${styles.insideElement}`}>{val24}</div> */}
                                        <div className={`${styles.insideTwentyFourHidden} ${styles.insideElement}`}><div style={{ position: 'relative' }}>
                                            <Image
                                                // src={selectedChip == 20
                                                //     ? "/brown_coin.png"
                                                //     : selectedChip == 50
                                                //         ? "/coin_s_2.jpg"
                                                //         : selectedChip == 100
                                                //             ? "/orange_coin.png"
                                                //             : selectedChip == 500
                                                //                 ? "/coin3.png"
                                                //                 : "/coin4.png"}
                                                src={twentyFourChips[twentyFourChips.length - 1]}
                                                width={35}
                                                height={35}
                                                alt="Picture of the coin"
                                            />
                                            <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-30%, -60%)', color: 'white', fontWeight: 'bold' }}>
                                                {val24 == 0 ? "" : formatNumber(val24)}
                                            </p>
                                        </div></div>
                                    </div>
                                    <div className={styles.twentyFive} onClick={() => numberClick(25, 2)} ref={twentyfiveRef}>
                                        <div className={styles.twentyFiveNumber}>25</div>
                                        {/* <div className={`${styles.insideTwentyFiveHidden} ${styles.insideElement}`}>{val25}</div> */}
                                        <div className={`${styles.insideTwentyFiveHidden} ${styles.insideElement}`}><div style={{ position: 'relative' }}>
                                            <Image
                                                // src={selectedChip == 20
                                                //     ? "/brown_coin.png"
                                                //     : selectedChip == 50
                                                //         ? "/coin_s_2.jpg"
                                                //         : selectedChip == 100
                                                //             ? "/orange_coin.png"
                                                //             : selectedChip == 500
                                                //                 ? "/coin3.png"
                                                //                 : "/coin4.png"}
                                                src={twentyFiveChips[twentyFiveChips.length - 1]}
                                                width={35}
                                                height={35}
                                                alt="Picture of the coin"
                                            />
                                            <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-30%, -60%)', color: 'white', fontWeight: 'bold' }}>
                                                {val25 == 0 ? "" : formatNumber(val25)}
                                            </p>
                                        </div></div>
                                    </div>
                                    <div className={styles.twentySix} onClick={() => numberClick(26, 2)} ref={twentysixRef}>
                                        <div className={styles.twentySixNumber}>26</div>
                                        {/* <div className={`${styles.insideTwentySixHidden} ${styles.insideElement}`}>{val26}</div> */}
                                        <div className={`${styles.insideTwentySixHidden} ${styles.insideElement}`}><div style={{ position: 'relative' }}>
                                            <Image
                                                // src={selectedChip == 20
                                                //     ? "/brown_coin.png"
                                                //     : selectedChip == 50
                                                //         ? "/coin_s_2.jpg"
                                                //         : selectedChip == 100
                                                //             ? "/orange_coin.png"
                                                //             : selectedChip == 500
                                                //                 ? "/coin3.png"
                                                //                 : "/coin4.png"}
                                                src={twentySixChips[twentySixChips.length - 1]}
                                                width={35}
                                                height={35}
                                                alt="Picture of the coin"
                                            />
                                            <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-30%, -60%)', color: 'white', fontWeight: 'bold' }}>
                                                {val26 == 0 ? "" : formatNumber(val26)}
                                            </p>
                                        </div></div>
                                    </div>
                                    <div className={styles.twentySeven} onClick={() => numberClick(27, 2)} ref={twentysevenRef}>
                                        <div className={styles.twentySevenNumber}>27</div>
                                        {/* <div className={`${styles.insideTwentySevenHidden} ${styles.insideElement}`}>{val27}</div> */}
                                        <div className={`${styles.insideTwentySevenHidden} ${styles.insideElement}`}><div style={{ position: 'relative' }}>
                                            <Image
                                                // src={selectedChip == 20
                                                //     ? "/brown_coin.png"
                                                //     : selectedChip == 50
                                                //         ? "/coin_s_2.jpg"
                                                //         : selectedChip == 100
                                                //             ? "/orange_coin.png"
                                                //             : selectedChip == 500
                                                //                 ? "/coin3.png"
                                                //                 : "/coin4.png"}
                                                src={twentySevenChips[twentySevenChips.length - 1]}
                                                width={35}
                                                height={35}
                                                alt="Picture of the coin"
                                            />
                                            <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-30%, -60%)', color: 'white', fontWeight: 'bold' }}>
                                                {val27 == 0 ? "" : formatNumber(val27)}
                                            </p>
                                        </div></div>
                                    </div>
                                    <div className={styles.twentyEight} onClick={() => numberClick(28, 2)} ref={twentyeightRef}>
                                        <div className={styles.twentyEightNumber}>28</div>
                                        {/* <div className={`${styles.insideTwentyEightHidden} ${styles.insideElement}`}>{val28}</div> */}
                                        <div className={`${styles.insideTwentyEightHidden} ${styles.insideElement}`}><div style={{ position: 'relative' }}>
                                            <Image
                                                // src={selectedChip == 20
                                                //     ? "/brown_coin.png"
                                                //     : selectedChip == 50
                                                //         ? "/coin_s_2.jpg"
                                                //         : selectedChip == 100
                                                //             ? "/orange_coin.png"
                                                //             : selectedChip == 500
                                                //                 ? "/coin3.png"
                                                //                 : "/coin4.png"}
                                                src={twentyEightChips[twentyEightChips.length - 1]}
                                                width={35}
                                                height={35}
                                                alt="Picture of the coin"
                                            />
                                            <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-30%, -60%)', color: 'white', fontWeight: 'bold' }}>
                                                {val28 == 0 ? "" : formatNumber(val28)}
                                            </p>
                                        </div></div>
                                    </div>
                                    <div className={styles.twentyNine} onClick={() => numberClick(29, 2)} ref={twentynineRef}>
                                        <div className={styles.twentyNineNumber}>29</div>
                                        {/* <div className={`${styles.insideTwentyNineHidden} ${styles.insideElement}`}>{val29}</div> */}
                                        <div className={`${styles.insideTwentyNineHidden} ${styles.insideElement}`}><div style={{ position: 'relative' }}>
                                            <Image
                                                // src={selectedChip == 20
                                                //     ? "/brown_coin.png"
                                                //     : selectedChip == 50
                                                //         ? "/coin_s_2.jpg"
                                                //         : selectedChip == 100
                                                //             ? "/orange_coin.png"
                                                //             : selectedChip == 500
                                                //                 ? "/coin3.png"
                                                //                 : "/coin4.png"}
                                                src={twentyNineChips[twentyNineChips.length - 1]}
                                                width={35}
                                                height={35}
                                                alt="Picture of the coin"
                                            />
                                            <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-30%, -60%)', color: 'white', fontWeight: 'bold' }}>
                                                {val29 == 0 ? "" : formatNumber(val29)}
                                            </p>
                                        </div></div>
                                    </div>
                                    <div className={styles.thirty} onClick={() => numberClick(30, 2)} ref={thirtyRef}>
                                        <div className={styles.thirtyNUmber}>30</div>
                                        {/* <div className={`${styles.insideThirtyHidden} ${styles.insideElement}`}>{val30}</div> */}
                                        <div className={`${styles.insideThirtyHidden} ${styles.insideElement}`}><div style={{ position: 'relative' }}>
                                            <Image
                                                // src={selectedChip == 20
                                                //     ? "/brown_coin.png"
                                                //     : selectedChip == 50
                                                //         ? "/coin_s_2.jpg"
                                                //         : selectedChip == 100
                                                //             ? "/orange_coin.png"
                                                //             : selectedChip == 500
                                                //                 ? "/coin3.png"
                                                //                 : "/coin4.png"}
                                                src={thirtyChips[thirtyChips.length - 1]}
                                                width={35}
                                                height={35}
                                                alt="Picture of the coin"
                                            />
                                            <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-30%, -60%)', color: 'white', fontWeight: 'bold' }}>
                                                {val30 == 0 ? "" : formatNumber(val30)}
                                            </p>
                                        </div></div>
                                    </div>
                                    <div className={styles.thirtyOne} onClick={() => numberClick(31, 2)} ref={thirtyoneRef}>
                                        <div className={styles.thirtyOneNumber}>31</div>
                                        {/* <div className={`${styles.insideThirtyOneHidden} ${styles.insideElement}`}>{val31}</div> */}
                                        <div className={`${styles.insideThirtyOneHidden} ${styles.insideElement}`}><div style={{ position: 'relative' }}>
                                            <Image
                                                // src={selectedChip == 20
                                                //     ? "/brown_coin.png"
                                                //     : selectedChip == 50
                                                //         ? "/coin_s_2.jpg"
                                                //         : selectedChip == 100
                                                //             ? "/orange_coin.png"
                                                //             : selectedChip == 500
                                                //                 ? "/coin3.png"
                                                //                 : "/coin4.png"}
                                                src={thirtyOneChips[thirtyOneChips.length - 1]}
                                                width={35}
                                                height={35}
                                                alt="Picture of the coin"
                                            />
                                            <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-30%, -60%)', color: 'white', fontWeight: 'bold' }}>
                                                {val31 == 0 ? "" : formatNumber(val31)}
                                            </p>
                                        </div></div>
                                    </div>
                                    <div className={styles.thirtyTwo} onClick={() => numberClick(32, 2)} ref={thirtytwoRef}>
                                        <div className={styles.thirtyTwoNumber}>32</div>
                                        {/* <div className={`${styles.insideThirtyTwoHidden} ${styles.insideElement}`}>{val32}</div> */}
                                        <div className={`${styles.insideThirtyTwoHidden} ${styles.insideElement}`}><div style={{ position: 'relative' }}>
                                            <Image
                                                // src={selectedChip == 20
                                                //     ? "/brown_coin.png"
                                                //     : selectedChip == 50
                                                //         ? "/coin1.png"
                                                //         : selectedChip == 100
                                                //             ? "/orange_coin.png"
                                                //             : selectedChip == 500
                                                //                 ? "/coin3.png"
                                                //                 : "/coin4.png"}
                                                src={thirtyTwoChips[thirtyTwoChips.length - 1]}
                                                width={35}
                                                height={35}
                                                alt="Picture of the coin"
                                            />
                                            <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-30%, -60%)', color: 'white', fontWeight: 'bold' }}>
                                                {val32 == 0 ? "" : formatNumber(val32)}
                                            </p>
                                        </div></div>
                                    </div>
                                    <div className={styles.thirtyThree} onClick={() => numberClick(33, 2)} ref={thirtythreeRef}>
                                        <div className={styles.thirtyThreeNumber}>33</div>
                                        {/* <div className={`${styles.insideThirtyThreeHidden} ${styles.insideElement}`}>{val33}</div> */}
                                        <div className={`${styles.insideThirtyThreeHidden} ${styles.insideElement}`}><div style={{ position: 'relative' }}>
                                            <Image
                                                // src={selectedChip == 20
                                                //     ? "/brown_coin.png"
                                                //     : selectedChip == 50
                                                //         ? "/coin1.png"
                                                //         : selectedChip == 100
                                                //             ? "/orange_coin.png"
                                                //             : selectedChip == 500
                                                //                 ? "/coin3.png"
                                                //                 : "/coin4.png"}
                                                src={thirtyThreeChips[thirtyThreeChips.length - 1]}
                                                width={35}
                                                height={35}
                                                alt="Picture of the coin"
                                            />
                                            <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-30%, -60%)', color: 'white', fontWeight: 'bold' }}>
                                                {val33 == 0 ? "" : formatNumber(val33)}
                                            </p>
                                        </div></div>
                                    </div>
                                    <div className={styles.thirtyFour} onClick={() => numberClick(34, 2)} ref={thirtyfourRef}>
                                        <div className={styles.thirtyFourNumber}>34</div>
                                        {/* <div className={`${styles.insideThirtyFourHidden} ${styles.insideElement}`}>{val34}</div> */}
                                        <div className={`${styles.insideThirtyFourHidden} ${styles.insideElement}`}><div style={{ position: 'relative' }}>
                                            <Image
                                                // src={selectedChip == 20
                                                //     ? "/brown_coin.png"
                                                //     : selectedChip == 50
                                                //         ? "/coin1.png"
                                                //         : selectedChip == 100
                                                //             ? "/orange_coin.png"
                                                //             : selectedChip == 500
                                                //                 ? "/coin3.png"
                                                //                 : "/coin4.png"}
                                                src={thirtyFourChips[thirtyFourChips.length - 1]}
                                                width={35}
                                                height={35}
                                                alt="Picture of the coin"
                                            />
                                            <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-30%, -60%)', color: 'white', fontWeight: 'bold' }}>
                                                {val34 == 0 ? "" : formatNumber(val34)}
                                            </p>
                                        </div></div>
                                    </div>
                                    <div className={styles.thirtyFive} onClick={() => numberClick(35, 2)} ref={thirtyfiveRef}>
                                        <div className={styles.thirtyFiveNumber}>35</div>
                                        {/* <div className={`${styles.insideThirtyFiveHidden} ${styles.insideElement}`}>{val35}</div> */}
                                        <div className={`${styles.insideThirtyFiveHidden} ${styles.insideElement}`}>
                                            <div style={{ position: 'relative' }}>
                                                <Image
                                                    // src={selectedChip == 20
                                                    //     ? "/brown_coin.png"
                                                    //     : selectedChip == 50
                                                    //         ? "/coin1.png"
                                                    //         : selectedChip == 100
                                                    //             ? "/orange_coin.png"
                                                    //             : selectedChip == 500
                                                    //                 ? "/coin3.png"
                                                    //                 : "/coin4.png"}
                                                    src={thirtyFiveChips[thirtyFiveChips.length - 1]}
                                                    width={35}
                                                    height={35}
                                                    alt="Picture of the coin"
                                                />
                                                <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-30%, -60%)', color: 'white', fontWeight: 'bold' }}>
                                                    {val35 == 0 ? "" : formatNumber(val35)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.thirtySix} onClick={() => numberClick(36, 2)} ref={thirtysixRef}>
                                        <div className={styles.thirtySixNumber}>36</div>
                                        {/* <div className={`${styles.insideThirtySixHidden} ${styles.insideElement}`}>{val36}</div> */}
                                        <div className={`${styles.insideThirtySixHidden} ${styles.insideElement}`}><div style={{ position: 'relative' }}>
                                            <Image
                                                // src={selectedChip == 20
                                                //     ? "/brown_coin.png"
                                                //     : selectedChip == 50
                                                //         ? "/coin1.png"
                                                //         : selectedChip == 100
                                                //             ? "/orange_coin.png"
                                                //             : selectedChip == 500
                                                //                 ? "/coin3.png"
                                                //                 : "/coin4.png"}
                                                src={thirtySixChips[thirtySixChips.length - 1]}
                                                width={35}
                                                height={35}
                                                alt="Picture of the coin"
                                            />
                                            <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-30%, -60%)', color: 'white', fontWeight: 'bold' }}>
                                                {val36 == 0 ? "" : formatNumber(val36)}
                                            </p>
                                        </div></div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.bottomSection}>
                                <div className={styles.empty} ref={animRef}>
                                    <div className={styles.wheel}>
                                        <div className={styles.ballHold}
                                            id="ballHold"
                                            ref={rotateBallHold}
                                            onTransitionEnd={displayNumber}>
                                            <div className={styles.ball} id="ball">

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.column1}></div>
                                <div className={styles.column2} onClick={() => numberClick('col1', 2)} ref={col1Ref}>
                                    <div className={styles.col1}>COL 1</div>
                                    {/* <div className={`${styles.insideCol1} ${styles.insideElement}`}>{col1}</div> */}
                                    <div className={`${styles.insideCol1} ${styles.insideElement}`}>
                                        {/* <Image
                                        src={col1Chips[col1Chips.length - 1]}
                                        width={20}
                                        height={20}
                                        alt="Picture of the coin"
                                    /> */}
                                        <div style={{ position: 'relative' }}>
                                            {<Image
                                                // src={selectedChip == 20
                                                //     ? "/brown_coin.png"
                                                //     : selectedChip == 50
                                                //         ? "/coin1.png"
                                                //         : selectedChip == 100
                                                //             ? "/orange_coin.png"
                                                //             : selectedChip == 500
                                                //                 ? "/coin3.png"
                                                //                 : "/coin4.png"}
                                                src={col1Chips[col1Chips.length - 1]}
                                                width={30}
                                                height={30}
                                                alt="Picture of the coin"
                                            />}
                                            <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-30%, -60%)', color: 'white', fontWeight: 'bold' }}>
                                                {col1 == 0 ? "" : formatNumber(col1)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.column3} onClick={() => numberClick('col2', 2)} ref={col2Ref}>
                                    <div className={styles.col2}>COL 2</div>
                                    {/* <div className={`${styles.insideCol2} ${styles.insideElement}`}>{col2}</div> */}
                                    <div className={`${styles.insideCol2} ${styles.insideElement}`}>
                                        <div style={{ position: 'relative' }}>
                                            {<Image
                                                // src={selectedChip == 20
                                                //     ? "/brown_coin.png"
                                                //     : selectedChip == 50
                                                //         ? "/coin1.png"
                                                //         : selectedChip == 100
                                                //             ? "/orange_coin.png"
                                                //             : selectedChip == 500
                                                //                 ? "/coin3.png"
                                                //                 : "/coin4.png"}
                                                src={col2Chips[col2Chips.length - 1]}
                                                width={30}
                                                height={30}
                                                alt="Picture of the coin"
                                            />}
                                            <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-30%, -60%)', color: 'white', fontWeight: 'bold' }}>
                                                {col2 == 0 ? "" : formatNumber(col2)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.column4} onClick={() => numberClick('col3', 2)} ref={col3Ref}>
                                    <div className={styles.col3}>COL 3</div>
                                    {/* <div className={`${styles.insideCol3} ${styles.insideElement}`}>{col3}</div> */}
                                    <div className={`${styles.insideCol3} ${styles.insideElement}`}>
                                        <div style={{ position: 'relative' }}>
                                            {<Image
                                                // src={selectedChip == 20
                                                //     ? "/brown_coin.png"
                                                //     : selectedChip == 50
                                                //         ? "/coin1.png"
                                                //         : selectedChip == 100
                                                //             ? "/orange_coin.png"
                                                //             : selectedChip == 500
                                                //                 ? "/coin3.png"
                                                //                 : "/coin4.png"}
                                                src={col3Chips[col3Chips.length - 1]}
                                                width={30}
                                                height={30}
                                                alt="Picture of the coin"
                                            />}
                                            <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-30%, -60%)', color: 'white', fontWeight: 'bold' }}>
                                                {col3 == 0 ? "" : formatNumber(col3)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.chipSection}>
                            <div className={styles.content}>
                                <div className={styles.chips} onClick={chipSelection}>
                                    <div className={styles.selectedStaticChip} ref={selectedStaticChipRef}>
                                        {selectedStaticChip == 0 ? "" : formatNumber(selectedStaticChip)}
                                    </div>
                                    <div className={styles.twentyChip} ref={twentyChip} onClick={() => incrementBy(20)}>
                                        20
                                    </div>
                                    <div className={styles.fifty} ref={fiftyChip} onClick={() => incrementBy(50)}>
                                        50
                                    </div>
                                    <div className={styles.hundred} ref={hundredChip} onClick={() => incrementBy(100)}>
                                        100
                                    </div>
                                    <div className={styles.twoHundred} ref={twoHundredChip} onClick={() => incrementBy(200)}>
                                        200
                                    </div>
                                    <div className={styles.fiveHundred} ref={fiveHundredChip} onClick={() => incrementBy(500)}>
                                        500
                                    </div>
                                    <div className={styles.thousand} ref={thousandChip} onClick={() => incrementBy(1000)}>
                                        1000
                                    </div>
                                    <div className={styles.tenThousand} ref={tenThousandChip} onClick={() => incrementBy(10000)}>
                                        10K
                                    </div>
                                    <div className={styles.fiftyThousand} ref={fiftyThousandChip} onClick={() => incrementBy(50000)}>
                                        50K
                                    </div>
                                </div>
                                <div className={styles.double} onClick={undoBets}>

                                </div>
                                {/* <div className={styles.undo} onClick={doubleBets}>
                                    2x
                                </div> */}
                            </div>
                        </div>
                    </div>

                </div>
                <div className={styles.lower}>
                    <div onClick={() => setShowBetsModal(!showBetsModal)}>
                        {emittedValues.map((value, index) => (
                            <div
                                key={index}
                                style={{
                                    background:
                                        value === 0
                                            ? "green"
                                            : [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36].includes(value)
                                                ? "red"
                                                : "black",
                                    border:
                                        value === 0
                                            ? "1px solid green"
                                            : [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36].includes(value)
                                                ? "1px solid white"
                                                : "1px solid white",
                                    padding: "10px"
                                }}
                            >
                                {value}
                            </div>


                        ))}
                    </div>
                </div>

                <div className={styles.winNumber} ref={numberDisplay}>
                    <div className={styles.winContent}>
                        {<Image
                            src={
                                outcome >= 0 && outcome <= 36 ? `/win${outcome}.jpg` : "/default.jpg"}
                            width={300}
                            height={150}
                            alt="Winning number"
                        />}
                        <div className={styles.lastWinText}>


                            {lastWin > 0 ? `You win: ${lastWin}` : null}
                        </div>
                    </div>
                </div>



                {showBetsModal &&
                    <div className={styles.modal_wrapper}>
                        <div>
                            <h1 className={styles.eh1}>Last 50 Rounds</h1>
                            <div className={styles.numbersInModal}>
                                {lastFiftyNumbers.slice().reverse().map((name) => (
                                    <div className={styles.eachNumber} key={name.key} style={{
                                        background:
                                            name.value == 0
                                                ? "green"
                                                : name.value == 1 || name.value == 3 || name.value == 5 || name.value == 7 || name.value == 9 || name.value == 12 || name.value == 14 || name.value == 16 || name.value == 18 || name.value == 19 || name.value == 21 || name.value == 23 || name.value == 25 || name.value == 27 || name.value == 30 || name.value == 32 || name.value == 34 || name.value == 36
                                                    ? "red" : "black",

                                    }}>
                                        {name.value}
                                    </div>
                                ))}
                            </div>
                            <button className={styles.button} onClick={() => { setShowBetsModal(!showBetsModal) }}>Back</button>
                        </div>
                    </div>}
                {betHistory &&
                    <div className={styles.betHistory}>
                        <div>
                            <h1>Bet History</h1>
                            <div className={styles.numbersInModal}>

                                {betLogs.map((value, index) => (
                                    <div key={index}>
                                        {value.number}
                                        {value.result}
                                    </div>
                                ))}

                            </div>
                            <button className={styles.button} onClick={() => { setIsMenuClicked(!isMenuClicked); setBetHistory(!betHistory) }}>Back</button>
                        </div>
                    </div>}
                {depositWithdrawal &&
                    <Modal closeModal={() => setDepositWithdrawal(false)} />
                }
                {changePassword &&
                    <div className={styles.betHistory}>
                        <div>
                            {/* <h1>Change Password</h1> */}
                            <div className={styles.containerContents}>
                                <label>Current Password</label>
                                <div className={styles.name}>
                                    <input type="text" className={styles.inputs} onChange={(e) => setChgPwdCurrentPwd(e.target.value)} required>

                                    </input><br />
                                </div>
                                <label>New Password</label>
                                <div className={styles.name}>
                                    <input type="text" className={styles.inputs} onChange={(e) => setChgPwdNewPwd(e.target.value)} required>

                                    </input><br />
                                </div>
                                <label>Confirm Password</label>
                                <div className={styles.password}>
                                    <input type="text" className={styles.inputs} onChange={(e) => setChgPwdConfNewPwd(e.target.value)} required>

                                    </input><br />
                                </div>

                                <button type="submit" className={styles.buttonCp} onClick={() => changePasswordFunction()}>
                                    Change
                                </button>

                                <div className={styles.changePassword}>
                                    {changePasswordPossibilities}
                                </div>

                            </div>
                        </div>
                    </div>}

            </div>
        </>
    )
}

export default Roulette 