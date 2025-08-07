import { useQuery, useQueries } from '@tanstack/react-query'
import { getPokemonById, getPokemonByType, getPokemonList, getTypeList } from '../api/pokemon'
import { useFilterAndPagination } from '../hooks/useFilterAndPagination';
import type { GetPokemonListResponse, GetTypeListResponse, Pokemon, PokemonListItem } from '../types';
import { getIdFromUrl } from '../utils/utils';

export const useGetAllPokemonByType = (typeFilter: string) => {
  const { data = { results: [], count: 0 }, isLoading } = useQuery<GetPokemonListResponse>({
    queryKey: ['pokemon', `type: ${typeFilter}`],
    queryFn: () => getPokemonByType(typeFilter),
    staleTime: 'static',
  });
  const { results, count } = data;
  
  return { allPokemonByType: results, isLoading, count };
};

export const useGetPokemonDetails = ({ pokemonList, ids }: { pokemonList?: { url: string }[], ids?: string[] }): {
  pokemonDetails: Pokemon[],
  isLoading: boolean,
} => {
  const resolvedIds = pokemonList ? pokemonList.map(({ url }: { url: string }) => getIdFromUrl(url)) : ids;
  const results = useQueries<Pokemon[]>({
    queries: resolvedIds?.length
      ? resolvedIds.map((id: string) => {
        return {
          queryKey: ['pokemon', id],
          queryFn: () => getPokemonById(id),
          staleTime: 'static',
        };
      })
      : [],
  });

  const isLoading = results.some((result: { isLoading: boolean }) => result.isLoading);

  return {
    pokemonDetails: isLoading ? [] : results.map((result): Pokemon => result.data as Pokemon),
    isLoading,
  };
}

// TODO: Make multiple requests based on responses "next" key.
// For now, assuming no more than 2000.
export const useGetAllPokemon = () => {
  const { data = { results: [], count: 0}, isLoading } = useQuery<GetPokemonListResponse>({
    queryKey: ['all-pokemon'],
    queryFn: () => getPokemonList({ offset: 0, limit: 2000 }),
    staleTime: 'static',
  });
  const { results: allPokemon = [], count } = data;

  return { allPokemon, count, isLoading };
}

// TODO: Make multiple requests based on responses "next" key.
// For now, assuming no more than 100.
export const useGetAllTypes = (): { allTypes: GetTypeListResponse[] } => {
  const { data: allTypes = [] } = useQuery<GetTypeListResponse[]>({
    queryKey: ['all-pokemon-types'],
    queryFn: () => getTypeList({ offset: 0, limit: 100 }),
    staleTime: 'static',
  });

  return { allTypes };
}

export const useGetFilteredAndPaginatedPokemonDetails = ({ allItems }: { allItems: PokemonListItem[] }) => {
  // Get filtered/paginated pokemon
  const {
    results: pokemonList = [],
    totalCount = 0,
    page,
    pageSize,
    setPage,
    setPageSize,
    setSearchFilter,
  } = useFilterAndPagination({ allItems });

  // Get details associated with current list of pokemon
  const {
    pokemonDetails = [],
    isLoading,
  } = useGetPokemonDetails({ pokemonList });

  return {
    pokemonDetails,
    totalCount,
    page,
    pageSize,
    setPage,
    setPageSize,
    setSearchFilter,
    isLoading,
  };
}