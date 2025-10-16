import dotenv from "dotenv";
import ms from "ms";

dotenv.config();

export type Config = {
  PORT: number;
  DATABASE: string;
  DATABASE_PASSWORD: string;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: ms.StringValue;
  JWT_COOKIE_EXPIRE: number;
  OWNER_MAIL: string;
  OWNER_PASSWORD: string;
};

const gv = (adress: string) => process.env[adress];

function getValue(adress: string, defaultValue: string): string {
  const v: string | undefined = gv(adress);
  return v ?? defaultValue;
}

function _getBool(adress: string, defaultValue: boolean): boolean {
  const v: string | undefined = gv(adress);

  if (!v) return defaultValue;

  switch (v.toLowerCase()) {
    case "true":
      return true;
    case "false":
      return false;
    default:
      return defaultValue;
  }
}

function getNumber(adress: string, defaultValue: number): number {
  const v: string | undefined = gv(adress);

  if (!v) return defaultValue;

  const n = Number.isNaN(Number(v)) ? defaultValue : Number(v);
  return n;
}

export const config: Config = {
  PORT: getNumber("PORT", 8080),
  DATABASE: getValue("DATABASE", "NO_DATABASE"),
  DATABASE_PASSWORD: getValue("DATABASE_PASSWORD", "NO_PASS"),
  JWT_SECRET: getValue("JWT_SECRET", "NO_JWT"),
  JWT_EXPIRES_IN: getValue("JWT_EXPIRES_IN", "90d") as ms.StringValue,
  JWT_COOKIE_EXPIRE: getNumber("JWT_COOKIE_EXPIRE", 90),
  OWNER_MAIL: getValue("OWNER_MAIL", "owner@crm.co"),
  OWNER_PASSWORD: getValue("OWNER_PASSWORD", "owner1234"),
};
