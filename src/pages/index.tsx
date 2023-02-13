import {Input, Result} from "antd";
import './index.css'
import MyCard from "@/components/my-card";
import {DEFAULT_ROUTER, DEFAULT_TYPE} from "@/constant";
import Readme from "@/components/readme";
import {useOutletContext} from "@@/exports";
import Favorites from "@/components/favorites";
import Title from "@/components/title";
import React, {useState} from "react";
import Highlight from "@/components/highlight";
import Explain from "@/components/explain";
import {FileSearchOutlined, SearchOutlined} from "@ant-design/icons";
import RouterBtn from "@/components/router-btn";

export default function Index() {
    const {routerList}: any = useOutletContext();
    //总共有多少工具
    let sum = 0
    //搜索结果
    const [inputVal, setInputVal] = useState(null)
    const [resultArr, setResultArr] = useState<any>([])
    const handleChange = (e: any) => {
        let val = e.target.value
        setInputVal(val)
        let arr: Array<any> = []
        if (val) {
            arr = DEFAULT_ROUTER.filter((item: any) => {
                return item.name.toLowerCase().indexOf(val.toLowerCase()) >= 0
            })
        }
        setResultArr([...arr])
    }
    //状态数组
    const stateArr = [
        {
            name: '热门',
            state: 'hot',
        },
        {
            name: '新功能',
            state: 'new',
        },
        {
            name: '推荐',
            state: 'recommend',
        },
        {
            name: '维护中',
            state: 'error',
        }
    ]
    return (
        <div>
            <Title/>
            <Input
                prefix={<SearchOutlined className={'text-2xl mr-3'}/>}
                placeholder="输入关键字搜索"
                size={'large'}
                onChange={handleChange}
                allowClear={true}
            />
            {
                inputVal ?
                    <MyCard isIndex={resultArr.length > 0} title={'搜索结果'} icon={<FileSearchOutlined/>}>
                        {
                            resultArr.length > 0 ?
                                resultArr?.map((result: any, index: number) => {
                                    return (
                                        <div key={index}>
                                            <RouterBtn router={result}/>
                                        </div>
                                    )
                                })
                                :
                                <div className={'flex-center'}>
                                    <Result
                                        style={{padding: 0}}
                                        title="没有找到相关结果"
                                    />
                                </div>
                        }
                    </MyCard>
                    :
                    <>
                        <Favorites routerList={routerList}/>
                        {
                            DEFAULT_TYPE.map((list: any, index: any) => {
                                return (
                                    <MyCard key={index} title={list?.title} icon={list?.icon} isIndex={true}>
                                        {
                                            routerList?.map((router: any, k: number) => {
                                                if (list?.type == router?.type) {
                                                    sum += 1
                                                    return (
                                                        <div key={router.name + k} className={'w-full'}>
                                                            <RouterBtn router={router}/>
                                                        </div>
                                                    )
                                                }
                                            })
                                        }
                                    </MyCard>
                                )
                            })
                        }
                    </>
            }
            <Readme>
                <Explain>
                    <div className={'flex'}>
                        {
                            stateArr.map((item, index) => {
                                return (
                                    <div key={index} className={'relative pr-4 mr-3'}>
                                        <div>{item.name}</div>
                                        <div className={`badge ${item.state}`}/>
                                    </div>
                                )
                            })
                        }
                    </div>
                </Explain>
                <Explain>
                    第三方软件(手机 App 或电脑软件)将本网站 <a href="https://woodbox.imyuanli.cn"> https://woodbox.imyuanli.cn </a>嵌入到软件内时, 请注明来源, 且软件内产生的一切内容与本网站无关
                </Explain>
                <Explain>
                    当前处于高速更新迭代中，敬请期待 (当前共有 <Highlight value={sum}/> 个工具)
                </Explain>
            </Readme>
        </div>
    );
}
