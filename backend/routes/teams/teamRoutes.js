const express = require('express');
const router = express.Router();
const Team = require('../../models/teams/team');

// Listar todas as equipes
router.get('/', async (req, res) => {
    try {
        const teams = await Team.find();
        res.status(200).json({ error: null, data: teams });
    } catch (error) {
        res.status(400).json({ error: "Erro ao buscar equipes" });
        console.log(error);
    }
});

// Buscar equipe por ID
router.get('/:id', async (req, res) => {
    try {
        const team = await Team.findById(req.params.id);
        if (team) {
            res.status(200).json({ error: null, data: team });
        } else {
            res.status(404).json({ error: "Equipe não encontrada" });
        }
    } catch (error) {
        res.status(400).json({ error: "Erro ao buscar equipe" });
        console.log(error);
    }
});

// Atualizar equipe por ID
router.put('/:id', async (req, res) => {
    try {
        const team = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ error: null, data: team });
    } catch (error) {
        res.status(400).json({ error: "Erro ao atualizar equipe" });
        console.log(error);
    }
});

// Criar nova equipe
router.post('/', async (req, res) => {

    const { name } = req.body;

    try {
        const team =  new Team({
            name: name
        });
        await team.save();
        res.status(201).json({ error: null, data: team });
    } catch (error) {
        res.status(400).json({ error: "Erro ao criar equipe" });
        console.log(error);
    }
});

// Deletar equipe por ID
router.delete('/:id', async (req, res) => {
    try {
        await Team.findByIdAndDelete(req.params.id);
        res.status(200).json({ error: null, message: "Equipe deletada com sucesso" });
    } catch (error) {
        res.status(400).json({ error: "Erro ao deletar equipe" });
        console.log(error);
    }
});

module.exports = router;