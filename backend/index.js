const express = require('express')
const cors = require('cors')
require('./db/conn') // 👈 ISSO AQUI

const UserRoutes = require('./routes/UserRoutes')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))

app.use(express.static('public'))   

app.use('/users', UserRoutes)

app.listen(5000, () => {
    console.log('Servidor rodando em http://localhost:5000')
})
