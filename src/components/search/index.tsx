import {Input} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import {useState} from "react";

export default function Search() {
    //聚焦
    const [isFocus, setIsFocus] = useState(false)
    return (
        <div
            className={`flex-center  ${isFocus ? 'bg-color-main text-white' : 'bg-white'} p-3 rounded-lg shadow-lg duration-100`}>
            <SearchOutlined className={'text-2xl mr-3'}/>
            <Input
                placeholder="输入关键字搜索"
                size={'large'}
                style={{color: isFocus ? 'white' : ''}}
                bordered={false}
                onFocus={() => {
                    setIsFocus(true)
                }}
                onBlur={() => {
                    setIsFocus(false)
                }}
            />
        </div>
    );
}
