import type { Pokemon, PokemonListItem } from "../types";

export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Takes in a url ending in '.../rest/of/path/:id/'
// And returns :id.
export const getIdFromUrl = (url: string = ''): string => {
  return url.replace(/\/$/, '').split('/').pop() ?? '';
}

export const getRandomPokemonId = (pokemonList: PokemonListItem[]): string => {
  return getIdFromUrl(pokemonList[Math.floor(Math.random() * pokemonList.length)].url);
}

export const areTeamsEqual = (teamA: Pokemon[] = [], teamB: Pokemon[] = []) => {
  if (teamA.length !== teamB.length) {
    return false;
  }
  for (let i=0; i<teamA.length; i++) {
    if (teamA[i].id !== teamB[i].id) {
      return false;
    }
  }
  return true;
};