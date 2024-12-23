const User = require('../entities/User');
const PokeAPIService = require('../infrastructure/PokeAPIService');

async function addPokemon(userId, pokemonName) {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error('Usuario no encontrado');
    }

    const pokemon = await PokeAPIService.getPokemonData(pokemonName);
    user.pokemons.push(pokemon);
    await user.save();

    return { message: `${pokemon.name} añadido al inventario` };
}

module.exports = addPokemon;
