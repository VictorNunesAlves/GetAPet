const express = require ("express")
const router = express.Router()

const petsController = require('../controllers/PetsController')
const verifyToken = require("../helpers/verify-token")
const { imageUpload } = require("../helpers/image-upload")

router.post('/create', verifyToken, imageUpload.array('images'), petsController.create)
router.get('/getAllPets', petsController.getAllPets)
router.get('/getPetsByOwner', verifyToken, petsController.getPetsByOwner)
router.get('/myAddoptions', verifyToken, petsController.getAdoptions)
router.get('/:id', petsController.getPetById)
router.delete('/remove/:id', verifyToken, petsController.removePet)
router.patch('/update/:id', verifyToken, imageUpload.array('images'), petsController.updatePet)
router.patch('/schedule/:id', verifyToken, petsController.schedule)
router.patch('/conclude/:id', verifyToken, petsController.concludeAdoption)

module.exports = router