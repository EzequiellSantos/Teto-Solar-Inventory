const express = require("express")
const router = express.Router()
const Material = require("../../models/stockroom/material")

//prucurar por todos os itens
router.get("/all", async(req, res) => {

    try {
        
        const materials = await Material.find()

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

        const materials = await Material.find({$text: {$search: `${query}` }}).limit(5)

        if(materials === null){

            res.json({error: "Produto não encontrado"})

        } else{

            res.status(200).json({error: null, materials: materials})

        }

    } catch (error) {
  
        res.status(400).json({error: "Produto não encontrado :/"})
        console.log(error)

    }


})

//procurar por itens ativados
router.get('/actived', async(req, res) => {

    try {
    
        const materialsActived = await Material.find({isActive: true})

        res.status(200).json({error: null, materials: materialsActived})

    } catch (error) {
     
        res.status(401).json({error: "Não foi possível coletar os materiais ativos"})
        console.log(error)

    }


})

//procurar por materiais desativados
router.get('/desactived', async(req, res) => {

    try {
 
        const materialsDesactived = await Material.find({isActive: false})

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
        
        const materials = await Material.find({stateQuantity: type})

        res.status(200).json({error: null, materials: materials})

    } catch (error) {
        
        res.status(401).json({error: `Não foi possível coletar os nateriais do tipo ${type}`})

    }

})

//resgatando material por ID 
router.get('/:id', async(req, res) => {

    const id = req.params.id
    
    try {
        
        const material = await Material.findOne({_id: id})

        if(material === null){

            return res.json({error: "Produto não encontrado"})

        } else {

            res.status(200).json({error: null, material: material})   

        }

    } catch (error) {
        
        res.status(401).json({error: "Erro ao buscar produto"})
        console.log(error)

    }

})

// registrando material
router.post('/', async(req, res) => {

    const {type, description, quantity, minQuantity, uniMed, location, isActive} = req.body

    try {

        const stateQuantity = `${calculatorState(quantity, minQuantity)}`

        if(!["UC", "MP", "IM"].includes(type)){
            return res.json({error: "Tipo não identificado"})
        }

        const code = await generateNewCode(type)
        const material = new Material({type, code, description, quantity, minQuantity, uniMed, location, stateQuantity, isActive})

        await material.save()

        res.status(201).json({msg: "Material Registrado!", data: material})

    } catch (error) {
        
        res.status(400).json({error:"Erro ao registrar material :/"})
        console.log(error)

    }

})

const generateNewCode = async (type) => {

    const lastProduct = await Material.findOne({type}).sort({code: -1})
    const lastCode = lastProduct ? lastProduct.code : `${type}0000`
    const newCodeNumber = parseInt(lastCode.slice(2)) + 1
    return `${type}${String(newCodeNumber).padStart(4, '0')}`

}

// atualizando
router.put('/', async(req, res) => {

    const {id, type, code, description, quantity, minQuantity, uniMed, location, stateQuantity, isActive} = req.body

    try {
        
        const material = {

            id: id,
            type: type,
            code: code, 
            description: description, 
            quantity: quantity, 
            minQuantity: minQuantity, 
            uniMed: uniMed, 
            location: location, 
            stateQuantity: calculatorState(quantity, minQuantity, stateQuantity), 
            isActive: isActive

        }

        const updateMaterial = await Material.findOneAndUpdate({_id: id}, {$set: material}, {new: true})

        res.status(200).json({msg: "Material atualizado com sucesso", updateMaterial: updateMaterial})

    } catch (error) {
        
        res.status(400).json({error: "Erro ao atualizar material"})

        console.log(error)

    }

})

router.post('/inserting', async(req, res) => {

    const documents = req.body.documents

    try {
        
            for(const doc in documents){

                const material = new Material({type: documents[doc].type, code: documents[doc].code, description: documents[doc].description, quantity: documents[doc].quantity, minQuantity: documents[doc].minQuantity, uniMed: documents[doc].uniMed, location: documents[doc].location, stateQuantity: documents[doc].stateQuantity, isActive: documents[doc].isActive})

                await material.save()

                console.log(`Documento inserido: ${material}`)

            }

            console.log("Todos os documentos foram inseridos")
            res.status(200).json({msg:"Todos os documentos foram inseridos" })

    } catch (error) {
        
        console.log('erro ao inserir documentos', error)

    }

})

function calculatorState(quant, minQuant, state){

    let percent = quant / minQuant * 100

    if(state === 'Pedido') {

        return 'Pedido'

    }else if(minQuant === 0 && quant === 0){

        return null

    }
     else if(percent > 150){

        return "Alto"

    } else if(percent >= 100 && percent <= 150){

        return "Mediano"

    } else if(percent < 100){

        return "Critico"

    }

}

module.exports = router
