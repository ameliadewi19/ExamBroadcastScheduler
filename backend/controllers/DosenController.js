const Dosen = require("../models/DosenModel.js");
const express = require('express');
const app = express();

app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true }));

const getDosen = async(req, res) =>{
    try {
        const response = await Dosen.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

const getDosenById = async(req, res) =>{
    try {
        const response = await Dosen.findOne({
            where:{
                id_dosen: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

const createDosen = async (req, res) => {
    try {
        // Dapatkan data dosen dari body request
        const { nip, nidn, nama,no_whatsapp} = req.body;
        // Buat objek Dosen baru
        const newDosen = await Dosen.create({
            nip,
            nidn,
            nama,
            no_whatsapp
        });

        // Kirim respon sukses
        res.status(201).json(newDosen);
    } catch (error) {
        // Tangani kesalahan jika ada
        console.error(error.message);
        res.status(500).json({ error: "Gagal membuat dosen baru" });
    }
};

// const createDosen = async (req, res) => {
//     try {
//         console.log("Request Body:", req.body);
//         await Dosen.create(req.body);
//         res.status(201).json({ msg: "Dosen Created" });
//     } catch (error) {
//         console.error(error.message);
//         res.status(400).json({ error: error.message });
//     }
// }

// const updateDosen= async(req, res) =>{
//     try {
//         await Dosen.update(req.body,{
//             where:{
//                 id_dosen: req.params.id
//             }
//         });
//         res.status(200).json({msg: "Dosen Updated"});
//     } catch (error) {
//         console.log(error.message);
//     }
// }

async function updateDosen(req, res) {
    const dosenId = req.params.id;
    try {
        const updatedDosen = await Dosen.update(req.body, {
            where: { id_dosen: dosenId },
        });
        if (updatedDosen[0] === 1) {
            res.status(200).json({ message: 'Dosen berhasil diperbarui.' });
        } else {
            res.status(404).json({ error: 'Dosen tidak ditemukan.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Gagal memperbarui Dosen.' });
    }
}

const deleteDosen = async (req, res) => {
    try {
        const dosenId = req.params.id;

        // Cari dan perbarui semua entri JadwalUjian yang terkait dengan Dosen
        await JadwalUjian.update(
            { id_dosen: null }, // Setel id_dosen menjadi null
            { where: { id_dosen: dosenId } }
        );

        // Setelah entri JadwalUjian diperbarui, Anda dapat menghapus Dosen
        await Dosen.destroy({
            where: {
                id_dosen: dosenId
            }
        });

        res.status(200).json({ msg: "Dosen Deleted" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


module.exports={
    getDosen, 
    getDosenById,
    createDosen,
    updateDosen,
    deleteDosen
}