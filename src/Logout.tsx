import React from "react";
import {AuthProps} from "./App";
import Page from "./Page";
import Processing from "./Processing";

interface LogoutProps  extends AuthProps {
}
function Logout(props: LogoutProps) {
  // TODO:
  return (
      <Page
        header={<h1>TODO:</h1>}
      >
        <Processing />
      </Page>
  );
}

export default Logout;
