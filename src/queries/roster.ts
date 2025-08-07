import { getRoster, getRosters } from "../api/roster";
import { useQuery } from '@tanstack/react-query'
import type { GetRosterResponse, Roster } from "../types";

export const useGetRosters = () => {
  const { data = {}, isLoading } = useQuery({
    queryKey: ['roster', `all`],
    queryFn: () => getRosters(),
  });
  return { rosters: data, isRostersLoading: isLoading };
};

export const useGetRosterById = (rosterId: string) => {
  const { data = {}, isFetching, refetch } = useQuery<GetRosterResponse>({
    queryKey: ['roster', `id: ${rosterId}`],
    queryFn: () => getRoster(rosterId),
  });
  const { id, name, team } = data as Roster;

  return { id, name, team, isLoading: isFetching, refetch };
};
