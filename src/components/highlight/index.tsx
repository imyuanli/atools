import React from "react";

interface props {
    value?: any
}

export const Highlight: React.FunctionComponent<props> = ({value}) => {
    return (
        <span className={'mx-1 color-main'}>{value}</span>
    );
}
export default Highlight
