
import { io } from "socket.io-client";
export const socket = io(`${import.meta.env.VITE_BACKEND}`,{transports: ['websocket']});
socket.on('connect_error', (error) => {
    console.error('Connection error:', error);

});