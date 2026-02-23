"use client";

import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebaseClient";
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "@/redux/authSlice";

export default function AuthProvider({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Fetch Firestore profile
        const snap = await getDoc(doc(db, "users", user.uid));

        if (snap.exists()) {
          dispatch(setUser(snap.data()));
        } else {
          dispatch(clearUser());
        }
      } else {
        dispatch(clearUser());
      }
    });

    return () => unsub();
  }, []);

  return children;
}