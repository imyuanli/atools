import Title from "@/components/title";
import MyCard from "@/components/my-card";
import Readme from "@/components/readme";
import Explain from "@/components/explain";
import {Input} from "antd";
import ResultCopy from "@/components/result-copy";
import {useState} from "react";
import pangu from 'pangu'

const {TextArea} = Input;
export default function BingImage() {

    const [value, setValue] = useState()
    return (
        <div>
            <Title value={'盘古之白'}/>
            <MyCard>

                <div className={'mb-3'}>
                    <TextArea
                        onChange={(e: any) => {
                            setValue(e.target.value)
                        }}
                        rows={6}
                        placeholder="不能信任那些Terminal或Editor用白底的人"
                        allowClear
                    />
                </div>
                {
                    value &&
                  <ResultCopy result={pangu.spacing(value)}/>
                }
            </MyCard>
            <Readme>
                <Explain>
                    本工具会自动替你在网页中所有的中文字和半形的英文、数字、符号之间插入空白，汉学家称这个空白字元为「盘古之白」，因为它劈开了全形字和半形字之间的混沌。
                </Explain>
                <Explain>
                    技术支持：https://github.com/vinta/pangu.js
                </Explain>
            </Readme>
        </div>
    );
}
