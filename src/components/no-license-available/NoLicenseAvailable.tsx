import React from "react";
import "./NoLicenseAvailable.scss";


/**
 * Component for rendering a get license button with content covering mask on top of actual content.
 * @constructor
 */
function NoLicenseAvailable() {
    return (
        <div
            data-test-no-license-available
            className='no-license-available'
        >
            <h1>No available licenses</h1>
        </div>
    );
}
export default NoLicenseAvailable;
