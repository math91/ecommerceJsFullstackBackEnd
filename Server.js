import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import UserRoutes from './src/routes/User.Routes.js'

dotenv.config()
const { PORT } = process.env

const application = express()
application.use(express.json())
application.use(morgan('common'))

const isOrderPaidFor = (request, response, next) => {
    console.log('Payment verified')
    next()
}

application.get('/hej', isOrderPaidFor, (request, response) => {
    response.send('hej matilda')
})

UserRoutes.routes(application)

const notFound = (request, response, next) => {
    const error = new Error(`Not Found: ${request.originalUrl}`)
    response.status(404)
    next(error)
}

application.use(notFound)

application.listen(PORT, () => {
    console.log(`Servern är igång på port ${PORT}`)
})

mongoose.connect('mongodb://localhost/ehandel', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('successfully'))
    .catch((error) => {
        console.log('error:' + error)
        process.exit()
})