import React from "react";
import "./GetLicense.scss";
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
