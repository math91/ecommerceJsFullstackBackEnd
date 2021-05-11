import UserController from '../controllers/User.Controller.js'

const routes = application => {
    application.post('/user', UserController.createUser)
    application.get('/user', UserController.getAllUsers)
    application.get('/user/:userId', UserController.getUserById)
    application.delete('/user/:userId', UserController.deleteUserById)
    application.put('/user/:userId', UserController.updateUser)
}

export default { routes }