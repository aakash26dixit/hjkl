import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebase-config";
import { collection, query, where, getDocs } from "firebase/firestore";
import "./betHistory.css";
import '../../app/globals.css'

const usersCollectionRef = collection(db, "roulette-users");

const BetHistory = () => {
  const [dataArray, setDataArray] = useState([]);

  const getRecord = async () => {
    const data = localStorage.getItem("username") || "";

    const q = query(usersCollectionRef, where("username", "==", data));

    const querySnapshot = await getDocs(q);
    var fetchedArray = [];

    for (const doc of querySnapshot.docs) {
      fetchedArray = fetchedArray.concat(doc.data().betLogs);
    }

    setDataArray(fetchedArray);
  };

  useEffect(() => {
    getRecord();
  }, []);

  return (
    <>
      {dataArray[0] !== undefined ? (
        <div className="container">
          <h2 className="heading">Bet Logs</h2>
          <div className="logCards">
            {dataArray.map((item, index) => {
              const number = item.split(" ")[0].split("-")[1];
              const amount =
                item.charAt(item.length - 1) === "P"
                  ? "+" + item.split(" ").find((part) => part.startsWith("amount-")).split("-")[1]
                  : "-" + item.split(" ").find((part) => part.startsWith("amount-")).split("-")[1];
              const result = item.charAt(item.length - 1) === "P" ? "Profit" : "Loss";

              return (
                <div key={index} className="logCard">
                  <div className="logItem">
                    <span className="label">Number:</span>
                    <span>{number}</span>
                  </div>
                  <div className="logItem">
                    <span className="label">Amount:</span>
                    <span className={result === "Profit" ? "profit" : "loss"}>{amount}</span>
                  </div>
                  <div className="logItem">
                    <span className="label">Result:</span>
                    <span>{result}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="noData">No data available</div>
      )}
    </>
  );
};

export default BetHistory;
