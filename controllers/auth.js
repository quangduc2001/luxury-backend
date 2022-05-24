import User from '../models/user';
let jwt = require('jsonwebtoken');
import expressJwt from 'express-jwt';

export const signup = (req, res) => {
    // const { name, email, hashed_password } = new User(req.body);
    const user = new User(req.body)
    user.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: "Email error"
            })
        }
        user.salt = undefined;
        user.password = undefined;
        res.json(data)
    })
}


export const requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],// added later
    userProperty: "auth",
});



export const signin = (req, res) => {

    //find the user base on email
    const { email, password } = req.body;
    console.log(email,password)
    User.findOne({ email }, (error, user) => {
        if (error || !user) {
            return res.status(400).json({
                error: "User with that email does not exist .Pleas signup"
            })
        }
        //if user id foud make sure email and password match
        //creat authenticate method in user model
        if (!user.authenticate(password)) {
            return res.status(400).json({
                error: "Email and password incorrect",              
            })
        }


        //Tu dong hoa ra 1 ma ra cung voi user va secret
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        //persist the token as 't' in cookie with
        res.cookie('t', token, { expire: new Date() + 9999 })
        //return response with user and token to frontend client
        const { _id, name, email, role } = user;
        return res.json({
            token,
            user: { _id, email, name, role },
            message: "login successful"
        })
    })
}



export const listuser = (req, res) => {
    User.find().exec((err, data) => {
        if (err) {
            message: "Khong tim thay tai khoan"
        }
        res.json(data)
    })
}

export const remove = (req, res) => {
    const user = req.user;
    user.remove((err, deleteUser) => {
        if (err || !user) {
            res.status(400).json({
                error: "Danh muc khong ton tai"
            })
        }
        res.json({
            deleteUser,
            message: "delete successfully"
        })
    })


}

export const userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            res.status(400).json({
                error: "Không Tìm Thấy Sản Phẩm Nào"
            })
        }
        req.profile = user
        next()
        res.json({
            user,
            message: "delete successfully"
        })
    })
}
