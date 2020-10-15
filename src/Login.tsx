import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import createAuthenticator from "./authn/createAuthenticator";
import {AuthProps} from "./App";
import Page from "./Page";
import Processing from "./Processing";

interface LoginProps  extends AuthProps {
}
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
function Login(props: LoginProps) {
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
        <Processing>
          Prosessing...
        </Processing>
      </Page>
  );
}

export default Login;
