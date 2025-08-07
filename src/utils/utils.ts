export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Takes in a url ending in '.../rest/of/path/:id/'
// And returns :id.
export const getIdFromUrl = (url = '') => {
  return url.replace(/\/$/, '').split('/').pop();
}

export const getRandomPokemonId = (pokemonList: { name: string, url: string }[]): string => {
  return getIdFromUrl(pokemonList[Math.floor(Math.random() * pokemonList.length)].url);
}

export const areTeamsEqual = (teamA = [], teamB = []) => {
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