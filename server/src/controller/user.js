const UserModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const login = async (req, res) => {
    try {
        // Fetch user by NIK
        const user = await UserModel.getAllUser({
            where: {
                nik: req.body.nik
            }
        });

        // Check if user exists
        if (!user.length) {
            return res.status(404).json({ errMessage: 'NIK is not found' });
        }

        // Compare provided password with stored hash
        const match = await bcrypt.compare(req.body.password, user[0].userPassword);
        if (!match) {
            return res.status(400).json({ errMessage: 'Password incorrect' });
        }

        // Generate access and refresh tokens
        const userId = user[0].userId;
        const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' });
        const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });

        // Respond with tokens
        res.json({ accessToken, refreshToken });
        
    } catch (error) {
        // Catch and respond with error
        res.status(500).json({ errMessage: 'An error occurred while logging in', error: error.message });
    }
};

const createNewUser = async (nik, password) => {
    try {
        // Create new user
        await UserModel.createNewUser(nik, password)
        res.json({
            message: 'Create new user succeed'
        })
    } catch (error) {
        res.status(500).json({
            errMessage: 'Server is error'
        })
    }
}

module.exports = {
    login
};
