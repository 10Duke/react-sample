import React, {useState} from "react";
import { BrowserRouter as Router, Switch, Route, useLocation, useHistory } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'

import "./App.css";
import Home from "./Home";
import Login from "./Login";
import LoginCb from "./LoginCb";
import Authentication from "./authn/Authentication";
import SignoutCb from "./SignoutCb";

export interface AuthProps {
  authentication?: Authentication
  setAuthentication: (a?: Authentication) => void
}

function App() {
  const location = useLocation();
  const history = useHistory();
  const [authentication, setAuthenticationState] = useState<
      Authentication | undefined
      >(undefined);
  const setAuthentication = (a:Authentication | undefined) => {
    setAuthenticationState(a);
    if (a && (location.pathname.endsWith('/login') || location.pathname.endsWith('/logincb'))) {
      history.push('/');
    } else if (!a && (location.pathname.endsWith('/signoutcb'))) {
      history.push('/');
    }
  }
  const authProps: AuthProps = { authentication, setAuthentication };
  return (
      <>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
          <LinkContainer to="/" exact={true}>
            <a className="navbar-brand" >Navbar</a>
          </LinkContainer>
          <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarsExampleDefault"
              aria-controls="navbarsExampleDefault"
              aria-expanded="false"
              aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarsExampleDefault">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <LinkContainer to="/" exact={true}>
                  <a className={'nav-link'}>Home</a>
                </LinkContainer>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto">
              {!authentication && (
                  <li className="nav-item">
                    <LinkContainer to="/login" exact={true}>
                      <a className={'nav-link'}>Login</a>
                    </LinkContainer>
                  </li>
              )}
              {authentication && (
                  <>
                    <li className="navbar-text">
                      <FontAwesomeIcon icon={faUserCircle} className={'mr-2'}/>
                      {authentication.getUserDisplayName()}
                    </li>
                    <li className="nav-item">
                      <LinkContainer to="/logout" exact={true}>
                        <a className={'nav-link'}>Logout</a>
                      </LinkContainer>
                    </li>
                  </>
              )}
              {/*
              <li className="nav-item">
                <a className="nav-link disabled" href="#">Disabled</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="http://example.com" id="dropdown01" data-toggle="dropdown"
                   aria-haspopup="true" aria-expanded="false">Dropdown</a>
                <div className="dropdown-menu" aria-labelledby="dropdown01">
                  <a className="dropdown-item" href="#">Action</a>
                  <a className="dropdown-item" href="#">Another action</a>
                  <a className="dropdown-item" href="#">Something else here</a>
                </div>
              </li>
              */}
            </ul>
            {/*
              <form className="form-inline my-2 my-lg-0">
                <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search">
                  <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
              </form>
            */}
          </div>
        </nav>
        <main role="main" className="container-fluid">
          <Switch>
            <Route exact path="/">
              <Home {...authProps} />
            </Route>
            <Route path="/login">
              <Login {...authProps} />
            </Route>
            <Route path="/logincb">
              <LoginCb {...authProps} />
            </Route>
            <Route path="/signoutcb">
              <SignoutCb {...authProps} />
            </Route>

          </Switch>
        </main>
    </>
  );
}

export default App;
