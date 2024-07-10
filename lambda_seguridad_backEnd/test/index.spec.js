// import Server from '../server/server.js'
import {userController} from '../controllers/index'
import request from 'supertest'

// const server = new Server();

describe('POST /login', () => {

    test('debe retornar http 200 OK', async() => {
        // const urlAuth ='http://localhost:8080/auth'
        // const response = await request(server).get('/auth').send()
        const response = await request(userController.getUsers).get('/user').send()
        // console.log(response);
        return true;
    })
    
})