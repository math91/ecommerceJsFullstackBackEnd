import UserController from '../controllers/User.Controller.js'

const routes = application => {
    application.post('/user', UserController.createUser)
}

export default { routes }