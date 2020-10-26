import React, { useEffect } from "react";
import AuthenticationSetter from "../../authn/AuthenticationSetter";
import createAuthenticator from "../../authn/createAuthenticator";
import useQuery from "../../utils/use-query";
import { AuthProps } from "../app";
import Page from "../page";

interface SignoutCbProps extends AuthProps {}

async function handleIdpLogoutRequest(
  setAuthentication: AuthenticationSetter,
  state?: string
) {
  setAuthentication();
  const authenticator = createAuthenticator();
  const handleLogoutRequestResponse = await authenticator.handleLogoutRequest(
    state
  );
  window.location.href = handleLogoutRequestResponse.url.toString();
}

/**
 * Signout callback page for getting the not logged in state. Updates authentication status, which in turn triggers navigation,
 * causing this page content to never actually being visible.
 * @param props
 * @constructor
 */
function SignoutCbPage(props: SignoutCbProps) {
  const { setAuthentication } = props;

  const query = useQuery();
  const success = query.get("success");
  const state = query.get("RelayState") || undefined;

  useEffect(() => {
    if (success) {
      // success parameter present -> this is callback for logout started by this application
      setAuthentication(undefined, state);
    } else {
      // success parameter not present -> single sign-out started by the identity provider
      handleIdpLogoutRequest(setAuthentication, state);
    }
  }, [success, state, setAuthentication]);

  return <Page>TODO: implement logout callback</Page>;
}

export default SignoutCbPage;
