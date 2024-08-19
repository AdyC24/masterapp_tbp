const UserModel = require('../models/user');
const bcrypt = require('bcrypt');
const { use } = require('../route/company');

const login = async(req, res) => {
    const { nik, password} = req.body;
    
    try {
        const user = await UserModel.findByNik(nik);
        
        if(!user) {
            return res.status(400).json({ errMessage: 'NIK not found'})
        }

        const isMatch = await bcrypt.compare(password, user.userPassword)

        if (!isMatch) {
            return res.status(400).json({errMessage: 'Password is incorrect'})
        }

        req.session.userId = user.userId;
        req.session.user = {id: user.userId, name:user.userName }

        res.status(200).json({message: 'Login successful', user: {id: user.userId, name: user.userName} });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({errMessage: 'Server error'})
    }
}

const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(400).json({ errMessage: 'Unable to log out'});
        }
        res.clearCookie('session-name');  // Sesuaikan dengan nama cookie sesi Anda
        res.send({ message: 'Logged out successfully' });
    });
}

const checkSession = (req, res) => {
    if (req.session.user) {
        res.json({
            isAuthenticated: true,
            user: req.session.user
        });
    } else {
        res.json({ isAuthenticated: false })
    }
}

module.exports = {
    login,
    logout, 
    checkSession
}
