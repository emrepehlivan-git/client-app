import { type NextAuthOptions, type DefaultSession } from "next-auth";
import { getServerSession } from "next-auth";
import { generateCodeChallenge, generateCodeVerifier } from "./oauthHelpers";
import { axiosClient } from "./axiosClient";

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
        params: {
          scope: "openid profile email roles",
          response_type: "code",
          code_challenge_method: "S256",
          code_challenge: generateCodeChallenge(generateCodeVerifier()),
        },
        url: `${issuer}/connect/authorize`,
      },
      accessTokenUrl: `${issuer}/connect/token`,
      requestTokenUrl: `${issuer}/connect/token`,
      profileUrl: `${issuer}/connect/userinfo`,
      userinfo: `${issuer}/connect/userinfo`,
      profile: async (profile) => {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
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
  callbacks: {
    async jwt({ token }) {
      const { data: user } = await axiosClient.get(
        `${issuer}/connect/userinfo`,
        {
          headers: {
            Authorization: `Bearer ${token.accessToken}`,
          },
        }
      );
      if (user) {
        token.id = user.sub;
        token.name = user.fullName;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id as string,
        email: token.email,
        name: token.name,
        role: token.role as string[],
      };
      return session;
    },
  },
};

export const getAuthSession = async () => {
  const session = await getServerSession(authOptions);
  return session;
};

declare module "next-auth" {
  interface Session {
    user: {
      id?: string | null;
      role?: string[] | null;
    } & DefaultSession["user"];
  }
}
