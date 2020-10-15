import React from "react";
import { AuthProps } from "../app";
import Page from "../page";
import LoginToContinue from "../login-to-continue";
import GetLicense from "../get-license";
import ReleaseLicense from "../release-license";

interface Example1Props  extends AuthProps {}
function Example1Page(props: Example1Props) {
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
                    <ReleaseLicense />
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
export default Example1Page;
