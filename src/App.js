import React, { lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import TwitchPlayer from "./components/twitch/twitchPlayer";
import Navbar from "./components/layout/navbar";
import Loading from "./components/layout/loading";
import DonationChat from "./components/layout/donationChat";

const EventInfo = lazy(() => import("./components/layout/eventInfo"));
const Footer = lazy(() => import("./components/layout/footer"));

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
export const storage = firebase.storage();

const stripePromise = loadStripe(
  "pk_live_51IRgekD14wAe03PrJqAhayXPFSzg3JppgQuycgqryzPGRiWaiBj4Ybjelss3ApqAl01B4MRLyjsT783sHrfCpbV200GulW5BDg"
);

export const EventContext = React.createContext({});

const App = () => {
  const eventRef = firestore.collection("events").doc("zNSLqSE6wom1RFrH3NtO");
  const [event, loading, error] = useDocumentDataOnce(eventRef);

  return (
    <EventContext.Provider value={event}>
      <Elements stripe={stripePromise}>
        <main>
          <Navbar />
          <TwitchPlayer />
          {event && (
            <>
              <DonationChat />
              <div className="container mx-auto px-2">
                <Suspense fallback={<Loading />}>
                  <EventInfo />
                </Suspense>
                <Suspense fallback={<Loading />}>
                  <Footer />
                </Suspense>
              </div>
            </>
          )}
          <Toaster
            position="bottom-center"
            toastOptions={{
              duration: 7000,
              margin: "80px",
              className: "bg-champagneDark p-4 w-80 text-lg",
            }}
          />
        </main>
        {error && <p>ERROR</p>}
        {loading && (
          <div className="w-screen h-screen flex justify-center items-center">
            <Loading />
          </div>
        )}
      </Elements>
    </EventContext.Provider>
  );
};

export default App;
