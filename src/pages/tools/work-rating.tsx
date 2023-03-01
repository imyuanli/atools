import Title from "@/components/title";
import MyCard from "@/components/my-card";
import {Button, Checkbox, Input, Radio, Select, Statistic} from "antd";
import * as React from "react";
import {useSetState} from "ahooks";
import ApiBtn from "@/components/api-btn";
import {useEffect, useState} from "react";
import {FrownOutlined, MehOutlined, SmileOutlined} from "@ant-design/icons";
import Readme from "@/components/readme";
import Explain from "@/components/explain";

export default function WorkRating() {
    const inputArr: any[] = [
        {
            name: '平均日薪(实际到手)',
            type: 'perDiem',
            placeholder: 'xxxxx元',
            isInput: true,
            suffix: '元'
        },
        {
            name: '每日工作时长',
            type: 'workDuration',
            placeholder: '下班时间-上班时间',
            isInput: true,
            suffix: '小时'
        },
        {
            name: '每日通勤时长',
            type: 'commuteDuration',
            placeholder: 'xx小时',
            isInput: true,
            suffix: '小时'
        },
        {
            name: '每日摸鱼时长',
            type: 'freeDuration',
            placeholder: '不干活+吃饭+午休的xx小时',
            isInput: true,
            suffix: '小时'
        },
        {
            name: '学历',
            type: 'education',
            option: [
                {
                    value: 0.8,
                    label: '专科及以下',
                },
                {
                    value: 1,
                    label: '普通本科',
                },
                {
                    value: 1.2,
                    label: '985/211本科',
                },
                {
                    value: 1.4,
                    label: '普通硕士',
                },
                {
                    value: 1.6,
                    label: '985/211硕士',
                },
                {
                    value: 1.8,
                    label: '普通博士',
                },
                {
                    value: 2,
                    label: '985/211博士',
                }
            ]
        },
        {
            name: '工作环境',
            type: 'work',
            option: [
                {
                    value: 0.8,
                    label: '偏僻地区',
                },
                {
                    value: 0.9,
                    label: '工厂户外',
                },
                {
                    value: 1,
                    label: '普通',
                },
                {
                    value: 1.1,
                    label: '体制内',
                },
            ]
        },
        {
            name: '异性环境',
            type: 'sex',
            option: [
                {
                    value: 0.9,
                    label: '没有',
                },
                {
                    value: 1,
                    label: '不多不少',
                },
                {
                    value: 1.1,
                    label: '很多',
                },
            ]
        },
        {
            name: '同事环境',
            type: 'tongshi',
            option: [
                {
                    value: 0.95,
                    label: 'SB很多',
                },
                {
                    value: 1,
                    label: '普通很多',
                },
                {
                    value: 1.05,
                    label: '优秀很多',
                },
            ]
        },
        {
            name: '职业环境',
            type: 'job',
            option: [
                {
                    value: 1,
                    label: '无要求',
                },
                {
                    value: 1.05,
                    label: '建造造价监理',
                },
                {
                    value: 1.1,
                    label: '建筑岩土结构',
                },
                {
                    value: 1.15,
                    label: '主任医师、教授',
                },
            ]
        },
        {
            name: '是否8:30前上班',
            type: 'isEight',
            option: [
                {
                    value: 0.95,
                    label: '是',
                },
                {
                    value: 1,
                    label: '否',
                },

            ]
        },
    ]
    const [inputValue, setInputValue] = useSetState<any>({
        perDiem: 200,
        workDuration: 8,
        commuteDuration: 2,
        freeDuration: 2,
        education: 1,
        work: 1,
        sex: 1,
        tongshi: 1,
        job: 1,
        isEight: 1,
    })
    const [check, setCheck] = useState(false)
    const onChangeInput = (value: any, type: any) => {
        setInputValue({
            [type]: value
        })
    }
    const [workCost, setWorkCost] = useState<any>(null)
    const getResult = () => {
        const {
            perDiem,
            workDuration,
            commuteDuration,
            freeDuration,
            education,
            work,
            sex,
            tongshi,
            job,
            isEight
        } = inputValue
        //综合环境
        let environment = job * work * sex * tongshi
        let workCost = (perDiem * environment) / (35 * (Number(workDuration) + Number(commuteDuration) - (Number(0.5 * freeDuration))) * education)
        if (isEight !== 1) {
            workCost = workCost * isEight
        }
        //八点前上班
        if (check) {
            workCost = workCost * 0.95
        }
        setWorkCost(workCost.toFixed(2))
    }
    return (
        <div>
            <Title value={'这班上的值不值得'}/>
            <MyCard title={'这班上的值不值得'}>
                {
                    inputArr.map((item, index) => {
                        const {name, type, placeholder, isInput, option} = item
                        return (
                            <div key={index} className="mt-3 p-3 rounded-lg flex relative">
                                <div className={'text-base flex-none'}>
                                    <span>{name}：</span>
                                </div>
                                {
                                    isInput ?
                                        <Input
                                            value={inputValue[type]}
                                            onChange={(e: any) => {
                                                onChangeInput(e.target.value, type)
                                            }}
                                            style={{width: '100%'}}
                                            allowClear
                                            placeholder={placeholder}
                                            suffix={item.suffix}
                                        />
                                        :
                                        <Select
                                            className={'w-full'}
                                            defaultValue={inputValue[type]}
                                            onChange={(value: any) => {
                                                onChangeInput(value, type)
                                            }}
                                            options={option}
                                        />
                                }
                            </div>
                        )
                    })
                }
                <div className="mt-3 p-3 rounded-lg flex relative">
                    <div className={'text-base flex-none'}>
                        <span>八点前上班建议勾选：<Checkbox onChange={() => {
                            setCheck(!check)
                        }}/></span>
                    </div>
                </div>
                <ApiBtn
                    text={'看看结果'}
                    func={getResult}
                />
            </MyCard>
            {
                workCost &&
              <MyCard title={'工作性价比'}>
                <div className={'w-full flex-center flex-col'}>
                  <Statistic
                    title="工作性价比"
                    value={workCost}
                    prefix={
                        <div>
                            {
                                workCost <= 0.8 && <FrownOutlined/>
                            }
                            {
                                (workCost > 1.5 && workCost <= 2) && <MehOutlined/>
                            }
                            {
                                workCost > 2 && <SmileOutlined/>
                            }
                        </div>
                    }
                  />
                  <div className={'text-xl'}>
                      {
                          workCost <= 0.8 &&
                        <div>这破班不如不上！</div>
                      }
                      {
                          workCost > 0.8 && workCost <= 1.5 &&
                        <div>标准的打工人</div>
                      }
                      {
                          (workCost > 1.5 && workCost <= 2) &&
                        <div>这班上的有点爽，羡慕啊，求内推！</div>
                      }
                      {
                          workCost > 2 &&
                        <div>这班上的爽到爆，老板亲儿子是吧！</div>
                      }
                  </div>
                </div>
              </MyCard>
            }
            <Readme>
                <Explain>
                    以上结果仅供娱乐，请勿当真影响你的工作
                </Explain>
                <Explain>
                    工作性价比低于0.8的人很惨,高于1.5的人很爽,高于2.0的人爽爆炸
                </Explain>
            </Readme>
        </div>
    );
}
