const User = require('../entities/User');

async function getInventory(userId) {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error('Usuario no encontrado');
    }

    return user.pokemons;
}

module.exports = getInventory;
