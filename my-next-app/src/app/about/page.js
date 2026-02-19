"use client";
import { useState, useEffect } from "react";

export default function About() {

    const [message, setMessage] = useState("");

    useEffect(() => {
        fetch("/api/hello")
            .then((res) => res.json())
            .then((data) => setMessage(data.message))
            .catch((err) => console.error("Error fetching message:", err));
    }, []);
  return (
    <div>
        <h1>About Page</h1>
        <p>Message from API: {message}</p>
      
    </div>
  );
}