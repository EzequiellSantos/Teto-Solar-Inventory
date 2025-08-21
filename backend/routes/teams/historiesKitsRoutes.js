const express = require('express');
const router = express.Router();
const HistoriesKit = require('../../models/teams/historiesKit');

// Criar novo histórico
router.post('/', async (req, res) => {

    const historyData = req.body;

    try {
        const history = new HistoriesKit({
            teamName: historyData.teamName,
            clientName: historyData.clientName,
            clientCity: historyData.clientCity,
            date: historyData.date,
            materials: historyData.materials,
            isCompleted: historyData.isCompleted
        });
        await history.save();
        res.status(201).json({ error: null, data: history });
    } catch (error) {
        res.status(400).json({ error: "Erro ao criar histórico" });
        console.log(error);
    }
});

// Listar todos os históricos
router.get('/', async (req, res) => {
    try {
        const histories = await HistoriesKit.find();
        res.status(200).json({ error: null, histories: histories });
    } catch (error) {
        res.status(400).json({ error: "Erro ao buscar históricos" });
        console.log(error);
    }
});

router.get('/notCompleted', async (req, res) => {
    try {
        const histories = await HistoriesKit.find({isCompleted: false}).sort({description: 1});
        res.status(200).json({ error: null, histories: histories });
    } catch (error) {
        res.status(400).json({ error: "Erro ao buscar históricos" });
        console.log(error);
    }
});

// Buscar histórico por ID
router.get('/:id', async (req, res) => {
    try {
        const history = await HistoriesKit.findById(req.params.id);
        if (history) {
            res.status(200).json({ error: null, data: history });
        } else {
            res.status(404).json({ error: "Histórico não encontrado" });
        }
    } catch (error) {
        res.status(400).json({ error: "Erro ao buscar histórico" });
        console.log(error);
    }
});

// Atualizar histórico por ID
router.put('/:id', async (req, res) => {

    try {
        const history = await HistoriesKit.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true });
        res.status(200).json({ error: null, data: history });
    } catch (error) {
        res.status(400).json({ error: "Erro ao atualizar histórico" });
        console.log(error);
    }
});

// Deletar histórico por ID
router.delete('/:id', async (req, res) => {
    try {
        await HistoriesKit.findOneAndDelete({ _id: req.params.id });
        res.status(200).json({ error: null, message: "Histórico deletado com sucesso" });
    } catch (error) {
        res.status(400).json({ error: "Erro ao deletar histórico" });
        console.log(error);
    }
});

// Buscar por nome do cliente
router.get('/search/client', async (req, res) => {
    const clientName = req.query.name;
    try {
        const histories = await HistoriesKit.find({ clientName: { $regex: clientName, $options: 'i' } });
        res.status(200).json({ error: null, data: histories });
    } catch (error) {
        res.status(400).json({ error: "Erro ao buscar por cliente" });
        console.log(error);
    }
});

// Buscar por data
router.get('/search/date', async (req, res) => {
    const date = req.query.date;
    try {
        const histories = await HistoriesKit.find({ date: date });
        res.status(200).json({ error: null, data: histories });
    } catch (error) {
        res.status(400).json({ error: "Erro ao buscar por data" });
        console.log(error);
    }
});

// Buscar por código do produto
router.get('/search/code', async (req, res) => {
    const code = req.query.code;
    try {
        const histories = await HistoriesKit.find({ "materials.code": code });
        res.status(200).json({ error: null, data: histories });
    } catch (error) {
        res.status(400).json({ error: "Erro ao buscar por código do produto" });
        console.log(error);
    }
});

// Relatório: ranking de frequência de um produto por equipe
router.get('/report/ranking', async (req, res) => {
    const code = req.query.code;
    try {
        const result = await HistoriesKit.aggregate([
            { $match: { "materials.code": code } },
            { $unwind: "$materials" },
            { $match: { "materials.code": code } },
            { $group: { _id: "$teamName", freq: { $sum: 1 } } },
            { $sort: { freq: -1 } }
        ]);
        res.status(200).json({ error: null, ranking: result });
    } catch (error) {
        res.status(400).json({ error: "Erro ao gerar ranking" });
        console.log(error);
    }
});

module.exports = router;