const jwt = require('jsonwebtoken')
const config = require('config')

exports.AuthMiddleware = (req, res, next) => {

    if(req.method === 'OPTIONS') next()

    try{
        const token = req.get('Authorization').split(' ')[1]
        console.log(token)
        if(!token) res.status(400).json({message: 'no token'})

        const decoded = jwt.verify(token, config.get('jwt_secret'))
        if(!decoded) return res.status(401).json({message:'uncorent token'})
    } catch(e) {
        res.status(500).json({message: 'server error'})
    }
    next()
}