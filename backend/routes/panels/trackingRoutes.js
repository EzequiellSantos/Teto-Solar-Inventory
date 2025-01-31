const express =  require('express')
const router = express.Router()
const Tracking = require('../../models/panels/tracking')

router.get('/all', async(req, res) => {

    try {
        
        const trackings = await Tracking.find({})
        res.status(200).json({error: null, trackings: trackings})

    } catch (error) {

        res.status(401).json({error: "Erro ao coletar os registros"})
        console.log(error)
        
    }

})

//coletando pesquisa
router.get('/search', async(req, res) => {

    let type = ""
    let trackings = ""

    const search = req.query.search
    type = req.query.type

    try {

        if(type == "null"){

            trackings = await Tracking.find({$text: { $search: search}})
            
            if(trackings.length != 0){

                return res.status(200).json({error: null, trackings: trackings})

            } else {

                return res.status(200).json({error: "Erro de busca por registros :/"})

            }

        } else {

            trackings = await Tracking.find({$text: { $search: search}, type: type})
            
            if(trackings.length != 0){

                return res.status(200).json({error: null, trackings: trackings})

            } else {

                return res.status(200).json({error: "Erro de busca por registros"})

            }

        }

    } catch (error) {

        res.status(401).json({error: `Erro ao coletar os registros de ${search}`})
        console.log(error)
        
    }

})

//coletando apenas os movimentos de entrada
router.get('/input', async(req, res) => {

    try {
        
        const inputTraking = await Tracking.find({ type: "Entrada"})
        res.status(200).json({ error: null, msg: "Movimentos de entradas coletados!", trackings: inputTraking})

    } catch (error) {
        
        res.status(400).json({ error: "Falha na coleta de movimentos" })
        console.log(error)

    }

})

//coletando apenas os movimentos de saida
router.get('/output', async(req, res) => {

    try{

        const outputTracking = await Tracking.find({type: "Saida"})
        res.status(200).json({ error: null, msg:"Movimentos de saídas coletados!", trackings: outputTracking })

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

    const { batchId, invoice, brand, power, client, panelsCount, inputDate, inputChecked } = req.body

    const type =  "Entrada"
    

    try {

        const tracking = new Tracking({batchId, invoice, brand, power, client, panelsCount, inputDate, inputChecked, type})
        await tracking.save()
        res.status(200).json({ error: null, msg:"Entrada de placas registrado", data: tracking })

    } catch (error) {
        
        res.status(400).json({ error: "Erro ao enviar o registro" })
        console.log(error)

    }

})

router.post('/registerOut', async(req, res) => {

    const {batchId, invoice, brand, power, client, panelsCount, inputDate, inputChecked, outputDate, outputChecked, type} = req.body

    try {
        
        const trackingOut = new Tracking({batchId, invoice, brand, power, client, panelsCount, inputDate, inputChecked, outputDate, outputChecked, type})

        await trackingOut.save()

        res.status(200).json({error: null, msg: "Registro de saída adicionado!", tracking: trackingOut})

    } catch (error) {
        
        res.status(401).json({error: "Falha ao fazer registro"})
        console.log(error)

    }

})

router.post('/output', async(req, res) => {

    const { trackingId, batchId, invoice, brand, power, client, panelsCount, inputDate, inputChecked, outputDate, outputChecked } = req.body

    try{

        const tracking = new Tracking({
            id: trackingId, 
            batchId: batchId, 
            invoice: invoice,
            brand: brand,
            power: power,
            client: client,
            panelsCount: panelsCount,
            inputDate: inputDate,
            inputChecked: inputChecked,
            outputDate: outputDate,
            outputChecked: outputChecked,
            type: "Saida"})

        await tracking.save()

        res.status(200).json({ error: null, msg: "Registro de Saída adicionado", data: tracking })

    } catch(error){

        res.status(401).json({ error: "Erro ao adicionar registro de saída" })
        console.log(error)

    }

})

router.put('/', async(req, res) => {

    const { id, batchId, invoice, brand, power, client, panelsCount, inputDate, inputChecked, outputDate, outputChecked, type } = req.body

    const trackingData = {
        id: id, 
        batchId: batchId, 
        invoice: invoice,
        brand: brand,
        power: power,
        client: client,
        panelsCount: panelsCount,
        inputDate: inputDate,
        inputChecked: inputChecked,
        outputDate: outputDate,
        outputChecked: outputChecked,
        type: type
    }

    try {
        
        const updateTracking = await Tracking.findOneAndUpdate({_id: id}, {$set: trackingData}, {new: true})

        if(updateTracking === null){

            return res.json({ error: "Registro não encontrado"})

        }

        res.status(201).json({error: null, msg:"Registro atualizado com sucesso", data: updateTracking})
        
    } catch (error) {
        
        console.log(error)
        res.status(400).json({error: "Não foi possivel atualizar registro :/"})

    }


})

module.exports = router