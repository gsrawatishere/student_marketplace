import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import MyRoute from "./Routes/MyRoute.jsx";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./Context/AuthContext.jsx";
import { SocketProvider } from "./Context/SocketContetx.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <SocketProvider>
    <RouterProvider router={MyRoute} />
   <Toaster position="top-center" reverseOrder={false} />
   </SocketProvider>
   </AuthProvider>
  </StrictMode>
);
