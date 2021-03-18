import { useState, useContext, useEffect, useRef } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { FaStripe } from "react-icons/fa";

import BackBtn from "../layout/backBtn";
import CloseBtn from "../layout/closeBtn";

import firebase from "firebase/app";
import "firebase/functions";
import toast from "react-hot-toast";

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
  const [paymentIntentErrorMsg, setPaymentIntentErrorMsg] = useState();
  const [cardPaymentErrorMsg, setCardPaymentErrorMsg] = useState("");
  const [emailFormatErrorMsg, setEmailFormatErrorMsg] = useState("");
  const [amountFormatErrorMsg, setAmountFormatErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const nameInput = useRef();

  useEffect(() => {
    nameInput.current.focus();
  }, []);

  useEffect(() => {
    if (paymentIntent && paymentIntent.status === "succeeded") {
      setShowing(false);
    }
  }, [paymentIntent, setShowing]);

  // financial regex

  const isDonationFormValid = () => {
    const isValidPriceFormat = /^[0-9]*(?:\.[0-9]{2})?$/;
    const isValidEmailFormat = /^[a-zA-Z0-9_.]+@[a-zA-Z0-9-.]+\.[a-z]{2,}$/;

    const isValidPrice = amount.length && isValidPriceFormat.test(amount);
    const isValidEmail = email.length && isValidEmailFormat.test(email);
    if (!isValidPrice) {
      setAmountFormatErrorMsg("Please enter a valid dollar amount");
    }
    if (!isValidEmail) {
      if (!email.length) {
        setEmailFormatErrorMsg("Email is required");
        return false;
      }
      setEmailFormatErrorMsg("Please enter a valid email address");
    }
    return isValidEmail && isValidPrice;
  };

  // Create a payment intent on the server
  const createPaymentIntent = async (e) => {
    if (isDonationFormValid()) {
      // Clamp amount to Stripe min/max
      const validAmount = Math.min(Math.max(amount, 0.5), 9999999);
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
          setPaymentIntent(data);
          setLoading(false);
        })
        .catch(() => {
          setPaymentIntentErrorMsg("Error. Please Try Again.");
        });
    }
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
      setCardPaymentErrorMsg(error.message);
      toast.error(error.message);
    } else {
      setLoading(false);
      setPaymentIntent(updatedPaymentIntent);
      toast.success("Thank You! Your payment has been processed.");
    }
  };

  return (
    <div className="w-screen h-screen overflow-y-scroll bg-opaque flex flex-col justify-center items-center fixed top-0 left-0">
      <div className="bg-champagne p-2 md:p-8 shadow-xl max-w-sm max-h-screen overflow-y-scroll md:max-w-lg">
        <div className="flex justify-between items-center">
          <button
            onClick={() => {
              setPaymentIntent(undefined);
              setCardPaymentErrorMsg("");
            }}
          >
            {paymentIntent ? <BackBtn /> : ""}
          </button>
          <button onClick={() => setShowing(false)}>
            <CloseBtn />
          </button>
        </div>
        <div className="max-w-screen-sm mx-auto px-2">
          <p className="font-serif text-2xl md:text-3xl mb-6 mt-0">
            Support Brooklyn Raga Massive
          </p>
          <p>
            Your contribution will be broadcast live on the page! Leave your
            name blank to remain anonymous.
          </p>
        </div>
        <div className="bg-champagneDark px-1 pb-1 md:px-8 md:pb-8 my-4">
          <div className="h-20">{!!loading && <Loading />}</div>
          {/* {loading ? (
            <Loading />
          ) : ( */}
          <div
            className={`block donateIntent ${!paymentIntent ? "showing" : ""}`}
          >
            <p className="text-pink text-sm">{paymentIntentErrorMsg}</p>
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
              Name you would like displayed live on broadcast page
            </label>
            <p className="text-pink text-sm h-4">{emailFormatErrorMsg}</p>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block py-2 bg-champagneDark text-xl border-black border-b-2 w-full"
              placeholder="Email"
              onFocus={() => setEmailFormatErrorMsg("")}
            />
            <label htmlFor="email" className="block text-sm mb-4">
              Your Email
            </label>
            <p className="text-pink text-sm h-4">{amountFormatErrorMsg}</p>
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
                  if (e.target.value.length > 1 && e.target.value[0] === "0") {
                    setAmount(e.target.value.slice(1));
                  } else {
                    setAmount(e.target.value);
                  }
                }
              }}
              onFocus={() => setAmountFormatErrorMsg("")}
            />
            <label htmlFor="amount" className="block mb-4 text-sm">
              Gift Amount
            </label>
            <button
              // disabled={amount <= 0}
              onClick={createPaymentIntent}
              // hidden={paymentIntent}
              className="block bg-gold hover:bg-red hover:shadow-md transition-all py-2 px-8 rounded mx-auto text-white text-large my-8"
            >
              Donate
            </button>
          </div>
          {/* )} */}
          <form
            onSubmit={handleSubmit}
            className="w-full"
            hidden={!paymentIntent || paymentIntent.status === "succeeded"}
          >
            <p className="text-pink h-1">{cardPaymentErrorMsg}</p>
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
                        color: "#222",
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
                onFocus={() => setCardPaymentErrorMsg("")}
              />
            </div>
            <button
              className="block my-4 py-2 px-8 bg-gold hover:bg-red hover:shadow-md transition-all text-black hover:text-white text-base rounded"
              type="submit"
            >
              Donate ${Number(amount).toFixed(2)}
            </button>
          </form>
        </div>
        <p className="text-sm">
          Brooklyn Raga Massive is a registered 501 (c) 3 non profit
          organization. Your donation is tax-deductible. We will email you your
          acknowledgement letter.
        </p>
        <a href="https://stripe.com" target="_blank" rel="noreferrer">
          <div className="bg-white w-24 my-4 py-2 mx-auto flex flex-col justify-center items-center">
            <p className="text-xs -mb-4">Secured by</p>
            <FaStripe size="3.5rem" style={{ marginBottom: "-1rem" }} />
          </div>
        </a>
      </div>
    </div>
  );
}

export default Payments;
