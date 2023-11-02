const request = require('supertest');
const sequelize = require('../../config/Database.js');
const loginRoute = require('../../routes/LoginRoute.js');
const express = require('express');
const dotenv = require('dotenv');
const app = express(); // Create an instance of your Express app
const bodyParser = require('body-parser');

dotenv.config();

app.use(bodyParser.json());
app.use(loginRoute);

beforeAll(async () => {
    // Synchronize model-model Sequelize dengan database tes
    await sequelize.sync(); 
});

afterAll(async () => {
    // Tutup koneksi ke database tes
    await sequelize.close();
});

describe('POST /login', () => {
    it('should respond with a 200 status code', async () => { 
        const req = request(app) // Simpan request ke dalam variabel req
            .post('/login')
            .send({
                username : "username",
                password : "password"
            });

        console.log("ini request test", req._data); // Cetak isi request sebelum mengirim

        const response = await req; // Kirim request dan terima respons

        console.log("ini response test", response.body);
        expect(response.statusCode).toBe(200);
    })
})
