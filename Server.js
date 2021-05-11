import express from 'express'
import morgan from 'morgan'
import UserRoutes from './src/routes/User.Routes.js'
import Configurations from './src/configurations/Configurations.js'
import Middlewares from './src/middlewares/Middlewares.js'
import helmet from 'helmet'

const application = express()
application.use(express.json())
application.use(morgan('common'))
application.use(helmet())

UserRoutes.routes(application)

application.use(Middlewares.notFound)

Configurations.connectToPort(application)
Configurations.connectToDatabase()