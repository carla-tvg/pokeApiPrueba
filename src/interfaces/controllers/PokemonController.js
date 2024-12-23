const addPokemon = require('../../useCases/AddPokemon'); 
const getInventory = require('../../useCases/GetInventory'); 

const PokemonController = {
    /**
     * Controlador para agregar un Pokémon al inventario del usuario.
     * Recibe el nombre del Pokémon desde el cuerpo de la solicitud y el ID del usuario desde el token.
     * Intenta agregar el Pokémon al inventario y responde con el resultado.
     */
    async add(req, res) {
        try {
            const userId = req.user.id; // Obtiene el ID del usuario desde el token
            const { pokemonName } = req.body; // Extrae el nombre del Pokémon desde el cuerpo de la solicitud
            const result = await addPokemon(userId, pokemonName); // Llama al caso de uso para agregar el Pokémon
            res.status(200).json(result); // Responde con el resultado de la operación
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    /**
     * Controlador para obtener el inventario de Pokémon del usuario.
     * Extrae el ID del usuario desde el token y obtiene el inventario.
     * Responde con el inventario de Pokémon.
     */
    async inventory(req, res) {
        try {
            const userId = req.user.id; // Obtiene el ID del usuario desde el token
            const inventory = await getInventory(userId); // Llama al caso de uso para obtener el inventario
            res.status(200).json({ pokemon: inventory }); // Responde con el inventario de Pokémon
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};

module.exports = PokemonController; 
