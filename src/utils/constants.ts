export const PATHS = {
  BASE: { value: '/', label: 'Home'},
  LIST: { value: '/rosters', label: 'View Rosters'},
  EDIT: { value: '/edit/:id', label: 'Edit Rosters'},
  CREATE: { value: '/create', label: 'Create Roster'},
  ERROR: { value: '*', label: 'Page Not Found'},
};

export const MAX_TEAM_SIZE = 6;

export const BASE_POKEMON_API_URL = 'https://pokeapi.co/api/v2'
export const BASE_POKEMON_ROSTERS_SERVICE_URL = 'https://pokemon-rosters-service.onrender.com';
// Uncomment below for local development
// export const BASE_POKEMON_ROSTERS_SERVICE_URL = 'http://localhost:3000';