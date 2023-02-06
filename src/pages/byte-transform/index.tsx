import Title from "@/components/title";
import MyCard from "@/components/my-card";
import Readme from "@/components/readme";
import Explain from "@/components/explain";
import {useEffect, useState} from "react";
import * as React from "react";
import BaseTransform from "@/components/base-transform";

const bytes = require('bytes');

interface systemProps {
    value: any;
    type: string;
    name: string
}

export default function ByteTransform() {
    //定义有哪些分类
    const [itemArr, setItemArr] = useState<systemProps[]>([
        {
            name: 'B',
            type: 'B',
            value: ''
        },
        {
            name: 'KB',
            type: 'KB',
            value: ''
        },
        {
            name: 'MB',
            type: 'MB',
            value: ''
        },
        {
            name: 'GB',
            type: 'GB',
            value: ''
        },
        {
            name: 'TB',
            type: 'TB',
            value: ''
        },
        {
            name: 'PB',
            type: 'PB',
            value: ''
        },
    ])

    //输入的是哪一个
    const [curInput, setCurInput] = useState({type: '', value: ''})

    //监听到改变就修改对应的值
    useEffect(() => {
        //当前输入的值 转换成 B
        const byte = bytes(curInput.value + curInput.type)
        const res = [...itemArr]
        res.map((item, index) => {
            if (curInput.type == item.type) {
                item.value = curInput.value
            } else {
                item.value = bytes.format(byte, {unit: item.type, unitSeparator: ',', decimalPlaces: 10})?.split(",")[0]
            }
        })
        setItemArr([...res])
    }, [curInput])

    return (
        <div>
            <Title value={'字节数转换'}/>
            <MyCard title={'字节数转换'}>
                <BaseTransform
                    itemArr={itemArr}
                    setCurInput={setCurInput}
                />
            </MyCard>
            <Readme>
                <Explain>
                    信息存储量是度量存储器存放程序和数据的数量。其主要度量单位是字节，1个字节（Byte）等于8位（b）二进制。位（bit，Binary
                    Digits）：存放一位二进制数，即0或1，为最小的存储单位，8个二进制位为一个字节单位。一个英文字母（不分大小写）占一个字节的空间，
                    一个中文汉字占两个字节的空间。英文标点占一个字节，中文标点占两个字节
                </Explain>
                <Explain>
                    1字节(Byte) = 8位(bit) <br/>
                    1KB( Kilobyte，千字节) = 1024B<br/>
                    1MB( Megabyte，兆字节) = 1024KB<br/>
                    1GB( Gigabyte，吉字节，千兆) = 1024MB<br/>
                    1TB( Trillionbyte，万亿字节，太字节) = 1024GB<br/>
                    1PB( Petabyte，千万亿字节，拍字节) = 1024TB
                </Explain>
            </Readme>
        </div>
    );
}
