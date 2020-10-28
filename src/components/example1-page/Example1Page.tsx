import React, { useEffect, useState } from "react";
import { AuthProps } from "../app";
import createLicenseChecker from "../../authn/createLicenseChecker";
import LicenseCheckStatus from "../../authn/LicenseCheckStatus";
import Page from "../page";
import LoginToContinue from "../login-to-continue";
import GetLicense from "../get-license";
import ReleaseLicense from "../release-license";

/**
 * Name of licensed item required for accessing content of this example page.
 */
const EXAMPLE_1_LICENSED_ITEM = "2048";

interface Example1Props extends AuthProps {}

/**
 * Renders example content or login-to-continue
 * @param props
 * @constructor
 */
function Example1Page(props: Example1Props) {
  const { authentication } = props;
  const [licenseCheckStatus, setLicenseCheckStatus] = useState(
    LicenseCheckStatus.Unknown
  );
  const hasLicense = licenseCheckStatus === LicenseCheckStatus.Granted;

  useEffect(() => {
    if (licenseCheckStatus === LicenseCheckStatus.Unknown && authentication) {
      const licensedItem = EXAMPLE_1_LICENSED_ITEM;
      const licenseChecker = createLicenseChecker(
        authentication.getAccessToken()
      );
      licenseChecker.consumeLicense(licensedItem).then((result) => {
        setLicenseCheckStatus(
          result[licensedItem] === true
            ? LicenseCheckStatus.Granted
            : LicenseCheckStatus.Denied
        );
      });
    }
  }, [licenseCheckStatus, authentication]);

  return (
    <Page
      data-test-page-product-1
      header={
        <>
          <h1>2048</h1>
          {hasLicense && <ReleaseLicense />}
        </>
      }
    >
      {authentication && (
        <>
          <iframe src={"/2048/index.html"} />
          {!hasLicense && <GetLicense />}
        </>
      )}
      {!authentication && <LoginToContinue />}
    </Page>
  );
}
export default Example1Page;
