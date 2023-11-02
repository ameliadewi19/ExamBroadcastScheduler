const request = require('supertest');
const sequelize = require('../../config/Database.js');
const dosenRoute = require('../../routes/DosenRoute.js');
const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const { faker } = require('@faker-js/faker');
const path = require('path');

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(dosenRoute);

beforeAll(async () => {
    // Synchronize model-model Sequelize dengan database tes
    await sequelize.sync(); 
});

afterAll(async () => {
    // Tutup koneksi ke database tes
    await sequelize.close();
});

describe('GET /dosen', () => {
    it('should return all dosen', async () => { 
        const res = await request(app).get('/dosen');

        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    })
})

describe('GET /dosen/:id', () => {
    it('should return a dosen', async () => { 
        const res = await request(app).get('/dosen/2');

        expect(res.statusCode).toBe(200);
        expect(res.body.nama).toBe("Dosen Test 2");
    })
})

describe('GET not existed /dosen/:id', () => {
    it('should return dosen not found', async () => { 
        const res = await request(app).get('/dosen/1005');

        expect(res.statusCode).toBe(404);
        expect(res.body.msg).toBe("Dosen Not Found");
    })
})

describe('POST /dosen', () => {
    it('should create Dosen records from Excel', async () => {
      const res = await request(app)
        .post('/dosen')
        .attach('excelFile', path.resolve(__dirname, '../excel_test/templateDosen.xlsx')); // Ganti dengan path ke file Excel tes Anda
  
      expect(res.statusCode).toBe(201);
      expect(res.body.message).toBe('Dosen records created from Excel.');
    });
  
    it('should handle the case of no Excel file uploaded', async () => {
      const res = await request(app)
        .post('/dosen');
  
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe('No Excel file uploaded.');
    });
  });

// describe('POST /dosen', () => {
//     it('should create a new dosen', async () => {
//         const res = await request(app)
//             .post('/dosen')
//             .send({
//                 nip: faker.number.int({ min: 1000000000, max: 9999999999 }),
//                 nidn: faker.number.int({ min: 100000000, max: 999999999 }),
//                 nama: faker.person.fullName(),
//                 no_whatsapp: "+6289657102858",
//                 kode_dosen: "KO"+faker.number.int({min: 100, max: 999})+"N"
//             })

//         expect(res.statusCode).toBe(201);
//         expect(res.body).toHaveProperty("id_dosen");
//     })
    
// })

describe('PATCH /dosen/:id', () => {
    it('should update a dosen', async () => {
        const res = await request(app)
            .patch('/dosen/3')
            .send({
                nama: faker.person.fullName(),
            })
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Dosen berhasil diperbarui.");
    })
    
})

describe('DELETE /dosen/:id', () => {
    it('should delete a dosen', async () => {
        const res = await request(app)
            .delete('/dosen/7')

        expect(res.statusCode).toBe(204);
    })
})