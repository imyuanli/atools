import {CopyOutlined} from "@ant-design/icons";
import copy from 'copy-to-clipboard'
import {message} from "antd";

export default function Copy(props: any) {
    const {value} = props
    const copyEleValue = () => {
        copy(value);
        message.success("复制成功")
    }
    return (
        <div className={'absolute top-1 right-1 cursor-pointer'} onClick={copyEleValue}>
            <CopyOutlined className={'text-lg text-gray-500'}/>
        </div>
    );
}
