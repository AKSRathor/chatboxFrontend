import { React, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import MsgContext from '../context/msg/msgContext'
import io from 'socket.io-client';
import socket from '../Socket';
import "./Style/Login.css"
// const socket = io.connect("http://localhost:5000");


const Login = (props) => {

  socket.on('connect', () => {
    // console.log('login portion connected');
  });

  let history = useNavigate()

  const context = useContext(MsgContext)
  const { getContacts, setUsername, username, fetchID, myid, setMyid, myName, setMyName, setLoggedIn, setProgress } = context


  const [credential, setCredential] = useState({ username: "", password: "" })
  const handleSubmit = async (e) => {
    setProgress(0)
    e.preventDefault()
    setProgress(30)
    const response = await fetch("https://chatboxbackend.onrender.com/api/auth/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: credential.username, password: credential.password })
    })
    setProgress(40)
    const json = await response.json()
    setProgress(50)
    // console.log(json)
    if (json.success) {
      setProgress(80)
      await localStorage.setItem('token', json.authtoken)
      // console.log(localStorage.getItem('token'))
      const res = await getContacts()
      // console.log("res get")
      // console.log(res)
      await setUsername(json.username)
      await setMyName(json.nameOfUser)
      await setMyid(json.idOfUser)
      history("/")
      await localStorage.setItem('username', json.username)
      await localStorage.setItem('myName', json.nameOfUser)
      await localStorage.setItem('myID', json.idOfUser)
      await setLoggedIn(true)
      socket.emit("user_logged_in", json.username)
      for (const i of res) {
        // console.log(i._id)
        socket.emit("check_if_online", i._id);
      }
      setProgress(90)
      
    }
    else {
      // alert("Invalid credentials")
      // props.showAlert("Invalid Details", "danger")
      alert("Invalid credential")

    }
    setProgress(100)
  }
  const onChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value })
  }

  return (
    <div className='LoginDiv' style={{ flexDirection: "column" }}>
      <div style={{padding:"12px"}} className="Hdiv">
        <h2 >Login</h2>

      </div>
      <div className="loginRemain LoginDiv" style={{ margin: "0px", width: "80%" }}>
        <form onSubmit={handleSubmit} className="LoginContainer container" >
          <div className="mb-3">
            <label htmlFor="username" className="form-label">username</label>
            <input type="text" onChange={onChange} value={credential.username} className="form-control" id="username" name='username' aria-describedby="usernameHelp" />
            {/* <div id="usernameHelp" className="form-text">We'll never share your username with anyone else.</div> */}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" onChange={onChange} value={credential.password} name='password' className="form-control" id="password" />
          </div>

          <button type="submit" className="signingBtn btn btn-primary">Login <i class="fa-solid fa-right-to-bracket"></i></button>
        </form>
      </div>

    </div>
  )
}

export default Login