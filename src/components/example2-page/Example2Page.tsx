import React from "react";
import { AuthProps, LicenseProps } from "../app";
import Page from "../page";
import LoginToContinue from "../login-to-continue";
import ReleaseLicense from "../release-license";
import GetLicense from "../get-license";
import NoLicenseAvailable from "../no-license-available";
// import GetLicense from "../get-license";
// import ReleaseLicense from "../release-license";

/**
 * Name of licensed item required for accessing content of this example page.
 */
const EXAMPLE_2_LICENSED_ITEM = "Pacman";

interface Example2Props extends AuthProps, LicenseProps {}

/**
 * Renders example content or login-to-continue
 * @param props
 * @constructor
 */
function Example2Page(props: Example2Props) {
  const {
    authentication,
    licenseStatus,
    updateLicenseStatus,
    setAuthentication,
  } = props;
  const licensedItem = EXAMPLE_2_LICENSED_ITEM;
  const hasLicense = licenseStatus[licensedItem]
    ? licenseStatus[licensedItem].hasLicense(licensedItem)
    : undefined;

  return (
    <Page
      data-test-page-product-2
      header={
        <>
          <h1>Pacman Canvas</h1>
          {hasLicense === true && (
            <ReleaseLicense
              licensedItem={EXAMPLE_2_LICENSED_ITEM}
              licenseStatus={licenseStatus}
              updateLicenseStatus={updateLicenseStatus}
              authentication={authentication}
              setAuthentication={setAuthentication}
            />
          )}
        </>
      }
    >
      {authentication && (
        <>
          <iframe src={"/pacman-canvas/index.html"} />
          {hasLicense === undefined && (
            <GetLicense
              licensedItem={EXAMPLE_2_LICENSED_ITEM}
              licenseStatus={licenseStatus}
              updateLicenseStatus={updateLicenseStatus}
              authentication={authentication}
              setAuthentication={setAuthentication}
            />
          )}
          {hasLicense === false && <NoLicenseAvailable />}
        </>
      )}
      {!authentication && <LoginToContinue />}
    </Page>
  );
}

export default Example2Page;
