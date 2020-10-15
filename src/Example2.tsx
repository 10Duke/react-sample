import React from "react";
import {AuthProps} from "./App";
import Page from "./Page";
import LoginToContinue from "./LoginToContinue";
import GetLicense from "./GetLicense";
import ReleaceLicense from "./ReleaseLicense";

interface Example2Props  extends AuthProps {}
function Example2(props:Example2Props) {
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
                    <ReleaceLicense />
                )}
            </>}
        >
            {authentication && (<>
                <iframe src={'/pacman-canvas/index.html'} />
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
export default Example2;
