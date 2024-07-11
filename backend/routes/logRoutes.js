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

//buscando registros por consulta
router.get('/search', async (req, res) => {

    try {
        
        const query = req.query.query
        const log = await Logs.find({$text: {$search: `${query}`}})

        if(log.length == 0){

            res.json({error:"Este registro não existe :/"})

        } else{

            res.status(200).json({error: null, log: log})

        }

    } catch (error) {
        
        console.log(error)
        res.status(400).json({error: "Erro na busca do registro"})

    }

})

router.get('/:id', async (req, res) => {

    try {
        
        const logId = req.params.id //params
        const log = await Logs.findOne({_id: logId})

        if(log === null){

            res.json({error: "Este registro nao existe :)"})

        } else{

            res.json({error: null, log: log})

        }

    } catch (error) {

        console.log(error)
        res.status(400).json({error: "Erro ao buscar registros " })

    }

})


// enviando registros
router.post('/', async (req, res) => {

    const { sn, movements, client, logDate, obs } = req.body

    try {

        const log = new Logs({sn, movements, client, logDate, obs})
        await log.save()
        res.status(201).json({error: null, msg:'Registro adicionado!', data: log})

    } catch (error) {
        
        res.status(400).json({error: "Erro ao adicionar registro"})
        console.log(error)

    }

})

//atualizando log
router.put("/", async (req, res) => {

    const logId = req.body.id
    const sn = req.body.sn
    const movements = req.body.movements
    const client = req.body.client
    const logDate = req.body.logDate   
    const obs = req.body.obs 

    const log = {
        id: logId,
        sn: sn,
        movements: movements,
        client: client,
        logDate: logDate,
        obs: obs
    }

    try{

        const updateLog = await Logs.findOneAndUpdate({ _id: logId, sn: sn}, {$set: log}, { new: true })
        res.status(201).json({ error: null, msg: "Registro atualizado com sucesso", data: updateLog })

    }catch(error){

        res.status(400).json({ error: "Erro ao atualizar" })
        console.log(error)

    }

})

//deletando log
router.delete("/", async (req, res) => {

    const logId = req.body.id

    try {
        
        await Logs.deleteOne({_id: logId})

        res.status(201).json({ error: null, msg: "Registro deletado com Sucesso" })

    } catch (error) {

        res.status(400).json({ error: error })
        console.log(error, " Erro Interno ^^^^^^")
        
    }

})

module.exports = router;