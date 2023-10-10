"use client"
import { signOut } from "next-auth/react"

// TODO: work on messenger page

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