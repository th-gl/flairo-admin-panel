const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.deleteUserAccount = functions.https.onCall(async (data, context) => {
  // ✅ Optional admin check — must be an admin in custom claims
  if (!context.auth || !context.auth.token.admin) {
    throw new functions.https.HttpsError(
      "permission-denied",
      "Only admins can delete users."
    );
  }

  const uid = data.uid;

  try {
    await admin.auth().deleteUser(uid);
    console.log(`Deleted Auth user: ${uid}`);
    return { success: true };
  } catch (error) {
    console.error("Error deleting Auth user:", error);
    throw new functions.https.HttpsError("unknown", error.message);
  }
});
