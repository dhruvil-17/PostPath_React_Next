async function serverAction(data) {
  "use server"

  const name = data.get("name")
  const email = data.get("email")

  console.log(name, email)
}

export default function Home() {
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
