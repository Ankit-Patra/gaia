import { useEffect, useState } from 'react';

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
    // Function to fetch evolutions and update state
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

  const formatTrigger = (trigger) => {
    if (!trigger) return 'Initial Stage';
    if (trigger.trigger.name === 'level-up') return `Level ${trigger.min_level}`;
    if (trigger.trigger.name === 'use-item') return `Use ${trigger.item.name}`;
    return 'Special Condition';
  };

  if (!evolution) return <div>Loading Evolution Chain...</div>;

  return (
    <div className="evolution-chart">
      <h2>Evolution Chain</h2>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {evolutionChain.map((evo, index) => (
          <div key={evo.id} style={{ display: 'flex', alignItems: 'center' }}>
            <div onClick={() => onPokemonClick(`/pokemon/${evo.id}`)} style={{ textAlign: 'center', cursor: 'pointer' }}>
              <img src={evo.sprite} alt={evo.name} style={{ width: '100px' }} />
              <p>{evo.name.charAt(0).toUpperCase() + evo.name.slice(1)}</p>
              <p>{formatTrigger(evo.trigger)}</p>
            </div>
            {index < evolutionChain.length - 1 && (
              <div style={{ margin: '0 10px' }}>
                <p style={{ fontSize: '24px' }}>→</p> {/* Arrow between evolutions */}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default EvolutionChart;
