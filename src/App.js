import Home from "./components/Home";
import Navbar from "./components/Navbar";
import {
  BrowserRouter,
  Routes,
  Route,
  // Link,
} from "react-router-dom";
import MsgState from './context/msg/msgState';
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import { io } from 'socket.io-client';
import { useEffect, useState } from "react";
import socket from "./Socket"
import SearchCard from "./components/SearchCard";
import "./App.css"


function App() {
  // const socket = io('http://localhost:5000', { transports: ['websocket'] });

  socket.on('connect', () => {
    console.log('Connected to Socket.io server');
    socket.on("am_i_online", (id_value)=>{
      console.log("inside the am_i online")
          if(id_value === localStorage.getItem("myID")){
              console.log("inside the am_i online yes")
              socket.emit("yes_iam_online", id_value)
          } 
        })
      

  });

  socket.on('disconnect', () => {
    console.log('Disconnected from Socket.io server');
  });
  
  return (
    <>
      <MsgState>
        <BrowserRouter>
          <SearchCard/>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<SignUp />} />
          </Routes>
        </BrowserRouter>
      </MsgState>

    </>
  );
}

export default App;
