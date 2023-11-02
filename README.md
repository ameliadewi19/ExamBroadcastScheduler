# Exam Broadcast Scheduler

## Backend
### Install Dependensi
```
cd backend
npm install
```
### Buat Database dan Atur Koneksi
Buat database dengan nama "exam_bm_scheduler_dev".
Ubah file backend/config/config.js pada baris password dengan password yang sesuai.
### Jalankan Migrasi dan Seeder
```
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

## Frontend
```
cd frontend
npm install
```

## Login 
Username: admin <br/>
Password: admin123

## Autentikasi WBM
Coba fitur confirmation dan kirimkan pesannya (pastikan data dosen dan jadwal sudah terisi dengan benar, id_dosen dan id_pengawas di data dosen harus tersedia di tabel dosen). <br/>
Buka console backend dan scan barcode yang muncul dengan aplikasi whatsapp. Jika proses kirim di awal gagal, coba kirim ulang.
