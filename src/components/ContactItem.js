import React from 'react'
import { useContext, useRef, useEffect } from 'react'
import MsgContext from '../context/msg/msgContext'
import "./Style/ContactItem.css"
import socket from '../Socket'

const ContactItem = (props) => {
    const context = useContext(MsgContext)
    const { fetchMessage, sendTo, setText, setSendTo, message,setProgress } = context
    const btnContact = useRef()
    const onlineCheck = useRef()

    const handleOnClickContact = async() => {
        setProgress(5)

        // console.log("handle on click contact")
        // console.log(props.contactName._id)
        setSendTo(props.contactName._id)
        setProgress(30)
        console.log("end to : ",sendTo)
        // console.log(sendTo)
        console.log("sendTo value of  props: ", props.contactName._id)
        if((props.contactName._id).length>0 && sendTo != undefined ){
            await fetchMessage(props.contactName._id)
        }
        setProgress(90)
        // console.log("Contact item: ", message)
        setText("")
        setProgress(100)



    }


    useEffect(() => {
        // console.log("contact item useeffect triggered")
        if (props.contactName._id === sendTo) {
            btnContact.current.style.backgroundColor = "#232323"

        }
        else {
            btnContact.current.style.backgroundColor = "white"
        }


        return () => {
        }
    }, [sendTo])


    return (
        <div>
            <div className="card my-3 w-75 container">
                <div className="card-header"> {props.contactName.name} </div>

                <div className="card-body d-flex justify-content-between" >
                    <footer className="card-footer text-muted">{props.contactName.username}</footer>
                    <button ref={btnContact} onClick={handleOnClickContact} type="button" className="msgShowBtn btn btn-outline-secondary"><i class="fa-solid fa-chevron-right"></i></button>
                    
                </div>
            </div>
        </div>
    )
}

export default ContactItem