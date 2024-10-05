const express = require("express")
const router = express.Router()
const Material = require("../../models/stockroom/material")

//prucurar por todos os itens
router.get("/all", async(req, res) => {

    try {
        
        const materials = Material.find({})

        res.status(200).json({error: null, data: materials})

    } catch (error) {
        
        res.status(401).json({error: "Erro ao procurar os materiais"})

        console.log(error)

    }

})

// retornar por itens pesquisados (CODIGO, DESCRIPTION)
router.get('/search', async(req, res) => {


    try {
        
        let query = req.query.query

        const material = await Material.find({$text: {$search: `${query}` }})

        if(material.length == 0){

            res.json({error: "Produto não encontrado"})

        } else{

            res.status(200).json({error: null, material: material})

        }

    } catch (error) {
        
        res.status(400).json({error: "Produto não encontrado :/"})
        console.log(error)

    }


})

//procurar por itens ativados
router.get('/actived', async(req, res) => {

    try {
        
        const materialsActived = Material.find({isActive: true})

        res.status(200).json({error: null, materials: materialsActived})

    } catch (error) {
        
        res.status(401).json({error: "Não foi possível coletar os materiais ativos"})
        console.log(error)

    }


})

//procurar por materiais desativados
router.get('/desactived', async(req, res) => {

    try {
        
        const materialsDesactived = Material.find({isActive: false})

        res.status(200).json({error: null, materials: materialsDesactived})

    } catch (error) {
        
        res.status(401).json({error: "Não foi possível coletar os materiais desativados"})
        console.log(error)

    }


})

//procurar por localização
router.get('/location/:location', async(req, res) => {

    const location = req.params.location

    try {
        
        const materials = await Material.find({location: location})

        res.status(200).json({error: null, materials: materials})

    } catch (error) {
        
        res.status(400).json({error: "Erro ao buscar localização"})

        console.log(error)

    }

})

// procurar por estate quantity, (critico, medio, bom, pedido)
router.get('/stateQuantity/:type', async(req, res) => {

    const type = req.params.type

    try {
        
        const materials = Material.find({stateQuantity: type})

        res.status(200).json({error: null, materials: materials})

    } catch (error) {
        
        res.status(401).json({error: `Não foi possível coletar os nateriais do tipo ${type}`})

    }


})


// registrando material
router.post('/', async(req, res) => {

    const {code, description, quantity, minQuantity, uniMed, location, stateQuantity, isActive} = req.body

    try {
        
        const material = new Material({code, description, quantity, minQuantity, uniMed, location, stateQuantity, isActive})

        await material.save()

        res.status(201).json({msg: "Material Registrado!", data: material})



    } catch (error) {
        
        res.status(400).json({error:"Erro ao registrar material :/"})
        console.log(error)

    }

})

// atualizando
router.put('/', async(req, res) => {

    const {materialId, code, description, quantity, minQuantity, uniMed, location, stateQuantity, isActive} = req.body

    try {
        
        const material = {
            id: materialId,
            code: code, 
            description: description, 
            quantity: quantity, 
            minQuantity: minQuantity, 
            uniMed: uniMed, 
            location: location, 
            stateQuantity: stateQuantity, 
            isActive: isActive
        }

        const upateMaterial = await Material.findOneAndUpdate({_id: materialId}, {$set: material}, {new: true})

        res.status(200).json({msg: "Material atualizado com sucesso", upateMaterial: upateMaterial})
        

    } catch (error) {
        
        res.status(400).json({error: "Erro ao atualizar material"})

        console.log(error)

    }

})

module.exports = router
