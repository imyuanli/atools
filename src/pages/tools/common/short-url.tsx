import Title from "@/components/title";
import MyCard from "@/components/my-card";
import {get_short_url} from "@/service/service";
import {Button, Input, message, Select} from "antd";
import {useSetState} from "ahooks";
import {useState} from "react";
import Readme from "@/components/readme";
import Explain from "@/components/explain";
import ApiBtn from "@/components/api-btn";
import ResultCopy from "@/components/result-copy";
import Loading from "@/components/loading";

export default function BingImage() {
    const [data, setData] = useSetState({
        url: "",
        type: ""
    })
    const [result, setResult] = useState(null)
    const [loading, setLoading] = useState(false)
    const onClick = () => {
        if (!data.url) {
            message.warn('网址不能为空')
        }
        setLoading(true)
        get_short_url(data).then(
            (res: any) => {
                if (!res.errno) {
                    setResult(res?.short_url)
                    setLoading(false)
                } else setLoading(false)
            })
            .catch((e) => {
                setLoading(false)
            })
    }
    return (
        <div>
            <Title value={'短网址生成'}/>
            <MyCard title={'短网址生成'}>
                <div className={'mb-6'}>
                    <div className={'mb-1'}>短网址前缀</div>
                    <Select
                        onChange={(value) => {
                            setData({type: value})
                        }}
                        style={{width: '100%'}}
                        options={[
                            {
                                value: 'dwzmk',
                                label: 'dwz.mk',
                            },
                            {
                                value: 'suoim',
                                label: 'suo.im',
                            },
                            {
                                value: 'm6zcn',
                                label: 'm6z.cn',
                            },
                            {
                                value: 'suonz',
                                label: 'suo.nz',
                            },
                            {
                                value: '4tzcn',
                                label: '4tz.cn',
                            },
                            {
                                value: 'syam',
                                label: 's.yam.com',
                            },
                            {
                                value: 'dyam',
                                label: 'g.yam.com',
                            },
                            {
                                value: 'dwzdo',
                                label: 'dwz.do',
                            },
                            {
                                value: 'zdwz',
                                label: 'z.dwz.mk',
                            },
                            {
                                value: 'u6vcn',
                                label: 'u6v.cn',
                            },
                            {
                                value: 'aadtw',
                                label: 'aad.tw',
                            },
                            {
                                value: 'u5kcn',
                                label: 'u5k.cn',
                            },
                        ]}
                        placeholder={'请选择短网址前缀 (或随机)'}
                    />
                </div>
                <div className={'mb-6'}>
                    <div className={'mb-1'}>待缩短网址</div>
                    <Input
                        onChange={(e) => {
                            setData({url: e.target.value})
                        }}
                        placeholder={'请输入网址'}
                        allowClear
                    />
                </div>
                <ApiBtn
                    text={'生成短网址'}
                    func={onClick}
                />
            </MyCard>
            {
                (loading || result) &&
              <MyCard title={'生成结果'}>
                  {
                      loading ?
                          <Loading/>
                          :
                          <ResultCopy result={result}/>
                  }
              </MyCard>
            }
            <Readme>
                <Explain>
                    不选择短网址前缀则随机生成
                </Explain>
                <Explain>
                    不一定完全按照所选的前缀生成短网址
                </Explain>
            </Readme>
        </div>
    );
}
