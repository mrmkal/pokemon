import { render, screen } from '@testing-library/react';

import usePokemons from '../../hooks/usePokemons';

import PokemonList from './';

jest.mock('../../hooks/usePokemons', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('../../components/Loading', () => () => <div>Loading...</div>);
jest.mock('./ConnectedDataTable', () => () => <div>ConnectedDataTable Mock</div>);

const mockUsePokemons = usePokemons as jest.MockedFunction<typeof usePokemons>;

describe('PokemonList Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should show loading spinner when loading is true', () => {
    mockUsePokemons.mockReturnValue({
      loading: true,
      pokemons: [],
      offset: 0,
      setOffset: jest.fn(),
      setPokemonName: jest.fn(),
      pokemon: null,
    });

    render(<PokemonList />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should show ConnectedDataTable when loading is false', () => {
    mockUsePokemons.mockReturnValue({
      loading: false,
      pokemons: [{ name: 'Pikachu' }],
      offset: 0,
      setOffset: jest.fn(),
      setPokemonName: jest.fn(),
      pokemon: null,
    });

    render(<PokemonList />);

    expect(screen.getByText('Pokémon List')).toBeInTheDocument();
  });
});
