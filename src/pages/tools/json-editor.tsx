import Title from "@/components/title";
import MyCard from "@/components/my-card";
import React, {useEffect, useRef, useState} from "react";
import JSONEditor from "jsoneditor";
import 'jsoneditor/dist/jsoneditor.css';
import {Button} from "antd";
import Readme from "@/components/readme";
import Explain from "@/components/explain";
import copy from "copy-to-clipboard";

const json = {
    'array': [1, 2, 3],
    'boolean': true,
    'null': null,
    'number': 'four',
    'object': {'a': 'b', 'c': 'd'},
    'string': 'Hello World'
};
export default function JsonEditor() {
    const editorRef = useRef(null);
    const editorObj: any = useRef();
    const [text, setText] = useState(JSON.stringify(json, null, 2))

    // 初始化JSON编辑器
    useEffect(() => {
        if (!editorObj.current) {
            const totalOptions = {
                modes: ['code', 'tree', 'form', 'view', 'text'],
                onChangeText: setText,
                indentation: 4
            };
            editorObj.current = new JSONEditor(editorRef.current, totalOptions);
            editorObj.current.setText(text)
        }
    }, []);

    useEffect(() => {
        // editorObj.current.setText(text)
        editorObj.current.updateText(text);
    }, [text])
    return (
        <div>
            <Title value={'JSON在线编辑器'}/>
            <MyCard title={'JSON在线编辑器'}>
                <div style={{height: '65vh'}} ref={editorRef}/>
                <div className={'w-full flex justify-end mt-3'}>
                    <Button
                        className={'mr-3'}
                        size={'large'}
                        type={'primary'}
                        onClick={()=>{
                            copy(text)
                        }}
                    >
                        复制JSON
                    </Button>
                    <Button
                        size={'large'}
                        type={'primary'}
                        onClick={() => {
                            console.log(text)
                        }}
                    >
                        下载JSON
                    </Button>
                </div>
            </MyCard>
            <Readme>
                <Explain>
                    技术支持 <a href="https://github.com/josdejong/jsoneditor">jsoneditor</a>
                </Explain>
            </Readme>
        </div>
    );
}

 
