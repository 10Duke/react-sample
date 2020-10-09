import React from "react";
import "./GetLicense.scss";
function GetLicense() {
    return (
        <div className='get-license' onClick={() => {alert('todo')}}>
            <button type={'button'} className={'btn btn-primary btn-lg'}>Get license to play</button>
        </div>
    );
}
export default GetLicense;
