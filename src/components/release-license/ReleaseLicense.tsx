import React from "react";
import { AuthProps, LicenseProps } from "../app";
import createLicenseChecker from "../../authn/createLicenseChecker";

interface ReleaseLicenseProps extends LicenseProps, Pick<AuthProps, 'authentication'> {
  licensedItem: string;
}
/**
 * Renders a release license button
 * @constructor
 */
function ReleaseLicense(props: ReleaseLicenseProps) {
  const {
    authentication,
    licensedItem,
    updateLicenseStatus,
    licenseStatus,
  } = props;
  const releaseLicense = () => {
    if (authentication) {
      const licenseChecker = createLicenseChecker(
        authentication.getAccessToken()
      );
      const leaseId = licenseStatus[licensedItem].jti;
      licenseChecker
        .releaseLicense(leaseId)
        .then((result) => {
          if (result.isReleased(leaseId)) {
            updateLicenseStatus(licensedItem, undefined);
          }
        });
    }
  };
  return (
    <button
      data-test-release-license-trigger
      type={"button"}
      className={"btn btn-sm btn-secondary page-header-tools"}
      onClick={releaseLicense}
    >
      Release license
    </button>
  );
}
export default ReleaseLicense;
