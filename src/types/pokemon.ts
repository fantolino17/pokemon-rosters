export interface Pokemon {
  id: string;
  name: string;
  types: string[];
  imageUrl: string;
}

export interface PokemonListItem {
  name: string;
  url: string;
}

export interface GetPokemonListResponse {
  results: PokemonListItem[];
  count: number;
}

export interface GetTypeListResponse {
  value: string;
  label: string;
}

export interface GetFullRosterTeamParams {
  allPokemon: PokemonListItem[];
  existingTeam: Pokemon[];
  maxSize?: number;
  batchSize?: number;
  maxAttempts?: number;
}

export type PokemonType = {
  type: {
    name: string;
    url: string;
  };
};

export type PokemonSprite = {
  front_default: string;
};

export type PokemonDetailApiResponse = {
  name: string;
  types: PokemonType[];
  sprites: PokemonSprite;
};

export interface PokemonByTypeApiResponse {
  pokemon: { pokemon: PokemonListItem}[];
}