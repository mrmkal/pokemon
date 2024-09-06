import './App.css';
import Test from './components/test';
import { PokemonProvider } from './context/pokemon';

function App() {
  return (
    <PokemonProvider>
      <Test />
    </PokemonProvider>
  );
}

export default App;
