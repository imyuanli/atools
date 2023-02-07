import Title from "@/components/title";
import MyCard from "@/components/my-card";
import Readme from "@/components/readme";
import Explain from "@/components/explain";
import { Switch } from 'antd';
import BaseTransform from "@/components/base-transform";
import { useEffect, useState } from "react";

const nzhcn = require("nzh/cn"); //直接使用简体中文
const nzhhk = require("nzh/hk"); //繁体中文

export default function NumberTransform() {
    interface systemProps {
        value: any;
        type: any;
        name: any;
    }
    //输入的是哪一个
    const [switchFlag,setSwitchFlag] = useState<boolean>(false)
    const [curInput, setCurInput] = useState({ type: '', value: '' })
    const [itemArr, setItemArr] = useState<systemProps[]>(
        [{
            value: '',
            name: '数字',
            type: 'number',
        }, {
            value: '',
            name: '中文小写',
            type: 'toLower',
        }, {
            value: '',
            name: '中文大写',
            type: 'toCapital',
        }, {
            value: '',
            name: '中文金额(简写)',
            type: 'toMoney',
        }]
    )

    useEffect(() => {
        const res = [...itemArr];
        res.map((item, index) => {
            if (curInput.type == item.type) {
                item.value = curInput.value;
            } else {
                item.value = numberToCn(curInput.value,item.type)
            }
        })
        setItemArr([...res])
    }, [switchFlag,curInput])

    const numberToCn = (value: any, type: any) => {
        const cnorhk = switchFlag ? nzhhk : nzhcn;
        if (type == 'toLower') {
            return cnorhk.encodeS(value);
        } else if (type == 'toCapital') {
            return cnorhk.encodeB(value);
        }else if (type == 'toMoney') {
            return cnorhk.toMoney(value,{outSymbol:false});
        }
    }
  
    return (
        <div>
            <Title value={'数字转中文'}/>
            <MyCard title={'数字转中文'}>
                <div className={'text-base flex-none'}>
                    繁体中文
                    <Switch onChange={(checked) => {
                        setSwitchFlag(checked)
                    }} />
                </div>
                <BaseTransform
                    itemArr={itemArr}
                    setCurInput={setCurInput}
                />
                </MyCard>
            <Readme>
                <Explain>
                    查询的结果仅供参考
                </Explain>
            </Readme>
        </div>
    );
}