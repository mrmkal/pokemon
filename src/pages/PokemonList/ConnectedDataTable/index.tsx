import { useNavigate } from 'react-router-dom';

import { DataTable } from '../../../components/DataTable';
import usePokemons from '../../../hooks/usePokemons';
import Button from '../../../components/Button';

const COLUMNS = [
  {
    header: 'Name',
    accessor: 'name'
  },
  {
    header: '',
    accessor: 'cta'
  }
]

const ConnectedDataTable = () => {
  const navigate = useNavigate();
  const { pokemons, setPokemonUrl } = usePokemons();

  if (!pokemons.length) {
    return (
      <>
        No Pokemons
      </>
    )
  }

  function goToDetail(url: string) {
    setPokemonUrl(url);
    navigate(`/pokemon-detail/`);
  }

  const pokemonsWithCta = pokemons.map(pokemon => ({
    ...pokemon,
    cta: <Button handleClick={() => goToDetail(pokemon.url)}>Go to Detail</Button>
  }))

  return (
    <DataTable
      //@ts-ignore
      columns={COLUMNS}
      data={pokemonsWithCta}
    />
  )
};

export default ConnectedDataTable;
