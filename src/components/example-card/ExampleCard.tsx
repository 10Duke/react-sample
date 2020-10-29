import React, {ReactNode} from "react";
import {Link} from "react-router-dom";
import "./ExampleCard.scss";

interface ExampleCardProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Card header
     */
    header?: ReactNode,
    /**
     * card image
     */
    image?: string,
    /**
     * link target for the card
     */
    link: string,
}

/**
 * Conponent for rendering example content as a card for home-page
 * @param props
 * @constructor
 */
function ExampleCard(props: ExampleCardProps) {
    const {
        header,
        image,
        children,
        link,
    } = props;
    return (
        <Link className="card example-card" to={link}>
            {image && (
                <div className="card-img-top">
                    <img src={image} alt="Screenshot" title="" />
                </div>
            )}
        <div className="card-body">
            { header && (<h5 className="card-title">{header}</h5>)}
            {children}
        </div>
        <div className="card-footer">
            <div className={'btn btn-secondary btn-block'}>
                Start playing
            </div>
        </div>
    </Link>
    );
}

export default ExampleCard;
