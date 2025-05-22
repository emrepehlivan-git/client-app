import crypto from "crypto";

export const generateCodeVerifier = () => {
  return crypto.randomBytes(32).toString("hex");
};

export const generateCodeChallenge = (codeVerifier: string) => {
  return crypto.createHash("sha256").update(codeVerifier).digest("hex");
};
