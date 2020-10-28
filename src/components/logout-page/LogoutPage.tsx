import React, { useEffect } from "react";
import AuthenticationSetter from "../../authn/AuthenticationSetter";
import createAuthenticator from "../../authn/createAuthenticator";
import useQuery from "../../utils/use-query";
import { AuthProps } from "../app";
import Page from "../page";
import Processing from "../processing";

interface LogoutProps extends AuthProps {}

async function startLogout(
  setAuthentication: AuthenticationSetter,
  state?: string
) {
  setAuthentication();
  const authenticator = createAuthenticator();
  const startLogoutResponse = await authenticator.startLogout(state);
  window.location.href = startLogoutResponse.url.toString();
}

/**
 * Triggers the logout process, renders just a processing indicator as the logout process will cause redirects,
 * eventually to  signout-cb-page
 * @param props
 * @constructor
 */
function LogoutPage(props: LogoutProps) {
  const { authentication, setAuthentication } = props;

  let query = useQuery();
  const next = query.get("then");

  useEffect(() => {
    if (authentication) {
      startLogout(setAuthentication, next ? next : undefined);
    }
  }, [authentication, next, setAuthentication]);

  return (
    <Page>
      <Processing />
    </Page>
  );
}

export default LogoutPage;
