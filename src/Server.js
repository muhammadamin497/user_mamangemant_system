const express = require("express");
const dotenv = require("dotenv");
const connectDB=require("./Config/db")
const userRoutes = require("./Routes/user_routes");
const authroutes=require("./Routes/authroutes")
const adminRoutes=require("./Routes/admainroutes")


const app = express();
app.use(express.json());
dotenv.config();
connectDB();


app.use("/api/users", userRoutes);
app.use("/api/auth", authroutes);
app.use("/api/admin", adminRoutes);

app.listen( 3000,() => {
  console.log('http://localhost:3000');
});