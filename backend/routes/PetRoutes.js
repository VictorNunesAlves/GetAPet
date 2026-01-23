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

module.exports = router