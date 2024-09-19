const express =  require('express')
const router = express.Router()
const Tracking = require('../../models/panels/tracking')

//coletando apenas os movimentos de entrada
router.get('/input', async(req, res) => {

    try {
        
        const inputTraking = await Tracking.find({ type: "Entrada"})
        res.status(200).json({ error: null, msg: "Movimentos de entradas coletados!", data: inputTraking})

    } catch (error) {
        
        res.status(400).json({ error: "Fala na coleta de movimentos" })
        console.log(error)

    }

})

//coletando apenas os movimentos de saida
router.get('/output', async(req, res) => {

    try{

        const outputTracking = await Tracking.find({type: "Saida"})
        res.status(200).json({ error: null, msg:"Movimentos de saídas coletados!", data: outputTracking })

    } catch(error){

        res.status(401).json({error: "Falha na coleta de movimentos"})
        console.log(error)

    }

})

//resgatar a tracking pelo id do batch
router.get('/:id', async(req, res) => {

    const id = req.params.id

    try {

        const tracking = await Tracking.findOne({batchId: id})

        res.status(201).json({error: null, msg:"Registro encontrado", tracking: tracking})

    } catch (error) {

        res.status(401).json({ error: "Erro ao buscar registro" })
        console.log(error)

    }

})

//enviando movimento de entrada
router.post('/', async(req, res) => {

    const { batchId, invoice, panelsCount, inputDate, inputChecked } = req.body

    const outputDate = ""
    const outputChecked =""
    const type =  "Entrada"
    

    try {

        const tracking = new Tracking({batchId, invoice, panelsCount, inputDate, inputChecked, outputDate, outputChecked, type})
        await tracking.save()
        res.status(200).json({ error: null, msg:"Entrada de placas registrado", data: tracking })

    } catch (error) {
        
        res.status(400).json({ error: "Erro ao enviar o registro" })
        console.log(error)

    }

})

router.put('/output', async(req, res) => {

    const { trackingId, batchId, invoice, panelsCount, inputDate, inputChecked, outputDate, outputChecked } = req.body

    const tracking = {
        id: trackingId,
        batchId: batchId,
        invoice: invoice,
        panelsCount: panelsCount,
        inputDate: inputDate,
        inputChecked: inputChecked,
        outputDate: outputDate,
        outputChecked: outputChecked,
        type: "Saida"
    }

    try{

        const updateTracking = await Tracking.findOneAndUpdate({_id: trackingId}, { $set: tracking }, { new: true })
        res.status(200).json({ error: null, msg: "Registro de Saída adicionado", data: updateTracking })

    } catch(error){

        res.status(401).json({ error: "Erro ao adicionar registro de saída" })
        console.log(error)

    }

})

module.exports = router