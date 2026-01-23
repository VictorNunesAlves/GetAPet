const Pet = require("../models/Pet")
const getToken = require("../helpers/get-token")
const getUserByToken = require("../helpers/get-user-by-token")
const ObjectiId = require('mongoose').Types.ObjectId

module.exports = class PetsController{
    static async create(req, res){
        const {name, age, weigth, color} = req.body
        const images = req.files

        if(!name){
            res.status(422).json({message:"o Pet precisa de um nome"})
             return
        }
        if(!age){
            res.status(422).json({message:"o Pet precisa de uma idade"})
             return
        }
        if(!weigth){
            res.status(422).json({message:"o Pet precisa de um peso"})
             return
        }
        if(!color){
            res.status(422).json({message:"o Pet precisa de uma cor"})
            return
        }
        if(images.length == 0){
            res.status(422).json({message:"A imagem é obrigatória"})
            return
        }

        const token = await getToken(req)
        const user = await getUserByToken(token)

        const pet = new Pet({
            name: name,
            color: color,
            age: age,
            weigth: weigth,
            avaliable: true,
            user: {
                _id: user._id,
                name: user.name,
                image: user.image,
                phone: user.phone
            }, 
            images: []
        })

        images.map((image) => {
            pet.images.push(image.filename)
        })

        try {
            const newPet = await pet.save()
        res.status(201).json({message: "Deu certo", pet})
        } catch (error) {
            res.status(500).json({message: "error"})
        }
    }

    static async getAllPets(req, res){
        const pets = await Pet.find().sort('-createdAt')

        res.status(200).json({pets: pets})
    }

    static async getPetsByOwner(req, res){
        const token = await getToken(req)
        const user = await getUserByToken(token)

        const pets = await Pet.find({'user._id': user._id}).sort('-createdAt')

        res.status(200).json({pets: pets})
    }

    static async getAdoptions(req, res){
        const token = await getToken(req)
        const user = await getUserByToken(token)
        console.log(user)

        const pets = await Pet.find({ 'adopter._id': user._id }).sort('-createdAt')

        

        res.status(200).json({pets})
    }

    static async getPetById(req, res){
        const id = req.params.id

        if(!ObjectiId.isValid(id)){
            res.status(422).json({message: "Não é um id válido"})
            return
        }

        const pet = await Pet.findOne({'_id': id})
        if(!pet){
            res.status(422).json({message: "Pet não existe"})
            return
        }

        res.status(200).json(pet)
    }

}