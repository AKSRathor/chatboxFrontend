import React, { useContext, useEffect } from 'react'
import MsgContext from '../context/msg/msgContext'

const MessageBox = (props) => {
    const context = useContext(MsgContext)
    const { sendTo, getUsername, username, setUsername,fetchID  } = context
    
    useEffect(() => {
        
        // console.log("Inside the messageBox ",typeof JSON.parse(JSON.parse(props.msg.from)), " ", props.msg.from)
        // if(JSON.parse(JSON.parse(props.msg.from))){
        //     console.log("Go get it")
        // }
        getUsername(JSON.parse(props.msg.from))

        return()=>{

        }
        
        // console.log(JSON.parse(props.msg.from))
    }, [])



    let leftStyle = {
        float: "left",
        clear: "both",
        backgroundColor: "white"
    }
    const rightStyle = {
        float: "right",
        clear: "both",
        backgroundColor: "#c0faff"
    }

    return (
        <div>
            <div className="w-75 card my-2 mx-3" style={sendTo === props.msg.to ? rightStyle : leftStyle} >
                <div className="card-body">
                    {/* {getUsername(props.msg.from)}: */}
                    {props.msg.message}
                </div>
            </div>
        </div>
    )
}

export default MessageBox