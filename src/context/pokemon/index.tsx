import { createContext, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';

import { Pokemon } from '../../types/pokemon';

const LIMIT = 10;

interface IPokemonProviderProps {
  children: ReactNode;
}

export interface IPokemonContextValues {
  loading: boolean;
  pokemons: Pokemon[] | [];
  setOffset: (value: number) => void;
  setPokemonUrl: (url: string) => void;
  selectedPokemon: Pokemon | {};
}

const PokemonContext = createContext<IPokemonContextValues | null>(null);

const PokemonProvider = ({ children }: IPokemonProviderProps) => {
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [pokemons, setPokemons] = useState<Pokemon[] | []>([]);
  const [selectedPokemon, setSelectedPokemon] = useState({});
  const [pokemonUrl, setPokemonUrl] = useState('');

  const getPokemons = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${LIMIT}&offset=${offset}`, {
        method: 'GET'
      });
      const list = await response.json();
      setPokemons(list.results);
    } catch (error) {
      console.error("Error fetching Pokemons:", error);
    } finally {
      setLoading(false);
    }
  }, [offset]);

  const getPokemonDetail = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(pokemonUrl, {
        method: 'GET'
      });
      const pokemon = await response.json();
      setSelectedPokemon(pokemon);
    } catch (error) {
      console.error("Error fetching Pokemons:", error);
    } finally {
      setLoading(false);
    }
  }, [pokemonUrl]);

  useEffect(() => {
    getPokemons();
  }, [getPokemons]);

  useEffect(() => {
    if (!pokemonUrl.length) return;

    getPokemonDetail();
  }, [getPokemonDetail, pokemonUrl])

  const contextValue = useMemo(() => ({
    loading,
    pokemons,
    setOffset,
    setPokemonUrl,
    selectedPokemon
  }), [loading, pokemons, selectedPokemon]);

  return (
    <PokemonContext.Provider value={contextValue}>
      { children }
    </PokemonContext.Provider>
  )
}

export { PokemonContext, PokemonProvider };
