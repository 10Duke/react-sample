import React from "react";
import {AuthProps} from "./App";
import Page from "./Page";
import LoginToContinue from "./LoginToContinue";
import GetLicense from "./GetLicense";

interface Example1Props  extends AuthProps {}
function Example1(props:Example1Props) {
    const {
        authentication,
    } = props;
    const hasLicense = authentication && true;
    return (
        <Page
            header={<>
                <h1 className={'d-inline-block'}>
                    2048
                </h1>
                {hasLicense && (
                    <button type={'button'} className={'btn btn-sm btn-secondary page-header-tools'} onClick={() => {alert('TODO')}}>Release license</button>
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
