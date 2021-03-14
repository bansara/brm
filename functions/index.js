const functions = require("firebase-functions");
const admin = require("firebase-admin");
// const serviceAccount = require("./firebaseKeys.json");

admin.initializeApp();

const express = require("express");
const cors = require("cors");
const app = express();

const Stripe = require("stripe");
const stripe = new Stripe(functions.config().stripe.devsecret);

app.use(cors({ origin: true }));
app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf;
    },
  })
);

// app.use(
//   express.json({
//     verify: (req, res, buffer) => (req["rawBody"] = buffer),
//   })
// );

app.get("/", (req, res) => {
  res.status(200).json({
    message: "functions are up and running",
  });
});

const endpointSecret = functions.config().stripe.endpointsecret;

app.post("/payment", async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
  } catch (err) {
    console.log(err);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
  console.log(event);
  if (event.type === "payment_intent.succeeded") {
    admin
      .firestore()
      .collection("donations")
      .add({
        amount: req.body.data.object.amount || "",
        event: req.body.data.object.metadata.event || "N/A",
        eventId: req.body.data.object.metadata.eventId || "",
        name: req.body.data.object.metadata.name || "Anonymous",
        stripeId: req.body.data.object.id || "",
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      })
      .then((doc) => {
        res.status(201).send(doc);
      })
      .catch((err) => {
        res.status(500).send(err);
        console.error(err);
      });
  } else {
    res.status(200).send();
  }
});

// app.post("/payments", async (req, res) => {
//   const { amount, metadata } = req.body;
//   const paymentIntent = await createPaymentIntent(amount, metadata);
//   res.status(201).send(paymentIntent);
// });

exports.api = functions.https.onRequest(app);

async function createPaymentIntent(data) {
  const paymentIntent = await stripe.paymentIntents.create({
    ...data,
    currency: "usd",
  });
  return paymentIntent;
}

exports.paymentIntent = functions.https.onCall((data, context) => {
  return createPaymentIntent(data).then((intent) => intent);
});
