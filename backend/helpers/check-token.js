const jwt = require("jsonwebtoken")


//middleware para validar token
const secret = process.env.JWT_SECRET
const checkToken = (req, res, next) => {

    const token =  req.header("auth-token")

    if(!token){

        return  res.status(401).json({ error: "Acessor Negado"})

    }

    try {
        
        const verified = jwt.verify(token, secret)
        req.user = verified
        next()

    } catch (error) {

        res.status(400).json({ error: "Token Inválido!" })

    }

}

module.exports = checkToken