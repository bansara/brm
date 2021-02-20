import React, { useState, useEffect } from "react";
import "./App.css";
import firebase from "firebase/app";
import "firebase/firestore";

import { useCollectionData } from "react-firebase-hooks/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyAo8OJWOeTXrjOhPtFKtQz-1B9sgBPu2h8",
  authDomain: "brm-live-portal.firebaseapp.com",
  projectId: "brm-live-portal",
  storageBucket: "brm-live-portal.appspot.com",
  messagingSenderId: "130090811562",
  appId: "1:130090811562:web:37d7c0fd679ffd445d10d3",
  measurementId: "G-4KCVTK7T86",
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
// firebase.analytics();
const firestore = firebase.firestore();

function App() {
  const [formValue, setFormValue] = useState("");
  const [biggestDonation, setBiggestDonation] = useState({ amount: -Infinity });
  const donationsRef = firestore.collection("donations");
  const query = donationsRef.orderBy("createdAt").limitToLast(25);
  const [donations] = useCollectionData(query, {
    idField: "id",
  });
  console.log(donations);
  useEffect(() => {
    if (donations && donations.length) {
      let max = biggestDonation;
      for (let donation of donations) {
        if (Number(donation.amount) > Number(biggestDonation.amount)) {
          max = donation;
        }
      }
      setBiggestDonation(max);
    }
  }, [donations, biggestDonation]);
  const sendMessage = async (e) => {
    e.preventDefault();
    if (Number(formValue)) {
      await donationsRef.add({
        amount: formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        name: "BRM Web Dev Josh",
      });
    } else {
      console.log("Input must be a number");
    }
    setFormValue("");
  };

  return (
    <div className="App">
      <h1>
        Biggest Donation: {biggestDonation.amount} from {biggestDonation.name}
      </h1>
      {donations &&
        donations.map((donationObj, i) => (
          <div className="donation" key={donationObj.id}>
            <p className="amount">${donationObj.amount}</p>
            <p>From: {donationObj.name}</p>
          </div>
        ))}
      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="give me money"
        />
        <button type="submit" disabled={!formValue}>
          🔥🔥🔥
        </button>
      </form>
    </div>
  );
}

export default App;
