import { env } from "@/config/env";
import { UserManager, UserManagerSettings, Log } from "oidc-client-ts";

Log.setLevel(Log.DEBUG);

const settings: UserManagerSettings = {
  authority: env.authServerUrl,
  client_id: env.clientId,
  redirect_uri: "http://localhost:3000/callback",
  response_type: "code",
  scope: "openid profile email roles api",
  post_logout_redirect_uri: "http://localhost:3000/",
  automaticSilentRenew: true,
  fetchRequestCredentials: "include",
};

const userManager = new UserManager(settings);

export function signIn() {
  userManager
    .signinRedirect()
    .then(() => {
      console.log("Signin redirect başlatıldı");
    })
    .catch((error) => {
      console.error("Signin redirect hatası:", error);
    });
}

export async function handleSigninCallback(): Promise<void> {
  try {
    const user = await userManager.signinRedirectCallback();
    console.log("Kullanıcı doğrulandı:", user);
  } catch (error) {
    console.error("Callback işleme hatası:", error);
  }
}

export function signOut() {
  userManager.signoutRedirect().catch((error) => {
    console.error("Signout redirect error:", error);
  });
}

export const getUser = async () => {
  return await userManager.getUser();
};

export const isAuthenticated = async () => {
  const user = await getUser();
  return user !== null;
};
