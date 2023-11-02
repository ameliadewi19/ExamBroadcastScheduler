const request = require('supertest');
const sequelize = require('../../config/Database.js');
const jadwalRoute = require('../../routes/JadwalRoute.js');
const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

dotenv.config();

app.use(bodyParser.json());
app.use(jadwalRoute);

beforeAll(async () => {
    // Synchronize model-model Sequelize dengan database tes
    await sequelize.sync(); 
});

afterAll(async () => {
    // Tutup koneksi ke database tes
    await sequelize.close();
});

describe('GET /jadwal-ujian', () => {
    it('should respond with a 200 status code', async () => { 
        const res = await request(app).get('/jadwal-ujian');

        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    })
})

describe('GET /jadwal-ujian/:id', () => {
    it('should return a jadwal ujian', async () => { 
        const res = await request(app).get('/jadwal-ujian/1');

        expect(res.statusCode).toBe(200);
        expect(res.body.nama_matakuliah).toBe("Basis Data");
    })
})

describe('GET not existed /jadwal-ujian/:id', () => {
    it('should return jadwal ujian not found', async () => { 
        const res = await request(app).get('/jadwal-ujian/1005');

        expect(res.statusCode).toBe(404);
        expect(res.body.error).toBe("Data ujian tidak ditemukan.");
    })
})


describe('PATCH /jadwal-ujian/:id', () => {
    it('should update a jadwal ujian', async () => {
        const res = await request(app)
            .patch('/jadwal-ujian/1')
            .send({
                waktu_mulai: "08:00",
                waktu_selesai: "10:00"
            });
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Ujian berhasil diperbarui.");
    })
})

describe('POST /jadwal-ujian', () => {
  it('should create Jadwal Ujian records from Excel', async () => {
    const res = await request(app)
      .post('/jadwal-ujian')
      .attach('excelFile', path.resolve(__dirname, '../excel_test/excel-template.xlsx')); // Ganti dengan path ke file Excel tes Anda

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('Jadwal Ujian records created from Excel.');
  });

  it('should handle the case of no Excel file uploaded', async () => {
    const res = await request(app)
      .post('/jadwal-ujian');

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('No Excel file uploaded.');
  });
});

describe('DELETE /jadwal-ujian/:id', () => {
    it('should delete a jadwal ujian', async () => {
        const res = await request(app)
            .delete('/jadwal-ujian/3');

        expect(res.statusCode).toBe(204);
    })
})