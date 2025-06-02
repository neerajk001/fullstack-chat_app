import mongoose from 'mongoose'

const mongoConnect =async ()=>{
    try{
        const dbConnect =await  mongoose.connect(process.env.MONGO_URL)
    // console.log(mongoURL)
    console.log(`mongodb connected at ${dbConnect.connection.host}`)
    }catch(error){
        console.log('mongodb connection error',error)
    }
}

export default mongoConnect;