"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebaseClient";
import { useRouter } from "next/navigation";
import { getFirebaseErrorMessage } from "@/lib/firebaseErrors";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Box
} from "@mui/material";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError] = useState(null)
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);

      const snap = await getDoc(doc(db, "users", res.user.uid));

      if (!snap.exists()) return alert("User profile not found");

      router.push("/dashboard");
    } catch (err) {
      setError(getFirebaseErrorMessage(err.code))
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <Card className="w-1/4">
        <CardContent className="space-y-4">
          <Typography variant="h5" textAlign="center">
            Login
          </Typography>
        <Box className="flex flex-col gap-3">
          <TextField
            label="Email"
            fullWidth
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            variant="contained"
            fullWidth
            onClick={handleLogin}
          >
            Login
          </Button>
          <div>
            {error && <p className="text-red-500">{error}</p>}
          </div>
        </Box>
        </CardContent>
      </Card>
    </div>
  );
}