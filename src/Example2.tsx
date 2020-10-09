import React from "react";
import {AuthProps} from "./App";
import Page from "./Page";
import LoginToContinue from "./LoginToContinue";
import GetLicense from "./GetLicense";

interface Example2Props  extends AuthProps {}
function Example2(props:Example2Props) {
    const {
        authentication,
    } = props;
    const hasLicense = authentication && false;
    return (
        <Page
            header={<>
                <h1 className={'d-inline-block'}>
                    Pacman Canvas
                </h1>
                {hasLicense && (
                    <button type={'button'} className={'btn btn-sm btn-secondary page-header-tools'} onClick={() => {alert('TODO')}}>Release license</button>
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
