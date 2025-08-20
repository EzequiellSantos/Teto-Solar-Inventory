const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
    code: {
        type: String
    },
    description: {
        type: String
    },
    quantity: {
        type: Number
    }
});

const historiesKits = new mongoose.Schema({
    teamName: {
        type: String,
        required: true
    },
    clientName: {
        type: String,
    },
    clientCity: {
        type: String
    },
    date: {
        type: String
    },
    materials: {
        type: [materialSchema]
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
});

/* listar client, com os inputs preenchidos, logo, regula a quantidade usada de cada cliente, e marca como concluido. Ao marcar como concluido, vai no kit da equipe e retira os materiais utilizados. (permitir mudança de equipe na dashboar de registros dos kits dos clientes.) */

module.exports = mongoose.model("HistoriesKits", historiesKits);