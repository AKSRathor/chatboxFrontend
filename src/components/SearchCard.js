import React from 'react'
import { useState, useContext, useEffect, } from 'react';
import MsgContext from '../context/msg/msgContext';
import socket from '../Socket';
import "./Style/SearchCard.css"

const SearchCard = () => {

  const context = useContext(MsgContext)
  const { searchText, setSearchText, setIfSearchClicked, ifSearchClicked, searchContact, sendMessage, getContacts, progress, setProgress, searching } = context
  const [tempDat, setTempDat] = useState(false)

  const handleOnAdd = async () => {
    setProgress(10)
    // console.log("Inside the handleonAdd ", tempDat)
    await sendMessage("hi", tempDat.id)
    setProgress(40)
    const res = await getContacts()
    setProgress(70)
    setIfSearchClicked(false)
    socket.emit("new_contact",tempDat.id)
    setProgress(100)

  }

  const closeOnClickSearchCard = ()=>{
    setIfSearchClicked(false)
  }

  useEffect(() => {
    const searchUser = async () => {
      setProgress(10)
      if(searchText.length>0){
        setProgress(50)
        const dat = await searchContact(searchText)
        setTempDat(dat)
        // console.log(dat.id)
        setProgress(80)

      }
      setProgress(100)
    }

    searchUser()

    return () => {

    }
  }, [ifSearchClicked])


  const searchCardStyle = {
    margin: "auto",
    zIndex: "3",
    backgroundColor: searching === 1?(tempDat?"#c2ffbb":"rgb(255 191 191)"):"grey",
    width: "31%",
    height: "32vh",
    borderRadius: "20px",
    display: "flex",
    flexDirection: "column",
    transform:"scale(1)"
  }

  const notOrNot = () => {
    if (!tempDat) {
      return "Not"
    }
    return ""
  }
  return (
    <div style={{ position: "fixed", width: "100%", height: "100vh", display: "flex", zIndex: "1", display: ifSearchClicked ? "flex" : "none" }}>
      <div className="searchCard" style={searchCardStyle}>
        {searching === 1 && <h2 style={{ display: "block", margin: "auto" }}>{notOrNot()} Found</h2>}
        {searching === 0 && <h2 style={{ display: "block", margin: "auto" }}>searching...</h2>}

        <div className="searchInsideContent" style={{ margin: "auto" }}>
          <div className="loadingUsername" style={{ margin: "auto" }}>{searchText}</div>
          <button className='addBtn' onClick={handleOnAdd} style={{ display: !tempDat ? "none" : "block" }}>Add</button>

        </div>
      </div>
      <div onClick={closeOnClickSearchCard} className="cardBack" style={{ position: "fixed", backgroundColor: "#232323", width: "100%", height: "100vh", opacity: "0.8", zIndex: "2" }}>
      </div>
    </div>
  )
}

export default SearchCard