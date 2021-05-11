import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()
const {
    PORT, 
    DEV_DATABASE_URL, 
    PROD_DATABASE_URL, 
    ENVIRONMENT } = process.env

const connectToPort = async (application) => {
    try {
        await application.listen(PORT, () => {
            console.log(`✅ Servern är igång på port ${PORT}`)
        })
    } catch (error) {
        console.error('⛔ Error occurd while trying to connect to port:' + error)
    }
}

const connectToDatabase = async () => {
    const DATABASE_URL = ENVIRONMENT === 'DEVELOPMENT' ? DEV_DATABASE_URL : PROD_DATABASE_URL
    try {
        await mongoose.connect(DATABASE_URL, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        console.log('✅ Sucessfully connected to database')
    } catch (error) {
        console.error('⛔ Error occurd while trying to connect to database')
        process.exit()
    }
}

export default {
    connectToPort,
    connectToDatabase
}