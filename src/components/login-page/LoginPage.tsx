import React, { useEffect } from "react";
import createAuthenticator from "../../authn/createAuthenticator";
import { AuthProps } from "../app";
import Page from "../page";
import Processing from "../processing";
import useQuery from "../../utils/use-query";

interface LoginProps  extends AuthProps {}

/**
 * Triggers the login process, renders just a processing indicator as the login process will cause redirects,
 * eventually to  login-cb-page
 * @param props
 * @constructor
 */
function LoginPage(props: LoginProps) {
  const authenticator = createAuthenticator();
  const {
    authentication,
  }  = props;
  let query = useQuery();
  const next = query.get('then');
  async function startLogin(state?:string) {
    const startLoginState = await authenticator.startLogin(state);
    localStorage.setItem("startLoginState", JSON.stringify(startLoginState));
    window.location.href = startLoginState.url.toString();
  }
  useEffect(() => {
    if (!authentication) {
      startLogin(next ? next : undefined);
    }
  }, [authentication, next])

  return (
      <Page>
        <Processing />
      </Page>
  );
}

export default LoginPage;
