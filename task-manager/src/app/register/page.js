"use client";

import { useForm } from "react-hook-form";
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
  Box,
} from "@mui/material";
import { useState } from "react";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState(null);
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );

      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        name: data.name,
        email: data.email,
        role: "user",
        createdAt: serverTimestamp(),
      });
     

      router.push("/login");
    } catch (err) {
      setError(getFirebaseErrorMessage(err.code));
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <Card className="w-96">
        <CardContent>
          <Typography variant="h5" textAlign="center" mb={2}>
            Register
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <TextField
              label="Username"
              fullWidth
              {...register("name", {
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Minimum 3 characters required",
                },
              })}
              error={!!errors.name}
              helperText={errors.name?.message}
            />

            <TextField
              label="Email"
              fullWidth
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
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
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters required",
                },
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />

            <Button type="submit" variant="contained" fullWidth>
              Register
            </Button>

            {error && (
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            )}

            <Typography variant="body2">
              Already have an account?{" "}
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => router.push("/login")}
              >
                Sign In
              </span>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
}
