const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();



const connectDB = async () => {
    try {  

    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{console.log("mongodb atlas connected");});
    } catch (err) {
        console.log(`Error: ${err}`.red);
        process.exit(1);
    }

}
module.exports = connectDB;
