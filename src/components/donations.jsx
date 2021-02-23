import React, { useState, useEffect } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import firebase from "firebase/app";

import { firestore } from "../App";
import CheckoutForm from "./checkoutForm";

const Donations = () => {
  const [formValue, setFormValue] = useState("");
  const [biggestDonation, setBiggestDonation] = useState({ amount: -Infinity });
  const donationsRef = firestore.collection("donations");
  const query = donationsRef.orderBy("createdAt").limitToLast(25);
  const [donations] = useCollectionData(query, {
    idField: "id",
  });
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
        amount: Number(formValue),
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
          Donate
        </button>
      </form>
      <CheckoutForm />
    </div>
  );
};

export default Donations;
