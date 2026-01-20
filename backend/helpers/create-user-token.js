const jwt = require('jsonwebtoken')

const createUserToken = async(user, req, res) => {
    const token = jwt.sign({
        name: user.name,
        id: user._id
    }, "asiefn8704g0374g7qb4g")

    res.status(200).json({message: "Autenticado com sucesso",
        id: user._id,
        token: token
    })
}

module.exports = createUserToken