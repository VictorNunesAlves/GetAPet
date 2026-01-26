const User = require ('../models/User')

const bcrypt = require ('bcrypt')

const jwt = require ('jsonwebtoken')

const createUserToken = require('../helpers/create-user-token')
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')


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
            createUserToken(user, req, res)
        } catch (err) {
            res.status(500).json({message: 'Erro: ' + err})
        }
    }

    static async login(req, res){
        const {email, password} = req.body

         if(!email){
            res.status(422).json({message: 'O email é obrigatório'})
            return
        }
        if(!password){
            res.status(422).json({message: 'A senha é obrigatória'})
            return
        }

        const user = await User.findOne({email: email})
        if(!user){
            res.status(422).json({message: "Email não cadastrado"})
            return
        }

        const checkPassword = await bcrypt.compare(password, user.password)
        
        if(!checkPassword){
            res.status(422).json({message: "Senha inválida"})
            return
        }

        createUserToken(user, req, res)
    }

    static async checkUser(req, res){
        let currentUser

        if(req.headers.authorization){
            const token = await getToken(req)

            const decod = jwt.verify(token, 'asiefn8704g0374g7qb4g')

            currentUser = await User.findById(decod.id)
            currentUser.password = undefined

        }else{
            currentUser = null
        }

        res.status(200).json({currentUser: currentUser})

    }

    static async getUserById  (req, res){
        const userId = req.params.id

        const user =  await User.findById(userId).select("-password")

        if(!User){
            res.status(422).json({message: "Usuário não encontrado"})
            return
        }
        res.status(200).json({message: 'Usuário encontrado', user})
    }

    static async editUser(req, res){
        const token = await getToken(req)
        const user = await getUserByToken(token)
        
        const { name, email, phone, password, confirmPassword } = req.body
        let image = ''

        if(req.file){
          user.image = req.file.filename
        }

        user.name = name
        user.phone = phone
        if(email != undefined){
            const emailExists = await User.findOne({email: email})

            if(user.email != email && emailExists){
                return res.status(422).json({message: 'Por favor, utilize outro email'})
            }
            user.email = email
        }

        if(password && !confirmPassword){
            res.status(422).json({message: 'A confirmação de senha é obrigatória'})
            return
        }
        else if(password !== confirmPassword){
            res.status(422).json({message: 'As senhas não conferem'})
            return

        }else if (password === confirmPassword && password != null){
            const salt = await bcrypt.genSalt(12)
            const passHash =  await bcrypt.hash(password, salt)
            user.password = passHash
        }

        await User.findOneAndUpdate(
            {_id : user.id},
            {$set: user},
            {new: true}
        )
        
        res.status(200).json({message:"Usuário atualizado com sucesso"})

    }


}