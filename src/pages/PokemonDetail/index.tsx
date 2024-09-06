import usePokemons from '../../hooks/usePokemons';

const PokemonDetail = () => {
  const { loading, selectedPokemon } = usePokemons();

  console.log('selectedPokemon', selectedPokemon);

  if (loading) {
    return (
      <div>
        Loading...
      </div>
    )
  }

  return (
    <div>
      Pokemon Detail
    </div>
  )
}

export default PokemonDetail;
