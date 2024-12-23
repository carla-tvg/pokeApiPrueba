const User = require('../entities/User');
const jwt = require('jsonwebtoken');

async function loginUser(username, password) {
    const user = await User.findOne({ username });
    if (!user || !(await user.validatePassword(password))) {
        throw new Error('Credenciales inválidas');
    }

    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return { token, message: 'Inicio de sesión exitoso' };
}

module.exports = loginUser;
