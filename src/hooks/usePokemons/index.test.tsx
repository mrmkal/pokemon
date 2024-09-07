import { renderHook } from '@testing-library/react';

import { PokemonContext } from '../../context/pokemon';
import usePokemons from './';

describe('usePokemons Hook', () => {
  it.skip('should throw an error when context is not wrapped in PokemonProvider', () => {
    expect(renderHook(() => usePokemons())).toThrow('Missing PokemonContext Provider');
  });

  it('should return the context value when wrapped with PokemonProvider', () => {
    const mockContextValue = {
      loading: false,
      pokemons: [{ name: 'bulbasaur' }, { name: 'ivysaur' }],
      offset: 0,
      setOffset: jest.fn(),
      setPokemonName: jest.fn(),
      pokemon: null,
    };

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <PokemonContext.Provider value={mockContextValue}>
        {children}
      </PokemonContext.Provider>
    );

    const { result } = renderHook(() => usePokemons(), { wrapper });

    expect(result.current).toBe(mockContextValue);
    expect(result.current.loading).toBe(false);
    expect(result.current.pokemons).toEqual([{ name: 'bulbasaur' }, { name: 'ivysaur' }]);
  });
});
