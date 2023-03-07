import Title from "@/components/title";
import MyCard from "@/components/my-card";
import {Button, Input, Radio, Tabs} from "antd";
import {useSetState} from "ahooks";
import {useEffect, useState} from "react";
import relationship from 'relationship.js'
import Readme from "@/components/readme";
import Explain from "@/components/explain";

const relativeArr = ['爸爸', '妈妈', '老公', '老婆', '哥哥', '弟弟', '姐姐 ', '妹妹', '儿子', '女儿']
const obj = {
    text: '',
    target: '',
    sex: 1,
    reverse: false,
}
export default function Relative() {
    //模式
    const [type, setType] = useState('default')
    const [data, setData] = useSetState(obj)
    //结果
    const [result, setResult] = useState<any>("")
    const {text, reverse, sex, target} = data

    //链接称谓
    const handleReverse = (name: string) => {
        if (text) {
            setData({
                text: text + '的' + name
            })
        } else {
            setData({
                text: name
            })
        }
    }
    //回退称谓
    const rollBackReverse = () => {
        const res = text.split('的')
        res.splice(res.length - 1, 1)
        setData({
            text: res.join('的')
        })
    }
    useEffect(() => {
        if (text) {
            let res = ''
            //算称谓
            if (type === 'default') {
                res = relationship({
                    text,
                    sex,
                    reverse,
                })
            }
            if (type === 'chain') {
                res = relationship({
                    text,
                    type,
                })
            }
            if (type === 'pair') {
                res = relationship({
                    text,
                    type,
                    target
                })
            }
            setResult(res)
        }
    }, [data])

    //切换模式清空之前的操作
    useEffect(() => {
        setData(obj)
        setResult("")
    }, [type])

    return (
        <div>
            <Title value={'亲戚关系计算器'} isLogin={true}/>
            <MyCard title={'亲戚关系计算器'}>
                <Tabs
                    defaultActiveKey="1"
                    onChange={(value) => {
                        setType(value)
                    }}
                    items={[
                        {
                            key: 'default',
                            label: '算称谓',
                            children: <>
                                <div className={'mb-3'}>
                                    <Radio.Group
                                        value={sex}
                                        onChange={(e) => {
                                            setData({
                                                sex: e.target.value
                                            })
                                        }}
                                    >
                                        <Radio value={1}>我是男的</Radio>
                                        <Radio value={0}>我是女的</Radio>
                                    </Radio.Group>
                                </div>
                                <div className={'mb-3'}>
                                    <Radio.Group
                                        value={reverse}
                                        onChange={(e) => {
                                            setData({
                                                reverse: e.target.value
                                            })
                                        }}
                                    >
                                        <Radio value={false}>我称呼对方</Radio>
                                        <Radio value={true}>对方称呼我</Radio>
                                    </Radio.Group>
                                </div>
                                <Input
                                    onChange={(e) => {
                                        setData({
                                            text: e.target.value
                                        })
                                    }}
                                    value={text}
                                    allowClear
                                    placeholder={"称呼之间用'的'字分开"}
                                />
                                <div className={'flex flex-wrap mt-3 w-full'}>
                                    {relativeArr.map((item, index) => {
                                        return (
                                            <Button
                                                key={index}
                                                onClick={() => {
                                                    handleReverse(item)
                                                }}
                                                className={'mr-1 mb-1'}
                                                size={'large'}
                                                type={'primary'}
                                            >
                                                {item}
                                            </Button>
                                        )
                                    })}
                                    <Button
                                        onClick={rollBackReverse}
                                        className={'mr-1 mb-1'}
                                        size={'large'}
                                        type={'primary'}
                                        danger
                                    >
                                        回退
                                    </Button>
                                </div>
                            </>,
                        },
                        {
                            key: 'chain',
                            label: '找关系',
                            children: <>
                                <Input
                                    placeholder={'输入要查询的称呼'}
                                    onChange={(e: any) => {
                                        setData({
                                            text: e.target.value
                                        })
                                    }}
                                    allowClear
                                />
                            </>,
                        },
                        {
                            key: 'pair',
                            label: '两者合称',
                            children: <div className={'flex-center'}>
                                <Input
                                    placeholder={'输入要查询的称呼'}
                                    onChange={(e: any) => {
                                        setData({
                                            text: e.target.value
                                        })
                                    }}
                                    allowClear
                                />
                                <span className={'text-xl'}>+</span>
                                <Input
                                    placeholder={'输入要查询的称呼'}
                                    onChange={(e: any) => {
                                        setData({
                                            target: e.target.value
                                        })
                                    }}
                                    allowClear
                                />
                            </div>,
                        },
                    ]}
                />
            </MyCard>
            {
                result &&
              <MyCard title={'计算结果'}>
                  {
                      result.length > 0
                          ?
                          result.map((item: any, index: any) => {
                              return (
                                  <div key={index}>{item}</div>
                              )
                          })
                          :
                          <div>你确定你们有血缘关系是吧?</div>
                  }
              </MyCard>
            }
            <Readme>
                <Explain>
                    逢年过节遇到三姑六婆，拒绝叫不出口的尴尬！轻松搞定亲戚关系～
                </Explain>
                <Explain>
                    如果有多个结果说明有多个称谓
                </Explain>
                <Explain>
                    称谓歧义可到 <a href="https://github.com/mumuy/relationship">relationship</a> 进行反馈
                </Explain>
            </Readme>
        </div>
    );
}

 
