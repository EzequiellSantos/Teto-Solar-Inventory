const express = require('express')
const router = express.Router()
const Order = require('../../models/stockroom/order')


router.get('/day', async(req, res) => {

    const date = req.query.date

    try {
        const orders = await Order.find({date: date});
        console.log(orders.length)

        res.status(200).json({error: null, data: orders})

    } catch (error) {
        
        res.status(401).json({error: "Erro ao buscar pedidos do dia"})
        console.log(error)

    }

})

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

// Rota para retornar os pedidos de um fornecedor específico
router.get('/supplier', async (req, res) => {

    const supplierName = req.query.supplier;

    try {
        
       const orders = await Order.find({supplier: { $regex: `^${supplierName}$`, $options: 'i' }});

        if (orders.length > 0) {
            res.status(200).json({ error: null, data: orders });
        } else {
            res.status(404).json({ error: "Nenhum pedido encontrado para este fornecedor" });
        }

    } catch (error) {
        
        res.status(500).json({ error: "Erro ao buscar pedidos do fornecedor" });
        console.log(error);

    }

})

// procurar por nome ou codigo do material
router.get('/productName', async(req, res) => {

    const search = req.query.productName
    
    try {
        
        const orders = await Order.find({$text: { $search: search }}).sort({ _id: 1 });

        if(orders !== null){

            res.status(200).json({error: null, data: orders})

        } else {

            res.status(200).json({ error: "Pedido não encontrado" })

        }

    } catch (error) {
        
        res.status(401).json({ error: "Erro ao buscar pedidos" })
        console.log(error)

    }

})

// Rota para somar todos os preços de um mês específico
router.get('/prices/sum/month', async (req, res) => {
    const { year, month } = req.query;

    if (!year || !month) {
        return res.status(400).json({ error: "Ano e mês são obrigatórios" });
    }

    const startDate = `${year}-${String(month).padStart(2, '0')}-01`; // Primeiro dia do mês
    const endDate = `${year}-${String(Number(month) + 1).padStart(2, '0')}-01`; // Primeiro dia do próximo mês

    try {
        const result = await Order.aggregate([
            {
                $match: {
                    $expr: {
                        $and: [
                            { $gte: [{ $dateFromString: { dateString: "$date" } }, { $dateFromString: { dateString: startDate } }] },
                            { $lt: [{ $dateFromString: { dateString: "$date" } }, { $dateFromString: { dateString: endDate } }] }
                        ]
                    }
                }
            },
            { $group: { _id: null, totalPrice: { $sum: "$price" } } } // Soma os preços
        ]);

        const totalPrice = result.length > 0 ? result[0].totalPrice : 0;

        res.status(200).json({ error: null, totalPrice });
    } catch (error) {
        res.status(500).json({ error: "Erro ao calcular a soma dos preços" });
        console.log(error);
    }
});

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

router.delete('/:id', async(req, res) => {

    const id = req.params.id

    try {

        await Order.findOneAndDelete({_id: id})
        res.status(200).json({error: null, msg: "Pedido excluído com sucesso"})

    } catch (error) {

        res.status(400).json({error: "Erro ao excluir pedido"})
        console.log(error)

    }

})

module.exports = router