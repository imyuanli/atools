import './index.css'
import React from "react";

interface props {
    children: any
}

const Explain: React.FunctionComponent<props> = ({children}) => {
    return (
        <div className={'flex mb-2'}>
            <div className={'explain-li bg-color-main text-base mt-1'}/>
            <div>{children}</div>
        </div>
    );
}
export default Explain