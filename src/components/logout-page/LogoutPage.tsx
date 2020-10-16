import React from "react";
import { AuthProps } from "../app";
import Page from "../page";
import Processing from "../processing";

interface LogoutProps  extends AuthProps {}
/**
 * Triggers the logout process, renders just a processing indicator as the logout process will cause redirects,
 * eventually to  signout-cb-page
 * @param props
 * @constructor
 */
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
