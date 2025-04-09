import UserModel from "../models/user.model.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const SIX_DAYS = 518400000

const getSession = (user) => {
    const payload = {
        id: user._id,
        username: user.username,
        email: user.email,
        address: user.address,
        phone: user.phone,
        answer: user.answer
    }
    const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '7d'
    })

    return {
        refreshToken
    }
}

export const register = async (req, res) => {
    try {
        const { username, email, password, address, phone, answer } = req.body
        if(!username || !email || !password) {
            return res.status(500).json({
                success: false,
                message: 'Please provide all fields!'
            })
        }
        const existingUser = await UserModel.findOne({email})
        if(existingUser) {
            return res.status(500).json({
                success: false,
                message: 'Email already exists!'
            })
        }

        const user = await UserModel.create({
            username,
            email,
            password,
            address,
            phone,
            answer
        })
        res.json({
            success: true,
            message: 'Successfully Registered!',
            user
        })
    }
    catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}


export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if(!email, !password) {
            return res.status(500).json({
                success: false,
                message: 'Please provide email or password!'
            })
        }
        const user = await UserModel.findOne({email})
        
        if(!user) {
            return res.status(404).json({
                success: false,
                message: 'User Not Found!'
            })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) {
            return res.status(500).json({
                success: false,
                message: 'Invalid Credentials!'
            })
        }
       console.log(password == user.password);
       
        const { refreshToken } = getSession(user)

        res.cookie('refreshToken', refreshToken, {
            maxAge: SIX_DAYS,
            domain: process.env.NODE_ENV === 'dev' ? "localhost" : process.env.NODE_ENV,
            secure: process.env.NODE_ENV === 'dev' ? false : true,
            httpOnly: true
        })
        
        res.json({
            success: true,
            message: 'Login Success!',
            user
        })
    }
    catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}