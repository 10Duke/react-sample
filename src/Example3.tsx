import React from "react";
import {AuthProps} from "./App";
import Page from "./Page";
import LoginToContinue from "./LoginToContinue";
import GetLicense from "./GetLicense";
import ReleaceLicense from "./ReleaseLicense";

interface Example3Props  extends AuthProps {}
function Example3(props:Example3Props) {
    const {
        authentication,
    } = props;
    const hasLicense = authentication && true;
    return (
        <Page
            data-test-page-product-3
            header={<>
                <h1>
                    React Simon Says
                </h1>
                {hasLicense && (
                    <ReleaceLicense />
                )}
            </>}
        >
            {authentication && (<>
                <iframe src={'/react-simon-says/index.html'} />
                {!hasLicense && (
                    <GetLicense />
                )}
            </>)}
            {!authentication && (
                <LoginToContinue />
            )}
        </Page>
    )
}
export default Example3;
