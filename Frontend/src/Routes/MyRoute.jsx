import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import App from "../App";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import ListingListCard from "../Components/ListingListCard";
import ListingCard from "../Components/ListingCard";
import Home from "../Pages/Home";
import Categories from "../Components/Categories";
import Wishlist from "../Pages/Wishlist";

const MyRoute = createBrowserRouter(
    createRoutesFromElements(
      <>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/list" element={<ListingListCard/>}/>
      <Route path="/list-card" element={<ListingCard/>}/>
      <Route path="/wishlist" element={<Wishlist/>}/>
      
      </>
));

export default MyRoute;