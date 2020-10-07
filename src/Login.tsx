import React from "react";
import createAuthenticator from "./authn/createAuthenticator";

function Login() {
  const authenticator = createAuthenticator();

  async function startLogin() {
    const startLoginState = await authenticator.startLogin();
    localStorage.setItem("startLoginState", JSON.stringify(startLoginState));
    window.location.href = startLoginState.url.toString();
  }

  return (
    <div className="Login">
      <button onClick={startLogin}>Log in</button>
    </div>
  );
}

export default Login;
