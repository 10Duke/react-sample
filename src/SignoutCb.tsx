import React from "react";
import {AuthProps} from "./App";

interface SignoutCbProps  extends AuthProps {}
function SignoutCb(props: SignoutCbProps) {
  const {authentication, setAuthentication} = props;

  return (
    <div>TODO: implement logout callback</div>
  );
}

export default SignoutCb;
