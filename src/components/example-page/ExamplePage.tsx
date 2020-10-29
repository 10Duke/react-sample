import React from "react";
import { AuthProps, LicenseProps } from "../app";
import Page from "../page";
import LoginToContinue from "../login-to-continue";
import GetLicense from "../get-license";
import ReleaseLicense from "../release-license";
import NoLicenseAvailable from "../no-license-available";

interface ExampleProps extends AuthProps, LicenseProps {
  /**
   * Licensed item key for licence check/consumption/release
   */
  licenseKey: string;
  /**
   * Label of the item for the header
   */
  label: string;
  /**
   * Src url for the item
   */
  url: string;
}

/**
 * Renders example content or login-to-continue
 * @param props
 * @constructor
 */
function ExamplePage(props: ExampleProps) {
  const {
    licenseKey,
    label,
    url,
    licenseStatus,
    updateLicenseStatus,
    authentication,
    setAuthentication,
  } = props;
  const hasLicense = licenseStatus[licenseKey]
    ? licenseStatus[licenseKey].hasLicense(licenseKey)
    : undefined;

  return (
    <Page
      data-test-page-product={licenseKey}
      header={
        <>
          <h1>{label}</h1>
          {hasLicense === true && (
            <ReleaseLicense
              licensedItem={licenseKey}
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
          <iframe src={url} title={label}/>
          {hasLicense === undefined && (
            <GetLicense
              licensedItem={licenseKey}
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

export default ExamplePage;
