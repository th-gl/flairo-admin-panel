const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });
const deleteUser = require('./deleteUser');
const serviceAccount = require('./path/to/your/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // databaseURL: "https://your-project-id.firebaseio.com" // if using Realtime DB
});

exports.deleteUserAccount = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    // Parse JSON body
    let body = req.body;
    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
      } catch (e) {
        return res.status(400).send("Invalid JSON");
      }
    }

    // Simple admin check (replace with real auth in production)
    if (req.headers['x-admin-secret'] !== 'your_admin_secret') {
      return res.status(403).send("Only admins can delete users.");
    }

    const uid = body.uid;
    if (!uid) return res.status(400).send("Missing uid");

    try {
      await deleteUser(uid);
      console.log(`Deleted user: ${uid}`);
      res.status(200).send({ success: true });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).send(error.message);
    }
  });
});

module.exports = admin;
