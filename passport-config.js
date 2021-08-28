const LocalStrategy = require('passport-local').Strategy
const JwtStrategy = require('passport-jwt').Strategy
const passport = require('passport')
const jwt = require('jsonwebtoken')
const User = require('./models/user')
const validation = require('./validation')

// const initialize = (passport, getUser) => {
//     const authenticateUser = (username, password, next) => {
//         // const {error} = validationRegister({username: username, password: password})
//         // error ? next(null, false, {message: 'Invalid username'}) : '';
//         const user = getUser(username)
//         if(user == null){
//             return done(null, false, {message: 'No user with that email'})
//         }
        
//         try{
//             if(await bcrypt.compare(password, user.password)){
//                 return done(null, user)
//             } else{
//                 return done(null, false, {message: 'Invalid password'})
//             }
//         } catch(e){
//             return done(e)
//         }
//     }
//     passport.use(new LocalStrategy({usernameField: 'username'}), 
//     authenticateUser)
//     passport.serializeUser((user, done) => {})
//     passport.deserializeUser((user, done) => {})
// }

// module.exports = initialize

const cookieExtractor = req => {
    let token = null
    if(req && req.cookies){
        token = req.cookies["access_token"]
    }
    return token
}

passport.use(new JwtStrategy({
    jwtFromRequest : cookieExtractor,
    secretOrKey : "MERN"
}, (payload, done) => {
    User.findById({_id : payload.sub}, (err, user) => {
        if(err)
            return done(err, false)
        if(user)
            return done(null, user)
    })
}))

passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({username}, (err, user) => {
        if(err)
            return done(err)
        if(!user)
            return done(null, false)
        user.comparePassword(password, done)
    })
}))