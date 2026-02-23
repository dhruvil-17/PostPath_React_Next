import Image from "next/image";

const serverAction = async (e)=>{
  "use server";

  const username = e.get("username");
  const password = e.get("password");
  console.log("Username:", username);
  console.log("Password:", password);
}


export default function Home() {
  return (
   <>
     <form action={serverAction} >
      <input name="username" type="text" placeholder="Username" />
      <input name="password" type="password" placeholder="Password" />
      <button type="submit">Sign In</button>
    </form>
   </>
  );
}
