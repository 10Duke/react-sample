import React, {useEffect} from "react";
import createAuthenticator from "./authn/createAuthenticator";
import {AuthProps} from "./App";
import Page from "./Page";
import Processing from "./Processing";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";

interface LoginProps  extends AuthProps {}
function Login(props: LoginProps) {
  const authenticator = createAuthenticator();
  const { authentication }  = props;
  async function startLogin() {
    const startLoginState = await authenticator.startLogin();
    localStorage.setItem("startLoginState", JSON.stringify(startLoginState));
    window.location.href = startLoginState.url.toString();
  }
  useEffect(() => {
    if (!authentication) {
      console.log('start login');
      startLogin();
    }
  }, [authentication])

  return (
      <Page>
        <Processing>
          Prosessing...
        </Processing>
      </Page>
  );
}

export default Login;
