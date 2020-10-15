import React, {useState} from "react";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

import Authentication from "../../authn/Authentication";
import HomePage from "../home-page";
import LoginPage from "../login-page";
import LoginCbPage from "../login-cb-page";
import SignoutCbPage from "../signout-cb-page";
import Example1Page from "../example1-page";
import Example2Page from "../example2-page";
import Example3Page from "../example3-page";
import LogoutPage from "../logout-page";

import "./App.scss";
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
                    </ul>
                </div>
            </nav>
            <main role="main" className="container-fluid flex-grow-1 d-flex flex-column">
                <Switch>
                    <Route exact path="/">
                        <HomePage {...authProps} />
                    </Route>
                    <Route path="/login">
                        <LoginPage {...authProps} />
                    </Route>
                    <Route path="/logincb">
                        <LoginCbPage {...authProps} />
                    </Route>
                    <Route path="/logout">
                        <LogoutPage {...authProps} />
                    </Route>
                    <Route path="/signoutcb">
                        <SignoutCbPage {...authProps} />
                    </Route>
                    <Route path="/ex1">
                        <Example1Page {...authProps} />
                    </Route>
                    <Route path="/ex2">
                        <Example2Page {...authProps} />
                    </Route>
                    <Route path="/ex3">
                        <Example3Page {...authProps} />
                    </Route>

                </Switch>
            </main>
        </>
    );
}

export default App;
