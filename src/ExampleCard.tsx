import React, {ReactNode} from "react";
import {Link} from "react-router-dom";

interface ExampleCardProps extends React.HTMLAttributes<HTMLDivElement> {
    header?: ReactNode,
    link: string,
}

function ExampleCard(props: ExampleCardProps) {
    const {
        header,
        children,
        link,
    } = props;
    return (
        <Link className="card" to={link}>
        <div className="card-body">
            { header && (<h5 className="card-title">{header}</h5>)}
            {children}
        </div>
        <div className="card-footer">
            <div className={'btn btn-secondary btn-block'}>
                Try me!
            </div>
        </div>
    </Link>
    );
}

export default ExampleCard;
