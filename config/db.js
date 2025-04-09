import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB)
        console.log('MongoDB Database Connected Successfully!');
    }
    catch(err) {
        console.log(err);
        throw err
    }
}

export default connectDB