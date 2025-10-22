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
import Profile from "../Pages/Profile";
import AddListingForm from "../Pages/AddListingForm";
import MyListings from "../Pages/MyListings";
import GetListingDetails from "../Pages/GetListingDetails";
import AllListingsBy from "../Pages/AllListingsBy";


const MyRoute = createBrowserRouter(
    createRoutesFromElements(
      <>
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/wishlist" element={<Wishlist/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/addlisting" element={<AddListingForm/>} />
      <Route path="/my-listings" element={<MyListings/>} />
      

      {/* With navbar and footer */}
      <Route path="/" element={<App/>}>
      <Route index element={<Home/>} />
      <Route path="/list" element={<ListingListCard/>}/>
      <Route path='/listing/:id' element={<GetListingDetails/>} />
      <Route path='/all/:id' element={<AllListingsBy/>} />
      
      </Route>
      </>
));

export default MyRoute;