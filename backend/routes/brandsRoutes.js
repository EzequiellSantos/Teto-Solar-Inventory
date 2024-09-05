const express = require('express')
const router = express.Router()
const Brand = require('../models/brands')

// adicionar rota para buscar placas por lote específico
router.get('/panels', async(req, res) => {

    const invoice = req.body.invoice
    const panelSn = req.body.panelSn

    try{

    //retorna apenas o embeded documento correspondente aos itens
    const panels = await Brand.find(
        {
            "batchs.batch.invoice": invoice,
            "batchs.batch.panels": panelSn 
        }, 
        {
            "batchs": {
                $elemMatch:{
                    "batch.invoice": invoice, 
                    "batch.panels": panelSn
                }
            }
        })

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

//rota de query por marca
router.get('/unique', async (req, res) => {

    const brandSearch =  req.body.brandSearch
    
    try {
        
        const brand = await Brand.findOne({brand: brandSearch}) 
        res.status(201).json({ error: null, msg: "Marca encontrada", data: brand })

    } catch (error) {
       
        res.status(401).json({ error: "Falaha ao buscar marca" })
        console.log(error);
        
    }

})

// resgatando todas as marcas
router.get('/all', async (req, res) => {

    try{

        const brands = await Brand.find({})
        res.json({error: null, brands: brands})

    } catch (error){

        res.status(400).json({ error: "Erro ao coletar marcas diferentes" })

    }

})

router.post('/', async (req, res) => {

    const { brand, batchs } = req.body

    try{

        const checkBrandExists = await Brand.findOne({brand: brand})

        // verifica se já existeum lote da mesma marca e adiciona o lote
        if(checkBrandExists){

            const data = {
                brand: brand,
                batchs: batchs
            }

            const addInBrand = await Brand.findOneAndUpdate({brand: brand}, {$push: { batchs: data.batchs }})
            return res.status(201).json({error: null, msg:"Lote Adicionado", data: addInBrand})
             
        }

        // caso não exista, cria uma nova marca
        const brands = new Brand({ brand, batchs })
        await brands.save()
        res.status(201).json({error: null, msg:"Lote Registrado", data: brands})

    } catch(error){

        res.status(400).json({ error: "Erro ao salvar dados"})
        console.log(error);
        
    }

})

// atualização de lotes (marca, cliente, potencia, nota fiscal)
router.put('/', async(req, res) => {

    const batchId = req.body.id
    const invoice = req.body.invoice
    const client = req.body.client
    const power = req.body.power
    const panels = req.body.panels

    const batchData = {
        id: batchId,
        invoice: invoice,
        client: client,
        power: power,
        panels: panels
    }

    try {

        const updatebatch =  await Brand.findOneAndUpdate({'batchs.batch._id': batchId,}, { $set: {"batchs.$.batch": batchData} })
/* 

    @ adicionar verificações de id, para saber se o mesmo existe

    @ adicionar verificação se a marca foi alterada para fazer assim a migração
      do lote para outra marca presente ou criar uma nova

*/
        if(updatebatch === null){

           return res.json({ error: "Lote não encontrado"})

        }

        res.status(201).json({error: null, msg:"Lote atualizado com sucesso", data: batchData})
        
    } catch (error) {
        
        res.status(400).json({ error: "Erro ao atualizar item" })
        console.log(error);
        
    }

})

router.delete('/', async (req, res) => {

    const id = req.body.id

    try {

        await Brand.updateOne({"batchs.batch._id": id}, {$pull: {"batchs": {"batch._id": id}}})
        res.status(201).json({ error: null, msg: "Lote apagado com sucesso"})
        
    } catch (error) {
        
        res.status(400).json({ error: "Erro ao deletar lote" })
        console.log(error);  

    }

})

module.exports = router