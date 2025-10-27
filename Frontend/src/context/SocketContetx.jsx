import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "./AuthContext";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { user } = useAuth();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // 🧹 Clean up if user logs out
    if (!user?.id) {
      if (socket) socket.disconnect();
      setSocket(null);
      return;
    }

    const SOCKET_SERVER = import.meta.env.VITE_SOCKET_SERVER;
    console.log("🔌 Connecting to socket server:", SOCKET_SERVER);

    const newSocket = io(SOCKET_SERVER, {
      withCredentials: true,
      transports: ["websocket"], // Helps on Render
      reconnection: true,
      reconnectionAttempts: 5,
      secure: true,
    });

    newSocket.on("connect", () => {
      console.log("✅ Socket connected:", newSocket.id);
      // Only emit when user.id is present
      if (user?.id) {
        newSocket.emit("registerUser", user.id);
        console.log("🧑‍💻 Registered user:", user.id);
      }
    });

    newSocket.on("connect_error", (err) => {
      console.error("❌ Socket connection error:", err.message);
    });

    newSocket.on("reconnect", () => {
      console.log("🔁 Reconnected:", newSocket.id);
      if (user?.id) newSocket.emit("registerUser", user.id);
    });

    setSocket(newSocket);

    // 🧹 Cleanup on unmount
    return () => {
      newSocket.disconnect();
    };
  }, [user?.id]); // 👈 Run only when user.id changes

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);