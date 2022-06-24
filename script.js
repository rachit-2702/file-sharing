const File=require("./models/file");
const fs=require("fs");
const connectDB = require("./config/db");
connectDB();

async function fetchData(){
    //fetching all files that are 24hr old

    const pastDate = new Date(date.now() - 24*60*60*1000);
    const files= await File.find({createdAt: {$lt: pastDate }});
    if(files.length){
        for(const file of files){
            try{
            fs.unlinkSync(file.path); //deletedd from /uploads
            await file.remove();
            console.log(`successfully deleted ${file.filename}`);
        }catch(err){
            console.log(`error while deleting file ${err}`);
        }
    }
}
}

fetchData().then(()=>{
    console.log('done');
    process.exit();
//to stop script.js
})