import React from "react";
import {AuthProps} from "./App";
import Page from "./Page";
import LoginToContinue from "./LoginToContinue";
import GetLicense from "./GetLicense";
import ReleaceLicense from "./ReleaseLicense";

interface Example1Props  extends AuthProps {}
function Example1(props:Example1Props) {
    const {
        authentication,
    } = props;
    const hasLicense = authentication && true;
    return (
        <Page
            data-test-page-product-1
            header={<>
                <h1>
                    2048
                </h1>
                {hasLicense && (
                    <ReleaceLicense />
                )}
            </>}
        >
            {authentication && (<>
                <iframe src={'/2048/index.html'} />
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
export default Example1;
