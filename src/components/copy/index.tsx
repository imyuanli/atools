import {CopyOutlined} from "@ant-design/icons";

export default function Copy() {
    return (
        <div className={'absolute top-2 right-2 cursor-pointer'}>
            <CopyOutlined className={'text-xl text-gray-500'} />
        </div>
    );
}
