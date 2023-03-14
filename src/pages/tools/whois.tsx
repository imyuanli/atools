import Title from "@/components/title";
import MyCard from "@/components/my-card";
import {Input, message} from "antd";
import ApiBtn from "@/components/api-btn";
import {useSetState} from "ahooks";
import Loading from "@/components/loading";
import Readme from "@/components/readme";
import Explain from "@/components/explain";
import {get_url_whois} from "@/service/service";
import React from "react";

const createPlate = () => {
    const [data, setData] = useSetState({
        url: '',
        result: '',
        loading: false,
    })
    const {url, result, loading} = data
    const getResult = () => {
        if (!data?.url) {
            message.warn('请先输入网址')
            return
        }
        setData({loading: true})
        get_url_whois({url}).then((res: any) => {
            if (!res.errno) setData({
                result: res,
                loading: false
            })
            else setData({
                loading: false
            })
        }).catch((e: any) => {
            setData({
                loading: false
            })
        })
    }
    return (
        <div>
            <Title value={'Whois'}/>
            <MyCard title={'填写网址'}>
                <Input
                    placeholder={'输入你想查询的网址'}
                    onChange={(e) => {
                        setData({
                            url: e.target.value
                        })
                    }}
                    className={'mb-3'}
                    allowClear
                />
                <ApiBtn text={'一键查询'} func={getResult}/>
            </MyCard>
            {
                (loading || result) &&
              <MyCard title={'生成结果'}>
                  {
                      loading ?
                          <Loading/>
                          :
                          result ?
                              <div className={'p-16 text-base whitespace-pre-wrap flex-center'}
                                   dangerouslySetInnerHTML={{__html: result}}
                              />
                              :
                              <div>暂无</div>
                  }
              </MyCard>
            }
            <Readme>
                <Explain>
                    生成的结果，长按图片进行下载哦
                </Explain>
            </Readme>
        </div>
    );
}


export default createPlate