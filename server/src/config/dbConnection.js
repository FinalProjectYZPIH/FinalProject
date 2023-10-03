import mongoose from "mongoose"

const connectionString = `${process.env.DB_URI}${process.env.DB_NAME}` || "";


//connection Template fürs MongoDB
const dbConnection = async ()=> {
    try {
        await mongoose.connect(connectionString)
    } catch (error) {
        console.log(error)
    }
}


export default dbConnection;