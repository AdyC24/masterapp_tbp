const UserModel = require('../models/user');
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import env from 'dotenv';

const login = async (req, res) => {
    try {
        const user = await UserModel.getAllUser({
            where:{
                nik: req.body.nik
            }
        })
        const match = await bcrypt.compare(req.body.password, user[0].userPasword)
        if(!match) return res.status(400).json({errMessage: 'Password incorrect'})
        const userId = user[0].userId
        const accessToken = jwt.sign({userId}, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '30s'
        })
        const refreshToken = jwt.sign({userId}, process.env.REFRESH_TOKEN_ACCESS, {
            expiresIn: '1d'
        })

    } catch (error) {
        res.status(404).json({errMessage: 'NIK is not found'})
    }
}