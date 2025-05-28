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

// Rota para gerar relatórios com base nos históricos
router.get('/reports', async (req, res) => {
    const { year, month, search } = req.query;

    if (!year || !month) {
        return res.status(400).json({ error: "Ano e mês são obrigatórios" });
    }

    const startDate = `${year}-${String(month).padStart(2, '0')}-01`; // Primeiro dia do mês
    const endDate = `${year}-${String(Number(month) + 1).padStart(2, '0')}-01`; // Primeiro dia do próximo mês

    try {
        // 1. Top 5 materiais com maior quantidade no tipo "Saida"
        const topMaterialsByQuantity = await History.aggregate([
            { $match: { date: { $gte: startDate, $lt: endDate }, type: "Saida", $text: {$search:search} } },
            { $group: { _id: "$description", totalQuantity: { $sum: "$quant" } } },
            { $sort: { totalQuantity: 1 } },
            { $limit: 5 },
            { $project: { _id: 0, description: "$_id", totalQuantity: 1 } }
        ]);

        // 2. Top 5 materiais com mais registros no tipo "Compra"
        const topMaterialsByPurchase = await History.aggregate([
            { $match: { date: { $gte: startDate, $lt: endDate }, type: "Compra" } },
            { $group: { _id: "$description", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 5 },
            { $project: { _id: 0, description: "$_id", count: 1 } }
        ]);

        // 3. Top 3 equipes com mais registros no tipo "Saida"
        const topTeamsByExits = await History.aggregate([
            { $match: { date: { $gte: startDate, $lt: endDate }, type: "Saida" } },
            { $group: { _id: "$sector", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 3 },
            { $project: { _id: 0, sector: "$_id", count: 1 } }
        ]);

        res.status(200).json({
            error: null,
            report: {
                topMaterialsByQuantity,
                topMaterialsByPurchase,
                topTeamsByExits
            }
        });
    } catch (error) {
        res.status(500).json({ error: "Erro ao gerar relatório" });
        console.log(error);
    }
})

// Rota para somar todas as saídas de um produto específico em um mês
router.get('/product/exit/month/sum', async (req, res) => {
    const { code, year, month } = req.query;

    if (!code || !year || !month) {
        return res.status(400).json({ error: "Código, ano e mês são obrigatórios" });
    }

    const startDate = `${year}-${String(month).padStart(2, '0')}-01`; // Primeiro dia do mês
    const endDate = `${year}-${String(Number(month) + 1).padStart(2, '0')}-01`; // Primeiro dia do próximo mês

    try {
        const result = await History.aggregate([
            { 
                $match: { 
                    code: code, 
                    type: "Saida", 
                    date: { $gte: startDate, $lt: endDate } 
                } 
            }, // Filtra pelo código, tipo "Saida" e intervalo de datas
            { 
                $group: { 
                    _id: null, 
                    totalQuantity: { $sum: "$quant" } 
                } 
            } // Soma os valores de "quant"
        ]);

        const totalQuantity = result[0].totalQuantity;

        res.status(200).json({ error: null, totalQuantity: totalQuantity });
    } catch (error) {
        res.status(500).json({ error: "Erro ao calcular a soma das saídas do produto" });
        console.log(error);
    }
});

// Rota para somar todas as saídas de um produto específico em um intervalo de datas
router.get('/product/exit/date-range/sum', async (req, res) => {
    const { code, startDate, endDate } = req.query;

    if (!code || !startDate || !endDate) {
        return res.status(400).json({ error: "Código, data inicial e data final são obrigatórios" });
    }

    try {
        const result = await History.aggregate([
            {
                $match: {
                    code: code,
                    type: "Saida",
                    $expr: {
                        $and: [
                            { $gte: [{ $dateFromString: { dateString: "$date" } }, { $dateFromString: { dateString: startDate } }] },
                            { $lte: [{ $dateFromString: { dateString: "$date" } }, { $dateFromString: { dateString: endDate } }] }
                        ]
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    totalQuantity: { $sum: "$quant" }
                }
            }
        ]);

        const totalQuantity = result.length > 0 ? result[0].totalQuantity : 0;

        res.status(200).json({ error: null, totalQuantity });
    } catch (error) {
        res.status(500).json({ error: "Erro ao calcular a soma das saídas do produto no intervalo de datas" });
        console.log(error);
    }
});

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

//coletando historico especifico de um type
router.get('/searchSeparate/type', async(req, res) => {

    const type = req.query.param1
    const search = req.query.param2

    try {
        
        //coleta o setor escolhido e pesquisa os produtos que ele levou
        const historySpecifc = await History.find({type: type, $text: {$search: search}})

        // verifica se o produto foi encontrado
        if(historySpecifc.length != 0){

            res.status(200).json({error: null, msg:"encontrado", history: historySpecifc })

        } else{

            res.status(200).json({error:"Este type não utilizou o produto especificado"})

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
