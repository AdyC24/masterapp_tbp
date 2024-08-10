const UserModel = require('../models/user');

const login = async(req, res) => {
    const {nik, password} = req.body;
    const user = await UserModel.findByNik(nik)

    if(!user || user.password !== password){
        return res.status(400).json({errMessage: 'NIK and password is incorrect'});
    }

    // Set Session
    req.session.userId = user.userId;
    req.session.user = {id: user.userId, name: user.userName}

    // Respon yang dikirimkan ke frontend jika login berhasil
    return res.status(200).json({ message: 'Login successful', user: { id: user.userId, name: user.name } });
}

module.exports = {
    login
}