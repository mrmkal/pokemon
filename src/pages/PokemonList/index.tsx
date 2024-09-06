import usePokemons from '../../hooks/usePokemons';

import ConnectedDataTable from './ConnectedDataTable';

const PokemonList = () => {
  const { loading } = usePokemons();

  if (loading) {
    return (
      <div>
        Loading...
      </div>
    )
  }

  return (
    <div className="container mx-auto my-4">
      <h1 className="my-12 text-center text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
        Pokémon List
      </h1>
      <ConnectedDataTable />
    </div>
  )
}

export default PokemonList;
