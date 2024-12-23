const { invalidateToken } = require('../infrastructure/AuthService');

async function logoutUser(token) {
    try {
        // Invalidamos el token haciendo que se pase a la lista negra una vez el usuario sale de la sesión
        await invalidateToken(token);
        return { message: 'Logout exitoso' };
    } catch (error) {
        throw new Error('Error al intentar cerrar sesión: ' + error.message);
    }
}

module.exports = logoutUser;
