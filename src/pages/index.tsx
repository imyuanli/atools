import {Input, Result} from "antd";
import MyCard from "@/components/my-card";
import {DEFAULT_TYPE} from "@/utils";
import Readme from "@/components/readme";
import Title from "@/components/title";
import React, {useEffect, useState} from "react";
import Highlight from "@/components/highlight";
import Explain from "@/components/explain";
import {FileSearchOutlined, SearchOutlined} from "@ant-design/icons";
import RouterBtn from "@/components/router-btn";
import {useSelector} from "@@/exports";

export default function Index() {
    const toolArr = useSelector((state: any) => state.tools.toolArr);
    //接口获取列表
    const [toolList, setToolList] = useState([])
    const [sum, setSum] = useState(0)
    useEffect(() => {
        const arr: any = DEFAULT_TYPE.map(pitem => {
            const children = toolArr.filter((item: any) => pitem.value == item?.type)
            return {...pitem, children}
        })
        setSum(toolArr.length)
        setToolList(arr)
    }, [])
    //搜索结果
    const [inputVal, setInputVal] = useState(null)
    const [resultArr, setResultArr] = useState<any>([])
    const handleChange = (e: any) => {
        let val = e.target.value
        setInputVal(val)
        if (sum > 0) {
            const arr = toolList?.filter((item: any) => {
                return item.name.toLowerCase().indexOf(val.toLowerCase()) >= 0
            })
            setResultArr(arr)
        }
    }
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
            }
            <Readme>
                <Explain>
                    第三方软件(手机 App 或电脑软件)将本网站 <a href="https://woodbox.imyuanli.cn"> https://woodbox.imyuanli.cn </a>嵌入到软件内时,
                    请注明来源, 且软件内产生的一切内容与本网站无关
                </Explain>
                <Explain>
                    当前处于高速更新迭代中，敬请期待 (当前共有 <Highlight value={sum}/> 个工具)
                </Explain>
            </Readme>
        </div>
    );
}
