import React, { useMemo, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

import { Authentication } from "@10duke/web-client-pkce";
import AuthenticationSetter from "../../authn/AuthenticationSetter";
import HomePage from "../home-page";
import LoginPage from "../login-page";
import LoginCbPage from "../login-cb-page";
import SignoutCbPage from "../signout-cb-page";
import LogoutPage from "../logout-page";

import "./App.scss";
import { LicenseCheckResult } from "@10duke/web-client-pkce";
import ExamplePage from "../example-page";


/**
 * Authentication related properties for components
 */
export interface AuthProps {
  /**
   * Authentication status
   */
  authentication?: Authentication;
  /**
   * Callback for updating authentication status
   * @param authn New status to set
   * @param navigateTo Path to navigate to after update
   */
  setAuthentication: AuthenticationSetter;
}

interface LicenseStatus {
  [licensedItem: string]: LicenseCheckResult;
}

/**
 * License related properties for components
 */
export interface LicenseProps {
  /**
   * Status of license for each item
   */
  licenseStatus: LicenseStatus;
  /**
   * callback for updating status
   * @param licensedItem
   * @param status
   */
  updateLicenseStatus: (
    licensedItem: string,
    status: LicenseCheckResult | undefined
  ) => void;
}

/**
 * Describes example content
 */
export interface ExampleContent {
  /**
   * Display label
   */
  label: string;
  /**
   * Short description
   */
  description: string;
  /**
   * Item identifier
   */
  licenseKey: string;
  /**
   * Path to content
   */
  url: string;
  /**
   * Path to image
   */
  image: string;
}

/**
 * Example content configuration
 */
const Examples: ExampleContent[] = [
  {
    label: "2048",
    description: "Join the numbers and get to the 2048 tile!",
    licenseKey: "2048",
    url: process.env.PUBLIC_URL + "/2048/index.html",
    image: process.env.PUBLIC_URL + "/2048/screenshot.png",
  },
  {
    label: "Pacman Canvas",
    description: "An old classic, re-written in HTML5.",
    licenseKey: "Pacman",
    url: process.env.PUBLIC_URL + "/pacman-canvas/index.html",
    image:
      process.env.PUBLIC_URL +
      "/pacman-canvas/img/instructions/instructions_scatter.PNG",
  },
  {
    label: "React Simon Says",
    description: "Click the blocks in the correct order as they light up.",
    licenseKey: "SimonSays",
    url: process.env.PUBLIC_URL + "/react-simon-says/index.html",
    image: process.env.PUBLIC_URL + "/react-simon-says/screenshot.png",
  },
];

/**
 * Route path prefix for each example item
 */
const PATH_PREFIX = "/play/";

/**
 * Main app, responsible for storing authentication status and routing as well as main navigation.
 * @constructor
 */
function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [authentication, setAuthenticationState] = useState<
    Authentication | undefined
  >(undefined);
  const [licenseStatus, setLicenseStatus] = useState<LicenseStatus>({});

  const updateLicenseStatus = useMemo(
    () => (licensedItem: string, status: LicenseCheckResult | undefined) => {
      const updatedState = { ...licenseStatus };
      if (status !== undefined) {
        updatedState[licensedItem] = status;
      } else {
        delete updatedState[licensedItem];
      }
      setLicenseStatus(updatedState);
    },
    [setLicenseStatus, licenseStatus]
  );

  const setAuthentication = useMemo(
    () => (a?: Authentication, navigateTo?: string) => {
      setAuthenticationState(a);
      if (
        a &&
        (location.pathname.endsWith("/login") ||
          location.pathname.endsWith("/logincb"))
      ) {
        if (navigateTo) {
          navigate(navigateTo);
        } else {
          navigate("/");
        }
      } else if (!a && location.pathname.endsWith("/signoutcb")) {
        if (navigateTo) {
          navigate(navigateTo);
        } else {
          navigate("/");
        }
      }
    },
    [setAuthenticationState, navigate, location]
  );

  const authProps: AuthProps = { authentication, setAuthentication };
  const licenseProps: LicenseProps = { licenseStatus, updateLicenseStatus };
  const [navbarCollapsed, setNavbarCollapsed] = useState(true);
  /**
   * NOTE: The route config is not what we intended, but after update it seems that what used to be the default is no
   * longer even possible. Every "/*" at the end of the paths was added as only available option to match what used to
   * be, ie. route that matches if the beginning matches, regardless of what follows. This new pattern forces us to
   * include the "/" which is always wrong.
   */
  return (
    <>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
        <LinkContainer to="/">
          <a className="navbar-brand">
            <img src="/logo.svg#arcade" alt="10Duke" title="" />
            <span className="brand-text">Arcade</span>
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
          onClick={() => {
            setNavbarCollapsed(!navbarCollapsed);
          }}
          data-test-navbar-toggle
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={
            "collapse navbar-collapse" + (!navbarCollapsed ? " show" : "")
          }
          id="navbarCollapse"
        >
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <LinkContainer to="/">
                <a data-test-navbar-home className={"nav-link"}>
                  Home
                </a>
              </LinkContainer>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            {!authentication && (
              <li className="nav-item">
                <LinkContainer to="/login">
                  <a data-test-navbar-login className={"nav-link"}>
                    Login
                  </a>
                </LinkContainer>
              </li>
            )}
            {authentication && (
              <>
                <li
                  data-test-navbar-logged-in
                  className="navbar-text profile mr-md-4"
                >
                  <img
                    src={'/si_icon.svg'}
                    className="d-inline-block mr-3"
                    alt={"(•_•)"}
                  />
                  {authentication.getUserDisplayName()}
                </li>
                <li className="nav-item">
                  <LinkContainer to="/logout">
                    <a
                      data-test-navbar-logout
                      className={
                        "nav-link bg-secondary text-white p-2 d-inline-block"
                      }
                    >
                      Logout
                    </a>
                  </LinkContainer>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
      <main
        role="main"
        className="container-fluid flex-grow-1 d-flex flex-column"
      >
        <Routes>
          <Route path="/" element={
            <HomePage
              {...authProps}
              content={Examples}
              pathPrefix={PATH_PREFIX}
            />
          } />
          <Route path="/login/*" element={
            <LoginPage {...authProps} />
          } />
          <Route path="/logincb/*" element={
            <LoginCbPage {...authProps} />
            } />
          <Route path="/logout/*" element={
            <LogoutPage {...authProps} />
            } />
          <Route path="/signoutcb/*" element={
            <SignoutCbPage {...authProps} />
            } />
          {Examples.map((ex) => {
            return (
              <Route path={PATH_PREFIX + ex.licenseKey + '/*'} key={ex.licenseKey} element={
                <ExamplePage
                  {...licenseProps}
                  {...ex}
                  authentication={authProps.authentication}
                />
                } />
            );
          })}
        </Routes>
      </main>
    </>
  );
}

export default App;
