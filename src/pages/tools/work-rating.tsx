import Title from "@/components/title";
import MyCard from "@/components/my-card";
import {Input, Select} from "antd";
import * as React from "react";
import {useSetState} from "ahooks";
import ApiBtn from "@/components/api-btn";

export default function WorkRating() {
    const inputArr: any[] = [
        {
            name: '平均日新',
            type: 'perDiem',
            placeholder: 'xxxxx元',
            isInput: true
        },
        {
            name: '工作时长',
            type: 'workDuration',
            placeholder: '上班时间-下班时间',
            isInput: true
        },
        {
            name: '通勤时长',
            type: 'commuteDuration',
            placeholder: 'xx小时',
            isInput: true
        },
        {
            name: '摸鱼时长',
            type: 'freeDuration',
            placeholder: '不干活+吃饭+午休的xx小时',
            isInput: true
        },
        {
            name: '学历系数',
            type: 'education',
            option: [
                {
                    value: 0.8,
                    label: '专科及以下0.8',
                },
                {
                    value: 1,
                    label: '普通本科1',
                },
                {
                    value: 1.2,
                    label: '985/211本科1.2',
                },
                {
                    value: 1.4,
                    label: '普通硕士1.4',
                },
                {
                    value: 1.6,
                    label: '985/211硕士1.6',
                },
                {
                    value: 1.8,
                    label: '普通博士1.8',
                },
                {
                    value: 2,
                    label: '985/211博士2',
                }
            ]
        },
        {
            name: '工作环境系数',
            type: 'work',
            option: [
                {
                    value: 0.8,
                    label: '偏僻地区0.8',
                },
                {
                    value: 0.9,
                    label: '工厂户外0.9',
                },
                {
                    value: 1,
                    label: '普通1',
                },
                {
                    value: 1.1,
                    label: '体制内1.1',
                },
            ]
        },
        {
            name: '异性环境系数',
            type: 'sex',
            option: [
                {
                    value: 0.9,
                    label: '没有0.9',
                },
                {
                    value: 1,
                    label: '不多不少1',
                },
                {
                    value: 1.1,
                    label: '很多1.1',
                },
            ]
        },
        {
            name: '同事环境系数',
            type: 'tongshi',
            option: [
                {
                    value: 0.95,
                    label: 'SB很多0.95',
                },
                {
                    value: 1,
                    label: '普通很多1',
                },
                {
                    value: 1.05,
                    label: '优秀很多1.05',
                },
            ]
        },
        {
            name: '职业环境系数',
            type: 'job',
            option: [
                {
                    value: 1,
                    label: '无要求,二级1',
                },
                {
                    value: 1.05,
                    label: '建造造价监理1.05',
                },
                {
                    value: 1.1,
                    label: '建筑岩土结构1.1',
                },
                {
                    value: 1.15,
                    label: '主任医师、教授1.15',
                },
            ]
        },
        {
            name: '是否8:30前上班',
            type: 'isEight',
            option: [
                {
                    value: 0.95,
                    label: '是0.95',
                },
                {
                    value: 1,
                    label: '否1',
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
    const onChangeInput = (value: any, type: any) => {
        setInputValue({
            [type]: value
        })
    }

    const [result, setResult] = useSetState({
        workCost: 0,
        environment: 0
    })

    const getResult = () => {
        console.log(inputValue)
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
        let workCost = (perDiem * environment) / (35 * (workDuration + commuteDuration - 0.5 * freeDuration) * education)
        if (isEight !== 1) {
            workCost = workCost * isEight
        }
        setResult({
            workCost,
            environment
        })
    }
    return (
        <div>
            <Title value={'这班上的值不值得'}/>
            <MyCard>
                {
                    inputArr.map((item, index) => {
                        const {name, type, placeholder, isInput, option} = item
                        return (
                            <div className="mt-3 p-3 rounded-lg flex-center relative">
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
                                            type={'number'}
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
                <ApiBtn
                    text={'到底值不值得？'}
                    func={getResult}
                />
            </MyCard>
            <MyCard>
                <div>综合环境系数：{result.environment}</div>
                <div>工作性价比：{result.workCost}</div>
            </MyCard>
        </div>
    );
}
