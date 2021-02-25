import React, { useState, useEffect } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import firebase from "firebase/app";

import { firestore } from "../../App";

const Donations = () => {
  // const [biggestDonation, setBiggestDonation] = useState({ amount: -Infinity });
  const donationsRef = firestore.collection("donations");
  const query = donationsRef.orderBy("createdAt").limitToLast(25);
  const [donations] = useCollectionData(query, {
    idField: "id",
  });
  // useEffect(() => {
  //   if (donations && donations.length) {
  //     let max = biggestDonation;
  //     for (let donation of donations) {
  //       if (Number(donation.amount) > Number(biggestDonation.amount)) {
  //         max = donation;
  //       }
  //     }
  //     setBiggestDonation(max);
  //   }
  // }, [donations, biggestDonation]);

  return (
    <div className="overflow-y-scroll">
      {donations &&
        donations.map((donationObj, i) => (
          <div className="donation" key={donationObj.id}>
            <p className="amount">${donationObj.amount / 100}</p>
            <p>{donationObj.name}</p>
          </div>
        ))}
    </div>
  );
};

export default Donations;
