import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Tabs from './Tabs'; // Import Tabs component
import EvolutionChart from './EvolutionChart'; // Import EvolutionChart component

const PokemonDetails = () => {
    const { id: pokemonId } = useParams(); // Fetch pokemonId from URL params
    const [pokemon, setPokemon] = useState(null);
    const [availableForms, setAvailableForms] = useState([]);
    const [currentForm, setCurrentForm] = useState({ name: 'Base Form', url: `https://pokeapi.co/api/v2/pokemon/${pokemonId}` }); // Default to base form
    const [speciesData, setSpeciesData] = useState(null);

    useEffect(() => {
        const fetchData = async (url) => {
            if (!url) return;

            console.log("Fetching Pokémon data from URL:", url); // Log the URL
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log("API Response:", data); // Log the Pokémon data
                setPokemon(data);
            } catch (error) {
                console.error("Error fetching Pokémon data:", error);
            }
        };

        // Fetch Pokémon data for the current form
        fetchData(currentForm.url);
    }, [currentForm]);

    useEffect(() => {
        const fetchSpeciesData = async () => {
            if (!pokemonId) {
                console.warn("No valid pokemonId provided.");
                return; // Exit early if pokemonId is not defined
            }

            console.log("Fetching Pokémon species data for ID:", pokemonId); // Log the pokemonId
            try {
                // Fetch species details for varieties
                const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`);
                if (!speciesResponse.ok) {
                    throw new Error(`HTTP error! status: ${speciesResponse.status}`);
                }
                const speciesData = await speciesResponse.json();
                console.log("Species Data (Varieties):", speciesData); // Log the species data
                
                setSpeciesData(speciesData); // Set the species data
            } catch (error) {
                console.error("Error fetching Pokémon species data:", error);
            }
        };

        fetchSpeciesData();
    }, [pokemonId]);

    useEffect(() => {
        if (speciesData) {
            checkForAlternateForms(speciesData.varieties);
        }
    }, [speciesData]);

    const checkForAlternateForms = (varieties) => {
        if (!Array.isArray(varieties)) {
            console.warn("Varieties is not an array:", varieties);
            return;
        }

        const forms = varieties
            .filter(variety => variety && variety.pokemon)
            .map(variety => {
                const formName = variety.pokemon.name;
                console.log(`Checking variety: ${formName}`);  // Log each form being checked

                // Adding conditions for various forms
                if (formName.includes('gmax')) return { name: 'GMAX Form', url: variety.pokemon.url };
                if (formName.includes('mega-x')) return { name: 'Mega X Form', url: variety.pokemon.url };
                if (formName.includes('mega-y')) return { name: 'Mega Y Form', url: variety.pokemon.url };
                if (formName.includes('mega')) return { name: 'Mega Form', url: variety.pokemon.url };
                if (formName.includes('alola')) return { name: 'Alolan Form', url: variety.pokemon.url };
                if (formName.includes('galar')) return { name: 'Galarian Form', url: variety.pokemon.url };
                if (formName.includes('hisui')) return { name: 'Hisuian Form', url: variety.pokemon.url };
                return null;  
            }).filter(Boolean); 

        console.log("Forms found:", forms); // Log the found forms

        forms.unshift({ name: 'Base Form', url: `https://pokeapi.co/api/v2/pokemon/${pokemonId}` });
        setAvailableForms(forms);
    };

    const handleFormChange = (name, url) => {
        console.log(`Switching to form: ${name} (${url})`);
        setCurrentForm({ name, url }); // Set the current form to the selected form
    };

    // Function to calculate the total base stats
    const calculateTotalStats = (stats) => {
        return stats.reduce((total, stat) => total + stat.base_stat,  0);
    };

    // Function to handle clicking on a Pokémon in the evolution chart
    const handlePokemonClick = (url) => {
        console.log(`Navigating to Pokémon details: ${url}`);
        // Navigate to the Pokémon details page
        window.location.href = url;
    };

    return (
        <div>
            {pokemon ? (
                <div>
                    <h2 >{pokemon.name} ({currentForm.name})</h2>
                    <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                    <h3>Available Forms:</h3>
                    <Tabs currentForm={currentForm.name} setForm={handleFormChange} forms={availableForms} />

                    <h3>Pokédex Data:</h3>
                    <ul>
                        <li><strong>National No:</strong> {pokemon.id}</li>
                        <li><strong>Type:</strong> {pokemon.types.map(type => type.type.name).join(', ')}</li>
                        <li><strong>Species:</strong> {pokemon.species.name}</li>
                        <li><strong>Height:</strong> {pokemon.height} decimeters</li>
                        <li><strong>Weight:</strong> {pokemon.weight} hectograms</li>
                        <li><strong>Abilities:</strong>
                            <ul>
                                {pokemon.abilities.map(ability => (
                                    <li key={ability.ability.name}>{ability.ability.name}</li>
                                ))}
                            </ul>
                        </li>
                    </ul>

                    <h3>Base Stats:</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Stat</th>
                                <th>Base Stat</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pokemon.stats.map(stat => (
                                <tr key={stat.stat.name}>
                                    <td>{stat.stat.name}</td>
                                    <td>{stat.base_stat}</td>
                                </tr>
                            ))}
                            <tr>
                                <td><strong>Total</strong></td>
                                <td><strong>{calculateTotalStats(pokemon.stats)}</strong></td>
                            </tr>
                        </tbody>
                    </table>

                    {speciesData && (
                        <EvolutionChart speciesData={speciesData} onPokemonClick={handlePokemonClick} />
                    )}
                </div>
            ) : (
                <p>Loading Pokémon details...</p>
            )}
        </div>
    );
};

export default PokemonDetails;