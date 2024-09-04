'use client'

import axios from 'axios';
import * as React from 'react';
import { useState } from 'react'

export default function Login() {
  const [username, setUsername] = useState<string>("");
  const handleLogin = async (e: any) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:8080/login', {
        username
      })
      await console.log("Data sent !")
    }
    catch(err) {
      console.log(err)
    }
  }

  return <div className='w-full h-screen bg-[#888]'> 
    <form action="" method='post'>
      <input type="text" value={username} name="username" onChange={(e) => { setUsername(e.target.value) }} id="" />
      <button type='submit' onClick={handleLogin}>Login</button>
    </form>
  </div>;
}
