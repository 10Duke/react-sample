import React from "react";
import { Link } from "react-router-dom";
import Page from "./Page";
import {AuthProps} from "./App";
import LoginToContinue from "./LoginToContinue";
import ExampleCard from "./ExampleCard";

interface HomeProps  extends AuthProps {}
function Home(props: HomeProps) {
    const {
        authentication,
    } = props;
  return (
      <>
          <Page
              header={
                  <h1>Welcome, {authentication ? authentication.getUserDisplayName() : 'Guest'}</h1>
              }
          >
              <>
                {authentication && (
                    <div className="card-deck">
                        <ExampleCard
                            link={'/test'}
                            header={'Example Name'}
                        >
                            <p className="card-text">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>
                        </ExampleCard>
                        <ExampleCard
                            link={'/test2'}
                            header={'Example Name 2'}
                        >
                            <p className="card-text">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>
                        </ExampleCard>
                        <ExampleCard
                            link={'/test3'}
                            header={'Example Name 3'}
                        >
                            <p className="card-text">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>
                        </ExampleCard>
                    </div>
                )}
                {!authentication && (
                    <LoginToContinue />
                )}
              </>
          </Page>
      </>
  );
}

export default Home;
