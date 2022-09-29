import { Authenticator } from "@10duke/web-client-pkce";

import _debug from "debug";
const debug = _debug("createAuthenticator");

/**
 * Creates authenticator for handling authentication requests.
 * @param loginCallbackPath Internal route for login callback, without leading slash.
 *    Used by this method for constructing OAuth redirect_uri.
 */
export default function createAuthenticator(
  loginCallbackPath: string = "logincb"
): Authenticator {
  const srvBase = new URL(
    process.env.REACT_APP_SRV_BASE || "https://localhost:48443"
  );
  debug("srvBase: %s", srvBase.toString());
  const clientId = process.env.REACT_APP_CLIENT_ID || "duke-test-client";
  debug("clientId: %s", clientId);
  const authzUrl = new URL(
    process.env.REACT_APP_SRV_OAUTH_AUTHZ_URL || "/user/oauth20/authz",
    srvBase
  );
  debug("OAuth authzUrl: %s", authzUrl.toString());
  const tokenUrl = new URL(
    process.env.REACT_APP_SRV_OAUTH_TOKEN_URL || "/user/oauth20/token",
    srvBase
  );
  debug("OAuth tokenUrl: %s", tokenUrl.toString());
  const sloUrl = new URL(
    process.env.REACT_APP_SRV_SLO_URL || "/user/oauth20/signout",
    srvBase
  );
  debug("sloUrl: %s", sloUrl.toString());
  const jwksUrl = new URL(
    process.env.REACT_APP_SRV_JWKS_URL || "/user/.well-known/jwks.json",
    srvBase
  );
  debug("jwksUrl: %s", jwksUrl.toString());
  const scope =
    process.env.REACT_APP_OAUTH_SCOPE ||
    "openid profile email https://apis.10duke.com/auth/openidconnect/organization";
  debug("scope: %s", scope.toString());

  const currentUrl = new URL(window.location.href);
  const appBase = process.env.REACT_APP_BASE || "/";
  const redirectUrlAsString = `${currentUrl.protocol}//${currentUrl.host}${appBase}${loginCallbackPath}`;
  debug("redirectUrl: %s", redirectUrlAsString);
  const redirectUrl = new URL(redirectUrlAsString);

  return new Authenticator(
    authzUrl,
    tokenUrl,
    sloUrl,
    jwksUrl,
    clientId,
    redirectUrl,
    scope
  );
}
