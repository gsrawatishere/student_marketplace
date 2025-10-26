import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "../Context/AuthContext";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { user } = useAuth();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!user) {
      // If user logs out, disconnect existing socket
      if (socket) socket.disconnect();
      setSocket(null);
      return;
    }

    // Use env variable so it works in production too
    const VITE_BACKEND_URL =
      import.meta.env.VITE_BACKEND_URL|| "http://localhost:4001";

    const newSocket = io(VITE_BACKEND_URL, {
      withCredentials: true,
      transports: ["websocket"], // optional: helps with CORS & speed
    });

    // Wait for actual connection
    newSocket.on("connect", () => {
      console.log("✅ Connected to socket:", newSocket.id);
      newSocket.emit("registerUser", user.id);
      console.log("🧑‍💻 Registered user:", user.id);
    });

    // Handle reconnection automatically
    newSocket.on("reconnect", () => {
      console.log("🔁 Reconnected:", newSocket.id);
      newSocket.emit("registerUser", user.id);
    });

    setSocket(newSocket);

    // Cleanup on unmount or logout
    return () => {
      newSocket.disconnect();
    };
  }, [user]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);