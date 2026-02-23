import { Suspense } from "react";

export default function SuspensePage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
        <Stats/>
    </Suspense>
  );
}

async function Stats() {
  const res = await fetch("https://api.github.com/repos/vercel/next.js");
  const data = await res.json();
  return (
    <div>
      <p>Stars: {data.stargazers_count}</p>
      <p>Forks: {data.forks_count}</p>
    </div>
  );
}