import React from "react";
import { Link, useLocation } from "react-router-dom";

function LoginToContinue() {
    const location = useLocation();
    return (
        <div className={"login-to-continue text-center"}>
            <p>
                This content is reserved for members only
            </p>
            <Link to={"/login?then=" + location.pathname} className={'btn btn-lg btn-primary'}>
                Login to continue
            </Link>
        </div>
    );
}

export default LoginToContinue;
