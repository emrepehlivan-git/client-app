import { type AppUser } from "@/interfaces/app-user";
import { type NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import { generateCodeChallenge, generateCodeVerifier } from "./oauthHelpers";

const issuer = process.env.NEXT_PUBLIC_AUTH_SERVER_URL;
const clientId = process.env.NEXT_PUBLIC_OPENIDDICT_CLIENT_ID;

export const authOptions: NextAuthOptions = {
  providers: [
    {
      id: "openiddict",
      name: "OpenIddict",
      type: "oauth",
      clientId,
      clientSecret: "",
      wellKnown: `${issuer}/.well-known/openid-configuration`,
      authorization: {
        url: `${issuer}/connect/authorize`,
        params: {
          scope: "openid profile email roles offline_access",
          response_type: "code",
          code_challenge_method: "S256",
          code_challenge: generateCodeChallenge(generateCodeVerifier()),
        },
      },
      token: {
        url: `${issuer}/connect/token`,
        params: {
          grant_type: "authorization_code",
        },
      },
      userinfo: `${issuer}/connect/userinfo`,
      profile: (profile: AppUser) => {
        console.log("profile", profile);
        return {
          id: profile.sub,
          name: profile.fullName,
          email: profile.email,
          role: profile.role,
        };
      },
      checks: ["pkce"],
    },
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

export const getAuthSession = async () => {
  const session = await getServerSession(authOptions);
  return session;
};
