import Title from "@/components/title";
import MyCard from "@/components/my-card";
import {Button,Input,Slider} from "antd";
import {useEffect, useState,useRef} from "react";
import { useSetState } from "ahooks";
import {SketchPicker} from 'react-color'
import {EditOutlined} from "@ant-design/icons";
import Readme from "@/components/readme";
import Explain from "@/components/explain";
import './index.css'
import { backgroundSize } from "html2canvas/dist/types/css/property-descriptors/background-size";

interface configDataItem {
  size: number,
  margin: number,
  typeNumber: number,
  // 高级设置
  areaColor: string
}

export default function Qrcode() {
    const { TextArea } = Input;
    const UQRCode = require('uqrcodejs');
    const qrCanvas = useRef<any>(null)

    const qr = new UQRCode();
    //二维码配置
    const [configData, setConfigData] = useSetState<configDataItem>(
        {
          size: 200,
          margin: 0,
          typeNumber: -1,
        // 高级设置
          areaColor: '#ffffff',
        }
    )
    // 输入框内容
    const [qrContent,setQrContent] = useState<any>('')

    // 生成二维码
    const generateQr = (() => {
        qr.setOptions({
            // 设置二维码内容
            data: qrContent,
            // 设置二维码大小，必须与canvas设置的宽高一致
            size: configData.size,
            // 设置二维码边距
            margin: configData.margin,
            // 设置二维码版本
            typeNumber: configData.typeNumber,
        });
        // 调用制作二维码方法
        qr.make();
        // 获取canvas上下文
        let canvasContext = qrCanvas.current.getContext("2d");
        // 设置uQRCode实例的canvas上下文
        qr.canvasContext = canvasContext;
        // 调用绘制方法将二维码图案绘制到canvas上
        qr.drawCanvas();
    })

    useEffect(() => {
      if(qrContent !== '') generateQr()
      console.log("qrContent",qrContent);
      console.log("configData",configData);
    },[configData])

    return (
        <div>
            <Title value={'二维码生成'}/>
            <MyCard title={'二维码生成'} icon={<EditOutlined/>}>
                <div className={'mb-6'}>
                    <TextArea 
                        value={qrContent} 
                        onChange={(e: any) => {
                            setQrContent(e.target.value)
                        }} 
                        rows={6}  
                        placeholder="请输入文本或网址" />
                </div>
                <div className={'flex w-full justify-end items-center'}>
                  <Button onClick={generateQr} type={'primary'} size={'large'}>生成二维码</Button>
                </div>
            </MyCard>

            <MyCard title={'二维码图像'} icon={<EditOutlined/>}>
                <div className={'flex justify-center items-center'}>
                  <canvas ref={qrCanvas} width={configData.size} height={configData.size}></canvas>
                </div>
            </MyCard>

            <MyCard title={'基础设置'} icon={<EditOutlined/>}>
                <div className={'mb-4'}>
                    <div className={'text-lg font-bold mb-1'}>尺寸大小</div>
                    <Slider
                        min={200}
                        max={800}
                        value={configData.size}
                        onChange={(value) => {
                            setConfigData({size: value})
                    }}/>
                    <div>尺寸越大导出图片越清晰，反之越模糊。最小200，最大800</div>
                </div>
                <div className={'mb-4'}>
                    <div className={'text-lg font-bold mb-1'}>边距大小</div>
                    <Slider
                        min={0}
                        max={configData.size/2}
                        value={configData.margin}
                        onChange={(value) => {
                            setConfigData({margin: value})
                    }}/>
                    <div>带点边距更容易被识别</div>
                </div>
                <div className={'mb-4'}>
                    <div className={'text-lg font-bold mb-1'}>二维码版本</div>
                    <Slider
                        min={-1}
                        max={40}
                        value={configData.typeNumber}
                        onChange={(value) => {
                            setConfigData({typeNumber: value})
                    }}/>
                    <div>指定二维码版本。默认为-1，字符越多，版本越高。</div>
                </div>
            </MyCard>

            <MyCard title={'高级设置'} icon={<EditOutlined />}>
                <div className="flex justify-center items-center w-1/4">
                    <Input
                        className=""
                        value={configData.areaColor}
                        onChange={(e) => {
                            setConfigData({ areaColor: e.target.value })
                        }}
                    />
                    <div className="p-2" style={{ backgroundColor: 'red'}}></div>
                </div>
               {/*  <SketchPicker
                    color={configData.areaColor}
                    onChange={(res) => {
                        setConfigData({areaColor: res.hex})
                    }}
                /> */}
            </MyCard>
            <Readme>
                <Explain>
                </Explain>
            </Readme>
        </div>
    );
}
