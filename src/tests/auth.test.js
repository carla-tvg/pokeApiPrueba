const request = require('supertest'); 
const app = require('../app');
const User = require('../entities/User'); 
const BlacklistedToken = require('../entities/BlacklistedToken'); 

describe('Autenticación de usuarios', () => {
    let token; 
    let blacklistedToken; 

    /**
     * Configuración inicial antes de ejecutar las pruebas.
     * Crea un usuario de prueba en la base de datos.
     */
    beforeAll(async () => {
        await User.create({ username: 'usertest', password: 'testpassword' }); // Crea un usuario con credenciales de prueba
    });

    /**
     * Prueba para verificar que el endpoint de login genera un token.
     * Envia una solicitud POST al endpoint de login con las credenciales correctas.
     */
    it('debe devolver un token al hacer login', async () => {
        const response = await request(app)
            .post('/api/auth/login') // Endpoint de login
            .send({ username: 'usertest', password: 'testpassword' }); // Envia las credenciales del usuario

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
        expect(response.body.message).toBe('Inicio de sesión exitoso');
        token = response.body.token; // Guarda el token recibido para las pruebas posteriores
    });

    /**
     * Prueba para verificar que se puede acceder a una ruta protegida con un token válido.
     * Envia una solicitud GET al endpoint de inventario de Pokémon con el token válido en el encabezado.
     */
    it('debe acceder a la ruta protegida con token válido', async () => {
        const response = await request(app)
            .get('/api/pokemon/inventory') // Endpoint protegido
            .set('Authorization', `Bearer ${token}`); // Agrega el token al encabezado de autorización

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('pokemon');
    });

    /**
     * Prueba para verificar que el acceso es denegado con un token inválido.
     * Envia una solicitud GET con un token inválido.
     */
    it('debe denegar el acceso con token inválido', async () => {
        const response = await request(app)
            .get('/api/pokemon') // Endpoint protegido
            .set('Authorization', 'Bearer invalidtoken'); 

        expect(response.status).toBe(403);
        expect(response.body.error).toBe('Token inválido o expirado');
    });

    /**
     * Prueba para verificar que el acceso es denegado si el token está en la lista negra.
     * Agrega el token a la lista negra y verifica que se deniegue el acceso.
     */
    it('debe denegar el acceso si el token está en la blacklist', async () => {

        blacklistedToken = new BlacklistedToken({ token: token });
        await blacklistedToken.save();

        const response = await request(app)
            .get('/api/pokemon') // Endpoint protegido
            .set('Authorization', `Bearer ${token}`); // Envia el token revocado

        expect(response.status).toBe(403);
        expect(response.body.error).toBe('Token ha sido revocado o está en la lista negra');
    });

    /**
     * Limpieza después de todas las pruebas.
     * Elimina el usuario de prueba de la base de datos.
     */
    afterAll(async () => {
        await User.deleteOne({ username: 'usertest' }); // Elimina el usuario de prueba
    });
});
