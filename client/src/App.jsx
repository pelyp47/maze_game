import './App.css'
import { useDispatch, useSelector } from 'react-redux';
import Home from './views/Home/Home';
import LogInForm from './views/LogInForm/LogInForm';
import { signUp } from './globalState/LogIn';
import { useEffect } from 'react';
function App() {
  const dispatch = useDispatch()
  const {loggedIn, id} = useSelector(state=>state.logIn)
  useEffect(()=>{
    dispatch(signUp())
  }, [loggedIn, id])
  return (<>
    {loggedIn?<Home/>:<LogInForm/>}
  </>)
}

export default App
