import React/*, { useEffect, useState }*/ from "react";
import { AuthProps } from "../app";
// import createLicenseChecker from "../../authn/createLicenseChecker";
// import LicenseCheckStatus from "../../authn/LicenseCheckStatus";
import Page from "../page";
import LoginToContinue from "../login-to-continue";
import GetLicense from "../get-license";
import ReleaseLicense from "../release-license";
import {LicenseProps} from "../app/App";

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
  const { authentication, licenseStatus, updateLicenseStatus, setAuthentication } = props;
  console.log(' LicenseStatus %o', licenseStatus);
  /*
  const [licenseCheckStatus, setLicenseCheckStatus] = useState(
    LicenseCheckStatus.Unknown
  );

   */
  const hasLicense = licenseStatus &&
      licenseStatus[EXAMPLE_1_LICENSED_ITEM] !== undefined &&
      licenseStatus[EXAMPLE_1_LICENSED_ITEM][EXAMPLE_1_LICENSED_ITEM] !== undefined ?
      (licenseStatus[EXAMPLE_1_LICENSED_ITEM][EXAMPLE_1_LICENSED_ITEM] === true ? true : false) :
      (licenseStatus && licenseStatus[EXAMPLE_1_LICENSED_ITEM] ? false : undefined)
  ;
  console.log('has license %o', hasLicense);
  // licenseCheckStatus === LicenseCheckStatus.Granted;
/*
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
*/
  return (
    <Page
      data-test-page-product-1
      header={
        <>
          <h1>2048</h1>
          {hasLicense === true && <ReleaseLicense licensedItem={EXAMPLE_1_LICENSED_ITEM} licenseStatus={licenseStatus} updateLicenseStatus={updateLicenseStatus} authentication={authentication} setAuthentication={setAuthentication}/>}
        </>
      }
    >
      {authentication && (
        <>
          <iframe src={"/2048/index.html"} />
          {hasLicense === undefined && <GetLicense licensedItem={EXAMPLE_1_LICENSED_ITEM} licenseStatus={licenseStatus} updateLicenseStatus={updateLicenseStatus} authentication={authentication} setAuthentication={setAuthentication}/>}
          {hasLicense === false && (
              <h1>License not available</h1>
          )}
        </>
      )}
      {!authentication && <LoginToContinue />}
    </Page>
  );
}
export default Example1Page;
