import React, { lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";

import { Elements } from "@stripe/react-stripe-js";
import { firebaseConfig, stripePromise } from "../firebaseConfig";

import TwitchPlayer from "./components/twitch/twitchPlayer";
import Navbar from "./components/layout/navbar";
import Loading from "./components/layout/loading";
import DonationChat from "./components/layout/donationChat";

const EventInfo = lazy(() => import("./components/layout/eventInfo"));
const Footer = lazy(() => import("./components/layout/footer"));

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
// firebase.analytics();
export const firestore = firebase.firestore();
export const storage = firebase.storage();

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
                            </div>
                            <Suspense fallback={<Loading />}>
                                <Footer />
                            </Suspense>
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
