const User = require ('../models/User')
const bcrypt = require ('bcrypt')

module.exports = class UserController{
    
    static async register(req, res){
        const {name, email, password, confirmPassword, phone} = req.body
        

        if(!name){
            res.status(422).json({message: 'O nome é obrigatório'})
            return
        }
        if(!email){
            res.status(422).json({message: 'O email é obrigatório'})
            return
        }
        if(!password){
            res.status(422).json({message: 'A senha é obrigatória'})
            return
        }
        if(!confirmPassword){
            res.status(422).json({message: 'A confirmação de senha é obrigatória'})
            return
        }
        if(!phone){
            res.status(422).json({message: 'O telefone é obrigatório'})
            return
        }
        if(password !== confirmPassword){
            res.status(422).json({message: 'As senhas não conferem'})
            return
        }
        
        const userExist = await User.findOne({email: email})
        if(userExist){
            res.status(422).json({message: 'Email em utilização, por favor use outro'})
            return
        }

        const salt = await bcrypt.genSalt(12)
        const passHash =  await bcrypt.hash(password, salt)

        const user = new User({
            name: name,
            email: email,
            phone: phone,
            password: passHash
        })
        try {
            const newUser = await user.save()
            res.status(200).json({message: "Usuário criado com sucesso", newUser})
        } catch (err) {
            res.status(500).json({message: 'Erro: ' + err})
        }
    }

}