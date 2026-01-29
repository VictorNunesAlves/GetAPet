const Pet = require("../models/Pet")
const getToken = require("../helpers/get-token")
const getUserByToken = require("../helpers/get-user-by-token")
const ObjectiId = require('mongoose').Types.ObjectId

module.exports = class PetsController{
    static async create(req, res){
        const {name, age, weight, color} = req.body
        const images = req.files

        if(!name){
            res.status(422).json({message:"o Pet precisa de um nome"})
             return
        }
        if(!age){
            res.status(422).json({message:"o Pet precisa de uma idade"})
             return
        }
        if(!weight){
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
            weight: weight,
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
            res.status(500).json({message: error})
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

    static async removePet(req, res){
        const token = await getToken(req)
        const user = await getUserByToken(token)

        const id = req.params.id
        if(!ObjectiId.isValid(id)){
            res.status(422).json({message: "Não é um id válido"})
            return
        }

        const pet = await Pet.findOne({_id: id})
        if(!pet){
            res.status(404).json({message: "Pet Não encontrado"})
            return
        }

        //check if pet is from user
        if(pet.user._id.toString() !== user._id.toString()){
            res.status(422).json({message: "Não é possivel concluir a solicitação tente novamente mais tarde"})
            return
        }
        try {
            await Pet.findByIdAndDelete({_id: id})
            res.status(200).json({message: "removido"})
            return
        } catch (error) {
            res.status(404).json({message: "Erro inesperado"})
        }
    }

    static async updatePet(req, res){

        const token = await getToken(req)
        const user =  await getUserByToken(token)

        const { name, color, weight, age, avaliable, adopter } = req.body || {}

        const  images = req.files || []

        const updatedData = {}

        const id = req.params.id

        if(!ObjectiId.isValid(id)){
            res.status(422).json({message: "Não é um id válido"})
            return
        }

        const pet = await Pet.findOne({_id: id})
        if(!pet){
            res.status(404).json({message: "Pet Não encontrado"})
            return
        }

        
        if(!ObjectiId.isValid(id)){
            res.status(422).json({message: "Não é um id válido"})
            return
        }

        if(name !== undefined){
            updatedData.name = name
        }

        if(age !== undefined){
            updatedData.age = age
        }

        if(color !== undefined){
            updatedData.color = color
        }

        if(weight !== undefined){
            updatedData.weight = weight
        }

        if(avaliable !== undefined){
            updatedData.avaliable = avaliable
        }

        if(images.length > 0){
            updatedData.images = []
            images.map((image)=> {
                updatedData.images.push(image.filename)
            })
        }

        if (adopter === null) {
            updatedData.adopter = null
        }

        try {
            await Pet.findByIdAndUpdate(id, { $set: updatedData })
            res.status(200).json({ message: "Atualizado com sucesso!" })
        } catch (error) {
            res.status(500).json({ message: error })
        }
    }

    static async schedule(req, res){
        const id = req.params.id

        if(!ObjectiId.isValid(id)){
            res.status(422).json({message: "Não é um id válido"})
            return
        }

        const pet = await Pet.findOne({_id: id})
        if(!pet){
            res.status(404).json({message: "Pet Não encontrado"})
            return
        }
        
        const token = await getToken(req)
        const user = await getUserByToken(token)

        if(pet.user._id.equals(user._id)){
            res.status(422).json({message: "Não é possivel agendar com seu próprio pet "})
            return
        }

        if(pet.adopter){
            if(pet.adopter._id.equals(user._id)){
                res.status(422).json({message: "Você já agendou uma visita para este pet"})
                return
            }
        }
        
        pet.adopter = {
            _id: user._id,
            name: user.name,
            phone: user.phone,
            image: user.image
        }

        await Pet.findByIdAndUpdate(id, pet)
        res.status(200).json({message: `Visita agendada com sucesso, entre em contato com ${pet.user.name}, pelo telefone ${pet.user.phone}`, pet})
    }

    static async concludeAdoption(req, res){
        const id = req.params.id

        if(!ObjectiId.isValid(id)){
            res.status(422).json({message: "Não é um id válido"})
            return
        }

        const pet = await Pet.findOne({_id: id})
        if(!pet){
            res.status(404).json({message: "Pet Não encontrado"})
            return
        }

        const token = await getToken(req)
        const user = await getUserByToken(token)

        if(!pet.user._id.equals(user._id)){
            res.status(422).json({message: "Não é possivel proseguir com esta solicitação"})
            return
        }

        pet.avaliable = false
        try {
            await Pet.findByIdAndUpdate(id, pet)
            res.status(200).json({message: "Ciclo de adoção completo"})
        } catch (error) {
            res.status(500).json({message: "Erro inesperado"})
        }
        
    }


}