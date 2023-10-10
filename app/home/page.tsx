"use client"
import { signOut } from "next-auth/react"
const Home = () => {
  return (
    <div>
      <button
      onClick={() => signOut()}
      >Sign out</button>
    </div>
  )
}

export default Home