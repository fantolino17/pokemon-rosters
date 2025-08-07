import { MAX_TEAM_SIZE } from '../utils/constants';
import { getIdFromUrl, getRandomPokemonId } from '../utils/utils';
import { fetchClient } from './fetchClient';

const BASE_URL = 'https://pokeapi.co/api/v2'

export async function getPokemonList({ offset = 0, limit = 20 }): Promise<T> {
  const response = await fetchClient(`${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`);
  const { results, count } = response;

  return { results, totalCount: count };
}

export async function getPokemonById(id: string): Promise<T> {
  const response = await fetchClient(`${BASE_URL}/pokemon/${id}`);
  
  // Extract types and image from results.
  const types = response.types?.map(type => type.type?.name);
  const imageUrl = response.sprites?.front_default;
  const { name } = response;

  return { name, id, types, imageUrl };
}

export async function getPokemonByType(typeFilter: string) {
  if (!typeFilter) {
    return { results: [], totalCount: 0 };
  }

  const response = await fetchClient(`${BASE_URL}/type/${typeFilter}`);
  const { pokemon } = response;
  const parsedResults = pokemon
    .map(({ pokemon: item }) => ({ name: item.name, url: item.url }))

  return { results: parsedResults, totalCount: parsedResults.length };
}

export async function getTypeList({ offset = 0, limit = 20 }): Promise<{ value: string, label: string }> {
  const response = await fetchClient(`${BASE_URL}/type?offset=${offset}&limit=${limit}`);
  const { results } = response;
  const parsedResults = results.map(result => ({ label: result.name, value: getIdFromUrl(result.url) }))
    .sort((itemA, itemB) => itemA.label > itemB.label ? 1 : -1);

  return parsedResults;
}

// TODO: Clean up code by pulling repeated parts into helper functions.
export async function getFullRosterTeam({
  allPokemon,
  existingTeam,
  maxSize = MAX_TEAM_SIZE,
  batchSize = 5,
  maxAttempts = 5,
}): Promise<{ team: string[] }> {

  // If team is already full, simply return.
  if (existingTeam.length === maxSize) {
    return { team: existingTeam }
  }

  const finalTeam = [...existingTeam];
  const existingTypes = existingTeam.flatMap(pokemon => pokemon.types);
  const existingPokemonIds = existingTeam.map(pokemon => pokemon.id);
  let attempt = 0;

  // While we have more room in the team
  // and we haven't exceeded the maxAttempts to look for a unique pokemon and type.
  // We have maxAttempts bc if maxSize is large enough, eventually we cannot fill a team with unique pokemone and types,
  // So we fallback to random pokemon, regardless of type.
  while (finalTeam.length < maxSize && attempt < maxAttempts) {
    attempt++;
    
    // Get array of random pokemon IDs from list.
    const batch = [];
    while (batch.length < batchSize) {
      const randomPokemonId = getRandomPokemonId(allPokemon);
      
      // If this pokemon is already on our team or current batch, continue so we can pick a new one.
      if (existingPokemonIds.includes(randomPokemonId) || batch.includes(randomPokemonId)) continue;
      
      batch.push(getPokemonById(randomPokemonId));
    }

    // Kick off several requests in parallel.
    const responses = await Promise.all(batch);

    // For each response, see if we should add it to the team.
    for (let i=0; i<responses.length; i++) {
      const { id, name, types, imageUrl } = responses[i];
      // Check if this pokemon's types are already in our team.
      const isRepeatType = types.some((type: string) => existingTypes.includes(type));
      if (!isRepeatType) {
        finalTeam.push({
          id,
          name,
          types,
          imageUrl,
        });
        existingTypes.push(...types);
        existingPokemonIds.push(id);
      }
      // If the team is full, skip the remaining responses.
      if (finalTeam.length >= maxSize) {
        break;
      }
    }
  }

  // If we couldn't find enough unique types, fill randomly regardless of type.
  // TODO: There's a lot of repeated code below and above, we can consolidate into a helper.
  while (finalTeam.length < maxSize) {    
    // Get array of random pokemon IDs from list.
    const batch = [];
    while (batch.length < batchSize) {
      const randomPokemonId = getRandomPokemonId(allPokemon);
      // If this pokemon is already on our team or current batch, continue so we can pick a new one.
      if (existingPokemonIds.includes(randomPokemonId) || batch.includes(randomPokemonId)) continue;

      batch.push(getPokemonById(randomPokemonId));
    }

    // Kick off several requests in parallel.
    const responses = await Promise.all(batch);

    // For each response, see if we should add it to the team.
    for (let i=0; i<responses.length; i++) {
      const { id, name, types, imageUrl } = responses[i];

      finalTeam.push({ id, name, types, imageUrl });
      existingPokemonIds.push(id);

      // If the team is full, skip the remaining responses.
      if (finalTeam.length >= maxSize) {
        break;
      }
    }
  }

  return { team: finalTeam };
};