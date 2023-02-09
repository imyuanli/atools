import * as React from "react";
import {Input} from "antd";

export default function BaseTransform(props: any) {
    const {itemArr, setCurInput} = props

    //变更的方法
    const onChange = (value: any, type: any) => setCurInput({type, value})
    return (
        <div>
            {
                itemArr.map((item: any, index: any) => {
                    return (
                        <div key={index} className="mt-3 p-3 rounded-lg flex-center relative">
                            <div className={'text-base flex-none'}>
                                <span>{item.name}：</span>
                            </div>
                            <Input
                                value={item.value}
                                onChange={(e: any) => {
                                    onChange(e.target.value, item.type)
                                }}
                                style={{width: '100%'}}
                                allowClear
                                placeholder={`请输入${item.name}`}
                                type={item.inputType}
                            />
                        </div>
                    )
                })
            }
        </div>

    );
}
