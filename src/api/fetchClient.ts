// Wrapper around fetch to simplify requests/responses.
export async function fetchClient<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  try {
    const res = await fetch(`${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    });
    
    if (!res.ok) {
      const error = await res.text();
      throw new Error(`Error ${res.status}: ${error}`);
    }
    return await res.json();
  } catch (error) {
    console.error(`[fetchClient] Request to ${endpoint} failed:`, error);
    throw error;
  }
};
