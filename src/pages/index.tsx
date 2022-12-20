import {SearchOutlined} from "@ant-design/icons";
import {Button, Input} from "antd";
import {Link} from "@umijs/renderer-react";
import Title from "@/components/title";
import './index.css'
import MyCard from "@/components/my-card";
import {ROUTERS} from "@/constant";
import Readme from "@/components/readme";
import {useState} from "react";

export default function Index() {
    let sum = 0
    return (
        <div>
            <Title/>
            {/*<Input*/}
            {/*    placeholder="输入关键字搜索"*/}
            {/*    prefix={<SearchOutlined className="site-form-item-icon"/>}*/}
            {/*    size={'large'}*/}
            {/*/>*/}
            {
                ROUTERS.map((router: any, index) => {
                    return (
                        <MyCard key={index} title={router?.title} icon={router?.icon} isIndex={true}>
                            {
                                router?.router.map((item: any, k: number) => {
                                    sum+=1
                                    return (
                                        <Link key={k} to={item?.value} className={'inline-grid'}>
                                            <Button size={'large'}>
                                                {item?.name}
                                            </Button>
                                        </Link>
                                    )
                                })
                            }
                        </MyCard>
                    )
                })
            }
            <Readme explain={
                ` 当前处于高速更新迭代中，敬请期待 (当前共有${sum}个工具)`}/>
        </div>
    );
}
