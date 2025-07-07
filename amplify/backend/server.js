const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const path = require("path");
const app = express();
const port = 5000;

const serviceAccount=require('./serviceAcount.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://flairo-app-default-rtdb.firebaseio.com"
});

app.use(cors());
app.use(express.json());

app.post("/delete-user", async (req, res) => {
  const { uid } = req.body;

  if (!uid) {
    return res.status(400).json({ error: "UID is required." });
  }

  try {
    // 1. Delete from Firebase Authentication
    await admin.auth().deleteUser(uid);

    // 2. Delete user document from Firestore using instance delete method
    const userRef = admin.firestore().collection("users").doc(uid);
    await userRef.delete(); // ✅ using .delete() instance method

    return res.status(200).json({
      success: true,
      message: `User ${uid} deleted from Auth and Firestore.`
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
});


app.get("/", (req, res) => {
  res.send("Firebase Admin API is running ✅");
});

app.listen(port, () => {
  console.log(`🚀 Server listening at http://localhost:${port}`);
});
