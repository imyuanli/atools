import {Spin} from "antd";

export default function Loading() {
    return (
        <div className={'flex justify-center items-center flex-col w-full'}>
            <Spin tip="全力加载中..." />
        </div>
    );
}
