"use client"
import './App.css'
import { Provider, useDispatch, useSelector } from 'react-redux';
import Home from './views/Home/Home';
import LogInForm from './views/LogInForm/LogInForm';
import { signUp } from './globalState/LogIn';
import { useEffect, useState } from 'react';
import store from './globalState/store';
function App() {
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
    }
    checkLoggedIn()
  }, [loggedIn, id, name])
  return (<>
  <Provider store={store}>
    {loggedIn?<Home/>:<LogInForm/>}
  </Provider>
  </>)
}

export default App
