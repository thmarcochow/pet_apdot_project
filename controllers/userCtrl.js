const ShelterUsers = require('../models/userModels')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');


const userCtrl = {
    register: async (req, res) => {
        try {
            const {username, email, password} = req.body;

            const CheckEmail = await ShelterUsers.findOne({email}).lean()
            const user = await ShelterUsers.findOne({username}).lean()
            if(CheckEmail) { 
                return res.json({msg: "This email was registered already."})
            } else if(user) {
                return res.json({msg: "This username has been used, please try again!"})
            } else if (password.length < 10) {
                return res.json({msg: "Password is at least 10 char."})
            } /* else {
                res.json({msg: "Register Success!"})
            } */
            //  Encrypt the password by using bcrypt
            const passwordHash = await bcrypt.hash(password, 10)
            const newCreateUser = new ShelterUsers({username, email, password: passwordHash})
            
            // Save the new created user into mongodb
            await newCreateUser.save()

            //create jsonwebtoken to auth
            const accesstoken = createAccessToken({id: newCreateUser._id})
            const refreshtoken = createRefreshToken({id: newCreateUser._id})

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/user/refresh_token'
                
            })

            res.json({user, accesstoken})

        } catch (err) {
            return res.json({msg: err.message})
        }
    },
    Login: async (req, res) => {
        try {
            const {username, password} = req.body;
            const user = await ShelterUsers.findOne({username})//.lean()
            const compareUser = await bcrypt.compare(password, user.password)

            //create jsonwebtoken to auth
            const accesstoken = createAccessToken({id: user._id})
            const refreshtoken = createRefreshToken({id: user._id})
            
            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/user/refresh_token'
            })

            if(!user) {
                return res.status(400).json({msg: "This user does not exist. Please try again!"})
            }// else 
            if (!compareUser) {
                return res.json({msg: "Incorrect Password"})
            } else {
                res.json({accesstoken})
                //res.json({msg: "Login Success"})
                
            }
            
        } catch (err) {
            return res.json({msg: "Error: "+err.message})
        }
        
    },
    Logout: async (req, res) => {
        try {
            res.clearCookie('refreshtoken', {path: '/user/refresh_token'})
            return res.json({msg: "Logged out"})
        } catch (err) {
            return res.json({msg: err.message})
        }
    },
    refreshToken: (req, res) => {
        try {
            const rf_token = req.cookies.refreshtoken;
            if(!rf_token) return res.status(400).json({msg: "Please Login or Register"})

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) =>{
                if(err) return res.status(400).json({msg: "Please Login or Register"})

                const accesstoken = createAccessToken({id: user.id})

                res.json({accesstoken})
            })

        } catch (err) {
            return res.json({msg: err.message})
        }
        
    },
    getUser: async (req, res) => {
        try {
            const user = await ShelterUsers.findById(req.user.id).select('-password')
            if(!user){
                return res.json({msg: "User does not exist."})
            }
            res.json(user)
        } catch (err) {
            return res.json({msg: err.message})
        }
    }
}

const createAccessToken = (user) =>{
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'})
}
const createRefreshToken = (user) =>{
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}

module.exports = userCtrl