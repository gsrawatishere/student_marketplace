import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import App from "../App";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import ListingListCard from "../Components/ListingListCard";
import Home from "../Pages/Home";
import Wishlist from "../Pages/Wishlist";
import Profile from "../Pages/Profile";
import AddListingForm from "../Pages/AddListingForm";
import MyListings from "../Pages/MyListings";
import GetListingDetails from "../Pages/GetListingDetails";
import AllListingsBy from "../Pages/AllListingsBy";
import ChatList from "../Pages/ChatList";
import ChatContainer from "../Components/ChatContainer";
import SearchListings from "../Pages/SearchListings";
import ProfileById from "../Pages/ProfileById";
import AdminLogin from "../Pages/AdminLogin";
import AdminDashboard from "../Pages/AdminDashboard";
import RootLayout from "./RootLayout"; // Import the RootLayout


const MyRoute = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />}>
      {/* All routes now have access to AuthProvider and SocketProvider */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/addlisting" element={<AddListingForm />} />
      <Route path="/my-listings" element={<MyListings />} />
      <Route path="/all-chats" element={<ChatList />} />
      <Route path="/chat" element={<ChatContainer />} />
      <Route path="/profiledata/:id" element={<ProfileById />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />

      {/* With navbar and footer */}
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="/list" element={<ListingListCard />} />
        <Route path="/listing/:id" element={<GetListingDetails />} />
        <Route path="/all/:id" element={<AllListingsBy />} />
        <Route path="/search" element={<SearchListings />} />
      </Route>
    </Route>
  )
);

export default MyRoute;