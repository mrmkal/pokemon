import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import usePokemons from '../../hooks/usePokemons';

const PokemonDetail = () => {
  const { name } = useParams();
  const { loading, pokemon, setPokemonName } = usePokemons();

  useEffect(() => {
    if (!name) return;

    setPokemonName(name)
  }, [name, setPokemonName]);

  if (loading) {
    return (
      <div>
        Loading...
      </div>
    )
  }

  return (
    <div className="container mx-auto">
      <h1 className="my-12 text-center text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl capitalize">
        {pokemon?.name}
      </h1>
      <div className="mx-auto flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl">
        <div className="flex flex-col justify-between p-4 leading-normal">
          <p className="mb-3 font-normal text-gray-700">
            <strong>Height:</strong> { `${pokemon?.height} ft` }
          </p>
          <p className="mb-3 font-normal text-gray-700">
            <strong>Weight:</strong> { `${pokemon?.weight} kg` }
          </p>
          <p className="mb-3 font-normal text-gray-700">
            <strong>Base experience:</strong> { pokemon?.base_experience }
          </p>
          <p className="mb-3 font-normal text-gray-700">
            <strong>Abilities:</strong> { pokemon?.abilities }
          </p>
          <p className="mb-3 font-normal text-gray-700">
            <strong>Types:</strong> { pokemon?.types }
          </p>
        </div>
      </div>
    </div>
  )
}

export default PokemonDetail;
