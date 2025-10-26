import { AuthProvider } from "../Context/AuthContext";
import { SocketProvider } from "../Context/SocketContetx";
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