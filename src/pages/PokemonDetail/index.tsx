import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import usePokemons from '../../hooks/usePokemons';
import Button from '../../components/Button';
import Loading from '../../components/Loading';

const PokemonDetail = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const { loading, pokemon, setPokemonName } = usePokemons();

  useEffect(() => {
    if (!name) return;

    setPokemonName(name)
  }, [name, setPokemonName]);

  if (loading) {
    return (
      <Loading />
    )
  }

  return (
    <div className="container mx-auto my-8">
      <Button
        handleClick={() => navigate('/')}
      >
        Go Back
      </Button>
      <h1 className="my-12 text-center text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl capitalize">
        {pokemon?.name}
      </h1>
      <div className="mx-auto flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl">
        <img
          className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
          src={pokemon?.image}
          alt={`${pokemon?.name} Sprite`}
        />
        <div className="p-4 leading-normal">
          <p className="mb-3 font-normal text-gray-700">
            <strong>Height:</strong> { `${pokemon?.height} ft` }
          </p>
          <p className="mb-3 font-normal text-gray-700">
            <strong>Weight:</strong> { `${pokemon?.weight} kg` }
          </p>
          <p className="mb-3 font-normal text-gray-700">
            <strong>Base experience:</strong> { pokemon?.baseExperience }
          </p>
          <p className="mb-3 font-normal text-gray-700">
            <strong>Abilities:</strong> { pokemon?.abilities }
          </p>
          <p className="font-normal text-gray-700">
            <strong>Types:</strong> { pokemon?.types }
          </p>
        </div>
      </div>
    </div>
  )
}

export default PokemonDetail;
