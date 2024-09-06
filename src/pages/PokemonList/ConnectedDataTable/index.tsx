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
];

const ConnectedDataTable = () => {
  const navigate = useNavigate();
  const { pokemons, setOffset, offset } = usePokemons();

  if (!pokemons.length) {
    return (
      <>
        No Pokemons
      </>
    )
  }

  function goToDetail(name: string) {
    navigate(`/pokemon-detail/${name}`);
  }

  const pokemonsWithCta = pokemons.map(pokemon => ({
    ...pokemon,
    cta: <Button handleClick={() => goToDetail(pokemon.name)}>Go to Detail</Button>
  }))

  return (
    <DataTable
      columns={COLUMNS}
      data={pokemonsWithCta}
      offset={offset}
      previousPage={() => setOffset(currentValue => currentValue - 10)}
      nextPage={() => setOffset(currentValue => currentValue + 10)}
    />
  )
};

export default ConnectedDataTable;
