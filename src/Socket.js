import { io } from "socket.io-client";

const socket = io('https://chatboxbackend.onrender.com', { transports: ['websocket'] });

export default socket