import React from "react";
import Page from "../page";
import { AuthProps } from "../app";
import LoginToContinue from "../login-to-continue";
import ExampleCard from "../example-card";

interface HomeProps  extends AuthProps {}

/**
 * Renders the home page content or login-to-continue
 * @param props
 * @constructor
 */
function HomePage(props: HomeProps) {
    const {
        authentication,
    } = props;
  return (
      <>
          <Page
              data-test-page-home
              header={
                  <h1>Welcome, {authentication ? authentication.getUserDisplayName() : 'Guest'}</h1>
              }
          >
              <>
                {authentication && (
                    <div className="card-deck">
                        <ExampleCard
                            data-test-product-link
                            link={'/ex1'}
                            header={'2048'}
                            image={'/2048/screenshot.png'}
                        >
                            <p className="card-text">
                                Join the numbers and get to the 2048 tile!
                            </p>
                        </ExampleCard>
                        <ExampleCard
                            data-test-product-link
                            link={'/ex2'}
                            header={'Pacman Canvas'}
                            image={'/pacman-canvas/img/instructions/instructions_scatter.PNG'}
                        >
                            <p className="card-text">
                                An old classic, re-written in HTML5.
                            </p>
                        </ExampleCard>
                        <ExampleCard
                            data-test-product-link
                            link={'/ex3'}
                            header={'React Simon Says'}
                            image={'/react-simon-says/screenshot.png'}
                        >
                            <p className="card-text">
                                Click the blocks in the correct order as they light up.
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

export default HomePage;
