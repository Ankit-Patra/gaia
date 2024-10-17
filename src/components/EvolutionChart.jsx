import { useEffect, useState } from 'react';
import EvolutionItem from './EvolutionItem';
import EvolutionArrow from './EvolutionArrow';

function EvolutionChart({ speciesData, onPokemonClick }) {
  const [evolution, setEvolution] = useState(null);
  const [evolutionChain, setEvolutionChain] = useState([]);

  useEffect(() => {
    // Fetch the evolution chain from the species data
    fetch(speciesData.evolution_chain.url)
      .then(res => res.json())
      .then(data => setEvolution(data.chain));
  }, [speciesData]);

  useEffect(() => {
    const getEvolutions = async (chain) => {
      const evolutions = [];
      let current = chain;

      while (current) {
        const pokemonId = current.species.url.split('/').slice(-2, -1)[0];

        // Fetch Pokémon data to get the sprite
        const pokemonData = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`).then(res => res.json());

        evolutions.push({
          name: current.species.name,
          id: pokemonId,
          sprite: pokemonData.sprites.front_default,
          trigger: current.evolution_details[0] || null,
        });

        current = current.evolves_to[0]; // Move to the next evolution
      }

      setEvolutionChain(evolutions);
    };

    if (evolution) {
      getEvolutions(evolution);
    }
  }, [evolution]);

  if (!evolution) return <div>Loading Evolution Chain...</div>;

  return (
    <div className="evolution-chart">
      <h2>Evolution Chain</h2>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {evolutionChain.length === 3 ? (
          // If there are exactly 3 evolutions, display them all in a row
          evolutionChain.map((evo, index) => (
            <div key={evo.id} style={{ display: 'flex', alignItems: 'center' }}>
              <EvolutionItem evo={evo} onPokemonClick={onPokemonClick} />
              {index < evolutionChain.length - 1 && <EvolutionArrow />}
            </div>
          ))
        ) : evolutionChain.length > 3 ? (
          // Display first part of the evolution chain normally
          <>
            {evolutionChain.slice(0, -2).map((evo, index) => (
              <div key={evo.id} style={{ display: 'flex', alignItems: 'center' }}>
                <EvolutionItem evo={evo} onPokemonClick={onPokemonClick} />
                {index < evolutionChain.length - 3 && <EvolutionArrow />}
              </div>
            ))}
            {/* Separate last two evolutions in a column */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {evolutionChain.slice(-2).map((evo, index) => (
                <div key={evo.id} style={{ display: 'flex', alignItems: 'center' }}>
                  <EvolutionItem evo={evo} onPokemonClick={onPokemonClick} />
                  {index < 1 && <EvolutionArrow />} {/* Only show arrow for the first of the last two */}
                </div>
              ))}
            </div>
          </>
        ) : (
          // If there are 2 or fewer evolutions, display them normally
          evolutionChain.map((evo, index) => (
            <div key={evo.id} style={{ display: 'flex', alignItems: 'center' }}>
              <EvolutionItem evo={evo} onPokemonClick={onPokemonClick} />
              {index < evolutionChain.length - 1 && <EvolutionArrow />}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default EvolutionChart;
