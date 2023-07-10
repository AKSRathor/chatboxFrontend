import { React, useContext, useEffect, useState } from 'react'
import ContactItem from './ContactItem'
import { useNavigate } from 'react-router-dom'
import MsgContext from '../context/msg/msgContext'
import MessageBox from './MessageBox'
import socket from '../Socket'
import "./Style/Home.css"
import logo from "./img/Logo.png"
// import "./Scripts/Home"
import loader from "./img/loader.gif"

const Home = () => {
  const context = useContext(MsgContext)
  const { getContacts, contacts, getUsername, fetchMessage, message, text, setText, sendMessage, sendTo, username, myid, setMyid, setMessage, keyCount, setKeyCount, setSendCount, sendCount, ifSearchClicked, setProgress, contactLoading } = context


  const [triggerEffect, setTriggerEffect] = useState(true)

  const [currentTo, setCurrentTo] = useState()
  const dividerStyle = {
    display: "flex",
    scrollY: "hidden",
    position: "sticky",
    height: "83vh"
  }


  const handleOnChange = (event) => {
    // console.log("you have clicked handle on change")
    setText(event.target.value)
    // console.log(text)
  }
  const handleOnSend = async (e) => {
    setProgress(5)
    e.preventDefault()
    if (sendTo.length > 0) {
      setProgress(5)
      socket.emit("message_sent", { id: localStorage.getItem('myID'), msg: text, sendBy: sendTo })
      setProgress(10)
      await setMessage(message.concat({ from: JSON.stringify(localStorage.getItem('myID')), to: sendTo, message: text, _id: sendCount }))

      setProgress(20)
      await setTriggerEffect(false)
      setProgress(30)
      await setSendCount(sendCount + 1)
      setProgress(40)
      await sendMessage(text, sendTo)
      setProgress(100)

      setText("")

    }
    setProgress(100)
  }

  // const afterReceive = (sto)=>{
  //     console.log("send to hoga ",sendTo)
  //   console.log(sendTo,"after receive sto ",sto)
  // }


  useEffect(() => {
    // console.log("inside click useeffect ")
    socket.on("new_contact_recieved", async (id) => {
      if (id === localStorage.getItem('myID')) {
        const res = await getContacts()
      }
    })

    return () => {

    }
  }, [socket])


  useEffect(() => {
    // console.log("inside the useeffect 2")
    setTriggerEffect(true)
    // Setup asynchronous function
    const listenForMessages = async () => {
      // Listen for "receive_message" event from socket
      console.log("the sendto value is: ", sendTo)
      await socket.on("receive_message", async (data) => {
        console.log(data.msg, "message received sto: ", data.id, "send to: ", sendTo)
        if (data.id === sendTo && data.sendBy === localStorage.getItem("myID")) {
          // console.log(data.id/)

          setMessage(message.concat({ from: JSON.stringify(data.id), to: localStorage.getItem('myID'), message: data.msg, _id: keyCount }))
          setKeyCount(keyCount + 1)
          // console.log("new message is ", message)
          // setmess
        }


        // afterReceive(sto)
      })
    }

    // Call listenForMessages function when socket changes
    listenForMessages()

    // Return cleanup function that removes the "receive_message" event listener
    return () => {
      socket.off("receive_message")
    }
  }, [socket, sendTo, keyCount, message, triggerEffect])

  useEffect(() => {
    setTriggerEffect(true)
    // Setup asynchronous function
    console.log("Inside the useffect 1")
    const fetchingContacts = async () => {
      setProgress(30)
      // Check for user token in local storage
      if (triggerEffect && localStorage.getItem('token')) {
        console.log("triggerEffect is : ", triggerEffect)
        // Retrieve user's contacts
        const res = await getContacts()
        setProgress(60)
        // Fetch messages for selected contact
        // console.log("send to ", sendTo)
        // if (sendTo.length > 0) {
        //   await fetchMessage(sendTo)

        // }
      }
      setProgress(100)
    }

    // Call fetchMessages function when sendTo changes
    fetchingContacts()

    // Return cleanup function
    return () => {
      // Cleanup code here
    }
  }, [triggerEffect])




  return (
    <div className='ChatArea' style={dividerStyle}>
      <div style={{ backgroundImage: `url("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/74a123e8-378f-4e35-a994-e6bfd8b05992/dc95rkv-30e2484a-ba33-42eb-b905-1993b9cda1b5.jpg/v1/fill/w_1192,h_670,q_70,strp/black_texture_background_wallpaper__hd__by_deddyrap_dc95rkv-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MjE2MCIsInBhdGgiOiJcL2ZcLzc0YTEyM2U4LTM3OGYtNGUzNS1hOTk0LWU2YmZkOGIwNTk5MlwvZGM5NXJrdi0zMGUyNDg0YS1iYTMzLTQyZWItYjkwNS0xOTkzYjljZGExYjUuanBnIiwid2lkdGgiOiI8PTM4NDAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.LlQCWRCfWdot9urZYeVv9gZ6Smm3lZ0gnvgxIPtALE8")`, backgroundRepeat: "no-repeat", backgroundSize: "cover", width: "30%", height: "86.9vh", overflowY: "auto" }} className="contactArea">
        {contacts.length >= 1 && contacts.map((i) => {
          return <div key={i._id}>
            <ContactItem contactName={(i)} />
          </div>
        })}
        
        {contactLoading === 1 && < div className="noContacts" style={{ color: "white", justifyContent: "center", display: "flex", textAlign: "center", flexDirection: "column" }}>

          <h2 style={{ paddingTop: "10%" }}>{contacts.length === 0 && `Your Contact list is empty`}</h2>
          <p style={{ color: "#999", fontSize: "0.8em" }}>{contacts.length === 0 && `Search More Contacts and add into your contact List`}</p>

        </div>}

      {contactLoading === 0 && <div style={{display:"flex"}}>
        <img style={{margin:"auto", width:"4%", paddingTop:"15%"}} src={loader} alt="" />
      </div>}
      </div>
      <div style={{ backgroundColor: `rgb(77 76 76)`, backgroundRepeat: "no-repeat", backgroundSize: "cover", width: "70%", height: "77.9vh", overflowY: "auto", display: "flex", flexDirection: "column" }} className="chatArea">
        <div className="msg" style={{ height: "89%" }}>
          <div className="messages">
            {message.map((j) => {
              return <div key={j._id}>
                <MessageBox msg={j} />
              </div>
            })}

          </div>

        </div>
        {message.length > 0 && <form className="d-flex mx-3" role="search" style={{ bottom: "10px", overflowY: "auto", position: "fixed", zIndex: "0", width: "68%" }}>
          <input className="form-control" value={text} onChange={handleOnChange} id="exampleFormControlTextarea1 mx-3" name='message' placeholder='Enter your message' style={{ boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px" }} />
          <button className="sendBtn" onClick={handleOnSend} type="submit"><i class="fa-solid fa-paper-plane"></i></button>
        </form>}
        {message.length === 0 && <div className="imgSection" style={{ display: "flex", justifyContent: "center" }}><img style={{ width: "35%" }} src={logo} alt="" />

        </div>}
        {message.length === 0 &&
          <div style={{ color: "white", textAlign: "center" }} className="allEle">
            <h1 >ChatBox</h1>
            <p>Send and Receive messages in seconds</p>

          </div>
        }
      </div>
    </div>
  )
}

export default Home