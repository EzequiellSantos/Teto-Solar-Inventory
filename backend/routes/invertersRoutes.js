const express = require('express')
const router = express.Router()
const Inverter = require('../models/inversores')

//buscando todos os inverters
router.get('/all', async (req, res) => {
    
    try {
        
        const inverters = await Inverter.find({})
        res.json({ error: null, inverters: inverters })

    } catch (error) {
     
        res.status(400).json({ error: "Erro ao buscar inversores" });
        
    }

})

//buscando inversores por consulta
router.get("/search", async (req, res) => {

    try {
        
        let search = req.body.search

        const inverter = await Inverter.find({$text: {$search:`${search}`}})

        if(inverter.length == 0){

            res.json({error: "inversor não encontrado :/"})

        } else{

            res.status(200).json({error: null, inverter: inverter})

        }

    } catch (error) {
        
        res.status(400).json({error: "Inversor não encontrado"})

    }

})

router.get("/:id", async (req, res) => {

    try {
        
        const id = req.params.id
        const inverter = await Inverter.findOne({_id: id})

        if(inverter === null){

            res.json({error: "Este inversor não existe"})

        } else{

            res.json({error: null, inverter: inverter})

        }

    } catch (error) {
        console.log(error)
        res.status(400).json({error: "Este inversor não existe" })
    }

})

// enviando inverter
router.post('/', async (req, res) => {

    const { invoice, sn, description, type } = req.body

    try {
        const inverter = new Inverter({ invoice, sn, description, type})
        await inverter.save()
        res.status(201).json({error: null, msg:'Inversor Registrado!'})
    } catch (error) {
        
        res.status(400).json({ error: "Erro ao cadastrar" });
        console.log(error)

    }

})

//deletando inverter
router.delete("/", async (req, res) => {

    const inverterId = req.body.id

    try {

        await Inverter.deleteOne({_id: inverterId})

        res.status(201).json({ error: null, msg: "Inversor deletado com sucesso" })

    } catch (error) {
        console.log(error);
        res.status(400).json({ error: 'Erro ao deletar :(' })
    }

})

// atualizando inverter
router.put("/", async (req, res) => {
    const invoice = req.body.invoice
    const sn = req.body.sn
    const description = req.body.description
    const type =  req.body.type
    const inverterId = req.body._id

    const inverter = {
        id: inverterId,
        invoice: invoice,
        sn: sn,
        description: description,
        type: type
    }

    try {
        
        const updateInverter = await Inverter.findOneAndUpdate({_id: inverterId}, { $set: inverter }, { new: true })
        
        res.status(201).json({ error: null, msg: 'Inversor atualizado com sucesso', data: updateInverter } )

    } catch (error) {

        console.log(error)
        res.status(400).json({ error: "Error ao atualizar" })

    }
})

module.exports = router;