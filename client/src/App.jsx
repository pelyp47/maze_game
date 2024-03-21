import './App.css'
import { useSelector } from 'react-redux';
import Home from './views/Home/Home';
import LogInForm from './views/LogInForm/LogInForm';
function App() {
  const {loggedIn} = useSelector(state=>state.logIn)
  return (<>
    {loggedIn?<Home/>:<LogInForm/>}
  </>)
}

export default App
