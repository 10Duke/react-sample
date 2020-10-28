import React from "react";
import "./GetLicense.scss";
import {LicenseProps} from "../app";
import {AuthProps} from "../app";
import createLicenseChecker from "../../authn/createLicenseChecker";

interface GetLicenseProps extends LicenseProps, AuthProps {
    licensedItem: string,
};
/**
 * Component for rendering a get license button with content covering mask on top of actual content.
 * @constructor
 */
function GetLicense(props: GetLicenseProps) {
    const {authentication, licensedItem, updateLicenseStatus} = props;
    const checkLicense = () => {
        if (authentication) {
            const licenseChecker = createLicenseChecker(
                authentication.getAccessToken()
            );
            licenseChecker.consumeLicense(licensedItem).then((result) => {
                updateLicenseStatus(licensedItem, result);
            });
        }
    }
    return (
        <div
            data-test-get-license
            className='get-license'
            onClick={checkLicense}
        >
            <button data-test-get-license-trigger
                    type={'button'}
                    className={'btn btn-primary btn-lg'}
            >Get license to play</button>
        </div>
    );
}
export default GetLicense;
