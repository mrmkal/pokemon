import usePokemons from '../../hooks/usePokemons';
import Loading from '../../components/Loading';

import DataTableConnected from './DataTableConnected';

const PokemonList = () => {
  const { loading } = usePokemons();

  if (loading) {
    return (
      <Loading />
    )
  }

  return (
    <div className="container mx-auto my-4">
      <h1 className="my-12 text-center text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
        Pokémon List
      </h1>
      <DataTableConnected />
    </div>
  )
}

export default PokemonList;
