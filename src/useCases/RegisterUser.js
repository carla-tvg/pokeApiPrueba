const User = require('../entities/User');

async function registerUser(username, password) {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        throw new Error('El usuario ya existe');
    }

    const newUser = new User({ username, password });
    await newUser.save();
    return { message: 'Usuario registrado exitosamente' };
}

module.exports = registerUser;
