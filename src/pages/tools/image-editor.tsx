import Title from "@/components/title";
import MyCard from "@/components/my-card";
import 'tui-image-editor/dist/tui-image-editor.css';
import ImageEditor from '@toast-ui/react-image-editor';
import {Result} from "antd";
import Readme from "@/components/readme";
import Explain from "@/components/explain";
import React from "react";

export default function imageEditor() {
    const inner = window.innerWidth
    return (
        <div>
            <Title value={'图片编辑器'}/>
            <MyCard title={'图片编辑器'}>
                {
                    inner <= 1080 ?
                        <Result
                            status="warning"
                            title="屏幕有点小，装不下我哦，尽量pc端访问"
                        />
                        :
                        <ImageEditor
                            includeUI={{
                                loadImage: {
                                    path: '../../../favicon.ico',
                                    name: 'SampleImage',
                                },
                                initMenu: 'filter',
                                uiSize: {
                                    height: '700px',
                                },
                                menuBarPosition: 'bottom',
                            }}
                            selectionStyle={{
                                cornerSize: 20,
                                rotatingPointOffset: 70,
                            }}
                            usageStatistics={false}
                        />
                }

            </MyCard>
            <Readme>
                <Explain>
                    如对该编译器有疑问，请访问 <a href="https://github.com/nhn/tui.image-editor">tui.image-editor</a>
                </Explain>
            </Readme>
        </div>
    );
}

 
