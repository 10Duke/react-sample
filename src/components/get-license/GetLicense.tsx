import React from "react";
import "./GetLicense.scss";

/**
 * Component for rendering a get license button with content covering mask on top of actual content.
 * @constructor
 */
function GetLicense() {
    return (
        <div
            data-test-get-license
            className='get-license'
            onClick={() => {alert('todo')}}
        >
            <button data-test-get-license-trigger
                    type={'button'}
                    className={'btn btn-primary btn-lg'}
            >Get license to play</button>
        </div>
    );
}
export default GetLicense;
