import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import App from "../App";
import Login from "../Pages/Login";
import Register from "../Pages/Register";

const MyRoute = createBrowserRouter(
    createRoutesFromElements(
      <>
      <Route path="/" element={<App/>}/>
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
 
      </>
));

export default MyRoute;