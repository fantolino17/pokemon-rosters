import type { CreateRosterResponse, DeleteRosterResponse, GetRosterResponse, GetRostersResponse, Roster, UpdateRosterResponse } from "../types";
import { fetchClient } from "./fetchClient";

const BASE_URL = 'http://localhost:3000';

export async function getRosters(): Promise<GetRostersResponse> {
  try {
    return await fetchClient(`${BASE_URL}/roster`);
  } catch (error) {
    console.error('[getRosters] ', error);
    return [];
  }
}

export async function getRoster(rosterId: string): Promise<GetRosterResponse> {
  try {

    if (!rosterId) {
      return { id: null };
    }
    const response = await fetchClient(`${BASE_URL}/roster/${rosterId}`) as Roster;
    const { id, name, team } = response;
    
    return { id, name, team };
  } catch (error) {
    console.error('[getRoster] ', error);
    return { error };
  }
}

export async function createRoster(roster: Partial<Roster>): Promise<CreateRosterResponse> {
  try {
    const response = await fetchClient(`${BASE_URL}/roster`, {
      method: 'POST',
      body: JSON.stringify(roster),
    });
    
    const { id } = response as { id: string };
    
    return { id };
  } catch (error) {
    console.error('[createRoster] ', error);
    return { error };
  }
}

export async function updateRoster(id: string, roster: Partial<Roster>): Promise<UpdateRosterResponse> {
  try {
    const response = await fetchClient(`${BASE_URL}/roster/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(roster),
    });

    const { name, team} = response as { name: string, team: string[] };

    return { id, name, team };
  } catch (error) {
    console.error('[updateRoster] ', error);
    return { error };
  }
}

export async function deleteRoster(id: string): Promise<DeleteRosterResponse> {
  try {
    const response = await fetchClient(`${BASE_URL}/roster/${id}`, {
      method: 'DELETE',
    }) as { id: string }[];
    const roster = response?.[0];

    return { id: roster?.id };
  } catch (error) {
    console.log('[deleteRoster] ', error);
    return { error }
  }
  
}