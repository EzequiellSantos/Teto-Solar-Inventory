const express = require('express')
const router = express.Router()
const History = require('../../models/stockroom/history')

// coletando tos os históricos
router.get('/all', async(req, res) => {

    try{

        const histories = await History.find()

        res.status(200).json({error: null, histories: histories})

    } catch(error){

        res.status(400).json({error: "Erro ao coletar histórico"})
        console.log(error)

    }

})

//coletando por tipo (saida, compra, devolução)
router.get('/type', async(req, res) => {

    const type = req.query.choice

    try {
        
        const history = await History.find({type: type})

        res.status(200).json({error: null, histories: history})

    } catch (error) {
        
        res.status(401).json({error: "Erro ao buscar por tipos"})
        console.log(error)

    }

})

//coletando por setor
router.get('/sector', async(req, res) => {

    const sector = req.query.choice

    try {
        
        const history = await History.find({sector: sector})

        res.status(200).json({error: null, histories: history})

    } catch (error) {
        
        res.status(401).json({error: "Não foi possível coletar histórico"})
        console.log(error)

    }

})

//coletando historico especifico de um setor
router.get('/searchSeparate', async(req, res) => {

    const sector = req.query.param1
    const search = req.query.param2

    try {
        
        //coleta o setor escolhido e pesquisa os produtos que ele levou
        const historySpecifc = await History.find({sector: sector, $text: {$search: search}})

        // verifica se o produto foi encontrado
        if(historySpecifc.length != 0){

            res.status(200).json({error: null, msg:"encontrado", history: historySpecifc })

        } else{

            res.status(200).json({error:"Este setor não utilizou o produto especificado"})

        }


    } catch (error) {
        
        res.status(401).json({error: "Histórico não encontrado :/"})
        console.log(error)

    }

})

router.post('/', async(req, res) => {

    const { code, description, quant, date, sector, type } = req.body

    try {
        
        const history = new History({code, description, quant, date, sector, type})
        await history.save()

        res.status(200).json({error: null, msg: "Histórico adicionado", data: history})


    } catch (error) {
     
        res.status(401).json({error: "Erro ao registrar Histórico"})
        console.log(error)
        
    }

})

router.put('/', async(req, res) => {

    const { id, code, description, quant, date, sector, type} = req.body

    try {
        
        const history = {
            _id: id,
            code: code,
            description: description,
            quant: quant,
            date: date,
            sector: sector,
            type: type
        }

        const historyUpdate = await History.findOneAndUpdate({_id: id}, {$set: history}, {new: true})


        res.status(200).json({error: null, msg:"Histórico atualizado com sucesso", data: historyUpdate})

    } catch (error) {
        
        res.status(401).json({error: "Erro ao Atualizar histórico"})
        console.log(error)

    }

})

module.exports = router