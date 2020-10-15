import React from "react";
import { AuthProps } from "../app";
import Page from "../page";
import Processing from "../processing";

interface LogoutProps  extends AuthProps {}
function LogoutPage(props: LogoutProps) {
  return (
      <Page
        header={<h1>TODO:</h1>}
      >
        <Processing />
      </Page>
  );
}

export default LogoutPage;
