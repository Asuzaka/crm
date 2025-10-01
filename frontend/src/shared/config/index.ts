/* eslint-disable @typescript-eslint/no-unused-vars */
function getString(key: string, backup: string, crit: boolean): string {
  const v: string | undefined = import.meta.env["VITE_" + key];
  if (!v) {
    if (!crit) {
      return backup;
    }
    throw new Error(`Missing env var: ${key}`);
  }
  return v;
}

function getNumber(key: string, backup: number, crit: boolean): number {
  const v: string = getString(key, "no", crit);

  if (v === "no") {
    return backup;
  }

  const n = Number.isNaN(Number(v)) ? backup : Number(v);
  return n;
}

function getBool(key: string, backup: boolean, crit: boolean): boolean {
  const v: string = getString(key, "no", crit);

  if (v === "no") {
    return backup;
  }

  switch (v.toLowerCase()) {
    case "true":
      return true;
    case "false":
      return false;
    default:
      return backup;
  }
}
/* eslint-enable @typescript-eslint/no-unused-vars */

interface Config {
  BACKEND_API: string;
  // other elements...
}

export const config: Config = {
  BACKEND_API: getString("BACKEND_API", "http://localhost:8080", false),
};
