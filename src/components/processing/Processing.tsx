import React from "react";
import "./Processing.scss";

/**
 * Renders a processing indicator, covering any page content
 * @constructor
 */
function Processing() {
    return (
        <div className={'processing text-center'}>
             <div className={'processing-indicator'}>LOADING..<span className={'blink'}>.</span></div>
        </div>
    );
}
export default Processing;
