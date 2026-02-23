"use client"
import { useSelector } from "react-redux";
export default function Dashboard() {


  const auth = useSelector((state) => state.auth);
  console.log("Redux auth state:", auth);
  return (<>
    <h1>Welcome to Dashboard</h1>
  </>)
}