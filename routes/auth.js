const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')

const authController = require('../controllers/auth')
const { validationRegister, validationLogin } = require('../validation')

// const initializePassport = require('../passport-config')
// initializePassport(passport, username => users.find(user => user.username === username))

// const users = []

router.post('/register', async (req, res) => {
    // validation phase
    const {error} = validationRegister(req.body)
    // console.log(req.body)
    error ? res.status(400).send(error.details[0].message) : '';

    const userExists = await User.findOne({username: req.body.username})
    if(userExists){
        res.status(400).send('this user already exists')
    } else {
        // saving data
        const user = new User({
            username: req.body.username,
            password: await bcrypt.hash(req.body.password, 10)
        })
        try{
            const savedUser = await user.save();
            res.status(201).json(savedUser);
        }catch(err){
            console.log('ERROR', err)
            res.status(400).send(err)
        }
    }
})

router.post('/login', async (req, res) => {
    const {error} = validationLogin(req.body)
    // console.log(req.body)
    if(error){
        res.status(400).send(error.details[0].message);
    } 
    const user = await User.findOne({email:req.body.email})
    if(!user){
        return res.status(400).send('Username or password wrong')
    }
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Invalid password')

    
    else{

        // Create and assign token
        const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
        res.header('auth-token', token).send(token)
        // console.log(user)
    } 
    
})
module.exports = router