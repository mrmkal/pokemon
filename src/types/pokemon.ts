export type Pokemon = {
  name: string;
  height: number;
  weight: number;
  baseExperience: number;
  abilities: string;
  types: string;
  image?: string;
};

export type PokemonResponse = {
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  abilities: {
    ability: {
      name: string;
      url: string;
    }
  }[];
  types: {
    type: {
      name: string;
      url: string;
    }
  }[];
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      }
    }
  }
  image?: string;
};

export type AbilitiesTypesResponse = {
  names: {
    language: {
      name: string;
      url: string;
    },
    name: string;
  }[]
};
