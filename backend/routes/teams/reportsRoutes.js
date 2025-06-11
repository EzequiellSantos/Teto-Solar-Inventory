const express = require('express');
const router = express.Router();
const Reports = require('../../models/teams/reports');

// Criar novo report
router.post('/', async (req, res) => {
    try {
        const report = await Reports.create(req.body);
        res.status(201).json({ error: null, data: report });
    } catch (error) {
        res.status(400).json({ error: "Erro ao criar report" });
        console.log(error);
    }
});

// Listar todos os reports
router.get('/', async (req, res) => {
    try {
        const reports = await Reports.find();
        res.status(200).json({ error: null, data: reports });
    } catch (error) {
        res.status(400).json({ error: "Erro ao buscar reports" });
        console.log(error);
    }
});

// Buscar report por ID
router.get('/:id', async (req, res) => {
    try {
        const report = await Reports.findById(req.params.id);
        if (report) {
            res.status(200).json({ error: null, data: report });
        } else {
            res.status(404).json({ error: "Report não encontrado" });
        }
    } catch (error) {
        res.status(400).json({ error: "Erro ao buscar report" });
        console.log(error);
    }
});

// Atualizar report por ID
router.put('/:id', async (req, res) => {
    try {
        const report = await Reports.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ error: null, data: report });
    } catch (error) {
        res.status(400).json({ error: "Erro ao atualizar report" });
        console.log(error);
    }
});

// Deletar report por ID
router.delete('/:id', async (req, res) => {
    try {
        await Reports.findByIdAndDelete(req.params.id);
        res.status(200).json({ error: null, message: "Report deletado com sucesso" });
    } catch (error) {
        res.status(400).json({ error: "Erro ao deletar report" });
        console.log(error);
    }
});

// Buscar reports onde isSeparated é false
router.get('/not-separated/list', async (req, res) => {
    try {
        const reports = await Reports.find({ isSeparated: false });
        res.status(200).json({ error: null, data: reports });
    } catch (error) {
        res.status(400).json({ error: "Erro ao buscar reports não separados" });
        console.log(error);
    }
});

// Buscar reports por intervalo de datas
router.get('/search/date-range', async (req, res) => {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
        return res.status(400).json({ error: "As datas inicial e final são obrigatórias" });
    }

    try {
        const reports = await Reports.find({
            date: { $gte: startDate, $lte: endDate }
        });
        res.status(200).json({ error: null, data: reports });
    } catch (error) {
        res.status(400).json({ error: "Erro ao buscar reports por intervalo de datas" });
        console.log(error);
    }
});

module.exports = router;