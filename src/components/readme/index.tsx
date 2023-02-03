import MyCard from "@/components/my-card";
import {ExclamationCircleOutlined} from "@ant-design/icons";
import './index.css'
import React from "react";

interface props {
    children: any
}

const Readme: React.FunctionComponent<props> = ({children}) => {
    return (
        <MyCard title={'说明文档'} icon={<ExclamationCircleOutlined/>}>
            {children}
        </MyCard>
    );
}
export default Readme
