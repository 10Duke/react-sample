import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Authentication from "./authn/Authentication";
import { StartLoginResponse } from "./authn/Authenticator";
import createAuthenticator from "./authn/createAuthenticator";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function LoginCb() {
  const [authentication, setAuthentication] = useState<
    Authentication | undefined
  >(undefined);

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
      .then((authn) => setAuthentication(authn));
  }, [code, state]);

  return (
    <div>Logged in as {authentication?.getUserDisplayName() || "N/A"}</div>
  );
}

export default LoginCb;
