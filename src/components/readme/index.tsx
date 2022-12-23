import MyCard from "@/components/my-card";
import {ExclamationCircleOutlined} from "@ant-design/icons";
import './index.css'
import React from "react";

interface props {
    explain: any
}

const Readme: React.FunctionComponent<props> = ({explain}) => {
    return (
        <MyCard title={'说明文档'} icon={<ExclamationCircleOutlined/>}>
            <div>
                {
                    explain.split('\n').map((item:any,index:any) => {
                        return (
                            <div key={index} className={'explain-li text-base mb-1'}>
                                {
                                    item
                                }
                            </div>
                        )
                    })
                }
            </div>
        </MyCard>
    );
}
export default Readme
