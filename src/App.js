import React, { useState, useEffect } from "react";
import "./App.css";
import firebase from "firebase/app";
import "firebase/firestore";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { useCollectionData } from "react-firebase-hooks/firestore";
import Payments from "./components/payments";
import Donations from "./components/donations";

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
export const firestore = firebase.firestore();

const stripePromise = loadStripe("pk_test_fEIiXO5M0hM6EDTyPZmWuHPo");

const App = () => {
  return (
    <Elements stripe={stripePromise}>
      <Payments />
      {/* <Donations /> */}
    </Elements>
  );
};

export default App;
