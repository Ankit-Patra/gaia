import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './components/HomePage';
import Pokedex from './components/PokeDex';
import WeaknessChart from './components/WeaknessChart';
import Contact from './components/Contact';
import Header from './components/Header';
import PokemonDetails from './components/PokemonDetails';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/pokedex" element={<Pokedex />} />
          <Route path="/weakness-chart" element={<WeaknessChart />} />
          <Route path="/contact" element={<Contact />} />
          {/* Route for Pokémon details, expecting an ID */}
          <Route path="/pokemon/:id" element={<PokemonDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
