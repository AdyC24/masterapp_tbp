const UserModel = require('../models/user');

const login = async(req, res) => {
    const { nik, password } = req.body;
    console.log('Received NIK:', nik);
    console.log('Received Password:', password);
    
    const user = await UserModel.findByNik(nik);
    console.log('User Found:', user);

    // Pastikan menggunakan properti yang benar dari objek user
    if (!user || user.userPassword !== password) {
        console.log('Login failed');
        return res.status(400).json({ errMessage: 'NIK and password is incorrect' });
    }

    req.session.userId = user.userId;
    req.session.user = { id: user.userId, name: user.userName };

    return res.status(200).json({ message: 'Login successful', user: { id: user.userId, name: user.userName } });
}


module.exports = {
    login,
}
