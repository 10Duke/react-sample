import React from "react";
import { Link } from "react-router-dom";

function LoginToContinue() {
    return (
        <div className={"login-to-continue text-center"}>
            <p>
                This content is reserved for members only
            </p>
            <Link to={"/login"} className={'btn btn-lg btn-primary'}>
                Login to continue
            </Link>
        </div>
    );
}

export default LoginToContinue;
