import { model, Schema } from "mongoose";
import bcrypt from 'bcrypt'
const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required!'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required!'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required!']
    },
    address: {
        type: Array
    },
    phone: {
        type: String,
        required: [true, 'Phone Number is required!']
    },
    userType: {
        type: String,
        required: [true, 'User Type is required!'],
        enum: ['client', 'admin', 'vendor', 'driver'],
        default: 'client'
    },
    answer: {
        type: String,
        required: [true, 'Answer is required!']
    }
}, {
    timestamps: true
})

userSchema.pre('save', async function(next) {
    let salt = bcrypt.genSaltSync(12)
    const hashedPassword = await bcrypt.hash(this.password, salt)
    this.password = hashedPassword
    next()
})
const UserModel = model('User', userSchema)
export default UserModel