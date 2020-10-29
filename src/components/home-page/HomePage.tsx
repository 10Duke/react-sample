import React from "react";
import Page from "../page";
import {AuthProps, ExampleContent} from "../app";
import LoginToContinue from "../login-to-continue";
import ExampleCard from "../example-card";

interface HomeProps extends AuthProps {
  content: ExampleContent[],
  pathPrefix: string,
}

/**
 * Renders the home page content or login-to-continue
 * @param props
 * @constructor
 */
function HomePage(props: HomeProps) {
  const {
    authentication,
    pathPrefix,
    content
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
                  {
                    content.map((ex) => {
                      return (
                          <ExampleCard
                              data-test-product-link={ex.licenseKey}
                              key={ex.licenseKey}
                              link={pathPrefix + ex.licenseKey}
                              header={ex.label}
                              image={ex.image}
                          >
                            <p className="card-text">
                              {ex.description}
                            </p>
                          </ExampleCard>
                      );
                    })
                  }
                </div>
            )}
            {!authentication && (
                <LoginToContinue/>
            )}
          </>
        </Page>
      </>
  );
}

export default HomePage;
