import React from "react";
import "./App.css";
import firebase from "firebase/app";
import "firebase/firestore";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import EventInfo from "./components/layout/eventInfo";
import EventDescription from "./components/layout/eventDescription";
import EventCredits from "./components/layout/eventCredits";
import Footer from "./components/layout/footer";
import DonateBtnLg from "./components/layout/donateBtnLg";
import TwitchPlayer from "./components/twitch/twitchPlayer";
import Navbar from "./components/layout/navbar";
// import Payments from "./components/stripe/payments";
// import Donations from "./components/stripe/donations";

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

export const EventContext = React.createContext({});

const App = () => {
  // const [event, setEvent] = useState({});
  const eventRef = firestore.collection("events").doc("zNSLqSE6wom1RFrH3NtO");
  const [event, loading, error] = useDocumentDataOnce(eventRef);
  console.log(event);
  return (
    <EventContext.Provider value={event}>
      <Elements stripe={stripePromise}>
        <main>
          {event && (
            <>
              <Navbar />
              <TwitchPlayer />
              <div className="container mx-auto px-2">
                <EventInfo />
                <DonateBtnLg />
                <EventDescription />
                <EventCredits />
                <Footer />
              </div>
            </>
          )}
          {error && <p>ERROR</p>}
          {loading && <p>LOADING...</p>}
        </main>
      </Elements>
    </EventContext.Provider>
  );
};

export default App;
