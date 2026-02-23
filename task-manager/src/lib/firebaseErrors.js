export function getFirebaseErrorMessage(code) {
  switch (code) {
    case "auth/invalid-credential":
      return "Invalid email or password";

    case "auth/email-already-in-use":
      return "Email already registered";

    case "auth/weak-password":
      return "Password must be at least 6 characters";

    case "auth/user-not-found":
      return "User not found";

    case "auth/wrong-password":
      return "Incorrect password";

    case "auth/invalid-email":
      return "Invalid email address";

    default:
      return "Something went wrong. Please try again.";
  }
}