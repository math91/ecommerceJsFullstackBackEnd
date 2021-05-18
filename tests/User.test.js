import Chai from 'chai'
import ChaiHTTP from 'chai-http'
import { describe, it as test } from 'mocha'
import application from '../Server.js'

Chai.should()
Chai.use(ChaiHTTP)
 
const randomString = Math.random().toString(36).substring(7)

const testingNonExistingRoute = () => {
        test('Expecting 404 NOT_FOUND', (done) => {
            Chai.request(application)
                .get(`/${randomString}`)
                .end((request, response) => {
                    response.should.have.a.status(404)
                    done()
                }) 
        })
}

const getAllUsers = () => {
    test('Fetch all users from database', done => {
        Chai.request(application)
            .get('/user')
            .end((request, response) => {
                response.should.have.status(200)
                response.body.should.be.a('array')
                response.body.length.should.be.eq(response.body.length)
                done()
            })
    })
}

const createUser = () => {

    const mockData = {
        username: randomString,
        password: randomString
    }

    test('Create Post method for user entity', done => {
        Chai.request(application)
            .post('/user')
            .send(mockData)
            .end((request, response) => {
                response.should.have.a.status(201)
                response.body.should.be.a('object')
                response.body.should.have.property('username').eq(mockData.username)
                response.body.should.have.property('password').eq(mockData.password)
                done()
            })
    })
}

describe('TESTING THE USER API ROUTE', () => {
    testingNonExistingRoute()
    getAllUsers()
    createUser()
})