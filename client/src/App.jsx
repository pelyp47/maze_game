"use client"
import './App.css'
import {useRouter} from 'next/navigation';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
function App() {
  const router = useRouter()
  const session = useSession()
  console.log(session)
  const [loggedIn, setLoggedIn] = useState(false)
  const [name, setName] = useState(localStorage.getItem("name"));
  const [id, setId] = useState(localStorage.getItem("id"));
  useEffect(()=>{
    localStorage.setItem("name", localStorage.getItem("name")||"")
    localStorage.setItem("id", localStorage.getItem("id")||"")
    const checkLoggedIn = async ()=>{
      console.log(name)
      const fetchData = await fetch(`/api/checkUser/`, {
        method: "POST",
        body: JSON.stringify({name})
      })
      const data = await fetchData.json()
      setName(data.name||name);
      setId(data.id||id);
      setLoggedIn(data.loggedIn);
      console.log(data.loggedIn)
      localStorage.setItem("name", data.name||name);
      localStorage.setItem("id", data.id||id)
      if(data.loggedIn) {
        router.push(`/Home?id=${data.id}&name=${data.name}&loggedIn=${data.loggedIn}`)
      } else {
        router.push(`/LogInForm`)
      }
    }
    checkLoggedIn()
  }, [loggedIn, id, name])
  useEffect(()=>{
    if(session.status!=="loading"&&!session.data) {
      signIn('first',  null, { login_hint: "dmytro.p@halo-lab.team" })
    } else {
      console.log(session)
    }
  }, [session])
  return (<>
    <span>...</span>
  </>)
}

export default App
