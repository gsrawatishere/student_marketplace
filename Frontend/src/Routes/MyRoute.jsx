import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ListingListCard from "../components/ListingListCard";
import Home from "../pages/Home";
import Wishlist from "../pages/Wishlist";
import Profile from "../pages/Profile";
import AddListingForm from "../pages/AddListingForm";
import MyListings from "../pages/MyListings";
import GetListingDetails from "../pages/GetListingDetails";
import AllListingsBy from "../pages/AllListingsBy";
import ChatList from "../pages/ChatList";
import ChatContainer from "../components/ChatContainer";
import SearchListings from "../pages/SearchListings";
import ProfileById from "../pages/ProfileById";
import AdminLogin from "../pages/AdminLogin";
import AdminDashboard from "../pages/AdminDashboard";
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