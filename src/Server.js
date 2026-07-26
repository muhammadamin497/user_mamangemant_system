const express = require("express");


const app = express();

app.get("/", (req, res) => {
  res.send("Server running");
});

app.listen(5000, () => {
  console.log('http://localhost:5000');
const dotenv = require("dotenv");
const connectDB=require("./Config/db")

const userRoutes = require("./Routes/user_routes");
const authroutes=require("./Routes/authroutes")
const adminRoutes=require("./Routes/admainroutes")
const errorHandler = require("./Middleware/handlererror");


const app = express();
app.use(express.json());
dotenv.config();
connectDB();


app.use("/api/users", userRoutes);
app.use("/api/auth", authroutes);
app.use("/api/admin", adminRoutes);


//  error handler 
app.use(errorHandler);

app.listen( 3000,() => {
  console.log('http://localhost:3000')
  
});