const jwt = require('jsonwebtoken'); 
const BlacklistedToken = require('../entities/BlacklistedToken'); // Modelo de la entidad BlacklistedToken para manejar los tokens revocados

/**
 * Verifica si el token está en la lista negra.
 * @param {string} token - El token JWT a verificar.
 * @returns {boolean} - Retorna true si el token está en la lista negra, de lo contrario false.
 */
async function isTokenBlacklisted(token) {
    try {
        // Busca el token en la base de datos de tokens revocados
        const blacklistedToken = await BlacklistedToken.findOne({ token });
        return !!blacklistedToken; // Retorna true si el token está en la lista negra
    } catch (error) {
        // Maneja errores en la búsqueda del token
        console.error('Error al verificar el token en la lista negra:', error);
        throw new Error('Error al verificar el token en la lista negra');
    }
}

/**
 * Middleware para autenticar el token en la cabecera Authorization.
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 * @param {Function} next - La función que pasa al siguiente middleware o ruta.
 */
async function authenticateToken(req, res, next) {
    const authHeader = req.header('Authorization'); // Obtiene el encabezado de autorización

    // Si no se proporciona el token, retorna un error 401
    if (!authHeader) {
        return res.status(401).json({ error: 'Token requerido' });
    }

    const token = authHeader.replace('Bearer ', ''); // Extrae el token del encabezado
    console.log('Token recibido:', token);

    try {
        // Verifica la validez del token usando la clave secreta del entorno
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Verifica si el token está en la lista negra
        const isBlacklisted = await isTokenBlacklisted(token);
        if (isBlacklisted) {
            // Si el token está revocado, retorna un error 403
            return res.status(403).json({ error: 'Token ha sido revocado o está en la lista negra' });
        }

        // Si el token es válido y no está revocado, agrega el usuario decodificado al objeto de solicitud
        req.user = decoded; 
        next(); // Pasa al siguiente middleware o controlador
    } catch (error) {
        console.error('Error al autenticar el token:', error);

        // Manejo de errores específicos de JWT
        if (error.name === 'JsonWebTokenError') {
            return res.status(403).json({ error: 'Token inválido o expirado' });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(403).json({ error: 'Token expirado' });
        }

        // Si ocurre otro tipo de error, responde con un error interno
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

/**
 * Invalida un token y lo agrega a la lista negra.
 * @param {string} token - El token JWT que se va a invalidar.
 */
async function invalidateToken(token) {
    try {
        // Crea una nueva entrada en la base de datos para el token revocado
        const blacklistedToken = new BlacklistedToken({ token });
        await blacklistedToken.save(); // Guarda el token en la lista negra
        console.log('Token invalidado y agregado a la lista negra');
    } catch (error) {
        console.error('Error al invalidar el token:', error);
        throw new Error('Error al invalidar el token');
    }
}

module.exports = {
    authenticateToken,  // Middleware para autenticar el token
    invalidateToken,    // Función para invalidar un token
    isTokenBlacklisted  // Función para verificar si un token está en la lista negra
};
