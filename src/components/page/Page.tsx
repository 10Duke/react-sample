import React, {ReactNode} from "react";
import "./Page.scss"
interface PageProps extends React.HTMLAttributes<HTMLDivElement> {
    header?: ReactNode,
    footer?: ReactNode,
}
function Page(props: PageProps) {
    const {
        children,
        header,
        footer,
        className,
        ...other
    } = props;
    let actualClass = className ? className : 'page';
    return (
        <article className={actualClass} {...other}>
            { header &&
                <header className={'page-header text-center border-bottom'}>
                    {header}
                </header>
            }
            <div className={'page-content'}>
            {children}
            </div>
            { footer &&
            <footer className={'page-footer'}>
                {footer}
            </footer>
            }
        </article>
    );
}

export default Page;
