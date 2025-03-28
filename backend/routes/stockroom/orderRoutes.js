const express = require('express')
const router = express.Router()
const Order = require('../../models/stockroom/order')

//coletando apenas os pedidos da semana
router.get('/week', async(req, res) => {

    const seg = req.query.seg
    const sex = req.query.sex

    try {
        
        const orders = await Order.find({date: { $gte: seg, $lte: sex }});

        res.status(200).json({error: null, data: orders})

    } catch (error) {
        
        res.status(401).json({error: "Erro ao buscar pedidos da semana"})
        console.log(error)

    }

})

//coletando todos os pedidos
router.get('/all', async(req, res) => {

    try {
        
        const orders = await Order.find()

        res.status(200).json({error: null, data: orders})

    } catch (error) {
        
        res.status(401).json({error:"Erro ao buscar pedidos"})
        console.log(error)

    }

})

// procurar por data/codigo/descrição
router.get('/search', async(req, res) => {

    const search = req.query.search
    
    try {
        
        const histories = await Order.find({$text: { $search: search }})

        if(histories !== null){

            res.status(200).json({error: null, histories: histories})

        } else {

            res.status(200).json({ error: "Pedido não encontrado" })

        }

    } catch (error) {
        
        res.status(401).json({ error: "Erro ao buscar pedidos" })
        console.log(error)

    }

})

//resgattando pedido por id
router.get('/:id', async(req, res) => {

    const id = req.params.id

    try {
        
        const order = await Order.findOne({_id: id})

        res.status(200).json({error: null, order: order})   


    } catch (error) {
        
        res.status(401).json({error: "Erro ao buscar pedido"})
        console.log(error)

    }
});

//cadastrando pedido
router.post('/', async(req, res) => {

    const  {materialsId, date, materials, isArrived, supplier, price} = req.body

    try {

        const order = new Order({materialsId, date, materials, isArrived, supplier, price})

        await order.save()

        res.status(200).json({error: null, msg: "Pedido registrado", data: order})


    } catch(error){

        res.status(400).json({error: "Erro ao registrar pedido"})
        console.log(error)

    }

})

// rota de atualização
router.put('/', async(req, res) => {

    const { id, materialsId, date, materials, isArrived, price, supplier} = req.body 

    try {
        
        const order = {

            _id: id,
            materiaslsId: materialsId,
            date: date,
            materials: materials,
            isArrived: isArrived,
            price: price,
            supplier: supplier

        }

        const updateOrder = await Order.findOneAndUpdate({_id: id}, {$set: order}, {new: true})

        res.status(200).json({error: null, msg:"Pedido atualizado com sucesso", data: updateOrder})
        console.log(order)
        console.log(updateOrder)

    } catch (error) {
        
        res.status(401).json({error: "Não foi possível atualizar pedido"})
        console.log(error)

    }

})

router.put('/updateUniqueOrder', async(req, res) => {

    const id = req.body.id
    const idMaterial = req.body.idMaterial
    const isArrived = req.body.isArrived

    try {

        const updateUniqueMaterial = await Order.findOneAndUpdate({ _id: id, "materials._id": idMaterial }, {$set: { "materials.$.isArrivedSeparate": isArrived }})

        res.status(200).json({error: null, msg: "Material chegou", material: updateUniqueMaterial})
        
    } catch (error) {
        
        res.status(400).json({error: "Erro ao definir material como recebido"})

    }

})

module.exports = router