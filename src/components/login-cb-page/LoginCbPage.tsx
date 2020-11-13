import React, { useEffect } from "react";
import { StartLoginResponse } from "@10duke/web-client-pkce";
import createAuthenticator from "../../authn/createAuthenticator";
import { AuthProps } from "../app";
import useQuery from "../../utils/use-query";
import Page from "../page";

interface LoginCbProps extends AuthProps {}

/**
 * Login callback page for getting the login state. Updates authentication status, which in turn triggers navigation,
 * causing this page content to never actually being visible.
 * @param props
 * @constructor
 */
function LoginCbPage(props: LoginCbProps) {
  const { authentication, setAuthentication } = props;

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
    localStorage.removeItem("startLoginState");

    const authenticator = createAuthenticator();
    authenticator
      .completeAuthentication(startLoginState, code, state)
      .then((authn) => setAuthentication(authn, state));
  }, [code, state, setAuthentication]);

  return (
    <Page>Logged in as {authentication?.getUserDisplayName() || "N/A"}</Page>
  );
}

export default LoginCbPage;
