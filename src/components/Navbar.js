import React, { useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react';
import MsgContext from '../context/msg/msgContext';
import "./Style/Navbar.css"
import LoadingBar from 'react-top-loading-bar'

const Navbar = () => {
    const context = useContext(MsgContext)
    const { username, setUsername, fetchID, myid, myName, setMyName, searchVar, setSearchVar, searchContact, sendMessage, getContacts, searchText, setSearchText, setIfSearchClicked, ifSearchClicked, dat, setDat, loggedIn, setLoggedIn, progress, setProgress } = context

    const searchStyleRef = useRef()


    let location = useLocation();
    let history = useNavigate()
    const handleOnSignout = () => {
        setProgress(10)
        localStorage.removeItem("token")
        localStorage.removeItem('myID')
        localStorage.removeItem('myName')
        localStorage.removeItem('username')
        setProgress(50)

        history("/login")
        setUsername("")
        searchStyleRef.current.style.setProperty("display", "none", "important")
        setLoggedIn(false)
        setProgress(100)

    }
    const handleOnSearchType = (event) => {
        setSearchText(event.target.value)
    }

    const handleOnSearch = async (e) => {
        // setProgress(0)
        e.preventDefault()

        // const dat = await searchContact(searchText)
        // await setDat(searchContact(searchText))
        // await sendMessage("hi", dat.id)
        // console.log("dat before: ",dat.id)
        // console.log(dat)
        // const res = await getContacts()
        setIfSearchClicked(true)
        setProgress(30)

    }

    useEffect(() => {
        // (async () => {

        if (localStorage.getItem('token')) {
            searchStyleRef.current.style.setProperty("display", "flex", "important")
            setLoggedIn(true)
        }
        else {
            history("/login")
            // console.log("Inside the else")
            setLoggedIn(false)
            searchStyleRef.current.style.setProperty("display", "none", "important")

            //   console.log(localStorage.getItem('token'))
        }
        // })()

    }, [loggedIn])


    return (
        <div>
            <LoadingBar
                color='rgb(255 144 6)'
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
            />
            <nav className="navbar navbar-expand-lg">

                <div className="container-fluid">
                    <a className="navbar-brand" href="#">ChatBox</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <form className="d-flex" role="search" ref={searchStyleRef} style={{ display: "none !important" }}>
                            <input className="form-control me-2" value={searchText} onChange={handleOnSearchType} type="search" placeholder="Search" aria-label="Search" />

                            <button className='searchBtn' onClick={handleOnSearch} type="submit"><i class="fa-solid fa-magnifying-glass"></i></button>
                        </form>
                    </div>
                    <span className="mx-3 usn navbar-text" href="#">{localStorage.getItem("myName")}</span>
                    {/* <button type="button" className="btn btn-outline-primary">Sign Out</button> */}
                    {!localStorage.getItem('token') ? <div>
                        <div className="btns" style={{ display: "flex", width: "102%", paddingRight: "104px" }}>
                            <Link to="/login" type="button" className="mx-2 signBtn btn">Login  </Link>
                            <Link to="/signup" type="button" className="mx-2 signBtn btn">Sign Up</Link>

                        </div>
                    </div> : <button to="/login" type="button" className="mx-2 signBtn" onClick={handleOnSignout}>Sign Out</button>}
                </div>
            </nav>
        </div>
    )
}

export default Navbar