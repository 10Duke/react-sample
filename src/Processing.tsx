import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import "./Processing.scss";
function Login(props: React.HTMLAttributes<HTMLDivElement>) {
    const {children, className, ...other} = props;
    return (
        <div className={'processing'}>
            <div className={'card'} {...other}>
                <div className={'card-body text-center'}>
                    <FontAwesomeIcon icon={faSpinner} spin={true} size={"8x"} />
                    <div className={'processing-content'}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Login;
