import React, { lazy, Suspense, useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import EventInfo from "./components/layout/eventInfo";
import EventDescription from "./components/layout/eventDescription";
import EventCredits from "./components/layout/eventCredits";
import DonateBtnLg from "./components/layout/donateBtnLg";
import TwitchPlayer from "./components/twitch/twitchPlayer";
import Navbar from "./components/layout/navbar";
import Loading from "./components/layout/loading";
import DonationChat from "./components/layout/donationChat";
import Payments from "./components/stripe/payments";
const Footer = lazy(() => import("./components/layout/footer"));
// const Donations = lazy(() => import("./components/stripe/donations"));
// import Payments from "./components/stripe/payments";

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
  const eventRef = firestore.collection("events").doc("zNSLqSE6wom1RFrH3NtO");
  const [event, loading, error] = useDocumentDataOnce(eventRef);
  const [showing, setShowing] = useState(false);
  return (
    <EventContext.Provider value={event}>
      <Elements stripe={stripePromise}>
        <main>
          {event && (
            <>
              <Navbar />
              <TwitchPlayer />
              <DonationChat setShowing={setShowing} />
              <div className="container mx-auto px-2">
                <EventInfo />
                <DonateBtnLg />
                <EventDescription />
                <EventCredits />
                {/* <Payments /> */}
                <Suspense fallback={<Loading />}>
                  <Footer />
                </Suspense>
                {showing && <Payments setShowing={setShowing} />}
              </div>
            </>
          )}
          {error && <p>ERROR</p>}
          {loading && (
            <div className="w-screen h-screen flex justify-center items-center">
              <Loading />
            </div>
          )}
        </main>
      </Elements>
    </EventContext.Provider>
  );
};

export default App;
