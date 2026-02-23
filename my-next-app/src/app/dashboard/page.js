"use client";

import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session } = useSession();

  if (!session) return <p>Not logged in</p>;

  return <p>Welcome {session.user.email}</p>;
}

