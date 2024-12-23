const axios = require('axios');

async function getPokemonData(pokemonName) {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        const { name, types, sprites } = response.data;

        return {
            name,
            types: types.map(t => t.type.name),
            sprite: sprites.front_default,
        };
    } catch (error) {
        throw new Error('Error obteniendo datos del Pokémon');
    }
}

module.exports = { getPokemonData };
