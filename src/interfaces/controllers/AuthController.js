const registerUser = require('../../useCases/RegisterUser'); // Lógica de registro de usuario
const loginUser = require('../../useCases/LoginUser'); // Lógica de inicio de sesión de usuario
const logoutUser = require('../../useCases/LogoutUser'); // Lógica de cierre de sesión de usuario

const AuthController = {
    /**
     * Controlador para registrar un nuevo usuario.
     * Recibe el nombre de usuario y la contraseña desde el cuerpo de la solicitud.
     * Intenta registrar al usuario y devuelve la respuesta adecuada.
     */
    async register(req, res) {
        try {
            const { username, password } = req.body; // Extrae las credenciales del cuerpo de la solicitud
            const result = await registerUser(username, password); // Llama al caso de uso para registrar el usuario
            res.status(201).json(result); // Responde con el resultado del registro
        } catch (error) {
            // Si ocurre un error, responde con un código 400 y el mensaje de error
            res.status(400).json({ error: error.message });
        }
    },

    /**
     * Controlador para autenticar a un usuario e iniciar sesión.
     * Recibe el nombre de usuario y la contraseña desde el cuerpo de la solicitud.
     * Intenta iniciar sesión y devuelve la respuesta adecuada.
     */
    async login(req, res) {
        try {
            const { username, password } = req.body; // Extrae las credenciales del cuerpo de la solicitud
            const result = await loginUser(username, password); // Llama al caso de uso para iniciar sesión
            res.status(200).json(result); // Responde con el resultado del inicio de sesión
        } catch (error) {
            // Si ocurre un error, responde con un código 401 y el mensaje de error
            res.status(401).json({ error: error.message });
        }
    },

    /**
     * Controlador para cerrar la sesión de un usuario.
     * Extrae el token de la cabecera 'Authorization' y lo pasa al caso de uso para invalidarlo.
     */
    async logout(req, res) {
        try {
            const token = req.header('Authorization').replace('Bearer ', ''); // Extrae el token de la cabecera
            const result = await logoutUser(token); // Llama al caso de uso para cerrar la sesión
            res.status(200).json(result); // Responde con el resultado del cierre de sesión
        } catch (error) {
            // Si ocurre un error, responde con un código 400 y el mensaje de error
            res.status(400).json({ error: error.message });
        }
    },
};

module.exports = AuthController; // Exporta el controlador para ser usado en las rutas
