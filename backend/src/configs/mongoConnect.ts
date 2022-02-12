​import mongoose from "mongoose";

const initMongo = () => {
    const connect = () => {
        mongoose.connect(
            process.env.MONGO_URI!,
            {
                keepAlive: true,
            },
            (err: any) => {
                let dbStatus = ''
                if (err) {
                    dbStatus = `*    Error connecting to DB: ${err}\n****************************\n`
                }else{
                    dbStatus = `*    DB Connection: OK\n****************************\n`
                }
                // Prints initialization
                console.log('****************************')
                console.log('*    Starting Server')
                console.log(`*    Port: ${process.env.PORT || 3000}`)
                console.log(`*    EnvPath: ${process.env.ENV}`)
                console.log(`*    Database: MongoDB`)
                console.log(dbStatus)
            }
        )
    }
    connect()
    mongoose.connection.on('error', console.log)
    mongoose.connection.on('disconnected', connect)
}

export default initMongo;
