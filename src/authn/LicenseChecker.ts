import { Jose } from "jose-jwe-jws";

import _debug from "debug";
const debug = _debug("LicenseChecker");

/**
 * Result of a license check / consume request.
 */
export interface LicenseCheckResult {
  [claim: string]: any;
}

/**
 * License checking / consuming error.
 */
export class LicenseCheckError extends Error {
  public error: string;
  public error_description?: string;
  public error_uri?: string;

  public constructor(
    error: string,
    error_description?: string,
    error_uri?: string
  ) {
    super(error_description || error);
    this.error = error;
    this.error_description = error_description;
    this.error_uri = error_uri;
  }
}

/**
 * License checker for making license consumption requests.
 */
export default class LicenseChecker {
  private accessToken: string;
  private authzUri: URL;
  private jwskUri: URL;
  private hw: string | undefined;

  /**
   * Initializes a new instance of the license checker.
   * @param accessToken OAuth access token.
   * @param authnUri URL of endpoint for license consumption calls.
   * @param jwksUri URL of identity provider endpoint for JWKS key service.
   * @param hw Identifier of the device from which license is consumed.
   */
  public constructor(
    accessToken: string,
    authzUri: URL,
    jwksUri: URL,
    hw?: string
  ) {
    this.accessToken = accessToken;
    this.authzUri = authzUri;
    this.jwskUri = jwksUri;
    this.hw = hw;
  }

  /**
   * Consumes license.
   * @param licensedItem Name of licensed item to consume.
   * @param hw Hardware / device identifier.
   */
  public async consumeLicense(
    licensedItem: string
  ): Promise<LicenseCheckResult> {
    let url = new URL(this.authzUri.toString());
    const query = url.searchParams || new URLSearchParams();
    query.append(licensedItem, "");
    if (this.hw) {
      query.append("hw", this.hw);
    }
    url.search = query.toString();
    url.pathname = url.pathname + ".jwt";

    const response = await fetch(url.toString(), {
      method: "POST",
      cache: "no-cache",
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    const responseJwt = await response.text();
    debug("Result license token for consume %s: %s", licensedItem, responseJwt);

    const responseFields = await this.parseAndValidateJwt(responseJwt);
    debug("Result fields for consume %s: %o", licensedItem, responseFields);

    return responseFields;
  }

  /**
   * Parses and validates the received license token.
   * @param licenseToken The received license token as a JWT string.
   * @returns Object with license check / consume result fields. If license granted,
   *    the result contains field for the checked licensed item with boolean true value.
   *    For example, if successfully consuming license for "myFeatureX", there is a result
   *    field "myFeatureX": true. If license not granted, the result contains field
   *    [licensedItem]_error, for example "myFeatureX_error": "License not granted error message".
   */
  private async parseAndValidateJwt(
    licenseToken: string
  ): Promise<LicenseCheckResult> {
    const verificationResult = await this.verifyLicenseToken(licenseToken);
    return JSON.parse(verificationResult.payload) as LicenseCheckResult;
  }

  /**
   * Verifies signature of the received license token.
   * @param licenseToken The received license token as a JWT string.
   * @returns Verification result for successfully verified license token.
   *    "payload" field contains the ID token payload as a JSON string.
   */
  private async verifyLicenseToken(licenseToken: string): Promise<any> {
    const cryptographer = new Jose.WebCryptographer();
    cryptographer.setContentSignAlgorithm("RS256");
    const verifier = new Jose.JoseJWS.Verifier(
      cryptographer,
      licenseToken,
      (keyId) => this.getSignerPublicKey()
    );
    let verificationResults: any = undefined;
    try {
      verificationResults = await verifier.verify();
    } catch (err) {
      throw new LicenseCheckError(
        "license_token_verification_failed",
        "License token signature verification failed"
      );
    }
    debug("License token verification results: %o", verificationResults);
    const verificationResult = verificationResults[0];
    if (
      !verificationResult.verified ||
      verificationResult.payload === undefined
    ) {
      throw new LicenseCheckError(
        "invalid_license_token",
        "signature verification failed"
      );
    }
    return verificationResult;
  }

  /**
   * Gets public key of the server used for signing license tokens.
   */
  private async getSignerPublicKey(): Promise<CryptoKey> {
    const keys = await this.fetchKeys();
    if (keys && keys.length > 0) {
      const signerKey = keys[0];
      debug("Signer key from JWKS endpoint: %o", signerKey);
      return Jose.Utils.importRsaPublicKey(keys[0], "RS256");
    }
    throw new LicenseCheckError("empty_jwks_response", "No signer keys found");
  }

  /**
   * Fetch signer keys from the server.
   */
  private async fetchKeys(): Promise<JWKRSA[]> {
    const response = await fetch(this.jwskUri.toString());
    if (response.ok) {
      return (await response.json())["keys"] as JWKRSA[];
    }
    throw new LicenseCheckError(
      "invalid_jwks_response",
      `Fetching signer keys failed with response status ${response.status}`
    );
  }
}
