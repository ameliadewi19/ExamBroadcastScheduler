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
