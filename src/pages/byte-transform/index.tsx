import Title from "@/components/title";
import MyCard from "@/components/my-card";
import Readme from "@/components/readme";
import Explain from "@/components/explain";
import {Input} from "antd";
import {useState} from "react";
import "bytes"
export default function ByteTransform() {
    const [count,setCount] = useState()

    return (
        <div>
            <Title value={'字节数转换'}/>
            <MyCard>
                <Input />
                <div>
                    <div>er</div>
                    <span>{}</span>
                </div>
                <div>
                    <div>kb</div>
                    <Input />
                </div>
                <div>
                    <div>mb</div>
                    <Input />
                </div>
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
