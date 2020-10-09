import React from "react";
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
                            link={'/ex1'}
                            header={'2048'}
                            image={'/2048/meta/apple-touch-startup-image-640x920.png'}
                        >
                            <p className="card-text">
                                Join the numbers and get to the 2048 tile!
                            </p>
                        </ExampleCard>
                        <ExampleCard
                            link={'/ex2'}
                            header={'Pacman Canvas'}
                            image={'/pacman-canvas/img/instructions/instructions_scatter.PNG'}
                        >
                            <p className="card-text">
                                An old classic, re-written in HTML5.
                            </p>
                        </ExampleCard>
                        <ExampleCard
                            link={'/ex3'}
                            header={'React Simon Says'}
                            image={'/react-simon-says/screenshot.png'}
                        >
                            <p className="card-text">
                                After the blocks light up, players have to click the blocks in the same order as they light up in order to gain a point.
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
