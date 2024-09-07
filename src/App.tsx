import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import { PokemonProvider } from './context/pokemon';
import PokemonList from './pages/PokemonList';
import PokemonDetail from './pages/PokemonDetail';

function App() {
  return (
    <PokemonProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<PokemonList />}
          />
          <Route
            path="/pokemon-detail/:name"
            element={<PokemonDetail />}
          />
        </Routes>
      </Router>
    </PokemonProvider>
  );
}

export default App;
