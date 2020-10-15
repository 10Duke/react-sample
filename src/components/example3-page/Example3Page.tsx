import React from "react";
import {AuthProps} from "../app";
import Page from "../page";
import LoginToContinue from "../login-to-continue";
import GetLicense from "../get-license";
import ReleaseLicense from "../release-license";

interface Example3Props extends AuthProps {}

/**
 * Renders example content or login-to-continue
 * @param props
 * @constructor
 */
function Example3Page(props: Example3Props) {
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
                    <ReleaseLicense />
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
export default Example3Page;
