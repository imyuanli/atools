import React, {useState} from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import "./Demo.css";

const defaultSrc =
    "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";

export const Demo: React.FC = () => {
    const [image, setImage] = useState(defaultSrc);
    const [cropData, setCropData] = useState("#");
    const [cropper, setCropper] = useState<any>();
    const onChange = (e: any) => {
        e.preventDefault();
        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result as any);
        };
        reader.readAsDataURL(files[0]);
    };

    const getCropData = () => {
        if (typeof cropper !== "undefined") {
            setCropData(cropper.getCroppedCanvas().toDataURL());
        }
    };

    return (
        <div>
            <div style={{width: "100%"}}>
                <input type="file" onChange={onChange}/>
                <button>Use default img</button>
                <br/>
                <br/>
                <Cropper
                    style={{height: 396, width: 483}}
                    initialAspectRatio={13 / 16} //定义裁剪框的初始宽高比
                    viewMode={1} //裁剪框不能超过画布大小
                    guides={true} //网格线
                    minCropBoxHeight={10} //最小高度
                    minCropBoxWidth={10}
                    background={false} //背景图层
                    autoCropArea={1} //定义自动裁剪的大小比
                    scalable={true}  //是否可以放大
                    rotatable={false} //是否可以旋转
                    dragMode={'move'} //单击设置为移动图片
                    //这个比较重要，单击时，设置裁剪框不可变化
                    toggleDragModeOnDblclick={false}
                    //这个也比较重要，对于有方向值的图片是否根据方向值旋转
                    checkOrientation={false}

                    preview=".img-preview"
                    src={image}
                    onInitialized={(instance) => {
                        setCropper(instance);
                    }}
                />
            </div>
            <div>
                <div className="box" style={{width: "50%", float: "right"}}>
                    <h1>Preview</h1>
                    <div
                        className="img-preview"
                        style={{width: "100%", float: "left", height: "300px",backgroundColor:"blue"}}
                    />
                </div>
                <div
                    className="box"
                    style={{width: "50%", float: "right", height: "300px"}}
                >
                    <h1>
                        <span>Crop</span>
                        <button style={{float: "right"}} onClick={getCropData}>
                            Crop Image
                        </button>
                    </h1>
                    <img style={{width: "100%"}} src={cropData} alt="cropped"/>
                </div>
            </div>
            <br style={{clear: "both"}}/>
        </div>
    );
};

export default Demo;
