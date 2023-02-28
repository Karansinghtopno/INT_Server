const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes")


const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8000;

// console.log(process.env.MONGODB_URI)

mongoose.set("strictQuery", true);

const connectMongo = () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log(`connected to mongodb server`);
    }).catch(()=>console.log(` failed to connect to mongodb server`))
};

app.get("/", (req,res)=>{
    console.log("testing the server")
    res.json({message : "hello from the server"})
})

app.use("/api/auth",authRoutes)


//middleware to show status and error message
app.use((error, req, res, next) => {
    const status = error.status || 500;
    const message = error.message || "Something Went wrong!!!";
  
    return res.status(status).json({
      success: false,
      status: status,
      message: message,
    });
  });

app.listen(PORT, () => {
  console.log(`listning on port ${PORT}  http://localhost:${PORT}`);
  connectMongo();
});
