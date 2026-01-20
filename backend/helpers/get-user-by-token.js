const jwt = require('jsonwebtoken')

const User = require('../models/User')

const getUserByToken = async (token) =>{

    if(!token){
        return res.status(401).json({message: "Acesso Negado!"})
    }

    const decod = jwt.verify(token, 'asiefn8704g0374g7qb4g')
    const id = decod.id
    const user = User.findById(id)

    if(!user){
        return res.status(422).json({message: 'Usuário não encontrado'})
    }

    return user
}

module.exports = getUserByToken