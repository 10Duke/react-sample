import React from "react";
import {AuthProps} from "../app";
import Page from "../page";
import LoginToContinue from "../login-to-continue";
// import GetLicense from "../get-license";
// import ReleaseLicense from "../release-license";

interface Example2Props extends AuthProps {}

/**
 * Renders example content or login-to-continue
 * @param props
 * @constructor
 */
function Example2Page(props: Example2Props) {
    const {
        authentication,
    } = props;
    const hasLicense = authentication && false;
    return (
        <Page
            data-test-page-product-2
            header={<>
                <h1>
                    Pacman Canvas
                </h1>
                {hasLicense && (
                    <h1 >awesome setup this</h1>
                )}
            </>}
        >
            {authentication && (<>
                <iframe src={'/pacman-canvas/index.html'} />
                {!hasLicense && (
                    <h1 >awesome setup this</h1>
                )}
            </>)}
            {!authentication && (
                <LoginToContinue />
            )}
        </Page>
    )
}
export default Example2Page;
