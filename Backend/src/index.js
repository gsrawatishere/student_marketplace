import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authroute from "./routes/auth.route.js"
import listingroute from "./routes/listing.route.js"
import wishlistroute from "./routes/wishlist.route.js"
import profileroute from "./routes/profile.route.js"

dotenv.config();
const app = express();

const corsOptions = {
  origin: 'http://localhost:5173', 
  credentials: true, 
  optionsSuccessStatus: 200 
};
app.use(cors(corsOptions));
  
app.use(cookieParser());
app.use(express.json());

app.use("/api/v1/auth",authroute);
app.use("/api/v1/listing",listingroute);
app.use("/api/v1/wishlist",wishlistroute);
app.use("/api/v1/profile",profileroute);



const PORT = process.env.PORT;

app.listen(PORT,()=>{
  console.log(`Server is running on port ${PORT}`);
})
 