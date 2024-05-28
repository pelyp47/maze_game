"use client"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { logIn } from "../../globalState/LogIn"
import "./LogInForm.css"
import { useRouter } from "next/navigation"

export default function LogInForm({nameInputDescription, nameError, submitButton}) {
    const router=useRouter()
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
        localStorage.setItem("name", user.name)
        localStorage.setItem("id", user.id)
        router.push(`/Home?id=${user.id}&name=${user.name}&loggedIn=true`)
    }
    return <div className="log-in">
        <p className="log-in__title">{nameInputDescription}</p>
        <input className="log-in__input" type="text" value={name} onChange={handleInput} required={true}/>
        {nameAvailibility||<span className="log-in__error">{nameError}</span>}
        <button type="submit" onClick={handleSubmit} className="log-in__submit">{submitButton}</button>
    </div>
}