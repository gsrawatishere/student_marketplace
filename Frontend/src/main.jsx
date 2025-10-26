import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import MyRoute from "./Routes/MyRoute.jsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={MyRoute} fallbackElement={<div>Loading...</div>} />
    <Toaster position="top-center" reverseOrder={false} />
  </StrictMode>
);