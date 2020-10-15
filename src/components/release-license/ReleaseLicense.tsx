import React from "react";

/**
 * Renders a release license button
 * @constructor
 */
function ReleaseLicense() {
    return (
        <button
            data-test-release-license-trigger
            type={'button'} className={'btn btn-sm btn-secondary page-header-tools'}
            onClick={() => {alert('TODO')}}
        >Release license</button>
    );
}
export default ReleaseLicense;
