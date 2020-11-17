import { LicenseChecker } from "@10duke/web-client-pkce";

import _debug from "debug";
const debug = _debug("createLicenseChecker");

/**
 * Creates license checker for making license consumption requests.
 * @param accessToken OAuth access token.
 */
export default function createAuthenticator(
  accessToken: string
): LicenseChecker {
  const srvBase = new URL(
    process.env.REACT_APP_SRV_BASE || "https://localhost:48443"
  );
  debug("srvBase: %s", srvBase.toString());
  const entAuthzUrl = new URL(
    process.env.REACT_APP_SRV_ENT_AUTHZ_URL || "/authz/",
    srvBase
  );
  debug("ent authzUrl: %s", entAuthzUrl.toString());
  const jwksUrl = new URL(
    process.env.REACT_APP_SRV_JWKS_URL || "/.well-known/jwks.json",
    srvBase
  );
  debug("jwksUrl: %s", jwksUrl.toString());
  let hw: string | undefined = process.env.REACT_APP_HW_ID || "example-hw-1";
  if (hw && hw.trim() === "") {
    hw = undefined;
  }
  debug("hwId: %s", hw);

  return new LicenseChecker(accessToken, entAuthzUrl, jwksUrl, hw);
}
