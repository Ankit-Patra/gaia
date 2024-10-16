import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './components/HomePage';
import Pokedex from './components/PokemonCard';
import WeaknessChart from './components/WeaknessChart';
import Contact from './components/Contact';
import Header from './components/Header';

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
        </Routes>
      </div>
    </Router>
  );
}
export default App;
