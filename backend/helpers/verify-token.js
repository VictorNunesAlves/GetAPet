const { JsonWebTokenError } = require("jsonwebtoken")
const getToken = require("./get-token")
const jwt = require('jsonwebtoken')

const checkToken = async (req, res, next) => {
    if(!req.headers.authorization){
        return res.status(422).json({message: "Acesso negado"})
    }

    const token = await getToken(req)

    if(!token){
        return res.status(422).json({message: "Acesso negado"})
    }
    else{
        try {
            const verified = jwt.verify(token, 'asiefn8704g0374g7qb4g')
            console.log('verified: ', verified)
            req.user = verified
            next()
        } catch (error) {
            res.status(400).json({message: 'Token inválido'})
        }
    }
}

module.exports = checkToken