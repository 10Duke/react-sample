import React from "react";
function ReleaceLicense() {
    return (
        <button
            data-test-release-license-trigger
            type={'button'} className={'btn btn-sm btn-secondary page-header-tools'}
            onClick={() => {alert('TODO')}}
        >Release license</button>
    );
}
export default ReleaceLicense;
