
const mongoose = require('mongoose');
mongoose.set('strictQuery',false);
const connectDb=async (url)=>{
    try {
        const conn=await mongoose.connect(url);
        console.log(`db connected ${conn.connection.host}`);
    } catch (error) {
        //console.log("Eroor");
        console.log(error);
    }
}
module.exports=connectDb;


