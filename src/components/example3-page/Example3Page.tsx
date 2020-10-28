import React from "react";
import {AuthProps, LicenseProps} from "../app";
import Page from "../page";
import LoginToContinue from "../login-to-continue";
import GetLicense from "../get-license";
import ReleaseLicense from "../release-license";
import NoLicenseAvailable from "../no-license-available";

/**
 * Name of licensed item required for accessing content of this example page.
 */
const EXAMPLE_3_LICENSED_ITEM = "SimonSays";
interface Example3Props extends AuthProps, LicenseProps {}

/**
 * Renders example content or login-to-continue
 * @param props
 * @constructor
 */
function Example3Page(props: Example3Props) {
    const { authentication, licenseStatus, updateLicenseStatus, setAuthentication } = props;
    const hasLicense = licenseStatus &&
        licenseStatus[EXAMPLE_3_LICENSED_ITEM] &&
        licenseStatus[EXAMPLE_3_LICENSED_ITEM][EXAMPLE_3_LICENSED_ITEM] !== undefined ?
        (licenseStatus[EXAMPLE_3_LICENSED_ITEM][EXAMPLE_3_LICENSED_ITEM] === true ? true : false) :
        (licenseStatus && licenseStatus[EXAMPLE_3_LICENSED_ITEM] ? false : undefined)
    ;
    return (
        <Page
            data-test-page-product-3
            header={<>
                <h1>
                    React Simon Says
                </h1>
                {hasLicense === true && <ReleaseLicense licensedItem={EXAMPLE_3_LICENSED_ITEM} licenseStatus={licenseStatus} updateLicenseStatus={updateLicenseStatus} authentication={authentication} setAuthentication={setAuthentication}/>}
            </>}
        >
            {authentication && (<>
                <iframe src={'/react-simon-says/index.html'} />
                {hasLicense === undefined && <GetLicense licensedItem={EXAMPLE_3_LICENSED_ITEM} licenseStatus={licenseStatus} updateLicenseStatus={updateLicenseStatus} authentication={authentication} setAuthentication={setAuthentication}/>}
                {hasLicense === false && (
                    <NoLicenseAvailable />
                )}
            </>)}
            {!authentication && (
                <LoginToContinue />
            )}
        </Page>
    )
}
export default Example3Page;
