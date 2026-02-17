import { useState } from "react"

export default function Form() {

    const [name , setname] = useState("")
  return (
    <div>
      <h1>Form Component</h1>
      <input type="text" value={name} className="border-2" onChange={(e)=> setname(e.target.value)}/>
    <h1>Name : {name}</h1>
    </div>
  )
}