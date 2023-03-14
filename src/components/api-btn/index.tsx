import {Button} from "antd";
import React from "react";

interface props {
    text: any,
    func: any
}

const ApiBtn: React.FunctionComponent<props> = ({text, func}) => {
    return (
        <div className={'flex w-full justify-end items-center'}>
            <Button
                type={'primary'}
                size={'large'}
                onClick={func}
            >
                {text}
            </Button>
        </div>
    );
}

export default ApiBtn
