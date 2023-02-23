import Title from "@/components/title";
import MyCard from "@/components/my-card";
import {get_short_revert} from "@/service/service";
import {Input, message} from "antd";
import {useSetState} from "ahooks";
import {useState} from "react";
import ApiBtn from "@/components/api-btn";
import ResultCopy from "@/components/result-copy";
import Loading from "@/components/loading";

export default function BingImage() {
    const [data, setData] = useSetState({
        url: ""
    })
    const [result, setResult] = useState(null)
    const [loading, setLoading] = useState(false)
    const onClick = () => {
        if (!data.url) {
            message.warn('网址不能为空')
        }
        setLoading(true)
        get_short_revert(data).then(
            (res: any) => {
                if (!res.errno) {
                    setResult(res?.long_url)
                    setLoading(false)
                } else setLoading(false)
            })
            .catch((e) => {
                setLoading(false)
            })
    }
    return (
        <div>
            <Title value={'短网址还原'}/>
            <MyCard title={'短网址还原'}>
                <div className={'mb-6'}>
                    <div className={'mb-1'}>待还原的网址</div>
                    <Input
                        onChange={(e) => {
                            setData({url: e.target.value})
                        }}
                        placeholder={'请输入短链接'}
                        allowClear
                    />
                </div>
                <ApiBtn
                    text={'还原短网址'}
                    func={onClick}
                />
            </MyCard>
            {
                (loading || result) &&
              <MyCard title={'还原结果'}>
                  {
                      loading ?
                          <Loading/>
                          :
                          <ResultCopy result={result}/>
                  }
              </MyCard>
            }
        </div>
    );
}
