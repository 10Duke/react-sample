import React from "react";
import "./Processing.scss";
function Login(props: React.HTMLAttributes<HTMLDivElement>) {
    const {className, ...other} = props;
    return (
        <div className={'processing text-center'}>
             <div className={'processing-indicator'}>LOADING..<span className={'blink'}>.</span></div>
        </div>
    );
}
export default Login;
