const express = require('express')
const router = express.Router()
const Inverter = require('../models/inversores')

router.post('/enviar', async (req, res) => {

    const { sn, description, type } = req.body

    try {
        const inverter = new Inverter({sn, description, type})
        await inverter.save()
        res.status(201).send('Inversor Registrado!')
    } catch (error) {
        
        res.status(400).send(err.message);

    }

})

module.exports = router;