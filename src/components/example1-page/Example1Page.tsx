import React from "react";
import { AuthProps, LicenseProps } from "../app";
import Page from "../page";
import LoginToContinue from "../login-to-continue";
import GetLicense from "../get-license";
import ReleaseLicense from "../release-license";
import NoLicenseAvailable from "../no-license-available";

/**
 * Name of licensed item required for accessing content of this example page.
 */
const EXAMPLE_1_LICENSED_ITEM = "2048";

interface Example1Props extends AuthProps, LicenseProps {}

/**
 * Renders example content or login-to-continue
 * @param props
 * @constructor
 */
function Example1Page(props: Example1Props) {
  const {
    authentication,
    licenseStatus,
    updateLicenseStatus,
    setAuthentication,
  } = props;
  const licensedItem = EXAMPLE_1_LICENSED_ITEM;
  const hasLicense = licenseStatus[licensedItem]
    ? licenseStatus[licensedItem].hasLicense(licensedItem)
    : undefined;

  return (
    <Page
      data-test-page-product-1
      header={
        <>
          <h1>2048</h1>
          {hasLicense === true && (
            <ReleaseLicense
              licensedItem={EXAMPLE_1_LICENSED_ITEM}
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
          <iframe src={"/2048/index.html"} />
          {hasLicense === undefined && (
            <GetLicense
              licensedItem={EXAMPLE_1_LICENSED_ITEM}
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

export default Example1Page;
