"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { Button, Typography, Container, Box } from "@mui/material";

export default function Home() {
  const router = useRouter();
  const auth = useSelector((state) => state.auth);

  
  useEffect(() => {
    if (auth?.user?.uid) {
      router.push("/dashboard");
    }
  }, [auth?.user?.uid, router]);

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
      <Container maxWidth="sm">
        <Box className="text-center space-y-6">

          <Typography variant="h3" className="font-bold">
            Task Manager 🚀
          </Typography>

          <Typography variant="body1" className="text-gray-400">
            Organize, assign and manage your tasks efficiently.
            Built with Next.js & Firebase.
          </Typography>

          <Box className="flex justify-center gap-4 mt-6">
            <Button
              variant="contained"
              size="large"
              className="bg-blue-600 hover:bg-blue-700 normal-case rounded-lg px-6"
              onClick={() => router.push("/login")}
            >
              Login
            </Button>

            <Button
              variant="outlined"
              size="large"
              color="primary"
              className="normal-case rounded-lg px-6"
              onClick={() => router.push("/register")}
            >
              Sign Up
            </Button>
          </Box>

        </Box>
      </Container>
    </div>
  );
}