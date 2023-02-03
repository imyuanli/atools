import './index.css'
import React from "react";

interface props {
    children: any
}

const Explain: React.FunctionComponent<props> = ({children}) => {
    return (
        <div className={'explain-li text-base mb-1'}>
            {children}
        </div>
    );
}
export default Explain