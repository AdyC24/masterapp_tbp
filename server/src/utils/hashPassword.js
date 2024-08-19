const bcrypt = require('bcrypt');
const db = require('../config/database');

async function hashExistingPassword() {
    try {
        const users = await db.query('SELECT userId, userPassword from user')
        console.log(users[0])

        for (let user of users[0]) {
            console.log(user)

            if(user.userPassword) {
                const hashedPassword = await bcrypt.hash(user.userPassword, 10) //Gunakan salt round 10
                await db.query('UPDATE user SET userPassword = ? WHERE userId = ?', [hashedPassword, user.userId]);
            } else {
                console.error('Missing password for user:', user.userId)
            }
        }
        console.log('All password have been hashed successfully.');
    } catch (error) {
        console.log('Error hashing password', error);
    }
}

hashExistingPassword();