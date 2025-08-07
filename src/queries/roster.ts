import { getRoster, getRosters } from "../api/roster";
import { useQuery } from '@tanstack/react-query'


// TODO: Maybe add onRefreshClick prop
export const useGetRosters = () => {
  const { data = {}, isLoading } = useQuery({
    queryKey: ['roster', `all`],
    queryFn: () => getRosters(),
  });
  return { rosters: data, isRostersLoading: isLoading };
};

export const useGetRosterById = (rosterId: string) => {
  const { data = {}, isFetching, refetch } = useQuery({
    queryKey: ['roster', `id: ${rosterId}`],
    queryFn: () => getRoster(rosterId),
    // staleTime: 'static',
  });
  const { id, name, team } = data;

  return { id, name, team, isLoading: isFetching, refetch };
};
