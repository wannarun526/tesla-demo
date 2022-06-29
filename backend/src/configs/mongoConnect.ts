import mongoose from 'mongoose'
import { UserModel } from '../schemas/user'

const initMongo = () => {
    const connect = () => {
        mongoose.connect(
            process.env.MONGO_URI!,
            {
                keepAlive: true,
            },
            async (err: mongoose.CallbackError) => {
                let dbStatus = ''
                if (err) {
                    dbStatus = `*    Error connecting to DB: ${err}\n****************************\n`
                } else {
                    dbStatus = `*    DB Connection: OK\n****************************\n`

                    const users = await UserModel.find({ 'role.admin': true })
                    if (users.length === 0) {
                        await new UserModel({
                            _id: "62bc612aa37f2676eac83429",
                            custId: 'A123456789',
                            password: 'admin',
                            name: 'Admin',
                            cellphone: '0912345678',
                            email: 'admin@funweb.com',
                            gender: 'male',
                            birthdate: '2000-01-01T00:00:00.000+00:00',
                            role: {
                                admin: true,
                                user: false,
                                partner: false,
                            },
                            avatar: null,
                        }).save()
                    }
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

export default initMongo
