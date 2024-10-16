import { useNavigate } from 'react-router-dom';

function PokemonCard({ pokemon }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/pokemon/${pokemon.id}`);
  };

  return (
    <div className="pokemon-card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      <h3>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
      <p>National Dex: #{pokemon.id}</p>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <div>
        <strong>Type:</strong> {pokemon.types.map(type => type.type.name).join(', ')}
      </div>
    </div>
  );
}

export default PokemonCard;
