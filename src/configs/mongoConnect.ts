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
                }
                dbStatus = `*    DB Connection: OK\n****************************\n`
                if (process.env.NODE_ENV !== 'test') {
                // Prints initialization
                console.log('****************************')
                console.log('*    Starting Server')
                console.log(`*    Port: ${process.env.PORT || 3000}`)
                console.log(`*    NODE_ENV: ${process.env.NODE_ENV}`)
                console.log(`*    Database: MongoDB`)
                console.log(dbStatus)
                }
            }
        )
    }
    connect()
    mongoose.connection.on('error', console.log)
    mongoose.connection.on('disconnected', connect)
}

export default initMongo;
