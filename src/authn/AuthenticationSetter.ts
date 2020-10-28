import Authentication from "./Authentication";

/**
 * Sets the application authentication state.
 */
type AuthenticationSetter = (
  authn?: Authentication,
  navigateTo?: string
) => void;

export default AuthenticationSetter;
