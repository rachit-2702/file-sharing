const express= require("express");
const connectDB = require("./config/db");
const app = express();

app.set('view engine','ejs');

connectDB();

const PORT=process.env.PORT ||3000;

app.use("/api/files", require("./routes/files"))

app.use("/files", require("./routes/show"))


app.listen(PORT, ()=>{
    console.log("server started on port: "+ PORT);
})