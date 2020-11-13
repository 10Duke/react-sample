import { Authentication } from "@10duke/web-client-pkce";

/**
 * Sets the application authentication state.
 */
type AuthenticationSetter = (
  authn?: Authentication,
  navigateTo?: string
) => void;

export default AuthenticationSetter;
