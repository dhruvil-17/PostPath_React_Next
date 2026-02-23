
async function serverAction(data) {
  "use server"

  const name = data.get("name")
  const email = data.get("email")

  console.log(name, email)
}

"use client";

import Image from "next/image";
import {useQuery} from "@tanstack/react-query";

// const fetchUsers = async()=>{
//   const res = await fetch("https://jsonplaceholder.typicode.com/users");
//   if(!res.ok) throw new Error("Network response was not ok");
//   return res.json();
// }



export default function Home() {

  // const {data , isLoading , error} = useQuery(
  //   {
  //     queryKey: ["users"],
  //     queryFn: fetchUsers
  //   }
  // );

  // if(isLoading) return <p>Loading...</p>
  // if(error) return <p>Error: {error.message}</p>
  // return (
  //  <>
  //   <h1>Users List</h1>
  //   <ul>
  //     {data.map(user => (
  //       <li key={user.id}>{user.name} - {user.email}</li>
  //     ))}
  //   </ul>
  //  </>
  // );
  return (

    <>
      <form action={serverAction}>

        <input
          name="name"
          type="text"
          className="border-2 m-auto"
          placeholder="Name"
        />

        <input
          name="email"
          type="text"
          className="border-2 m-auto"
          placeholder="Email"
        />

        <button type="submit">Submit</button>

      </form>
    </>
  )
 

}
