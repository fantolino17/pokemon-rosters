import { fetchClient } from "./fetchClient";

const BASE_URL = 'http://localhost:3000';

export async function getRosters(): Promise<[]> {
  try {
    return await fetchClient(`${BASE_URL}/roster`);
  } catch (error) {
    console.error('[getRosters] ', error);
    return [];
  }
}

export async function getRoster(rosterId: string): Promise<{}> {
  try {

    if (!rosterId) {
      return { id: null };
    }
    const response = await fetchClient(`${BASE_URL}/roster/${rosterId}`);
    const { id, name, team } = response;
    
    return { id, name, team };
  } catch (error) {
    console.error('[getRoster] ', error);
    return { error };
  }
}

export async function createRoster(roster: { name: string, team: string[] }): Promise<{}> {
  try {
    const response = await fetchClient(`${BASE_URL}/roster`, {
      method: 'POST',
      body: JSON.stringify(roster),
    });
    
    const { id } = response;
    
    return { id };
  } catch (error) {
    console.error('[createRoster] ', error);
    return { error };
  }
}

export async function updateRoster(id: string, roster: { name: string, team: string[] }): Promise<{}> {
  try {
    const response = await fetchClient(`${BASE_URL}/roster/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(roster),
    });

    const { name, team} = response;

    return { id, name, team };
  } catch (error) {
    console.error('[updateRoster] ', error);
    return { error };
  }
}

export async function deleteRoster(id: string): Promise<{ }> {
  try {
    const response = await fetchClient(`${BASE_URL}/roster/${id}`, {
      method: 'DELETE',
    });
    const roster = response?.[0];

    return { id: roster?.id };
  } catch (error) {
    console.log('[deleteRoster] ', error);
    return { error }
  }
  
}