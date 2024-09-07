import { render, screen } from '@testing-library/react';
import { useParams, useNavigate } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import usePokemons from '../../hooks/usePokemons';

import PokemonDetail from './';

jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
  useNavigate: jest.fn(),
}));

jest.mock('../../hooks/usePokemons', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockUseParams = useParams as jest.MockedFunction<typeof useParams>;
const mockUseNavigate = useNavigate as jest.MockedFunction<typeof useNavigate>;
const mockUsePokemons = usePokemons as jest.MockedFunction<typeof usePokemons>;

const mockValues = {
  loading: false,
  pokemon: {
    name: 'Pikachu',
    height: 4,
    weight: 60,
    baseExperience: 112,
    abilities: 'Static, Lightning Rod',
    types: 'Electric',
    image: 'pikachu-image-url',
  },
  setPokemonName: jest.fn(),
  pokemons: [],
  offset: 0,
  setOffset: jest.fn()
}

describe('PokemonDetail Component', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseNavigate.mockReturnValue(mockNavigate);
  });

  it('should display loading spinner when loading is true', () => {
    mockUseParams.mockReturnValue({ name: 'pikachu' });
    mockUsePokemons.mockReturnValue({
      ...mockValues,
      loading: true,
      pokemon: null
    });

    render(<PokemonDetail />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should display pokemon details when loading is false', () => {
    mockUseParams.mockReturnValue({ name: 'pikachu' });
    mockUsePokemons.mockReturnValue(mockValues);

    render(<PokemonDetail />);

    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.getByText('4 ft')).toBeInTheDocument();
    expect(screen.getByText('60 kg')).toBeInTheDocument();
    expect(screen.getByText('112')).toBeInTheDocument();
    expect(screen.getByText('Static, Lightning Rod')).toBeInTheDocument();
    expect(screen.getByText('Electric')).toBeInTheDocument();
    expect(screen.getByAltText('Pikachu Sprite')).toHaveAttribute('src', 'pikachu-image-url');
  });

  it('should navigate back when Go Back button is clicked', async () => {
    mockUseParams.mockReturnValue({ name: 'pikachu' });
    mockUsePokemons.mockReturnValue(mockValues);

    render(<PokemonDetail />);

    const goBackButton = screen.getByText('Go Back');
    await userEvent.click(goBackButton);

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
