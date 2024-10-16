import { useEffect, useState } from 'react';

function EvolutionChart({ speciesData, onPokemonClick }) {
  const [evolution, setEvolution] = useState(null);

  useEffect(() => {
    // Fetch the evolution chain from the species data
    fetch(speciesData.evolution_chain.url)
      .then(res => res.json())
      .then(data => setEvolution(data.chain));
  }, [speciesData]);

  if (!evolution) return <div>Loading Evolution Chain...</div>;

  const getEvolutions = chain => {
    const evolutions = [];
    let current = chain;

    // Traverse through the evolution chain
    while (current) {
      evolutions.push(current.species);
      current = current.evolves_to[0];
    }
    return evolutions;
  };

  const evolutionChain = getEvolutions(evolution);

  return (
    <div className="evolution-chart">
      <h2>Evolution Chain</h2>
      <ul>
        {evolutionChain.map(evo => (
          <li key={evo.name} onClick={() => onPokemonClick(`/pokemon/${evo.url.split('/').slice(-2, -1)[0]}`)}>
            {/* Get Pokemon ID from the species URL */}
            {evo.name.charAt(0).toUpperCase() + evo.name.slice(1)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EvolutionChart;
