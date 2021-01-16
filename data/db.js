const mongoose=require("mongoose");

const uri = 'mongodb+srv://nmcnpmG5:nmcnpmG5@cluster.augp3.mongodb.net/ThatLac?retryWrites=true&w=majority';

const connectDB = async()=>{
    try {
        await mongoose.connect(uri,{
            useCreateIndex:true,
            useNewUrlParser: true,
            useUnifiedTopology:true,
            useFindAndModify:false
        });
        console.log("Connect successful");
    } catch (error) {
        console.log(error.message);
    }
}

module.exports=connectDB