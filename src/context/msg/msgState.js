import MsgContext from "./msgContext"
import { useState } from "react"

const MsgState = (props) => {
  const [contacts, setContacts] = useState([])
  const [messageBy, setMessageBy] = useState()
  const [message, setMessage] = useState([])
  const [sendTo, setSendTo] = useState("")
  const [text, setText] = useState()
  const [username, setUsername] = useState("")
  const host = "https://chatboxbackend.onrender.com"
  const [myid, setMyid] = useState("")
  const [myName, setMyName] = useState("")
  const [keyCount, setKeyCount] = useState(0)
  const [sendCount, setSendCount] = useState(0.1)
  const [searchVar, setSearchVar] = useState(false)
  const [searchText, setSearchText] = useState("")
  const [ifSearchClicked, setIfSearchClicked] = useState(false)
  const [dat, setDat] = useState("")
  const [loggedIn, setLoggedIn] = useState(false)
  const [progress, setProgress] = useState(0)
  const [contactLoading, setContactLoading] = useState(0)
  const [searching, setSearching] = useState(0)
  

  // const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNiYmY5NmM0NjUwNTc0OTRjZTgwOTU0In0sImlhdCI6MTY3NDA5ODkxNH0.odbX4_YmMs55PxLvbRdXPXt_tUWDj03-k-sGMo4KJWk" //for ashurathor
  // const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNjNzY2Njc4M2ZhNTEwMGFlNDlmMGU2In0sImlhdCI6MTY3NDUzNDQ2NH0.1PNqku1R9KRqZEBglMGT__u4uaSKznlJYjshkb30f9c' //for Abhishek
  // const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNjNzkyMTNkZmU5MjcwYWM1NDYzODNhIn0sImlhdCI6MTY3NDUzNDU0Mn0.JBvGMPNoYm5qKis8CAEkN-LSZtp5bBFgjNEtoqbMZtY' //for shivaji
  // const authToken = localStorage.getItem('token')
  const getContacts = async () => {
    setContactLoading(0)
    // console.log("Inside the getContact",localStorage.getItem('token'))
    const response = await fetch(`${host}/api/message/contacts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }
    })
    const json = await response.json()

    await setContacts(json)
    // console.log("returning contacts")
    // console.log(json)
    setContactLoading(1)
    return json
  }

  const getUsername = async(id)=>{
    const response = await fetch(`${host}/api/message/fetchusername/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }
      
    })
    const json = await response.json()
    // console.log("inside getusername")
    // console.log(json)
    await setMessageBy(json)
    // console.log(messageBy)
    return json
    
  }

const fetchMessage = async (id) => {
  console.log("inside the fetchMEssages: ", id)
  if(id!== undefined){

    const response = await fetch(`${host}/api/message/getmessage/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }
    })
    const json = await response.json()
    setMessage(json)
    // console.log("inside the fethcmessage")
    setSendTo(id)
  }
}


const sendMessage = async (message,to) => {
  // console.log("Adding a new message")
  //todo:api call

  const response = await fetch(`${host}/api/message/send`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "auth-token":localStorage.getItem('token'),


    },
    body: JSON.stringify({ message, to })
  });
  const json = await response.json()
  
  fetchMessage()


}


const searchContact = async (usnSearch) => {
  setSearching(0)
  // console.log(usnSearch)
  const response = await fetch(`${host}/api/message/search`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "auth-token": localStorage.getItem('token')
    },
    body:JSON.stringify({usnSearch})
  })
  const json = await response.json()

  setSearchVar(json)
  // console.log(searchVar)
  setSearching(1)
  return json
}





  return (
    <MsgContext.Provider value={{ getContacts, contacts,getUsername, fetchMessage, message, setMessage, sendTo, text, setText, sendMessage, setSendTo, username, setUsername,myid, setMyid, myName, setMyName, keyCount, setKeyCount, sendCount, setSendCount, searchVar, setSearchVar, searchContact, searchText, setSearchText, ifSearchClicked, setIfSearchClicked, dat, setDat, loggedIn, setLoggedIn, progress, setProgress, contactLoading, setContactLoading, searching }}>
      {props.children};
    </MsgContext.Provider>
  )
}

export default MsgState