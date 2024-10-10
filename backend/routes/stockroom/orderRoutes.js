const express = require('express')
const router = express.Router()
const Order = require('../../models/stockroom/order')

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

        if(histories.length != 0){

            res.status(200).json({error: null, histories: histories})

        } else {

            res.status(200).json({ error: "Pedido não encontrado" })

        }

    } catch (error) {
        
        res.status(401).json({ error: "Erro ao buscar pedidos" })
        console.log(error)

    }

})

//cadastrando pedido
router.post('/', async(req, res) => {

    const  {materialsId, date, materials, isArrived} = req.body

    try {

        const order = new Order({materialsId, date, materials, isArrived})

        await order.save()

        res.status(200).json({error: null, msg: "Pedido registrado", data: order})


    } catch(error){

        res.status(400).json({error: "Erro ao registrar pedido"})
        console.log(error)

    }

})

// rota de atualização
router.put('/', async(req, res) => {

    const { id, materialsId, date, materials, isArrived} = req.body 

    try {
        
        const order = {

            _id: id,
            materiaslsId: materialsId,
            date: date,
            materials: materials,
            isArrived: isArrived

        }

        const updateOrder = await Order.findByIdAndUpdate({_id: id}, {$set: order}, {new: true})

        res.status(200).json({error: null, msg:"Pedido atualizado com sucesso", data: updateOrder})

    } catch (error) {
        
        res.status(401).json({error: "Não foi possível atualizar pedido"})
        console.log(error)

    }

})

module.exports = router