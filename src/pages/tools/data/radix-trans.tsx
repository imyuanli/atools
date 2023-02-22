import Title from "@/components/title";
import MyCard from "@/components/my-card";
import {useEffect, useState} from "react";
import Explain from "@/components/explain";
import Readme from "@/components/readme";
import * as React from "react";
import BaseTransform from "@/components/base-transform";

interface systemProps {
    value: any;
    type: any;
    name: string;
}

export default function RadixTransform() {
    //输入的是哪一个
    const [curInput, setCurInput] = useState({type: '', value: ''})
    const [itemArr, setItemArr] = useState<systemProps[]>(
        [{
            value: '',
            name: '二进制',
            type: 2,
        }, {
            value: '',
            name: '八进制',
            type: 8,
        }, {
            value: '',
            name: '十进制',
            type: 10,
        }, {
            value: '',
            name: '十六进制',
            type: 16,
        }, {
            value: '',
            name: '三十二进制',
            type: 32,
        },]
    )

    //返回的 方法对象
    const rex = () => {
        let value = curInput.value
        let obj = {
            '2': /^[0-1]+$|^$/.test(value),
            '8': /^[0-7]+$|^$/.test(value),
            '10': /^[0-9]+$|^$/.test(value),
            '16': /^[a-fA-F0-9]+$|^$/.test(value),
            '32': /^[a-zA-Z0-9]+$|^$/.test(value),
        }
        // todo 先注释掉吧
        // @ts-ignore
        return obj[curInput.type]
    }

    useEffect(() => {
        const res = [...itemArr]
        if (!rex()) return
        res.map((item, index) => {
            if (curInput.type == item.type) {
                item.value = curInput.value
            } else {
                item.value = baseConversion(curInput.value, Number(curInput.type), item.type)
            }
        })
        setItemArr([...res])
    }, [curInput])

    // 进制转换num:输入的值 m：输入的值input的框的进制，转换后的进制
    const baseConversion = (num: any, m: number, n: number) => {
        let result = parseInt(num, m).toString(n)
        return num ? result : ''
    }
    return (
        <div>
            <Title value={'进制转换'}/>
            <MyCard title={'进制转换'}>
                <BaseTransform
                    itemArr={itemArr}
                    setCurInput={setCurInput}
                />
            </MyCard>
            <Readme>
                <Explain>
                    请规范的输入相应进制，否则将无法正确计算
                </Explain>
            </Readme>
        </div>
    )
}