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

    useEffect(() => {
        const res = [...itemArr]
        // 输入框校验
        if(Number(curInput.type) == 2) {
            if(!/^[0-1]+$|^$/.test(curInput.value)) return
        }else if(Number(curInput.type) == 8) {
            if(!/^[0-7]+$|^$/.test(curInput.value)) return
        }else if(Number(curInput.type) == 10) {
            if(!/^[0-9]+$|^$/.test(curInput.value)) return
        }else if(Number(curInput.type) == 16) {
            if(!/^[a-fA-F0-9]+$|^$/.test(curInput.value)) return
        }else if(Number(curInput.type) == 32) {
            if(!/^[a-zA-Z0-9]+$|^$/.test(curInput.value)) return
        }
        res.map((item, index) => {
            if (curInput.type == item.type) {
                item.value = curInput.value
            } else {
                item.value = baseConversion(curInput.value,Number(curInput.type),item.type)
            }
        })
        setItemArr([...res])
    }, [curInput])
    
    // 进制转换num:输入的值 m：输入的值input的框的进制，转换后的进制
    const baseConversion = (num:any,m:number,n:number) => {
        let result = parseInt(num,m).toString(n)
        return num ? result : ''
    }
    return (
        <div>
            <Title value={'数据转换'}/>
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