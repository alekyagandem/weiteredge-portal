
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const loginRoutes = require('./src/routes/loginRoutes')
const timeManagementRoutes = require('./src/routes/timeManagementRoutes')


app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/management')

app.use('/auth', loginRoutes)
app.use('/user', timeManagementRoutes)

app.listen(2700, () => {
    console.log('server started')
}) 