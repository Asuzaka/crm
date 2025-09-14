import { config } from "../config";

export async function client<TRespone>(endpoint: string, options: RequestInit = {}): Promise<TRespone>{
  const res = await fetch(config.BACKEND_API + endpoint, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    }, credentials: "include", ...options,
  });



  if (!res.ok){
    const msg = await res.json();
    throw new Error( msg.message || `API error: ${res.status} ${msg}`);
  }


  return res.json();
}
