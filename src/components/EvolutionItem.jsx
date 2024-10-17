import EvolutionTrigger from './EvolutionTrigger';

function EvolutionItem({ evo, onPokemonClick }) {
  return (
    <div onClick={() => onPokemonClick(`/pokemon/${evo.id}`)} style={{ textAlign: 'center', cursor: 'pointer' }}>
      <img src={evo.sprite} alt={evo.name} style={{ width: '100px' }} />
      <p>{evo.name.charAt(0).toUpperCase() + evo.name.slice(1)}</p>
      <EvolutionTrigger trigger={evo.trigger} />
    </div>
  );
}

export default EvolutionItem;
