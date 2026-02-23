"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
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

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError]=useState(null)
  const router = useRouter();

  const handleRegister = async () => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        email: res.user.email,
        role: "user",
        createdAt: serverTimestamp(),
      });

      router.push("/login");
    } catch (err) {
      setError(getFirebaseErrorMessage(err.code))
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <Card className="w-1/4">
        <CardContent className="h-auto">
          <Typography variant="h5" textAlign="center">
            Register
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
            onClick={handleRegister}
          >
            Register
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