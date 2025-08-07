import { useGetRosterById } from '../queries/roster';
import { useGetPokemonDetails } from '../queries/pokemon';
import type { Pokemon } from '../types';

export const useRehydratedRoster = (rosterId: string): {
  name: string,
  team: Pokemon[],
  isLoading: boolean,
  refetch: () => void,
} => {
  const {
    name = '',
    team: teamMemberIds = [],
    isLoading: isRosterLoading,
    refetch,
  } = useGetRosterById(rosterId);

  const {
    pokemonDetails: team = [],
    isLoading: isPokemonDetailsLoading,
  } = useGetPokemonDetails({ ids: teamMemberIds });

  const isLoading = isRosterLoading || isPokemonDetailsLoading;

  return { name, team, isLoading, refetch };
};