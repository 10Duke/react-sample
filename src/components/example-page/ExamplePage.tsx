import React from "react";
import {AuthProps, ExampleContent, LicenseProps} from "../app";
import Page from "../page";
import LoginToContinue from "../login-to-continue";
import GetLicense from "../get-license";
import ReleaseLicense from "../release-license";
import NoLicenseAvailable from "../no-license-available";

interface ExampleProps extends Pick<AuthProps, 'authentication'>, LicenseProps, ExampleContent {}

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
              updateLicenseStatus={updateLicenseStatus}
              authentication={authentication}
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
