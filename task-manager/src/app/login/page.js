"use client";

import { useForm } from "react-hook-form";
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
  Box,
} from "@mui/material";
import { useState } from "react";

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState(null);
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      const res = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const snap = await getDoc(doc(db, "users", res.user.uid));

      if (!snap.exists()) {
        setError("User profile not found");
        return;
      }

      router.push("/dashboard");
    } catch (err) {
      setError(getFirebaseErrorMessage(err.code));
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <Card className="w-96">
        <CardContent className="space-y-4">
          <Typography variant="h5" textAlign="center">
            Login
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <TextField
              label="Email"
              fullWidth
              {...register("email", {
                required: "Email is required",
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              {...register("password", {
                required: "Password is required",
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />

            <Button type="submit" variant="contained" fullWidth>
              Login
            </Button>

            {error && (
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            )}

            <Typography variant="body2">
              Don't have an account?{" "}
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => router.push("/register")}
              >
                Sign Up
              </span>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
}