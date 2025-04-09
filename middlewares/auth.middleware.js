import jwt from 'jsonwebtoken'
import UserModel from '../models/user.model.js'

export const AuthMiddleware = (req, res, next) => {
    try {
        const  token  = req.headers.cookie
        const refreshed = (token.split('=')[1])
        if(!refreshed) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized!'
            })
        }
        
        jwt.verify(refreshed, process.env.JWT_SECRET, (err, decode) => {
            if(err) {
                return res.status(401).json({
                    success: false,
                    message: 'Unauthorized!'
                })
            }
            
            else {
                req.user = (decode.id);  
            }
        })
        
        
        next()
    }
    catch(err) {
        res.status(400).json({
            success: false,
            message: err.message
        })
    }
}






export const AdminMiddleware = async (req, res, next) => {
    try {
        const  token  = req.headers.cookie
        const refreshed = (token.split('=')[1])
        if(!refreshed) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized!'
            })
        }
        const user = await UserModel.findById(req.user)
        if(user.userType !== 'admin') {
            return res.status(400).json({
                success: false,
                message: 'Bad Request!'
            })
        }
        else {
            next()
        }
        /* jwt.verify(refreshed, process.env.JWT_SECRET, (err, decode) => {
            if(err) {
                return res.status(401).json({
                    success: false,
                    message: 'Unauthorized!'
                })
            }
            
            else {
                req.user = (decode.id);  
            }
        }) */
        
        
        next()
    }
    catch(err) {
        res.status(400).json({
            success: false,
            message: err.message
        })
    }
}