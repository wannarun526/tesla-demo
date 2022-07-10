;(async () => {
    const { MongoClient } = require('mongodb')
    const uri = 'mongodb://localhost:27017'
    const client = await new MongoClient(uri, {
        useUnifiedTopology: true,
    }).connect()
    const db = client.db('teslaRent')
    const users = db.collection('users')

    await users.updateMany(
        {},
        {
            $set: {
                approved: false,
            },
        }
    )

    await client.close()
})()
