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
        }, {
            value: '',
            name: '中文金额(完整)',
            type: 'toComMoney',
        }]
    )

    //返回的 方法对象
    const transToNum = (value:any,type:any) => {
        const cnorhk = switchFlag ? nzhhk : nzhcn;
        let obj = {
            'toLower': cnorhk.encodeS(value),
            'toCapital': cnorhk.encodeB(value),
            'toMoney': cnorhk.toMoney(value,{outSymbol:false}),
            'toComMoney': cnorhk.toMoney(value,{complete:true,outSymbol:false}),
        }
        // todo 先注释掉吧
        // @ts-ignore
        return obj[type]
    }

    //返回的 方法对象
    const transToCn = (value: any, curType: any, type: any) => {
        const cnorhk = switchFlag ? nzhhk : nzhcn;
        const transNums = (curType == 'toLower') ? cnorhk.decodeS(value) : cnorhk.decodeB(value)
        let obj = {
            'number': transNums,
            'toLower': cnorhk.encodeS(transNums),
            'toCapital': cnorhk.encodeB(transNums),
            'toMoney': cnorhk.toMoney(transNums,{outSymbol:false}),
            'toComMoney': cnorhk.toMoney(transNums,{complete:true,outSymbol:false}),
        }
        // todo 先注释掉吧
        // @ts-ignore
        return obj[type]
    }

    useEffect(() => {
        const res = [...itemArr];
        res.map((item, index) => {
            if (curInput.type == item.type) {
                item.value = curInput.value;
            } else {
                item.value = numberToCn(curInput.value,curInput.type,item.type)
            }
        })
        setItemArr([...res])
    }, [switchFlag,curInput])

    const numberToCn = (value: any, curType: any, type: any) => {
        if (curType == 'number') {
            return transToNum(value,type)
        } else {
            return value == '' ? '' : transToCn(value,curType,type)
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