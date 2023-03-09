import Title from "@/components/title";
import MyCard from "@/components/my-card";
import {InputNumber, Radio} from "antd";
import * as React from "react";
import {useSetState} from "ahooks";
import {v4 as uuidv4} from 'uuid';
import ApiBtn from "@/components/api-btn";
import ResultCopy from "@/components/result-copy";
import Readme from "@/components/readme";
import Explain from "@/components/explain";

export default function Uuid() {
    const [data, setData] = useSetState<any>({
        num: 5,
        radioValue: 1,
        result: "",
    })
    const {num, radioValue, result} = data

    const getUuidList = () => {
        const arr = []
        for (let i = 0; i < num; i++) {
            if (radioValue == 1) {
                arr.push(uuidv4())
            } else {
                arr.push(uuidv4().toUpperCase())
            }
        }
        setData({
            result: [...arr]
        })
    }
    return (
        <div>
            <Title value={'uuid生成'}/>
            <MyCard title={'uuid生成'}>
                <div className="mt-3 p-3 rounded-lg flex-center relative">
                    <div className={'text-base flex-none'}>
                        <span>请输入生成的数量：</span>
                    </div>
                    <InputNumber
                        value={num}
                        onChange={(value: any) => {
                            setData({
                                num: value
                            })
                        }}
                        style={{width: '100%'}}
                        max={50}
                        min={0}
                    />
                </div>
                <div className={'p-3'}>
                    <Radio.Group
                        value={radioValue}
                        onChange={(e: any) => {
                            setData({
                                radioValue: e.target.value
                            })
                        }}
                    >
                        <Radio value={1}>小写</Radio>
                        <Radio value={2}>大写</Radio>
                    </Radio.Group>
                </div>
                <ApiBtn text={'生成'} func={getUuidList}/>
            </MyCard>
            {
                (result && result.length > 0) &&
              <MyCard title={'生成结果'}>
                  {
                      result?.map((item: string, index: number) => {
                          return (
                              <div key={index}>
                                  <ResultCopy result={item}/>
                              </div>
                          )
                      })
                  }
              </MyCard>
            }
            <Readme>
                <Explain>
                    UUID在线生成器采用随机数，或者伪随机数生成UUID，重复率几乎不太可能，可以批量在线生成UUID
                </Explain>
            </Readme>
        </div>
    );
}

 
