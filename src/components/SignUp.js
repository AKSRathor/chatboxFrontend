import { React, useState, useContext } from 'react'
import MsgContext from '../context/msg/msgContext'
import { useNavigate } from 'react-router-dom'
import "./Style/Login.css"
import socket from '../Socket'


const SignUp = (props) => {

    const context = useContext(MsgContext)
    const { getContacts, setUsername, username, fetchID, myid, setMyid, myName, setMyName, setLoggedIn, setProgress } = context
    const [credential, setCredential] = useState({ name: "", username: "", password: "" })
    let history = useNavigate()
    const handleSubmit = async (e) => {
        setProgress(5)
        
        e.preventDefault()
        const response = await fetch("https://chatboxbackend.onrender.com/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: credential.name, username: credential.username, password: credential.password })
        })
        setProgress(30)
        const json = await response.json()
        setProgress(60)
        // console.log(json)
        if (json.success) {
            localStorage.setItem('token', json.authtoken)

            // console.log(localStorage.getItem('token'))
            const res = await getContacts()
            // console.log("res get")
            // console.log(res)
            await setUsername(json.username)
            setProgress(70)
            await setMyName(json.nameOfUser)
            setProgress(80)
            await setMyid(json.idOfUser)
            history("/")
            await localStorage.setItem('username', json.username)
            setProgress(95)
            await localStorage.setItem('myName', json.nameOfUser)
            setProgress(96)
            await localStorage.setItem('myID', json.idOfUser)
            setProgress(97)
            await setLoggedIn(true)
            socket.emit("user_logged_in", json.username)
            setProgress(99)
        }
        else {
            // alert("Same user already exist")
            alert("invalid credential")
        }
        setProgress(100)
    }
    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }
    return (
        <div className='LoginDiv' style={{ flexDirection: "column" }}>
            <div style={{ padding: "12px" }} className="Hdiv">
                <h2 >SignUp Now</h2>

            </div>
            <div className="loginRemain LoginDiv" style={{ margin: "0px", width: "80%" }}>
                <form onSubmit={handleSubmit} className="LoginContainer container" >
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" onChange={onChange} value={credential.name} className="form-control" id="name" name='name' />
                        {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input type="text" onChange={onChange} value={credential.username} className="form-control" id="username" name='username' minLength={5} required />
                        {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" onChange={onChange} value={credential.password} name='password' minLength={5} required className="form-control" id="password" />
                    </div>

                    <button type="submit" className="signingBtn btn btn-primary">SignUp <i class="fa-solid fa-arrow-right-to-bracket"></i></button>
                </form>
            </div>
        </div>
    )
}

export default SignUp