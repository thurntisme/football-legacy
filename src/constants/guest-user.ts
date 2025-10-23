import { uuidv4 } from "@/lib/utils";

const team = {
  formation: "4-2-3-1",
  players: [],
};

export const GUEST_USER = {
  id: "u123",
  email: "example@football.com",
  password: "wT$$s8pGJHNVd6c9PrKg",
  fullname: "Alex John",
  budget: 2500000,
  coin: 100,
  plan: "premium",
  team,
};

export const GUEST_SECRET_KEY = "e$K#!eq32VSUZV2GWT3G";

// Simple hash function (not cryptographically secure — just for testing)
function simpleHash(input: string): string {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0; // convert to 32bit integer
  }
  return Math.abs(hash).toString(36);
}

// ✅ Create guest token
export function createGuestToken(maxAgeSeconds = 60 * 60 * 24): string {
  const payload = {
    exp: Math.floor(Date.now() / 1000) + maxAgeSeconds,
    random: uuidv4(),
  };

  const base = btoa(JSON.stringify(payload));
  const signature = simpleHash(base + GUEST_SECRET_KEY);

  return `${base}.${signature}`;
}

// ✅ Validate guest token
export function validateGuestToken(token: string): boolean {
  try {
    if (!token) return false;

    const [base, signature] = token.split(".");
    if (!base || !signature) return false;

    const expectedSig = simpleHash(base + GUEST_SECRET_KEY);
    if (expectedSig !== signature) return false; // tampered

    const payload = JSON.parse(atob(base));
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp < now) return false; // expired

    return true;
  } catch {
    return false;
  }
}
