import React from "react";
import "./Processing.scss";
function Processing() {
    return (
        <div className={'processing text-center'}>
             <div className={'processing-indicator'}>LOADING..<span className={'blink'}>.</span></div>
        </div>
    );
}
export default Processing;
