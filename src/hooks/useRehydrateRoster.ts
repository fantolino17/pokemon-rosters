import { useGetRosterById } from '../queries/roster';
import { useGetPokemonDetails } from '../queries/pokemon';

export const useRehydratedRoster = (rosterId: string) => {
  console.log('isRehydrating inside useRehydratedRoster')
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
  console.log('isRehydrating inside isLoading', isRosterLoading)

  return { name, team, isLoading, refetch };
};