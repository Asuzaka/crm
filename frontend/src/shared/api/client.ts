import { config } from "../config";

export async function client<TResponse>(
  endpoint: string,
  options: RequestInit = {}
): Promise<TResponse> {
  const res = await fetch(config.BACKEND_API + endpoint, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    credentials: "include",
    ...options,
  });

  if (!res.ok) {
    const msg = await res.json();
    throw new Error(msg.message || `API error: ${res.status} ${msg}`);
  }

  if (res.status === 204) {
    return { status: "success" } as unknown as TResponse;
  }

  return res.json();
}
