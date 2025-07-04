import { auth } from "../../../contexts/firebaseContext";
import {
  reauthenticateWithCredential,
  updatePassword,
  EmailAuthProvider,
} from "firebase/auth";

export const changePassword = async ({ current_password, new_password }) => {
  const user = auth.currentUser;

  if (!user) {
    return { success: false, message: "User not authenticated." };
  }

  try {
    const credential = EmailAuthProvider.credential(user.email, current_password);
    await reauthenticateWithCredential(user, credential);
    await updatePassword(user, new_password);

    return { success: true };
  }  catch (error) {
  let message = "An error occurred.";
  if (error.code === "auth/wrong-password") {
    message = "The current password is incorrect.";
  } else if (error.code === "auth/weak-password") {
    message = "The new password is too weak.";
  } else if (error.code === "auth/requires-recent-login") {
    message = "Please log in again to update your password.";
  } else {
    message = "Current password is wrong";
  }

  return { success: false, message };
}
};
