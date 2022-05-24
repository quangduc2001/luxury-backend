import mongoose from "mongoose";
import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
const userSchema = new mongoose.Schema({
    name: {
        type: 'String',
        strim: true,
        required: true,
        maxLength: 32
    },
    email: {
        type: 'String',
        trim: true,
        required: true,
        maxLength: 32
    },
    hashed_password: {
        type: 'String',
        required: true,
    },
    salt: {
        type: 'String'
    },
    role: {
        type: 'Number',
        default: 0
    }

}, { timestamps: true })


userSchema.virtual('password')//tao ra fild ao
    .set(function (password) { //client    
        this.salt = uuidv4()
        this.hashed_password = this.encryptedPassword(password)
    })

userSchema.methods = {
    authenticate: function (plainText) {
        return this.encryptedPassword(plainText) === this.hashed_password;
    },//login
    encryptedPassword: function (password) {
        if (!password) return '';
        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex')
        } catch (err) {
            return "";
        }
    }

}

module.exports = mongoose.model("User", userSchema);

