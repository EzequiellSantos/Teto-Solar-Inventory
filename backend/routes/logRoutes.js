const express = require("express")
const router = express.Router()
const Logs = require('../models/logs')

// pegando todos os registros
router.get("/all", async (req, res) => {

    try {
        
        const logs = await Logs.find({})
        res.json({ error: null, logs: logs })

    } catch (error) {

        res.status(400).json({ msg: "Error ao procurar registros" });

    }

})

// enviando registros
router.post('/', async (req, res) => {

    const { inverter, movements, client, logDate, obs } = req.body

    try {

        const log = new Logs({inverter, movements, client, logDate, obs})
        await log.save()
        res.status(201).json({error: null, msg:'Registro adicionado!'})

    } catch (error) {
        
        res.status(400).json({error: "Erro ao adicionar registro"})
        console.log(error)

    }

})

module.exports = router;