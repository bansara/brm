import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import firebase from "firebase/app";
import "firebase/functions";

function Payments() {
  const stripe = useStripe();
  const elements = useElements();

  const [amount, setAmount] = useState(0);
  const [name, setName] = useState("");
  const [paymentIntent, setPaymentIntent] = useState();

  // Create a payment intent on the server
  const createPaymentIntent = async (event) => {
    // Clamp amount to Stripe min/max
    const validAmount = Math.min(Math.max(amount, 1), 9999999);
    setAmount(validAmount);
    /**
     * CALLABLE FUNCTIONS!!
     */
    const getPi = firebase.functions().httpsCallable("paymentIntent");
    getPi({
      amount: Number(amount) * 100,
      metadata: {
        event: "WRM",
        name: name || "Anonymous",
      },
    })
      .then(({ data }) => {
        console.log(data);
        setPaymentIntent(data);
      })
      .catch(console.log);
  };

  // Handle the submission of card details
  const handleSubmit = async (event) => {
    event.preventDefault();

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
      error.payment_intent && setPaymentIntent(error.payment_intent);
    } else {
      setPaymentIntent(updatedPaymentIntent);
    }
  };

  return (
    <>
      {/* <div className="well">
        <PaymentIntentData data={paymentIntent} />
      </div> */}
      <div>
        <div>
          <input
            className="form-control"
            type="text"
            value={amount}
            disabled={paymentIntent}
            placeholder="Donation amount"
            onChange={(e) => {
              if (!e.target.value.length) {
                setAmount("0");
              }
              if (Number(e.target.value)) {
                if (e.target.value[0] === "0") {
                  setAmount(e.target.value.slice(1));
                } else {
                  setAmount(e.target.value);
                }
              }
            }}
            style={{ lineHeight: "1.5rem", width: "5rem" }}
          />
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Display Name (optional)"
            style={{ lineHeight: "1.5rem" }}
          />
          <button
            className="btn btn-success"
            disabled={amount <= 0}
            onClick={createPaymentIntent}
            hidden={paymentIntent}
            style={{
              width: "10rem",
              lineHeight: "1.5rem",
              backgroundColor: "#f89924",
              color: "white",
              padding: "0 1rem",
              borderRadius: "3px",
            }}
          >
            Donate ${amount}
          </button>
        </div>
      </div>
      <hr />

      <form
        onSubmit={handleSubmit}
        className="well"
        // hidden={!paymentIntent || paymentIntent.status === "succeeded"}
        style={{
          width: "400px",
          height: `${
            !paymentIntent || paymentIntent.status === "succeeded" ? 0 : "auto"
          }`,
          margin: "1rem 0",
        }}
      >
        <CardElement
          options={{
            style: {
              base: {
                iconColor: "#c4f0ff",
                color: "#000",
                fontWeight: "500",
                fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
                fontSize: "16px",
                fontSmoothing: "antialiased",
                lineHeight: "2rem",
                ":-webkit-autofill": {
                  color: "#fce883",
                },
                "::placeholder": {
                  color: "777",
                },
              },
              invalid: {
                iconColor: "#cc0000",
                color: "#cc0000",
              },
            },
          }}
        />
        <button
          className="btn btn-success"
          type="submit"
          style={{
            width: "100%",
            padding: "0.25rem",
          }}
        >
          Pay
        </button>
      </form>
    </>
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
