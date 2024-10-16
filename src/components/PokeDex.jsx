import { useEffect, useState } from 'react';
import PokemonCard from './PokemonCard';

function Pokedex() {
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=150')
      .then(res => res.json())
      .then(data => {
        const fetches = data.results.map(poke => fetch(poke.url).then(res => res.json()));
        Promise.all(fetches).then(fullData => setPokemon(fullData));
      });
  }, []);

  return (
    <div>
      <h1>Pokedex</h1>
      <div className="pokemon-list">
        {pokemon.map(poke => (
          <PokemonCard key={poke.id} pokemon={poke} />
        ))}
      </div>
    </div>
  );
}

export default Pokedex;
