import React from "react";
import {AuthProps} from "../app";
import Page from "../page";

interface SignoutCbProps  extends AuthProps {}
function SignoutCbPage(props: SignoutCbProps) {
  const {authentication, setAuthentication} = props;

  return (
    <Page>TODO: implement logout callback</Page>
  );
}

export default SignoutCbPage;
