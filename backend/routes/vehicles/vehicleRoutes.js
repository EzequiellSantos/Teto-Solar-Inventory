const express = require('express');
const router = express.Router();
const Vehicle = require('../../models/vehicles/vehicle');

// Criar novo veículo
router.post('/', async (req, res) => {

    const vehicleData = {
        description: req.body.description,
        plate: req.body.plate,
        team: req.body.team
    };

    try {
        const vehicle = new Vehicle(vehicleData);
        await vehicle.save();
        res.status(201).json({ error: null, data: vehicle });
    } catch (error) {
        res.status(400).json({ error: "Erro ao criar veículo" });
        console.log(error);
    }
});

// Listar todos os veículos
router.get('/', async (req, res) => {
    try {
        const vehicles = await Vehicle.find();
        res.status(200).json({ error: null, data: vehicles });
    } catch (error) {
        res.status(400).json({ error: "Erro ao buscar veículos" });
        console.log(error);
    }
});

// Buscar veículo por ID
router.get('/:id', async (req, res) => {
    try {
        const vehicle = await Vehicle.findById({_id: req.params.id});
        if (vehicle) {
            res.status(200).json({ error: null, data: vehicle });
        } else {
            res.status(404).json({ error: "Veículo não encontrado" });
        }
    } catch (error) {
        res.status(400).json({ error: "Erro ao buscar veículo" });
        console.log(error);
    }
});

// Atualizar veículo por ID
router.put('/:id', async (req, res) => {
    try {
        const vehicle = await Vehicle.findOneAndUpdate({_id:req.params.id}, {$set: req.body}, { new: true });
        res.status(200).json({ error: null, data: vehicle });
    } catch (error) {
        res.status(400).json({ error: "Erro ao atualizar veículo" });
        console.log(error);
    }
});

// Deletar veículo por ID
router.delete('/:id', async (req, res) => {
    try {
        await Vehicle.findByIdAndDelete(req.params.id);
        res.status(200).json({ error: null, message: "Veículo deletado com sucesso" });
    } catch (error) {
        res.status(400).json({ error: "Erro ao deletar veículo" });
        console.log(error);
    }
});

module.exports = router;