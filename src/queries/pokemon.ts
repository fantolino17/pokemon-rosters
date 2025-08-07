import { useQuery, useQueries } from '@tanstack/react-query'
import { getPokemonById, getPokemonByType, getPokemonList, getTypeList } from '../api/pokemon'
import { useFilterAndPagination } from '../hooks/useFilterAndPagination';
import { getIdFromUrl } from '../utils/utils';

export const useGetAllPokemonByType = (typeFilter: string) => {
  const { data = {}, isLoading } = useQuery({
    queryKey: ['pokemon', `type: ${typeFilter}`],
    queryFn: () => getPokemonByType(typeFilter),
    staleTime: 'static',
  });
  const { results, totalCount } = data;
  
  return { allPokemonByType: results, isLoading, totalCount };
};

export const useGetPokemonDetails = ({ pokemonList, ids }:
  { pokemonList?: { url: string }, ids?: string[] }) => {
  const resolvedIds = pokemonList ? pokemonList.map(({ url }) => getIdFromUrl(url)) : ids;
  const results = useQueries({
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

  const isLoading = results.some(result => result.isLoading);

  return {
    pokemonDetails: isLoading ? [] : results.map(result => result.data),
    isLoading,
  };
}

export const useGetAllPokemon = () => {
  const { data = {}, isLoading } = useQuery({
    queryKey: ['all-pokemon'],
    // TODO: Make multiple requests based on responses "next" key.
    // For now, assuming no more than 2000.
    queryFn: () => getPokemonList({ offset: 0, limit: 2000 }),
    staleTime: 'static',
  });
  const { results: allPokemon = [], totalCount } = data;

  return { allPokemon, totalCount, isLoading };
}

export const useGetAllTypes = (): { allTypes: { value: string, label: string }[] } => {
  const { data: allTypes } = useQuery({
    queryKey: ['all-pokemon-types'],
    // TODO: Make multiple requests based on responses "next" key.
    // For now, assuming no more than 100.
    queryFn: () => getTypeList({ offset: 0, limit: 100 }),
    staleTime: 'static',
  });

  return { allTypes };
}

export const useGetFilteredAndPaginatedPokemonDetails = ({ allItems }) => {
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