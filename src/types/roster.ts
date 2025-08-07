export interface Roster {
  id: string;
  name: string;
  team: string[]; // array of Ids
}

export interface RosterInput {
  name: string;
  team: string[];
}

export interface RosterResponse {
  id: string;
  name?: string;
  team?: string[];
}

export type GetRostersResponse = Roster[];

export type GetRosterResponse = Roster | { id: null } | { error: unknown };

export type CreateRosterResponse = { id?: string, error?: unknown };

export type UpdateRosterResponse = RosterResponse | { id?: string, error?: unknown };

export type DeleteRosterResponse = { id?: string, error?: unknown };
