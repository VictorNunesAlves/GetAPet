const express = require('express')
const cors = require('cors')
require('./db/conn')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))

app.use(express.static('public'))   

const UserRoutes = require('./routes/UserRoutes')
const PetsRoutes = require('./routes/PetRoutes')

app.use('/users', UserRoutes)
app.use('/pets', PetsRoutes)

app.listen(5000, () => {
    console.log('Servidor rodando em http://localhost:5000')
})
