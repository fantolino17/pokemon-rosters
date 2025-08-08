import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Alert, Box, Button, CircularProgress, Container, Divider, Stack, Typography, TextField } from '@mui/material';
import Grid from '../../components/Grid';
import Pagination from '../../components/Pagination';
import Filter from '../../components/Filter';
import { useGetAllPokemon, useGetAllTypes, useGetAllPokemonByType, useGetFilteredAndPaginatedPokemonDetails } from '../../queries/pokemon';
import { createRoster, updateRoster } from '../../api/roster';
import { getFullRosterTeam } from '../../api/pokemon';
import { areTeamsEqual, capitalize } from '../../utils/utils';
import { useRehydratedRoster } from '../../hooks/useRehydrateRoster';
import { MAX_TEAM_SIZE } from '../../utils/constants';
import type { InfoBanner, Pokemon, PokemonListItem } from '../../types';

const RosterBuilder = () => {
  // Form state
  const [rosterName, setRosterName] = useState<string>('');
  const [rosterTeam, setRosterTeam] = useState<Pokemon[]>([]);
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [bannerInfo, setBannerInfo] = useState<InfoBanner>(null);
  const [submissionError, setSubmissionError] = useState<string>('');

  // Grid control
  const [typeFilter, setTypeFilter] = useState('');

  // React router 
  const navigate = useNavigate();

  // Pokemon
  const { allPokemon = [], isLoading: isGetAllPokemonLoading } = useGetAllPokemon();
  const { allTypes = [] } = useGetAllTypes();
  const { allPokemonByType = [], isLoading: isGetAllPokemonByType } = useGetAllPokemonByType(typeFilter);

  // Roster rehydration
  const { id: rosterId = '' } = useParams();
  const {
    name: initialRosterName,
    team: initialRosterTeam,
    isLoading: isRehydrating,
    refetch: refetchRoster,
  } = useRehydratedRoster(rosterId);

  const {
    pokemonDetails = [],
    totalCount = 0,
    page,
    pageSize,
    setPage,
    setPageSize,
    setSearchFilter,
    isLoading: isPokemonDetailsLoading,
  } = useGetFilteredAndPaginatedPokemonDetails({ allItems: typeFilter ? allPokemonByType : allPokemon })

  useEffect(() => {
    if (!isRehydrating) {
      setRosterName(initialRosterName);
      setRosterTeam(initialRosterTeam);
      setIsFormLoading(false);
    } else {
      setIsFormLoading(true);
    }
  }, [isRehydrating]);

  const resetMessaging = () => {
    setSubmissionError('');
    setBannerInfo(null);
  }

  const handleOnPokemonSelect = (pokemon: Pokemon): void => {
    if (!pokemon.id) {
      return;
    }

    let tempRoster = [];
    if (rosterTeam.some(({ id }) => id === pokemon.id)) {
      // Remove pokemon if it exists.
      tempRoster = rosterTeam.filter(({ id }) => id !== pokemon.id);
    } else if (rosterTeam.length >= MAX_TEAM_SIZE) {
      // Replace last pokemon if rosterTeam is full.
      tempRoster = [...rosterTeam.slice(0, 5), pokemon];
    } else {
      // Add pokemon if it does not exist.
      tempRoster = [...rosterTeam, pokemon];
    }

    setRosterTeam(tempRoster);
    resetMessaging();
  };

  const handleRosterNameChange = (e: { target: { value: string } }) => {
    const { value } = e.target;
    setRosterName(value);
    resetMessaging();
  };

  const handleOnRevert = () => {
    setRosterName(initialRosterName);
    setRosterTeam(initialRosterTeam);
    resetMessaging();
  };

  const handleFillRosterTeam = async () => {
    setIsFormLoading(true);
    const { team } = await getFullRosterTeam({ allPokemon, existingTeam: rosterTeam, });
    setRosterTeam(team);
    setIsFormLoading(false);
  }

  const handleOnSave = async () => {
    if (!rosterName) {
      setSubmissionError('Roster name is required.');
      return;
    }
    setIsFormLoading(true);
    
    let res, successMessage;
    const body = {
      name: rosterName,
      team: rosterTeam.map(({ id }) => id),
    };
    if (rosterId) {
      res = await updateRoster(rosterId, body);
      refetchRoster();
      successMessage = 'Saved your changes!';
    } else {
      res = await createRoster(body);
      successMessage = 'Created your roster!';
    }
    
    const { id } = res;
    if (!id) {
      setSubmissionError('Something went wrong, please try again.')
      return;
    }
    setBannerInfo({
      severity: 'success',
      message: successMessage ,
    });
    navigate(`/edit/${id}`);
  };

  const handleTypeFilterChange = ({ value }: { value: string }): void => {
    setTypeFilter(value);
    setPage(0);
  }

  // Derived state
  const showFormSpinner = isFormLoading || isRehydrating;
  const showGridSpinner = isGetAllPokemonLoading || isGetAllPokemonByType || isPokemonDetailsLoading;
  const rosterNameError = !!(submissionError && !rosterName);
  const isSubmissionButtonDisabled = rosterName === initialRosterName && areTeamsEqual(rosterTeam, initialRosterTeam);
  return (
    <>
      <Container maxWidth="xl">
          <Box sx={{ margin: '12px', minHeight: '25vh' }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr',  alignItems: 'center' }}>
            <Typography variant="h4">{rosterId ? `Editing Roster: ${isFormLoading ? '' : initialRosterName}`: 'Creating Roster' }</Typography>
              {!showFormSpinner && bannerInfo &&
                <Alert severity={bannerInfo.severity} onClose={() => setBannerInfo(null)} sx={{ padding: '2px 16px', justifySelf: 'center' }}>
                  {bannerInfo.message}
                </Alert>
              }
            </Box>
            { showFormSpinner ? (
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress sx={{ justifyContent: 'center' }}/>
              </Box>
            ) : (
              <>
                <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '100%', alignItems: 'center', marginLeft: 'auto', marginRight: 'auto' }}>
                  <Grid itemList={[...rosterTeam, ...Array(MAX_TEAM_SIZE - rosterTeam.length).fill({ name: 'Open Slot'})]} onSelect={handleOnPokemonSelect} />
                  <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'end', padding: '0px 24px' }}>
                    <TextField
                      id="roster-name"
                      label="Roster name"
                      variant="standard"
                      placeholder='Enter roster name'
                      value={rosterName}
                      onChange={handleRosterNameChange}
                      sx={{ width: '25%' }}
                      error={rosterNameError}
                      helperText={rosterNameError && "Name is required."}
                    />
                    <span>
                      {/* TODO: Add tooltips when disabled to explain why */}
                      <Button onClick={handleFillRosterTeam} variant="outlined" disabled={rosterTeam.length >= MAX_TEAM_SIZE}>
                        Fill Roster Team
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={handleOnRevert}
                        sx={{ margin: '0 5px'}}
                        disabled={isSubmissionButtonDisabled}
                      >
                        Revert
                      </Button>
                      <Button
                        variant="contained"
                        onClick={handleOnSave}
                        disabled={isSubmissionButtonDisabled}
                      >
                        Save changes
                      </Button>
                      {submissionError && <Typography color='error' variant='subtitle2'>{submissionError}</Typography>}
                    </span>
                  </Box>
                </Box>
              </>
            )}
          </Box>
        <Divider sx={{ borderBottomWidth: 'medium' }}/>

        <Box sx={{ margin: '12px' }}>
          <Typography variant="h4">Choose Your Pokemon</Typography>
          <Stack direction="row" spacing={2} sx={{ alignItems: 'start', padding: '8px 24px', width: '100%' }}>
            <Filter
              options={allTypes}
              onChange={handleTypeFilterChange}
              freeSolo={false}
              filterLabel='Filter by type'
              noOptionsText="No Types found!"
              style={{ alignSelf: 'start', button: { alignSelf: 'start'} }}
            />
            <Filter
              options={allPokemon.map((pokemon: PokemonListItem) => ({ value: pokemon.name, label: capitalize(pokemon.name) }))}
              onChange={setSearchFilter}
              filterLabel='Search'
              freeSolo
              noOptionsText="No Pokemon found!"
              style={{ alignSelf: 'end', button: { alignSelf: 'end'} }}
            />
          </Stack>
          <Divider />
          <Grid style={{ height: '35vh' }} itemList={pokemonDetails} selectedItems={rosterTeam} onSelect={handleOnPokemonSelect} isLoading={showGridSpinner} />
          <Divider />
          <Pagination page={page} pageSize={pageSize} maxPage={Math.floor(totalCount/pageSize)} onPageChange={setPage} onPageSizeChange={setPageSize} />
          <Divider />
        </Box>
      </Container>
    </>
  )
};

export default RosterBuilder;