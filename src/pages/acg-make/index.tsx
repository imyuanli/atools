import Title from "@/components/title";
import MyCard from "@/components/my-card";
import {DownloadOutlined} from "@ant-design/icons";
import {Input, Checkbox, Slider, Button} from "antd";
import {CirclePicker} from 'react-color'
import Readme from "@/components/readme";
import Explain from "@/components/explain";
import {useSetState} from "ahooks";
import {useEffect, useState} from "react";
import {IMG_URL} from "@/constant";
import './index.css'
import html2canvas from "html2canvas";
import {LazyLoadImage} from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

const options = [
    {label: '加粗', value: 'font-bold'},
    {label: '居中', value: 'text-center'},
    {label: '斜体', value: 'italic'},
];

interface dataItem {
    value: string,
    position: any,
    size: number,
    space: number,
    color: string,
}

export default function AcgMake() {
    //配置
    const [data, setData] = useSetState<dataItem>(
        {
            value: "输入点啥呢",
            position: ['font-bold', 'text-center'],
            size: 16,
            space: 1,
            color: ""
        }
    )

    //当前图片数量
    const arr = Array.apply(1, Array(30))

    //将html 转换为 canvas
    const saveToImg = (index: number) => {
        //点击保存按钮的回调事件
        const element: HTMLElement = document.getElementById(`canvasImg${index}`) as HTMLElement; // 需要导出的页面
        html2canvas(element, {
            allowTaint: true,
            useCORS: true,
        }).then((canvas) => {
            // imgUrl 是图片的 base64格式 代码 png 格式
            const imgUrl = canvas.toDataURL('image/png');
            //下载图片的功能。
            downloadIamge(imgUrl, "plantCardImg.png")
        });
    }

    //下载图片
    const downloadIamge = (imgsrc: string, name: string) => {  //下载图片地址和图片名
        const image = new Image();
        // 解决跨域 Canvas 污染问题
        image.setAttribute("crossOrigin", "anonymous");
        image.onload = function () {
            let canvas = document.createElement("canvas");
            canvas.width = image.width;
            canvas.height = image.height;
            const context = canvas.getContext("2d");
            context?.drawImage(image, 0, 0, image.width, image.height);
            const url = canvas.toDataURL("image/png"); //得到图片的base64编码数据
            const a = document.createElement("a"); // 生成一个a元素
            const event = new MouseEvent("click"); // 创建一个单击事件
            a.download = name || "photo"; // 设置图片名称
            a.href = url; // 将生成的URL设置为a.href属性
            a.dispatchEvent(event); // 触发a的单击事件
        };
        image.src = imgsrc;
    }

    //开始不显示图片
    const [visible, setVisible] = useState(false)
    return (
        <div>
            <Title value={'ACG表情包制作'}/>
            <MyCard title={'表情包配置'}>
                <div className={'mb-4'}>
                    <div className={'text-lg font-bold mb-1'}>文字内容</div>
                    <Input
                        maxLength={15}
                        value={data.value}
                        onChange={(e) => {
                            setData({value: e.target.value})
                        }}
                        showCount
                        allowClear
                    />
                </div>
                <div className={'mb-4'}>
                    <div className={'text-lg font-bold mb-1'}>文字位置</div>
                    <Checkbox.Group
                        options={options}
                        value={data.position}
                        onChange={
                            (value) => {
                                setData({position: value})
                            }
                        }
                    />
                </div>
                <div className={'mb-4'}>
                    <div className={'text-lg font-bold mb-1'}>字体大小</div>
                    <Slider
                        min={15}
                        max={30}
                        value={data.size}
                        onChange={(value) => {
                            setData({size: value})
                        }}
                    />
                </div>
                <div className={'mb-4'}>
                    <div className={'text-lg font-bold mb-1'}>文本间距</div>
                    <Slider
                        min={0}
                        max={10}
                        value={data.space}
                        onChange={(value) => {
                            setData({space: value})
                        }}
                    />
                </div>
                <div>
                    <div className={'text-lg font-bold mb-1'}>文本颜色</div>
                    <CirclePicker
                        color={data.color}
                        onChange={(res) => {
                            setData({color: res.hex})
                        }}
                    />
                </div>
            </MyCard>
            <MyCard title={'表情包预览'}>
                <div>
                    {
                        visible ?
                            <div className={'grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4'}>
                                {
                                    arr.map((item, index) => {
                                        return (
                                            <div key={index} className={'image-box'}>
                                                <div id={`canvasImg${index}`}>
                                                    <LazyLoadImage
                                                        width={'100%'}
                                                        src={`${IMG_URL}/acg/100${index + 1}.jpg`}
                                                        alt="图像"
                                                        effect="opacity"
                                                    />
                                                    <div
                                                        style={{
                                                            letterSpacing: data.space,
                                                            color: data.color,
                                                            fontSize: data.size,
                                                        }}
                                                        className={`${data.position.join(" ")} break-words`}
                                                    >
                                                        {data.value}
                                                    </div>
                                                </div>
                                                <div className={'down-load'} onClick={() => saveToImg(index)}>
                                                    <div className={'flex-center w-full h-full'}>
                                                        <DownloadOutlined style={{
                                                            fontSize: 32,
                                                            color: '#fff'
                                                        }}/>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            :
                            <div className={'w-full flex-center'}>
                                <Button
                                    size={'large'}
                                    onClick={() => {
                                        setVisible(true)
                                    }}
                                >
                                    加载模板
                                </Button>
                            </div>
                    }
                </div>
            </MyCard>
            <Readme>
                <Explain>
                    图片来自：
                </Explain>
            </Readme>
        </div>
    );
}
