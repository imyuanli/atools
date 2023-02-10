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
        <div className={'absolute top-0 right-0 cursor-pointer'} onClick={copyEleValue}>
            <CopyOutlined className={'text-xl color-main'}/>
        </div>
    );
}
