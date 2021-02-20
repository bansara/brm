const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors({ origin: true }));

app.get("/test", (req, res) => {
  res.status(200).json({
    message: "API endpoint successfully deployed with Firebase Cloud Functions",
  });
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest(app);
