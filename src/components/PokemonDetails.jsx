import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Tabs from './Tabs';
import EvolutionChart from './EvolutionChart';

function PokemonDetail() {
  const { id } = useParams();  // Get Pokemon ID from the URL
  const [pokemon, setPokemon] = useState(null);
  const [speciesData, setSpeciesData] = useState(null);
  const [availableForms, setAvailableForms] = useState([]);  // Track all available forms (base, mega, alolan, etc.)
  const [form, setForm] = useState('base');  // Track selected form
  const [currentPokemon, setCurrentPokemon] = useState(null);  // Current form data
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch Pokemon data for the base form
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(res => res.json())
      .then(data => {
        setPokemon(data);
        setCurrentPokemon(data);  // Initially show base form
      });

    // Fetch Pokemon species data (contains evolution chain and form data)
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
      .then(res => res.json())
      .then(data => {
        setSpeciesData(data);
        // Check for all available forms
        checkForAlternateForms(data.varieties);
      });
  }, [id]);

  // Function to check for all forms (mega, regional, etc.)
// Function to check for alternate forms (excluding cosmetic forms)
const checkForAlternateForms = (varieties) => {
    const forms = [];
    
    varieties.forEach(variety => {
      const formName = variety.pokemon.name;
      
      // Filtering relevant forms
      if (formName.includes('gmax')) {
        forms.push({ name: 'GMAX Form', url: variety.pokemon.url });
      } else if (formName.includes('alola')) {
        forms.push({ name: 'Alolan Form', url: variety.pokemon.url });
      } else if (formName.includes('galar')) {
        forms.push({ name: 'Galarian Form', url: variety.pokemon.url });
      } else if (formName.includes('hisui')) {
        forms.push({ name: 'Hisuian Form', url: variety.pokemon.url });
      } else if (formName.includes('mega')) {
        forms.push({ name: 'Mega Evolution', url: variety.pokemon.url });
      } else if (formName === pokemon.name) {
        // Always include the base form
        forms.push({ name: 'Base Form', url: variety.pokemon.url });
      }
  
      // Discard cosmetic forms like Pikachu's cap forms
      if (formName.includes('cap') || formName.includes('costume')) {
        return;
      }
    });
  
    setAvailableForms(forms);
  };
  

  // Fetch data for the selected form
  const handleFormChange = (formName, formUrl) => {
    setForm(formName);
    fetch(formUrl)
      .then(res => res.json())
      .then(data => setCurrentPokemon(data));
  };

  if (!pokemon || !speciesData || !currentPokemon) return <div>Loading...</div>;

  return (
    <div className="pokemon-detail">
      {/* Tabs for all available forms */}
      <Tabs 
        currentForm={form} 
        setForm={handleFormChange} 
        forms={availableForms} 
      />

      {/* Main Pokemon Information */}
      <h1>{currentPokemon.name.toUpperCase()}</h1>
      <img src={currentPokemon.sprites.front_default} alt={currentPokemon.name} />
      <p>National Dex: #{currentPokemon.id}</p>
      <p>Type: {currentPokemon.types.map(type => type.type.name).join(', ')}</p>

      {/* Stats and Abilities for the current form */}
      <h2>Base Stats</h2>
      <ul>
        {currentPokemon.stats.map(stat => (
          <li key={stat.stat.name}>
            {stat.stat.name}: {stat.base_stat}
          </li>
        ))}
      </ul>
      <h2>Abilities</h2>
      <ul>
        {currentPokemon.abilities.map(ability => (
          <li key={ability.ability.name}>{ability.ability.name}</li>
        ))}
      </ul>

      {/* Evolution Chart */}
      <EvolutionChart speciesData={speciesData} onPokemonClick={navigate} />
    </div>
  );
}

export default PokemonDetail;
