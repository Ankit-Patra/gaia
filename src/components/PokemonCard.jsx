import { useEffect, useState } from 'react';

function Pokedex() {
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=150')
      .then(res => res.json())
      .then(data => setPokemon(data.results));
  }, []);

  return (
    <div>
      <h1>Pokedex</h1>
      <div className="pokemon-list">
        {pokemon.map((poke, index) => (
          <PokemonCard key={index} name={poke.name} url={poke.url} />
        ))}
      </div>
    </div>
  );
}

function PokemonCard({ name, url }) {
  return (
    <div className="pokemon-card">
      <h3>{name}</h3>
      {/* Fetch additional details like images/stats if needed */}
    </div>
  );
}
export default Pokedex;
