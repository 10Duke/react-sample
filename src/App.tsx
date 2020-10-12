import React, {useState} from "react";
import { BrowserRouter as Router, Switch, Route, useLocation, useHistory } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

import "./App.scss";
import Home from "./Home";
import Login from "./Login";
import LoginCb from "./LoginCb";
import Authentication from "./authn/Authentication";
import SignoutCb from "./SignoutCb";
import Example1 from "./Example1";
import Example2 from "./Example2";
import Example3 from "./Example3";
import Logout from "./Logout";

const ProfileIcon = require("./si_icon.svg");

export interface AuthProps {
  authentication?: Authentication
  setAuthentication: (a?: Authentication, navigateTo?:string) => void
}

function App() {
  const location = useLocation();
  const history = useHistory();
  const [authentication, setAuthenticationState] = useState<
      Authentication | undefined
      >(undefined);
  const setAuthentication = (a?:Authentication, navigateTo?:string) => {
    setAuthenticationState(a);
    if (a && (location.pathname.endsWith('/login') || location.pathname.endsWith('/logincb'))) {
      if (navigateTo) {
        history.push(navigateTo)
      } else {
        history.push('/');
      }
    } else if (!a && (location.pathname.endsWith('/signoutcb'))) {
      if (navigateTo) {
        history.push(navigateTo)
      } else {
        history.push('/');
      }
    }
  }
  const authProps: AuthProps = { authentication, setAuthentication };
  const [navbarCollapsed, setNavbarCollapsed] = useState(true);
  return (
      <>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
          <LinkContainer to="/" exact={true}>
            <a className="navbar-brand" >
              <img src={'/logo.svg#arcade'} />
              <span className={"brand-text"}>
                Arcade
              </span>
            </a>
          </LinkContainer>
          <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarCollapse"
              aria-controls="navbarCollapse"
              aria-expanded={!navbarCollapsed}
              aria-label="Toggle navigation"
              onClick={() => {setNavbarCollapsed(!navbarCollapsed)}}
              data-test-navbar-toggle
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={'collapse navbar-collapse' + (!navbarCollapsed ? ' show' : '')} id="navbarCollapse">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <LinkContainer to="/" exact={true}>
                  <a data-test-navbar-home className={'nav-link'}>Home</a>
                </LinkContainer>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto">
              {!authentication && (
                  <li className="nav-item">
                    <LinkContainer to="/login" exact={true}>
                      <a data-test-navbar-login className={'nav-link'}>Login</a>
                    </LinkContainer>
                  </li>
              )}
              {authentication && (
                  <>
                    <li data-test-navbar-logged-in className="navbar-text profile mr-md-4">
                      <img src={ProfileIcon} className="d-inline-block mr-3" />
                      {authentication.getUserDisplayName()}
                    </li>
                    <li className="nav-item">
                      <LinkContainer to="/logout" exact={true}>
                        <a data-test-navbar-logout className={'nav-link bg-secondary text-white p-2 d-inline-block'}>Logout</a>
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
        <main role="main" className="container-fluid flex-grow-1 d-flex flex-column">
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
            <Route path="/logout">
              <Logout {...authProps} />
            </Route>
            <Route path="/signoutcb">
              <SignoutCb {...authProps} />
            </Route>
            <Route path="/ex1">
              <Example1 {...authProps} />
            </Route>
            <Route path="/ex2">
              <Example2 {...authProps} />
            </Route>
            <Route path="/ex3">
              <Example3 {...authProps} />
            </Route>

          </Switch>
        </main>
    </>
  );
}

export default App;
