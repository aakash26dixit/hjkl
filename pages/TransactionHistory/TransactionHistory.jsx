import React, { useEffect, useState } from "react";
import styles from "../TransactionHistory/transactionHistory.css";
import { db } from "../../firebase/firebase-config";
import { collection, query, where, getDocs } from "firebase/firestore";

const usersCollectionRef = collection(db, "roulette-users");

const TransactionHistory = () => {
  const [dataArray, setDataArray] = useState([]);

  useEffect(() => {
    getRecord();
  }, []);

  const getRecord = async () => {
    const data = localStorage.getItem("username") || "";

    const q = query(usersCollectionRef, where("username", "==", data));

    const querySnapshot = await getDocs(q);
    const fetchedArray = [];

    for (const doc of querySnapshot.docs) {
      fetchedArray.push(...doc.data().transactions);
    }

    setDataArray(fetchedArray);
  };

  return (
    <>
      {dataArray.length > 0 ? (
        <div className="container">
          <h2 className="heading">Transaction History</h2>
          <div className="listContainer">
            {dataArray.map((item, index) => {
              const amount = item.split("of")[1]; // Extract the amount
              return (
                <div key={index} className="listElements">
                  <div className="list">{item}</div>
                  <div className="amount">{amount}</div>
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

export default TransactionHistory;
