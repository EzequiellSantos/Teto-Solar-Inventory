const express = require('express')
const router = express.Router()
const Batch = require('../../models/panels/batch')

// retornar lotes que contenha a devida marca e potencia 
router.post('/power', async(req, res) => {

    const power = req.body.power
    const brand = req.body.brand
    
    try{

        const result = await Batch.find({ "brand": brand, "power": power, stateInventory:"Estoque" }).limit(333)

        if(result.length === 0){

            return res.status(201).json({ error:`potência da marca ${brand} não encontrada!` })

        }
        
        res.status(200).json({error: null, msg:`${brand} ${power} encontradas`, batchs: result})

    } catch (error) {

        res.status(401).json({error: "Erro ao coletar as potências"})
        console.log(error)

    }

})

// buscar placas por lote específico
router.post('/panels', async(req, res) => {

    const invoice = req.body.invoice
    const panelSn = req.body.panelSn

    try{

        //retorna apenas o embeded document correspondente aos itens
        const panels = await Batch.find({invoice: invoice, panels: panelSn, stateInventory:"Estoque"}).limit(333)

        //verifica se existe resultado para a query
        if(panels[0]){
            return res.status(200).json({ error: null, msg: "Placa encontrada", data: panels })           
        }

        res.status(200).json({ error: "A placa não corresponde ao lote!" })

    } catch(error){

        res.status(400).json({ error: "Erro ao buscar placa" })
        console.log(error)

    }

})

// coletar brand por meio da nota fiscal
router.post('/invoice', async(req, res) => {

    const invoice = req.body.invoice

    try{

        //retorna apenas o embeded document correspondente aos itens
        const brand = await Batch.find({invoice: invoice})

        //verifica se existe resultado para a query
        if(brand[0]){

            return res.status(200).json({ error: null, msg: "Lote encontrado!", data: brand })
                      
        } else {

            res.status(200).json({ error: "Dados de Lote não encontrado!" })

        }


    } catch(error){

        res.status(400).json({ error: "Erro ao buscar placa" })
        console.log(error)

    }

})

//resgatando os lotes no estoque
router.get('/', async (req, res) => {

    try{

        const batchs = await Batch.find({stateInventory: "Estoque"}).limit(333)
        res.json({error: null, batchs: batchs})

    } catch (error){

        res.status(400).json({ error: "Erro ao coletar marcas diferentes" })

    }

})

// resgatando todas as marcas de todos os clientes
router.get('/all', async (req, res) => {

    try{

        const batchs = await Batch.find({})
        res.json({error: null, batchs: batchs})

    } catch (error){

        res.status(400).json({ error: "Erro ao coletar marcas diferentes" })

    }

})

//rota de query por marca
router.get('/:brand', async (req, res) => {

    const brand =  req.params.brand
    
    try {
        
        const batchData = await Batch.find({brand: brand, stateInventory:"Estoque"}).limit(333)
        res.status(201).json({ error: null, msg: "Marca encontrada", brand: batchData })

    } catch (error) {
       
        res.status(401).json({ error: "Falaha ao buscar marca" })
        console.log(error);
        
    }

})

// Pesquisa de cliente
router.post('/search', async(req, res) => {

    const search = req.body.search

    try {
        
        const batch = await Batch.find({$text: {$search: search}}).limit(333)
        res.status(200).json({error: null, batch: batch})

    } catch (error) {
        
        console.log(error)
        res.status(401).json({error: "Pesquisa não encontrada"})
        
    }

})

// buscar batch por meio do objectId
router.post('/id', async(req, res) => {

    const  id = req.body.id

    try {
        
        const batch = await Batch.findOne({_id: id})

        res.status(201).json({ error: null, msg: "Lote encontrado", batch: batch })

    } catch (error) {
        
        res.status(401).json({ error: "Não foi possível encontrar o lote" })
        
        console.log(error)

    }

})

//enviando dados
router.post('/', async (req, res) => {

    const { brand, invoice, client, power, panels, panelsCount, stateInventory } = req.body

    try{

        const data = {
            brand: brand,
            invoice: invoice,
            client: client,
            power: power,
            panels: panels,
            panelsCount: panelsCount,
            stateInventory: stateInventory
        }
       
        // caso não exista, cria uma nova marca
        const batch = new Batch({ brand: brand, invoice: invoice, client: client, panels: panels, power: power, panelsCount: panelsCount, stateInventory: stateInventory })

        await batch.save()

        res.status(201).json({error: null, msg:"Lote Registrado", data: data, id: batch._id})

    } catch(error){

        res.status(400).json({ error: "Erro ao salvar dados"})
        console.log(error);
        
    }

})

// atualização de lotes (marca, cliente, potencia, nota fiscal)
router.put('/', async(req, res) => {

    const batchId = req.body.id
    const brand = req.body.brand
    const invoice = req.body.invoice
    const client = req.body.client
    const power = req.body.power
    const panels = req.body.panels
    const panelsCount = req.body.panelsCount
    const stateInventory = req.body.stateInventory

    const batchData = {
        id: batchId,
        brand: brand,
        invoice: invoice,
        client: client,
        power: power,
        panels: panels,
        panelsCount: panelsCount,
        stateInventory: stateInventory
    }

    try {

        const updatebatch =  await Batch.findOneAndUpdate({_id: batchId,}, { $set: batchData },{ new: true })

        if(updatebatch === null){

           return res.json({ error: "Lote não encontrado"})

        }

        res.status(201).json({error: null, msg:"Saida de placas registradas", data: batchData})
        
    } catch (error) {
        
        res.status(400).json({ error: "Erro ao atualizar item" })
        console.log(error);
        
    }

})

router.put("/hidden", async (req, res) => {

    const id = req.body.id
    const panelsCount = req.body.panelsCount

    try {
        
        const batch = await Batch.findOneAndUpdate({_id: id}, {stateInventory: "Cliente", panelsCount: panelsCount}, {new: true})

        res.status(200).json({msg: "Lote enviado para cliente", data: batch});

    } catch (error) {
     
        res.status(400).json({error: "Erro ao atualizar lote completo"})
        console.log(error)
        
    }

})

router.delete('/', async (req, res) => {

    const id = req.body.id

    try {

        await Batch.deleteOne({_id: id})
        res.status(201).json({ error: null, msg: "Lote apagado com sucesso"})
        
    } catch (error) {
        
        res.status(400).json({ error: "Erro ao deletar lote" })
        console.log(error);  

    }

})

module.exports = router