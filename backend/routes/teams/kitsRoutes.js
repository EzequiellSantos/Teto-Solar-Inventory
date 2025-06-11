const express = require('express');
const router = express.Router();
const Kits = require('../../models/teams/kits');

// Listar todos os kits
router.get('/', async (req, res) => {
    try {
        const kits = await Kits.find();
        res.status(200).json({ error: null, data: kits });
    } catch (error) {
        res.status(400).json({ error: "Erro ao buscar kits" });
        console.log(error);
    }
});

// Buscar kit por ID
router.get('/:id', async (req, res) => {
    try {
        const kit = await Kits.findById(req.params.id);
        if (kit) {
            res.status(200).json({ error: null, data: kit });
        } else {
            res.status(404).json({ error: "Kit não encontrado" });
        }
    } catch (error) {
        res.status(400).json({ error: "Erro ao buscar kit" });
        console.log(error);
    }
});

// Atualizar kit por ID
router.put('/:id', async (req, res) => {
    try {
        const kit = await Kits.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ error: null, data: kit });
    } catch (error) {
        res.status(400).json({ error: "Erro ao atualizar kit" });
        console.log(error);
    }
});

// Deletar kit por ID
router.delete('/:id', async (req, res) => {
    try {
        await Kits.findByIdAndDelete(req.params.id);
        res.status(200).json({ error: null, message: "Kit deletado com sucesso" });
    } catch (error) {
        res.status(400).json({ error: "Erro ao deletar kit" });
        console.log(error);
    }
});

// Buscar kits por nome da equipe
router.get('/search/team', async (req, res) => {
    const teamName = req.query.name;
    try {
        const kits = await Kits.find({ teamName: teamName });
        res.status(200).json({ error: null, data: kits });
    } catch (error) {
        res.status(400).json({ error: "Erro ao buscar kits por equipe" });
        console.log(error);
    }
});

// Criar novo kit
router.post('/', async (req, res) => {
    const kitData = req.body;
    try {
        const kit = new Kits(kitData);
        await kit.save();
        res.status(201).json({ error: null, data: kit });
    } catch (error) {
        res.status(400).json({ error: "Erro ao criar kit" });
        console.log(error);
    }
});

module.exports = router;
