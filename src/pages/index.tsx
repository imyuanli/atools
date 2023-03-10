import {Button, Card, Input, Result, Statistic} from "antd";
import MyCard from "@/components/my-card";
import {DEFAULT_TYPE} from "@/utils";
import Readme from "@/components/readme";
import Title from "@/components/title";
import React, {useEffect, useState} from "react";
import Highlight from "@/components/highlight";
import Explain from "@/components/explain";
import {FileSearchOutlined, LikeOutlined, SearchOutlined, ToolOutlined} from "@ant-design/icons";
import RouterBtn from "@/components/router-btn";
import {useSelector} from "@@/exports";
import Loading from "@/components/loading";

export default function Index() {
    const toolArr = useSelector((state: any) => state.tools.toolArr);
    //接口获取列表
    const [toolList, setToolList] = useState([])
    const [sum, setSum] = useState(0)
    const [allViews, setAllViews] = useState(0)
    useEffect(() => {
        if (toolArr) {
            const arr: any = DEFAULT_TYPE.map(pitem => {
                const children = toolArr.filter((item: any) => {
                    return pitem.value == item?.type
                })
                return {...pitem, children}
            })
            const allViews = toolArr.reduce((pre: any, cur: any) => {
                return pre + cur.views
            }, 0)
            setAllViews(allViews)
            setSum(toolArr.length)
            setToolList(arr)
        }
    }, [toolArr])
    //搜索结果
    const [inputVal, setInputVal] = useState(null)
    const [resultArr, setResultArr] = useState<any>([])
    const handleChange = (e: any) => {
        let val = e.target.value
        setInputVal(val)
        if (sum > 0 && toolArr) {
            const arr = toolArr?.filter((item: any) => {
                return item.name.toLowerCase().indexOf(val.toLowerCase()) >= 0
            })
            setResultArr(arr)
        }
    }
    return (
        <div>
            <Title/>
            <div className={'grid gap-4 grid-cols-2'}>
                <MyCard>
                    <div className={'flex-center'}>
                        <div className={'bg-color-shadow p-3 rounded-full flex-center mr-3'}>
                            <ToolOutlined className={'color-main text-2xl'}/>
                        </div>
                        <div className={'flex-center flex-col'}>
                            <div className={'font-bold mx-1 text-3xl'}>
                                {sum}
                            </div>
                            <div>
                                全部工具数
                            </div>
                        </div>
                    </div>
                </MyCard>
                <MyCard>
                    <div className={'flex-center'}>
                        <div className={'bg-color-shadow p-3 rounded-full flex-center mr-3'}>
                            <LikeOutlined className={'color-main text-2xl'}/>
                        </div>
                        <div className={'flex-center flex-col'}>
                            <div className={'font-bold mx-1 text-3xl'}>
                                {allViews}
                            </div>
                            <div>
                                累计使用次数
                            </div>
                        </div>
                    </div>
                </MyCard>
            </div>
            <div className={'mb-12 p-3 shadow-lg bg-white rounded-lg border-2'}>
                <Input
                    prefix={<SearchOutlined className={'text-2xl mr-3'}/>}
                    placeholder="输入关键字搜索"
                    size={'large'}
                    onChange={handleChange}
                    allowClear={true}
                    bordered={false}
                />
            </div>
            {
                toolArr ?
                    inputVal ?
                        <MyCard isIndex={resultArr.length > 0} title={'搜索结果'} icon={<FileSearchOutlined/>}>
                            {
                                resultArr.length > 0 ?
                                    <RouterBtn routerList={resultArr}/>
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
                            {
                                toolList?.map((list: any, index: any) => {
                                    return (
                                        <>
                                            {list.children.length > 0 &&
                                              <div key={index}>
                                                <MyCard title={list?.label} icon={list?.icon} isIndex={true}>
                                                  <RouterBtn routerList={list?.children}/>
                                                </MyCard>
                                              </div>
                                            }
                                        </>
                                    )
                                })
                            }
                            {/*<Favorites routerList={routerList}/>*/}
                        </>
                    :
                    <Loading/>
            }
            <Readme>
                <Explain>
                    第三方软件(手机 App 或电脑软件)将本网站 <a href="https://atools.imyuanli.cn/"> https://atools.imyuanli.cn/ </a>嵌入到软件内时,
                    请注明来源, 且软件内产生的一切内容与本网站无关
                </Explain>
                <Explain>
                    当前处于高速更新迭代中，敬请期待 (当前共有 <Highlight value={sum}/> 个工具)
                </Explain>
            </Readme>
        </div>
    );
}
