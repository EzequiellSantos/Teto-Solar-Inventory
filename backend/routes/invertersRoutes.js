const express = require('express')
const router = express.Router()
const Inverter = require('../models/inversores')

router.get('/all', async (req, res) => {
    
    try {
        
        const inverters = await Inverter.find({})
        res.json({ error: null, inverters: inverters })

    } catch (error) {
     
        res.status(400).json({ error: "Erro ao buscar inversores" });
        
    }

})

router.post('/', async (req, res) => {

    const { sn, description, type } = req.body

    try {
        const inverter = new Inverter({sn, description, type})
        await inverter.save()
        res.status(201).json({error: null, msg:'Inversor Registrado!'})
    } catch (error) {
        
        res.status(400).json({ error: "Erro ao cadastrar" });

    }

})

router.delete("/", async (req, res) => {

    const inverterId = req.body.id

    try {

        await Inverter.deleteOne({_id: inverterId})

        res.json({ error: null, msg: "Inversor deletado com sucesso" })

    } catch (error) {
        console.log(error);
        res.status(400).json({ error: 'Erro ao deletar :(' })
    }

})

router.put("/", async (req, res) => {
    const sn = req.body.sn
    const description = req.body.description
    const type =  req.body.type
    const inverterId = req.body._id

    const inverter = {
        id: inverterId,
        sn: sn,
        description: description,
        type: type
    }

    try {
        
        const updateInverter = await Inverter.findOneAndUpdate({_id: inverterId}, { $set: inverter }, { new: true })
        
        res.json({ error: null, msg: 'Inversor atualizado com sucesso', data: updateInverter } )

    } catch (error) {

        console.log(error)
        res.status(400).json({ error: "Error ao atualizar" })

    }
})

module.exports = router;