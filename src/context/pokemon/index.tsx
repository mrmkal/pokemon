import { createContext, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';

const LIMIT = 10;

interface IPokemonProviderProps {
  children: ReactNode;
}

interface IPokemons {
  name: string;
  url: string;
}

export interface IPokemonContextValues {
  loading: boolean;
  pokemons: IPokemons | [];
  setOffset: (value: number) => void;
  setPokemonUrl: (url: string) => void;
  selectedPokemon: IPokemons | {};
}

const PokemonContext = createContext<IPokemonContextValues | null>(null);

const PokemonProvider = ({ children }: IPokemonProviderProps) => {
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [pokemons, setPokemons] = useState<IPokemons | []>([]);
  const [selectedPokemon, setSelectedPokemon] = useState({});
  const [pokemonUrl, setPokemonUrl] = useState('');

  const getPokemons = useCallback(async () => {
    try {
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
      const response = await fetch(pokemonUrl, {
        method: 'GET'
      });
      const list = await response.json();
      setSelectedPokemon(list.results);
    } catch (error) {
      console.error("Error fetching Pokemons:", error);
    } finally {
      setLoading(false);
    }
  }, [pokemonUrl]);

  useEffect(() => {
    if (pokemonUrl) {
      getPokemonDetail();
    }
    getPokemons();
  }, [getPokemons, getPokemonDetail, pokemonUrl]);

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
