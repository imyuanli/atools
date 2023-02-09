import Title from "@/components/title";
import MyCard from "@/components/my-card";
import Readme from "@/components/readme";
import Explain from "@/components/explain";
import {useEffect, useState} from "react";
import * as React from "react";
import BaseTransform from "@/components/base-transform";
import Highlight from "@/components/highlight";

interface systemProps {
    value: any;
    type: string;
    name: string;
    inputType: string
}

export default function TemperatureTrans() {
    //定义有哪些分类
    const [itemArr, setItemArr] = useState<systemProps[]>([
        {
            name: '摄氏度',
            type: 'C',
            value: '',
            inputType: 'number'
        },
        {
            name: '华氏度',
            type: 'F',
            value: '',
            inputType: 'number'
        },
        {
            name: '开氏度',
            type: 'K',
            value: '',
            inputType: 'number'
        }
    ])
    //输入的是哪一个
    const [curInput, setCurInput] = useState({type: '', value: ''})
    //转换成摄氏度计算
    const changeCelsius = () => {
        const value = Number(curInput.value)
        const type = curInput.type
        if (curInput.value !== "") {
            if (type == 'F') {
                return (value - 32) / 1.8
            } else if (type == 'K') {
                return value - 273.15
            } else {
                return value
            }
        }
    }
    //从摄氏度转换成其他
    const celsiusToOther = (value: any, type: any) => {
        //统一先转换成摄氏度
        const celsius = Number(changeCelsius())
        if (celsius === 0 || celsius) {
            if (type == 'F') return (celsius * 1.8) + 32
            else if (type == 'K') return celsius + 273.15
            else return celsius
        }
    }

    //监听到改变就修改对应的值
    useEffect(() => {
        const res = [...itemArr]
        res.map(item => {
            const type = item.type
            if (curInput.type == type) {
                item.value = curInput.value
            } else {
                item.value = celsiusToOther(curInput.value, type)?.toFixed(2)
            }
        })
        setItemArr([...res])
    }, [curInput])

    return (
        <div>
            <Title value={'温度转换'}/>
            <MyCard title={'温度转换'}>
                <BaseTransform
                    itemArr={itemArr}
                    setCurInput={setCurInput}
                />
            </MyCard>
            <Readme>
                <Explain>
                    可实现在线摄氏度(CELSIUS EQUALS)、华氏度(FAHENHEIT EQUALS)、开氏度(KELVIN EQUALS)、三种温度计量单位间的互转互换,查看计算公式
                    <Highlight value={'https://www.w3schools.cn/howto/howto_js_temperature_converter.asp'}/>
                </Explain>
                <Explain>
                    因兰氏度(RANKINE EQUALS)、列氏度(REAUMUR EQUALS)已废弃,所以暂不支持转换
                </Explain>
            </Readme>
        </div>
    );
}
