import React, { useState, useContext, useEffect, useRef } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import firebase from "firebase/app";
import "firebase/functions";

import { EventContext } from "../../App";
import Loading from "../layout/loading";

function Payments({ setShowing }) {
  const event = useContext(EventContext);
  const stripe = useStripe();
  const elements = useElements();

  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [paymentIntent, setPaymentIntent] = useState();
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const nameInput = useRef();

  useEffect(() => {
    nameInput.current.focus();
  }, []);

  useEffect(() => {
    console.log(paymentIntent);
    if (paymentIntent && paymentIntent.status === "succeeded") {
      setShowing(false);
    }
  }, [paymentIntent, setShowing]);

  // financial regex
  const onlyNumbers = /^[0-9]*(?:\.[0-9]{2})?$/;

  // Create a payment intent on the server
  const createPaymentIntent = async (e) => {
    // Clamp amount to Stripe min/max
    const validAmount = Math.min(Math.max(amount, 1), 9999999);
    setAmount(validAmount);
    setLoading(true);
    /**
     * CALLABLE FUNCTIONS!!
     */
    const getPi = firebase.functions().httpsCallable("paymentIntent");
    getPi({
      amount: Number(amount) * 100,
      metadata: {
        eventId: event.uid,
        email: email,
        name: name || "Anonymous",
      },
    })
      .then(({ data }) => {
        console.log(data);
        setPaymentIntent(data);
        setLoading(false);
      })
      .catch(console.log);
  };

  // Handle the submission of card details
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const cardElement = elements.getElement(CardElement);

    // Confirm Card Payment
    const {
      paymentIntent: updatedPaymentIntent,
      error,
    } = await stripe.confirmCardPayment(paymentIntent.client_secret, {
      payment_method: { card: cardElement },
    });

    if (error) {
      console.error(error);
      setLoading(false);
      error.payment_intent && setPaymentIntent(error.payment_intent);
      setErrorMsg(error.message);
    } else {
      setLoading(false);
      setPaymentIntent(updatedPaymentIntent);
    }
  };

  return (
    <div className="w-screen h-screen overflow-y-scroll bg-transparent flex flex-col justify-center items-center fixed top-0 left-0">
      <div className="bg-champagne p-2 md:p-8 shadow-xl max-w-sm md:max-w-2xl">
        <div className="flex justify-between">
          <button
            onClick={() => {
              setPaymentIntent(undefined);
              setErrorMsg("");
            }}
          >
            {paymentIntent ? "Back" : ""}
          </button>
          <button
            className="h-8 w-8 border-2 border-black rounded-full justify-self-end"
            onClick={() => setShowing(false)}
          >
            X
          </button>
        </div>
        <div className="max-w-screen-sm mx-auto px-2">
          <p className="font-serif text-2xl md:text-3xl my-6">
            Support Brooklyn Raga Massive
          </p>
          <p>
            Your contribution will be broadcast live on the page! Leave your
            name blank to remain anonymous.
          </p>
        </div>
        <div className="bg-champagneDark p-1 md:p-16 my-4">
          {loading ? (
            <Loading />
          ) : (
            <div
              className={`block donateIntent ${
                !paymentIntent || paymentIntent.status !== "requires_source"
                  ? "showing"
                  : ""
              }`}
            >
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block py-2 bg-champagneDark text-xl border-black border-b-2 w-full overflow-visible"
                placeholder="Name"
                ref={nameInput}
              />
              <label htmlFor="name" className="block  mb-4 text-sm">
                Display Name (optional)
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block py-2 bg-champagneDark text-xl border-black border-b-2 w-full"
                placeholder="Email"
              />
              <label htmlFor="email" className="block text-sm mb-4">
                Your Email (optional)
              </label>
              <input
                className="block py-2 bg-champagneDark text-xl border-black border-b-2 w-full"
                type="text"
                name="amount"
                value={amount}
                // disabled={paymentIntent}
                placeholder="$ Amount"
                onChange={(e) => {
                  if (!e.target.value.length) {
                    setAmount("0");
                  }
                  if (Number(e.target.value)) {
                    if (
                      e.target.value.length > 1 &&
                      e.target.value[0] === "0"
                    ) {
                      setAmount(e.target.value.slice(1));
                    } else {
                      setAmount(e.target.value);
                    }
                  }
                }}
              />
              <label htmlFor="amount" className="block mb-4 text-sm">
                Gift amount
              </label>
              <button
                disabled={amount <= 0}
                onClick={createPaymentIntent}
                hidden={paymentIntent}
                className="block bg-gold py-2 px-8 rounded mx-auto text-white text-large my-8"
              >
                Donate
              </button>
            </div>
          )}
          <form
            onSubmit={handleSubmit}
            className="w-full"
            hidden={!paymentIntent || paymentIntent.status === "succeeded"}
          >
            <p className="text-pink">{errorMsg}</p>
            <div className="bg-champagne p-2 rounded">
              <CardElement
                className="py-2"
                options={{
                  style: {
                    base: {
                      iconColor: "#c4f0ff",
                      backgroundColor: "rgb(245, 238, 235)",
                      fontWeight: "400",
                      fontFamily: "'Lato', sans-serif",
                      fontSize: "18px",
                      fontSmoothing: "antialiased",
                      ":-webkit-autofill": {
                        color: "#fce883",
                      },
                      "::placeholder": {
                        color: "#222",
                        backgroundColor: "rgb(245, 238, 235)",
                      },
                    },
                    invalid: {
                      iconColor: "rgb(232, 66, 119)",
                      color: "rgb(232, 66, 119)",
                    },
                  },
                }}
                onFocus={() => setErrorMsg("")}
              />
            </div>
            <button
              className="block my-4 py-2 px-8 bg-gold text-white text-base rounded"
              type="submit"
            >
              Pay ${amount}
            </button>
          </form>
          <p
            className={`${
              paymentIntent &&
              paymentIntent.status === "requires_payment_method"
                ? ""
                : "hidden"
            }`}
          >
            Error Processing Payment
          </p>
        </div>
      </div>
    </div>
  );
}

// function PaymentIntentData(props) {
//   if (props.data) {
//     const { id, amount, status, client_secret } = props.data;
//     return (
//       <>
//         <h3>
//           Payment Intent{" "}
//           <span
//             className={
//               "badge " +
//               (status === "succeeded" ? "badge-success" : "badge-secondary")
//             }
//           >
//             {status}
//           </span>
//         </h3>
//         <pre>
//           ID: {id} <br />
//           Client Secret: {client_secret} <br />
//           Amount: {amount} <br />
//           Status:{status}
//           <br />
//         </pre>
//       </>
//     );
//   } else {
//     return <p>Payment Intent Not Created Yet</p>;
//   }
// }

export default Payments;
