const jwt = require("jsonwebtoken")

const User = require("../models/user")
const secret = process.env.JWT_SECRET

// resgatando o usuário pelo jwt token
const getUserByToken = async (token) => {
    
    if(!token) {

        return res.status(401).json({ error: "Acesso Negado" })

    }

    // encontrando usuário
    const decoded = jwt.verify(token, secret)

    const userId = decoded.userId
    
    const user = await User.findOne({ _id: userId})

    return user

}

module.exports = getUserByToken