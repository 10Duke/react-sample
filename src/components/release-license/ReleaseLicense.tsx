import React from "react";
import {AuthProps, LicenseProps} from "../app";
import createLicenseChecker from "../../authn/createLicenseChecker";

interface ReleaseLicenseProps extends LicenseProps, AuthProps {
    licensedItem: string,
};
/**
 * Renders a release license button
 * @constructor
 */
function ReleaseLicense(props: ReleaseLicenseProps) {
    const {authentication, licensedItem, updateLicenseStatus, licenseStatus} = props
    const releaseLicense = () => {
        console.log('Lease id: %o',  licenseStatus[licensedItem] ? licenseStatus[licensedItem].jti : undefined);
        if (authentication) {
            const licenseChecker = createLicenseChecker(
                authentication.getAccessToken()
            );
            licenseChecker.releaseLicense(licenseStatus[licensedItem].jti).then((result) => {
                updateLicenseStatus(licensedItem, undefined);
            });
        }
    }
    return (
        <button
            data-test-release-license-trigger
            type={'button'} className={'btn btn-sm btn-secondary page-header-tools'}
            onClick={releaseLicense}
        >Release license</button>
    );
}
export default ReleaseLicense;
