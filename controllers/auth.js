const { timeStamp } = require("console")

exports.register = (req, res, next) => {
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    const result = {
        message: 'Register success',
        data: {
            uid: timeStamp,
            name: name,
            email: email,
            password: password
        }
    }
    res.status(201).json(result)
}