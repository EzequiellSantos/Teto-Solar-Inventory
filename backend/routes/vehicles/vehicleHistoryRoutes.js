const express = require('express');
const router = express.Router();
const HistoryVehicle = require('../../models/vehicles/history');

// Criar novo histórico
router.post('/', async (req, res) => {

    const HistoryVehicleData = {
        drive: req.body.drive,
        exitDate: req.body.exitDate,
        entryDate: req.body.entryDate,
        kmInitial: req.body.kmInitial,
        kmFinal: req.body.kmFinal,
        vehicleId: req.body.vehicleId
    }

    try {
        const history = new HistoryVehicle(HistoryVehicleData);
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
        const histories = await HistoryVehicle.find();
        res.status(200).json({ error: null, data: histories });
    } catch (error) {
        res.status(400).json({ error: "Erro ao buscar históricos" });
        console.log(error);
    }
});

// Buscar histórico por ID
router.get('/:id', async (req, res) => {
    try {
        const history = await HistoryVehicle.find({vehicleId: req.params.id});
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
        const history = await HistoryVehicle.findOneAndUpdate({_id: req.params.id},{$set: req.body},{ new: true });
        res.status(200).json({ error: null, data: history });
    } catch (error) {
        res.status(400).json({ error: "Erro ao atualizar histórico" });
        console.log(error);
    }
});

// Deletar histórico por ID
router.delete('/:id', async (req, res) => {
    try {
        await HistoryVehicle.findOneAndDelete({_id: req.params.id});
        res.status(200).json({ error: null, message: "Histórico deletado com sucesso" });
    } catch (error) {
        res.status(400).json({ error: "Erro ao deletar histórico" });
        console.log(error);
    }
});

// Buscar históricos por ID de veículo e mês/ano específico
router.get('/search/by-vehicle-and-month', async (req, res) => {
    const { vehicleId, month, year } = req.query;

    if (!vehicleId || !month || !year) {
        return res.status(400).json({ error: "vehicleId, month e year são obrigatórios" });
    }

    try {
        // Garantir que month e year sejam números inteiros válidos
        const parsedMonth = parseInt(month); // 1 a 12
        const parsedYear = parseInt(year);

        if (isNaN(parsedMonth) || isNaN(parsedYear) || parsedMonth < 1 || parsedMonth > 12) {
            return res.status(400).json({ error: "month e year devem ser números válidos entre 1 e 12" });
        }

        // Definir intervalo de datas para o mês e ano informados
        const startDate = new Date(parsedYear, parsedMonth - 1, 1); // ex: 2025-06-01
        const endDate = new Date(parsedYear, parsedMonth, 0, 23, 59, 59, 999); // ex: 2025-06-30 23:59:59.999

        const histories = await HistoryVehicle.find({
            vehicleId: vehicleId,
            exitDate: { $gte: startDate, $lte: endDate }
        });

        res.status(200).json({ error: null, data: histories });
    } catch (error) {
        res.status(400).json({ error: "Erro ao buscar históricos por veículo e mês" });
        console.log(error);
    }
});

module.exports = router;