require('dotenv').config()

const bodyParser = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')
const app = express()

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (error)=>console.error(error))
db.once('open', ()=>console.log("connected to the database"))

app.use(bodyParser.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})
app.use(express.json())

const goodsRouter = require('./routes/goods')
const authRouter = require('./routes/auth')

app.use('/goods', goodsRouter)
app.use('/auth', authRouter)

app.listen(4000, () => console.log("Server Started at port 4000"))