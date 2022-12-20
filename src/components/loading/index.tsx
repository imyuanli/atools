import {Spin} from "antd";
import React from "react";

interface props {
    text?: string
}

export const Loading: React.FunctionComponent<props> = ({text}) => {
    return (
        <div className={'flex justify-center items-center flex-col w-full'}>
            <Spin tip={text ? text : `Loading...`}/>
        </div>
    );
}
export default Loading
