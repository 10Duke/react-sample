import React from "react";
import Page from "./Page";
import {AuthProps} from "./App";

interface HomeProps  extends AuthProps {}
function Home(props: HomeProps) {
  return (
      <Page
          header={
              <h1>Home</h1>
          }
          footer={
              <p>Something</p>
          }
      >
          yay
      </Page>
  );
}

export default Home;
