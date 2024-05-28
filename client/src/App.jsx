"use client"
import './App.css'
import {useRouter} from 'next/navigation';
import Home from './views/Home/Home';
import LogInForm from './views/LogInForm/LogInForm';
import { useEffect, useState } from 'react';
function App() {
  const router = useRouter()
  const [loggedIn, setLoggedIn] = useState(false)
  const [name, setName] = useState(localStorage.getItem("name"));
  const [id, setId] = useState(localStorage.getItem("id"));
  useEffect(()=>{
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
      }
    }
    checkLoggedIn()
  }, [loggedIn, id, name])
  return (<>
    <span>...</span>
  </>)
}

export default App
