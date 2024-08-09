const express = require("express")
const router =  express.Router()
const bycrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const User = require("../models/user")
const secret = process.env.JWT_SECRET

router.post("/register", async (req, res) => {

    //area feita apenas por backend

    const username = req.body.user
    const password = req.body.password
    const permission = req.body.permission


    const salt = await bycrypt.genSalt(12)
    const passwordhash = await bycrypt.hash(password, salt)

    const user = new User({
        user: username,
        password: passwordhash,
        permission: permission
    })

    try {
        
        const newUser = await user.save()

        //criando token
        const token = jwt.sign(

            //payload
            {
                user: newUser.user,
                id: newUser._id
            },
            secret

        )

        res.json({ error: null, msg: "Eai DEV, você realizou o cadastro com sucesso!", token: token, userId: newUser._id})

    } catch (error) {
        
        res.status(400).json({ error })

    }

})

router.post("/login", async (req, res) => {

    const user = req.body.user
    const password = req.body.password

    const userIsPresent = await User.findOne({ user: user })

    if(!userIsPresent){
        return res.status(400).json({
            error: "Não há usuário cadastro com este nome!"
        })
    }

    //  verificar se a senha está correta
    const checkPassword = await bycrypt.compare(password, userIsPresent.password)

    if (!checkPassword){
        return res.status(400).json({
            error: "Senha Inválida!"
        })
    }

    // criar token
    const token = jwt.sign(

        //payload
        {
            user: userIsPresent.user,
            id: userIsPresent._id,
        },
        secret

    )

    res.json({
        error: null, msg:"Você está autenticado!", token: token, userId: userIsPresent._id
    })

})

module.exports = router