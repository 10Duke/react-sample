import React, { useEffect } from "react";
import { StartLoginResponse } from "../../authn/Authenticator";
import createAuthenticator from "../../authn/createAuthenticator";
import { AuthProps } from "../app";
import useQuery from "../../utils/use-query";
import Page from "../page";

interface LoginCbProps extends AuthProps {}
function LoginCbPage(props: LoginCbProps) {
  const {authentication, setAuthentication} = props;

  const query = useQuery();
  const code = query.get("code");
  const state = query.get("state") || undefined;

  useEffect(() => {
    if (!code) {
      throw Error("code parameter missing");
    }
    const storedLoginState = localStorage.getItem("startLoginState");
    if (!storedLoginState) {
      throw Error("missing stored login state");
    }
    const startLoginState = JSON.parse(storedLoginState) as StartLoginResponse;

    const authenticator = createAuthenticator();
    authenticator
      .completeAuthentication(startLoginState, code, state)
      .then((authn) => setAuthentication(authn, state));
  }, [code, state]);

  return (
    <Page>Logged in as {authentication?.getUserDisplayName() || "N/A"}</Page>
  );
}

export default LoginCbPage;
