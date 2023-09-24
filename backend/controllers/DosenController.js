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
        console.log("Request Body:", req.body);
        await Dosen.create(req.body);
        res.status(201).json({ msg: "Dosen Created" });
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ error: error.message });
    }
}

const updateDosen= async(req, res) =>{
    try {
        await Dosen.update(req.body,{
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Dosen Updated"});
    } catch (error) {
        console.log(error.message);
    }
}

const deleteDosen = async(req, res) =>{
    try {
        await Dosen.destroy({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Dosen Deleted"});
    } catch (error) {
        console.log(error.message);
    }
}

module.exports={
    getDosen, 
    getDosenById,
    createDosen,
    updateDosen,
    deleteDosen
}