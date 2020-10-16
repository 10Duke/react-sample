import React from "react";
import {AuthProps} from "../app";
import Page from "../page";

interface SignoutCbProps  extends AuthProps {}
/**
 * Signout callback page for getting the not logged in state. Updates authentication status, which in turn triggers navigation,
 * causing this page content to never actually being visible.
 * @param props
 * @constructor
 */
function SignoutCbPage(props: SignoutCbProps) {
  const {authentication, setAuthentication} = props;

  return (
    <Page>TODO: implement logout callback</Page>
  );
}

export default SignoutCbPage;
