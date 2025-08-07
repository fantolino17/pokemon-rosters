import { useEffect, useMemo, useState } from 'react';

// TODO: Accept filter function prop so other consumers can customize.
export const useFilterAndPagination = ({
  allItems,
}) => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [searchFilter, setSearchFilter] = useState('');
  
  useEffect(() => {
    setPage(0);
  }, [searchFilter])

  // Memo to avoid potentially costly calculations.
  const { results, totalCount } = useMemo(() => {
    const offset = page * pageSize;

    const searchedResults = searchFilter
    ? allItems.filter(item => item.name.toLowerCase().includes(searchFilter.toLowerCase()))
    : allItems;
    
    // Get results within current page.
    const paginatedResults = searchedResults.slice(offset, offset + pageSize);

    return { results: paginatedResults, totalCount: searchedResults.length };
  }, [allItems, searchFilter, page, pageSize,]);

  return {
    results,
    totalCount,
    page,
    pageSize,
    setPage,
    setPageSize,
    setSearchFilter,
  }
};
