import React from "react";
import {AuthProps} from "./App";
import Page from "./Page";
import LoginToContinue from "./LoginToContinue";
import GetLicense from "./GetLicense";

interface Example3Props  extends AuthProps {}
function Example3(props:Example3Props) {
    const {
        authentication,
    } = props;
    const hasLicense = authentication && true;
    return (
        <Page
            header={<>
                <h1 className={'d-inline-block'}>
                    React Simon Says
                </h1>
                {hasLicense && (
                    <button type={'button'} className={'btn btn-sm btn-secondary page-header-tools'} onClick={() => {alert('TODO')}}>Release license</button>
                )}
            </>}
        >
            {authentication && (<>
                <iframe src={'/react-simon-says/public/index.html'} />
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
