import * as React from "react";
import {Input} from "antd";

export default function BaseTransform(props: any) {
    const {name, value, onChange} = props
    return (
        <div className="mt-3 p-3 rounded-lg bg-blue-50 flex-center relative">
            <div className={'text-base'}>
                <span>{name}：</span>
            </div>
            <Input
                value={value}
                onChange={onChange}
                style={{width: '100%'}}
                allowClear
                placeholder="输入数据"
            />
        </div>
    );
}
