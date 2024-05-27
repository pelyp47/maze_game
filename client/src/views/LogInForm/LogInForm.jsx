import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { logIn } from "../../globalState/LogIn"
import "./LogInForm.css"

export default function LogInForm() {
    const dispatch = useDispatch()

    const [name,setName] = useState("")
    const [nameAvailibility, setNameAvailibility] = useState(true)

    useEffect(()=>{
        if(!name) return
        async function checkAvailibility() {
            const userData = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/user?${new URLSearchParams({
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
        const userData = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/user`, {
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
        <input className="log-in__input" type="text" value={name} onChange={handleInput} required={true}/>
        {nameAvailibility||<span className="log-in__error">Name is already taken</span>}
        <button type="submit" onClick={handleSubmit} className="log-in__submit">Create account</button>
    </div>
}