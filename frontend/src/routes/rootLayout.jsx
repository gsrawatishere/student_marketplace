import { AuthProvider } from "../context/AuthContext";
import { SocketProvider } from "../context/SocketContetx";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <AuthProvider>
      <SocketProvider>
        <Outlet />
      </SocketProvider>
    </AuthProvider>
  );
};

export default RootLayout;