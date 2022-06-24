const express= require("express");
const connectDB = require("./config/db");
const app = express();
const path = require('path');
const cors= require("cors");

require('dotenv').config();
app.set('views', path.join(__dirname, '/views'));
app.set('view engine','ejs');
app.use(express.static("public"));

app.use(express.json());

connectDB();

const corsOptions = {
    origin: process.env.ALLOWED_CLIENTS.split(",")
}

app.use(cors(corsOptions));

const PORT=process.env.PORT ||3000;

app.get("/",(req,res)=>{
    res.render("uploadfile");
})

app.use("/api/files", require("./routes/files"))

app.use("/files", require("./routes/show"))

app.use("/files/download", require("./routes/download"))

app.listen(PORT, ()=>{
    console.log("server started on port: "+ PORT);
})
