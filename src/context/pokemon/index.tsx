import { createContext, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Pokemon } from '../../types/pokemon';

const LIMIT = 10;

interface IPokemonProviderProps {
  children: ReactNode;
}

export interface IPokemonContextValues {
  loading: boolean;
  pokemons: Pick<Pokemon, 'name' | 'url'>[] | [];
  offset: number;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
  setPokemonName: React.Dispatch<React.SetStateAction<string | undefined>>;
  pokemon: Pokemon | null;
}

const PokemonContext = createContext<IPokemonContextValues | null>(null);

const PokemonProvider = ({ children }: IPokemonProviderProps) => {
  const { name } = useParams();
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [pokemons, setPokemons] = useState<Pokemon[] | []>([]);
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [pokemonName, setPokemonName] = useState(name);

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
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`, {
        method: 'GET'
      });
      const pokemon = await response.json();

      const abilitiesResponse = await Promise.all(pokemon.abilities.map(async (ability: any) => {
        const abilityResponse = await fetch(ability.ability.url);
        const abil = await abilityResponse.json();
        const name = abil.names.find((name: any) => name.language.name === 'en').name;
        return name;
      }));

      const typesResponse = await Promise.all(pokemon.types.map(async (type: any) => {
        const abilityResponse = await fetch(type.type.url);
        const abil = await abilityResponse.json();
        const name = abil.names.find((name: any) => name.language.name === 'en').name;
        return name;
      }));

      setPokemon({
        name: pokemon.name,
        url: pokemon.url,
        height: pokemon.height,
        weight: pokemon.weight,
        base_experience: pokemon.base_experience,
        abilities: abilitiesResponse.join(', '),
        types: typesResponse.join(', ')
      });
    } catch (error) {
      console.error("Error fetching Pokemons:", error);
    } finally {
      setLoading(false);
    }
  }, [pokemonName]);

  useEffect(() => {
    getPokemons();
  }, [getPokemons]);

  useEffect(() => {
    if (!pokemonName?.length) return;

    getPokemonDetail();
  }, [getPokemonDetail, pokemonName])

  const contextValue = useMemo(() => ({
    loading,
    pokemons,
    offset,
    setOffset,
    setPokemonName,
    pokemon
  }), [loading, pokemons, pokemon, offset]);

  return (
    <PokemonContext.Provider value={contextValue}>
      { children }
    </PokemonContext.Provider>
  )
}

export { PokemonContext, PokemonProvider };
