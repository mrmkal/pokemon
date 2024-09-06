import { useContext } from 'react';

import { PokemonContext } from '../../context/pokemon';

function usePokemons() {
  const contextValue = useContext(PokemonContext);

  if (!contextValue) {
    throw new Error('Missing PokemonContext Provider');
  }

  return contextValue;
}

export default usePokemons;
