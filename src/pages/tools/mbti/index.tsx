import Title from "@/components/title";
import MyCard from "@/components/my-card";
import {Button, Progress} from "antd";
import {useEffect, useState} from "react";
import Loading from "@/components/loading";
import {ArrowLeftOutlined, CheckCircleOutlined, EditOutlined} from "@ant-design/icons";
import Readme from "@/components/readme";
import {getPercentage} from "@/utils";
import Explain from "@/components/explain";
import {get_mbti_question_list, get_mbti_result} from "@/service/service";
import './index.css'
export default function Mbti() {
    //题目列表
    const [question, setQuestion] = useState<any>([])
    //当前题目
    const [current, setCurrent] = useState(0)
    //选的答案
    const [result, setResult] = useState<any>([])
    //生成的报告
    const [report, setReport] = useState<any>()

    //选择测试的题目
    const [loading, setLoading] = useState<any>(false)
    //选择题目
    const getTestQuestion = (level?: any) => {
        setLoading(true)
        get_mbti_question_list({level}).then(
            (res: any) => {
                if (!res.errno) {
                    setQuestion(res?.result)
                } else setLoading(false)
            }
        ).catch((e) => {
            setLoading(false)
        })
    }

    //下一题
    const onNextQuestion = (option: any, choice: any) => {
        if (current <= question.length - 1) {
            //选的值
            const res = [...result]
            res[current] = {
                choice,
                option
            }
            setResult([...res])
            //更改当前指向
            setCurrent(current + 1)
        }
    }

    //返回上一题
    const onPrevQuestion = () => {
        setCurrent(current - 1)
    }

    const [loadingReport, setLoadingReport] = useState(false)

    //生成结果
    const getTestReport = () => {
        setLoadingReport(true)
        const answers = result.map((item: any) => item.option).join(',')
        get_mbti_result({answers}).then(
            (res: any) => {
                if (!res.errno) {
                    setReport(res.result)
                    setLoadingReport(false)
                } else setLoadingReport(false)
            }
        ).catch((e) => {
            setLoadingReport(false)
        })
    }

    return (
        <div>
            <Title value={'MBTI测试'}/>
            <MyCard title={'测试列表'} icon={<EditOutlined/>}>
                <div className={'flex justify-center items-center w-full flex-col'}>
                    {
                        loading ?
                            question.length > 0 ?
                                <>
                                    {
                                        current > question.length - 1 ?
                                            <div className={'flex flex-col justify-center items-center '}>
                                                <div className={'mb-3 text-2xl flex flex-col mb-3'}>
                                                    <CheckCircleOutlined style={{color:'#34D399'}} className={'text-6xl'}/>
                                                    <span>完成测试</span>
                                                </div>
                                                <Button onClick={getTestReport}>生成测试报告</Button>
                                            </div>
                                            :
                                            <>
                                                <div className={'w-full flex justify-center items-center mb-3'}>
                                                    <div className={'mr-3'}>
                                                        <span className={'text-xl text-blue-500'}>{current + 1}</span>
                                                        /
                                                        <span className={'text-lg'}>{question.length}</span>
                                                    </div>
                                                    <Progress percent={getPercentage(current, question.length)}
                                                              showInfo={false}/>
                                                </div>
                                                <div className={'text-2xl mb-3'}>
                                                    {question[current]["q"]}
                                                </div>
                                                <div className={'flex justify-center items-center flex-wrap mb-3'}>
                                                    <Button
                                                        size={'large'}
                                                        className={'m-2'}
                                                        type={result[current]?.choice == "a" ? "primary" : "default"}
                                                        onClick={() => {
                                                            onNextQuestion(question[current]["ia"], "a")
                                                        }}
                                                    >
                                                        {question[current]["a"]}
                                                    </Button>
                                                    <Button
                                                        size={'large'}
                                                        className={'m-2'}
                                                        type={result[current]?.choice == "b" ? "primary" : "default"}
                                                        onClick={() => {
                                                            onNextQuestion(question[current]["ib"], "b")
                                                        }}
                                                    >
                                                        {question[current]["b"]}
                                                    </Button>
                                                </div>
                                                <div>
                                                    {
                                                        current > 0 && <Button type={'text'} icon={<ArrowLeftOutlined/>}
                                                                               onClick={onPrevQuestion}>返回上一题</Button>
                                                    }
                                                </div>
                                            </>
                                    }
                                </>
                                :
                                <Loading text={'正在加载测试题'}/>
                            :
                            <div className={'flex flex-col justify-center items-center '}>
                                <div className={'text-2xl mb-3'}>
                                    请选择你要进行的测试题
                                </div>
                                <div className={'flex justify-center items-center flex-wrap mb-3'}>
                                    <Button
                                        size={'large'}
                                        className={'m-2'}
                                        onClick={() => {
                                            getTestQuestion()
                                        }}
                                    >
                                        快速测试（仅4题）
                                    </Button>
                                    <Button
                                        size={'large'}
                                        className={'m-2'}
                                        onClick={() => {
                                            getTestQuestion("senior")
                                        }}
                                    >
                                        完整测试（12题）
                                    </Button>
                                </div>
                            </div>
                    }

                </div>
            </MyCard>
            {
                (loadingReport || report) &&
                <MyCard title={'测试结果'} icon={<EditOutlined/>}>
                    {
                        loadingReport ?
                            <Loading text={"正在计算你的性格类型，请稍等"}/>
                            :
                            <div>
                                <div className={'flex-center flex-col'}>
                                    <h1>“{report.alphabet}“</h1>
                                    <h2>你是一名{report.occupation}({report.vocabulary}) </h2>
                                </div>
                                <blockquote>
                                    {
                                        report.summarize.map((item: string,index:any) => {
                                            return <p key={index}>{item}</p>
                                        })
                                    }
                                </blockquote>
                                <div>
                                    <div className={'text-lg'}>
                                        类型描述：
                                    </div>
                                    <div className={'p-2'}>
                                        {
                                            report.desc.map((item:any,index:any)=>{
                                                return(
                                                    <div key={index} className={'mb-1'}>
                                                        {item}
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                <div>
                                    <div className={'text-lg'}>
                                        类型特征：
                                    </div>
                                    <div className={'p-2'}>
                                        {
                                            report.characteristic.map((item: any,index:any) =>{
                                                return(
                                                    <div key={index}>
                                                        <div className={'font-bold'}>{item.title}</div>
                                                        <div>{item.desc}</div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                    }
                </MyCard>
            }
            <Readme>
                <Explain>
                    根据用户填写的心理测试题，经过MBTI理论和指标模型的分析，最终得到人格测试报告
                </Explain>
                <Explain>
                    测得的结果仅供参考娱乐
                </Explain>
            </Readme>
        </div>
    );
}
