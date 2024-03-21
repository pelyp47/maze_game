import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { logIn } from "../../globalState/LogIn"
import "./LogInForm.css"

export default function LogInForm() {
    const dispatch = useDispatch()

    const [name,setName] = useState("")
    const [nameAvailibility, setNameAvailibility] = useState(true)

    useEffect(()=>{
        async function checkAvailibility() {
            const userData = await fetch(`http://localhost:3000/user?${new URLSearchParams({
                name
            })}`)
            const user = await userData.json()
            console.log(nameAvailibility)
            console.log(user)
            setNameAvailibility(user === null||!!user.error)
            return user
        }
        checkAvailibility()
    }, [name, nameAvailibility])
    function handleInput(e) {
        return setName(e.target.value)
    }
    async function handleSubmit(e) {
        e.preventDefault()
        if(!nameAvailibility) return
        const userData = await fetch("http://localhost:3000/user", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name
            })
        });
        const user = await userData.json()
        console.log(user)
        dispatch(logIn({id:user.id, name:user.name}))
    }
    return <div className="log-in">
        <p className="log-in__title">Please enter your name:</p>
        <input class="log-in__input" type="text" value={name} onChange={handleInput} required={true}/>
        {nameAvailibility||<span class="log-in__error">Name is already taken</span>}
        <button type="submit" onClick={handleSubmit} class="log-in__submit">Create account</button>
    </div>
}