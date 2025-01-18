import { useState } from "react";

export default function DepositWithdraw() {
  const [activeTab, setActiveTab] = useState("deposit");
  const [amount, setAmount] = useState("");

  const handleToggle = (tab) => {
    setActiveTab(tab);
    setAmount(""); // Clear amount when toggling
  };

  const handleSubmit = () => {
    if (amount && !isNaN(amount)) {
      alert(`${activeTab === "deposit" ? "Deposited" : "Withdrawn"} $${amount}`);
      setAmount(""); // Clear the input after submission
    } else {
      alert("Please enter a valid amount.");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial", backgroundColor: "black", color: "white", height: "100vh" }}>
      <h1 style={{ textAlign: "left" }}>Transactions</h1>

      <div style={{ textAlign: "center" }}>
        <img
          src={activeTab === "deposit" ? "/assets/bank-building.png" : "/assets/bank-building.png"}
          alt={activeTab === "deposit" ? "Deposit" : "Withdraw"}
          style={{ width: "40vw", height: "40vw", marginBottom: "20px" }}
        />

        <label style={{ display: "block",textAlign:"left", marginBottom: "10px", fontSize: "18px" }}>
          {activeTab === "deposit" ? "Deposit Amount:" : "Withdraw Amount:"}
        </label>


        <div style={{ display: "flex", marginBottom: "20px" }}>
        <button
          onClick={() => handleToggle("deposit")}
          style={{
            flex: 1,
            backgroundColor: activeTab === "deposit" ? "blue" : "gray",
            color: "white",
            padding: "20px",
            border: "none",
            cursor: "pointer",
            textAlign: "center",
          }}
        >
          Deposit
        </button>
        <button
          onClick={() => handleToggle("withdraw")}
          style={{
            flex: 1,
            backgroundColor: activeTab === "withdraw" ? "blue" : "gray",
            color: "white",
            padding: "20px",
            border: "none",
            cursor: "pointer",
            textAlign: "center",
          }}
        >
          Withdraw
        </button>
      </div>

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          style={{
            padding: "10px",
            width: "80vw",
            display: "block",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
        <br />
        <button
          onClick={handleSubmit}
          style={{
            padding: "10px 20px",
            width: "86vw",
            backgroundColor: "green",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
