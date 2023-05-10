import Title from "@/components/title";
import MyCard from "@/components/my-card";
import { Button, Input, Slider, Popover, Upload, message, Radio } from "antd";
import type { RadioChangeEvent } from 'antd';
import { useEffect, useState, useRef } from "react";
import { useSetState } from "ahooks";
import { SketchPicker } from 'react-color'
import { EditOutlined, LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import Readme from "@/components/readme";
import Explain from "@/components/explain";
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile } from 'antd/es/upload/interface';
import ImgCrop from 'antd-img-crop';
import './index.css'
import UQRCode from 'uqrcodejs';

interface configDataItem {
  size: number,
  // 高级设置
  areaColor: string,
  // 二维码分割图案颜色
  separatorColor: string,
  // 二维码暗块颜色
  darkBlockColor: string,
  // 二维码背景颜色
  backgroundColor: string,
  // 二维码前景色 
  foregroundColor: string,
  // 定位角图案背景色
  positionProbeBackgroundColor: string,
  // 定位角图案前景色
  positionProbeForegroundColor: string,
  // 二维码背景图片设置
  backgroundImageSrc: undefined | string,
  // 二维码背景图片宽度
  backgroundImageWidth: number,
  // 二维码背景图片高度
  backgroundImageHeight: number,
  // 二维码背景图片透明度
  backgroundImageAlpha: number,
  // 二维码图片圆角值
  backgroundImageBorderRadius: number,
  // 二维码背景码点内边距
  backgroundPadding: number,
  // 二维码前景码点内边距
  foregroundPadding: number,
  // 二维码背景图片位置X坐标
  backgroundImageX: number,
  // 二维码背景图片位置y坐标
  backgroundImageY: number,
  // 前景
  // 二维码前景图片
  foregroundImageSrc: undefined | string,
  // 前景图片宽度 默认为size四分之一
  foregroundImageWidth: number,
  // 前景图片高度
  foregroundImageHeight: number,
  // 前景图片圆角值
  foregroundImageBorderRadius: number,
  // 前景图边距填充
  foregroundImagePadding: number,
  // 前景图片x坐标
  foregroundImageX: number,
  // 前景图片y坐标
  foregroundImageY: number,
  // 前景图颜色
  foregroundImageBackgroundColor: string,
  // 前景图阴影颜色
  foregroundImageShadowColor: string,
  // 前景图阴影水平偏移值
  foregroundImageShadowOffsetX: number,
  // 前景图阴影垂直偏移值
  foregroundImageShadowOffsetY: number,
  // 前景图阴影模糊度
  foregroundImageShadowBlur: number,
}
const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};
export default function Qrcode() {
  const { TextArea } = Input;

  const qrCanvas = useRef<any>(null)
  const qr = new UQRCode();
  
  const [loading, setLoading] = useState(false);
  const [imgFlag, setImgFlag] = useState(false);
  //二维码配置
  const [configData, setConfigData] = useSetState<configDataItem>(
    {
      size: 200,
      // 高级设置
      areaColor: '#ffffff',
      separatorColor: '#000000',
      darkBlockColor: '#000000',
      backgroundColor: '#ffffff00',
      foregroundColor: '#000000',
      positionProbeBackgroundColor: '#ffffff00',
      positionProbeForegroundColor: '#000000',
      backgroundImageSrc: undefined,
      backgroundImageWidth: 200,
      backgroundImageHeight: 200,
      backgroundImageAlpha: 1,
      backgroundImageBorderRadius: 0,
      backgroundPadding: 0.0,
      foregroundPadding: 0.0,
      backgroundImageX: 0,
      backgroundImageY: 0,
      // 前景
      foregroundImageSrc: undefined,
      foregroundImageWidth: 50,
      foregroundImageHeight: 50,
      foregroundImageBorderRadius: 0,
      foregroundImagePadding: 0,
      foregroundImageX: 75,
      foregroundImageY: 75,
      foregroundImageBackgroundColor: '#ffffff',
      foregroundImageShadowColor: '#808080',
      foregroundImageShadowOffsetX: 0,
      foregroundImageShadowOffsetY: 0,
      foregroundImageShadowBlur: 0,
    }
  )

  UQRCode.prototype.loadImage = function(src:any) {
    // 需要返回Promise对象
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.src = src;
      img.onload = function() {
        // resolve返回img
        resolve(img);
      }
      img.onerror = err => {
        // reject返回错误信息
        reject(err);
      }
    });
  }
  // 输入框内容
  const [qrContent, setQrContent] = useState<any>('')
  // 单选框
  const [errorRadio,setErrorRadio] = useState<number>(0)
 
  // 生成二维码
  const generateQr = (async () => {
    if (qrContent == '') {
      message.warning('输入的内容不能为空！')
      return
    };
    await setImgFlag(true)
    qr.setOptions(Object.assign({data: qrContent,errorCorrectLevel: errorRadio},{...configData}))
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
    if (qrContent !== '') generateQr()
  }, [configData,errorRadio])

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
    if (!isJpgOrPng) {
      message.error('只能上传JPG/JPEG/PNG格式!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('图片大小不能超过2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  // 上传图片loading
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>上传</div>
    </div>
  );

  /**
   * 
   * @param type 
   * type 图片类型 back背景图片 front前景图片
  */
  const handlePicChange = (info: UploadChangeParam<UploadFile>,type: string) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      if(type === 'back') {
        getBase64(info.file.originFileObj as RcFile, url => {
          UQRCode.prototype.loadImage(url)
          setConfigData({ backgroundImageSrc: url });
        });
      }
      if(type === 'front') {
        getBase64(info.file.originFileObj as RcFile, url => {
          UQRCode.prototype.loadImage(url)
          setConfigData({ foregroundImageSrc: url });
        });
      }
      setLoading(false);
    }
  };

  return (
    <div>
      <Title value={'二维码生成'} />
      <MyCard title={'二维码生成'} icon={<EditOutlined />}>
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

      {
        imgFlag ?
          <div>
            <MyCard title={'二维码图像'} icon={<EditOutlined />}>
              <div className={'flex justify-center items-center'}>
                <canvas ref={qrCanvas} width={configData.size} height={configData.size}></canvas>
              </div>
            </MyCard>

            <MyCard title={'基础设置'} icon={<EditOutlined />}>
              <div className={'mb-4'}>
                <div className={'text-lg font-bold mb-1'}>尺寸大小</div>
                <Slider
                  min={200}
                  max={800}
                  value={configData.size}
                  onChange={(value) => {
                    setConfigData({ size: value })
                  }} />
                <div>尺寸越大导出图片越清晰，反之越模糊。最小200，最大800</div>
              </div>

              <div className={'mb-4'}>
                <div className={'text-lg font-bold mb-1'}>容错率</div>
                  <Radio.Group onChange={((e: RadioChangeEvent) => {
                    setErrorRadio(e.target.value)
                  })} value={errorRadio}>
                    <Radio value={0}>7%</Radio>
                    <Radio value={1}>15%</Radio>
                    <Radio value={2}>25%</Radio>
                    <Radio value={3}>30%</Radio>
                  </Radio.Group>
                  <div>容错率越高的二维码，可在遮挡越多的情况下被扫描出来</div>
                </div>
            </MyCard>

            <MyCard title={'高级设置'} icon={<EditOutlined />}>
              <div className="flex justify-start items-center w-full mb-4">
                <div className="flex justify-start items-center w-1/4">
                  <div className="w-full text-center">区域背景色：</div>
                  <Popover
                    content={
                      <SketchPicker
                        color={configData.areaColor}
                        onChange={(res) => {
                          setConfigData({ areaColor: res.hex })
                        }}
                      />}
                    trigger="click"
                  >
                    <div className="w-full cursor-pointer flex justify-between items-center borderSolid" style={{ border: '1px solid #d9d9d9' }}>
                      <div>{configData.areaColor}</div>
                      <div className="w-4 h-4 mr-1" style={{ backgroundColor: configData.areaColor }}></div>
                    </div>
                  </Popover>
                </div>

                <div className="flex justify-start items-center w-1/4">
                  <div className="w-full text-center">分割线颜色：</div>
                  <Popover
                    content={
                      <SketchPicker
                        color={configData.separatorColor}
                        onChange={(res) => {
                          setConfigData({ separatorColor: res.hex })
                        }}
                      />}
                    trigger="click"
                  >
                    <div className="w-full cursor-pointer flex justify-between items-center borderSolid">
                      <div>{configData.separatorColor}</div>
                      <div className="w-4 h-4 mr-1" style={{ backgroundColor: configData.separatorColor }}></div>
                    </div>
                  </Popover>
                </div>

                <div className="flex justify-start items-center w-1/4">
                  <div className="w-full text-center">背景颜色：</div>
                  <Popover
                    content={
                      <SketchPicker
                        color={configData.backgroundColor}
                        onChange={(res) => {
                          setConfigData({ backgroundColor: res.hex })
                        }}
                      />}
                    trigger="click"
                  >
                    <div className="w-full cursor-pointer flex justify-between items-center borderSolid" style={{ border: '1px solid #d9d9d9' }}>
                      <div>{configData.backgroundColor}</div>
                      <div className="w-4 h-4 mr-1" style={{ backgroundColor: configData.backgroundColor }}></div>
                    </div>
                  </Popover>
                </div>

                <div className="flex justify-start items-center w-1/4">
                  <div className="w-full text-center">前景颜色：</div>
                  <Popover
                    content={
                      <SketchPicker
                        color={configData.backgroundColor}
                        onChange={(res) => {
                          setConfigData({ backgroundColor: res.hex })
                        }}
                      />}
                    trigger="click"
                  >
                    <div className="w-full cursor-pointer flex justify-between items-center borderSolid" style={{ border: '1px solid #d9d9d9' }}>
                      <div>{configData.foregroundColor}</div>
                      <div className="w-4 h-4 mr-1" style={{ backgroundColor: configData.foregroundColor }}></div>
                    </div>
                  </Popover>
                </div>
              </div>

              <div className="flex justify-start items-center w-full mb-4">
                <div className="flex justify-start items-center w-1/4">
                  <div className="w-full text-center">暗块颜色：</div>
                  <Popover
                    content={
                      <SketchPicker
                        color={configData.darkBlockColor}
                        onChange={(res) => {
                          setConfigData({ darkBlockColor: res.hex })
                        }}
                      />}
                    trigger="click"
                  >
                    <div className="w-full cursor-pointer flex justify-between items-center borderSolid" style={{ border: '1px solid #d9d9d9' }}>
                      <div>{configData.darkBlockColor}</div>
                      <div className="w-4 h-4 mr-1" style={{ backgroundColor: configData.darkBlockColor }}></div>
                    </div>
                  </Popover>
                </div>

                <div className="flex justify-start items-center w-1/4">
                  <div className="w-full text-center">定位角背景色：</div>
                  <Popover
                    content={
                      <SketchPicker
                        color={configData.positionProbeBackgroundColor}
                        onChange={(res) => {
                          setConfigData({ positionProbeBackgroundColor: res.hex })
                        }}
                      />}
                    trigger="click"
                  >
                    <div className="w-full cursor-pointer flex justify-between items-center borderSolid" style={{ border: '1px solid #d9d9d9' }}>
                      <div>{configData.positionProbeBackgroundColor}</div>
                      <div className="w-4 h-4 mr-1" style={{ backgroundColor: configData.positionProbeBackgroundColor }}></div>
                    </div>
                  </Popover>
                </div>

                <div className="flex justify-start items-center w-1/4">
                  <div className="w-full text-center">定位角前景色：</div>
                  <Popover
                    content={
                      <SketchPicker
                        color={configData.positionProbeForegroundColor}
                        onChange={(res) => {
                          setConfigData({ positionProbeForegroundColor: res.hex })
                        }}
                      />}
                    trigger="click"
                  >
                    <div className="w-full cursor-pointer flex justify-between items-center borderSolid" style={{ border: '1px solid #d9d9d9' }}>
                      <div>{configData.positionProbeForegroundColor}</div>
                      <div className="w-4 h-4 mr-1" style={{ backgroundColor: configData.positionProbeForegroundColor }}></div>
                    </div>
                  </Popover>
                </div>
              </div>

              <div className="flex mb-1">
                <div className="w-1/6  leading-8">背景码点内边距：</div>
                <Slider
                  min={0.0}
                  max={1.0}
                  step={0.1}
                  className={"w-full"}
                  value={configData.backgroundPadding}
                  onChange={(value) => {
                    setConfigData({ backgroundPadding: value })
                  }} />
              </div>

              <div className="flex mb-1">
                <div className="w-1/6  leading-8">前景码点内边距：</div>
                <Slider
                  min={0.0}
                  max={1.0}
                  step={0.1}
                  className={"w-full"}
                  value={configData.foregroundPadding}
                  onChange={(value) => {
                    setConfigData({ foregroundPadding: value })
                  }} />
              </div>

              <div className={'mb-4'}>
                <div className={'text-lg font-bold mb-1'}>背景设置</div>
                <div className="flex justify-start items-center w-1/4">
                  <div className="w-full text-center">背景图片：</div>
                  <ImgCrop rotate>
                    <Upload
                      name="file"
                      listType="picture-card"
                      className="avatar-uploader"
                      showUploadList={false}
                      beforeUpload={beforeUpload}
                      onChange={(file) => {
                        handlePicChange(file,'back')
                      }}
                    >
                      {configData.backgroundImageSrc ? <img src={configData.backgroundImageSrc} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                    </Upload>
                  </ImgCrop>
                </div>

                {
                  configData.backgroundImageSrc !== undefined ?
                    <div>
                      <div className="flex mb-1">
                        <div className="w-1/6 text-center leading-8">背景图片宽度：</div>
                        <Slider
                          min={0}
                          max={800}
                          className={"w-5/6"}
                          value={configData.backgroundImageWidth}
                          onChange={(value) => {
                            setConfigData({ backgroundImageWidth: value })
                          }} />
                      </div>

                      <div className="flex mb-1">
                        <div className="w-1/6 text-center leading-8">背景图片高度：</div>
                        <Slider
                          min={0}
                          max={800}
                          className={"w-5/6"}
                          value={configData.backgroundImageHeight}
                          onChange={(value) => {
                            setConfigData({ backgroundImageHeight: value })
                          }} />
                      </div>

                      <div className="flex mb-1">
                        <div className="w-1/6 text-center leading-8">背景图片透明度：</div>
                        <Slider
                          min={0}
                          max={1}
                          step={0.01}
                          className={"w-5/6"}
                          value={configData.backgroundImageAlpha}
                          onChange={(value) => {
                            setConfigData({ backgroundImageAlpha: value })
                          }} />
                      </div>

                      <div className="flex mb-1">
                        <div className="w-1/6 text-center leading-8">背景图片圆角值：</div>
                        <Slider
                          min={0}
                          max={360}
                          className={"w-5/6"}
                          value={configData.backgroundImageBorderRadius}
                          onChange={(value) => {
                            setConfigData({ backgroundImageBorderRadius: value })
                          }} />
                      </div>

                      <div className="flex mb-1">
                        <div className="w-1/5 text-center leading-8">背景图片位置X坐标：</div>
                        <Input
                          className={"w-4/5"}
                          type='number'
                          value={configData.backgroundImageX}
                          onChange={(e: any) => {
                            setConfigData({ backgroundImageX: e.target.value })
                          }} />
                      </div>

                      <div className="flex mb-1">
                        <div className="w-1/5 text-center leading-8">背景图片位置Y坐标：</div>
                        <Input
                          className={"w-4/5"}
                          type='number'
                          value={configData.backgroundImageY}
                          onChange={(e: any) => {
                            setConfigData({ backgroundImageY: e.target.value })
                          }} />
                      </div>

                    </div> : <div></div>
                }

              </div>

              <div className={'mb-4'}>
                <div className={'text-lg font-bold mb-1'}>前景设置</div>
                <div className="flex justify-start items-center w-1/4">
                  <div className="w-full text-center">前景图片：</div>
                  <ImgCrop rotate>
                    <Upload
                      name="file"
                      listType="picture-card"
                      className="avatar-uploader"
                      showUploadList={false}
                      beforeUpload={beforeUpload}
                      onChange={(file) => {
                        handlePicChange(file,'front')
                      }}
                    >
                      {configData.foregroundImageSrc ? <img src={configData.foregroundImageSrc} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                    </Upload>
                  </ImgCrop>
                </div>
                <div>(前景图面积+边距填充最大不能超过对应容错率的二维码面积，否则会影响识别)</div>

                {
                  configData.foregroundImageSrc !== undefined ?
                    <div>
                      <div className="flex mb-1">
                        <div className="w-1/6 text-center leading-8">前景图片宽度：</div>
                        <Slider
                          min={0}
                          max={800}
                          className={"w-5/6"}
                          value={configData.foregroundImageWidth}
                          onChange={(value) => {
                            setConfigData({ foregroundImageWidth: value })
                          }} />
                      </div>

                      <div className="flex mb-1">
                        <div className="w-1/6 text-center leading-8">前景图片高度：</div>
                        <Slider
                          min={0}
                          max={800}
                          className={"w-5/6"}
                          value={configData.foregroundImageHeight}
                          onChange={(value) => {
                            setConfigData({ foregroundImageHeight: value })
                          }} />
                      </div>

                      <div className="flex mb-1">
                        <div className="w-1/6 text-center leading-8">前景图片圆角值：</div>
                        <Slider
                          min={0}
                          max={360}
                          className={"w-5/6"}
                          value={configData.foregroundImageBorderRadius}
                          onChange={(value) => {
                            setConfigData({ foregroundImageBorderRadius: value })
                          }} />
                      </div>

                      <div className="flex mb-1">
                        <div className="w-1/6 text-center leading-8">前景图边距填充：</div>
                        <Slider
                          min={0}
                          max={800}
                          className={"w-5/6"}
                          value={configData.foregroundImagePadding}
                          onChange={(value) => {
                            setConfigData({ foregroundImagePadding: value })
                          }} />
                      </div>

                      <div className="flex mb-1">
                        <div className="w-1/5 text-center leading-8">前景图片位置X坐标：</div>
                        <Input
                          className={"w-4/5"}
                          type='number'
                          value={configData.foregroundImageX}
                          onChange={(e: any) => {
                            setConfigData({ foregroundImageX: e.target.value })
                          }} />
                      </div>

                      <div className="flex mb-1">
                        <div className="w-1/5 text-center leading-8">前景图片位置Y坐标：</div>
                        <Input
                          className={"w-4/5"}
                          type='number'
                          value={configData.foregroundImageY}
                          onChange={(e: any) => {
                            setConfigData({ foregroundImageY: e.target.value })
                          }} />
                      </div>

                      <div className="flex justify-start items-center w-full mb-4">
                        <div className="flex justify-start items-center w-1/4">
                          <div className="w-full text-center">前景图背景颜色：</div>
                          <Popover
                            content={
                              <SketchPicker
                                color={configData.foregroundImageBackgroundColor}
                                onChange={(res) => {
                                  setConfigData({ foregroundImageBackgroundColor: res.hex })
                                }}
                              />}
                            trigger="click"
                          >
                            <div className="w-full cursor-pointer flex justify-between items-center borderSolid" style={{ border: '1px solid #d9d9d9' }}>
                              <div>{configData.foregroundImageBackgroundColor}</div>
                              <div className="w-4 h-4 mr-1" style={{ backgroundColor: configData.foregroundImageBackgroundColor }}></div>
                            </div>
                          </Popover>
                        </div>

                        <div className="flex justify-start items-center w-1/4">
                          <div className="w-full text-center">前景图阴影颜色：</div>
                          <Popover
                            content={
                              <SketchPicker
                                color={configData.foregroundImageShadowColor}
                                onChange={(res) => {
                                  setConfigData({ foregroundImageShadowColor: res.hex })
                                }}
                              />}
                            trigger="click"
                          >
                            <div className="w-full cursor-pointer flex justify-between items-center borderSolid" style={{ border: '1px solid #d9d9d9' }}>
                              <div>{configData.foregroundImageShadowColor}</div>
                              <div className="w-4 h-4 mr-1" style={{ backgroundColor: configData.foregroundImageShadowColor }}></div>
                            </div>
                          </Popover>
                        </div>
                      </div>

                      <div className="flex mb-1">
                        <div className="w-1/6 text-center leading-8">阴影水平偏移值：</div>
                        <Slider
                          min={0}
                          max={800}
                          className={"w-5/6"}
                          value={configData.foregroundImageShadowOffsetX}
                          onChange={(value) => {
                            setConfigData({ foregroundImageShadowOffsetX: value })
                          }} />
                      </div>

                      <div className="flex mb-1">
                        <div className="w-1/6 text-center leading-8">阴影垂直偏移值：</div>
                        <Slider
                          min={0}
                          max={800}
                          className={"w-5/6"}
                          value={configData.foregroundImageShadowOffsetY}
                          onChange={(value) => {
                            setConfigData({ foregroundImageShadowOffsetY: value })
                          }} />
                      </div>

                      <div className="flex mb-1">
                        <div className="w-1/6 text-center leading-8">阴影模糊度：</div>
                        <Slider
                          min={0}
                          max={800}
                          className={"w-5/6"}
                          value={configData.foregroundImageShadowBlur}
                          onChange={(value) => {
                            setConfigData({ foregroundImageShadowBlur: value })
                          }} />
                      </div>


                    </div> : <div></div>
                }
              </div>
            </MyCard>
          </div> : <div></div>
      }
      <Readme>
        <Explain>
          改变二维码内容时需再次点击生成二维码
        </Explain>
      </Readme>
    </div>
  );
}
