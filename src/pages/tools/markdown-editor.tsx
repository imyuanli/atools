import Title from "@/components/title";
import MyCard from "@/components/my-card";
import '@toast-ui/editor/dist/toastui-editor.css';
import {Editor} from '@toast-ui/react-editor';
import "@toast-ui/editor/dist/i18n/zh-cn";
import chart from "@toast-ui/editor-plugin-chart";
import 'tui-color-picker/dist/tui-color-picker.css'
import 'prismjs/themes/prism.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import tableMergedCell from '@toast-ui/editor-plugin-table-merged-cell';
import uml from '@toast-ui/editor-plugin-uml';
import Prism from 'prismjs';
import React, {useEffect, useRef, useState} from "react";
import {Button, Switch} from "antd";
import {downLoadFile} from "@/utils/utils";
import Readme from "@/components/readme";
import Explain from "@/components/explain";

const initialValue = `### 图标示例
$$chart
,category1,category2
Jan,21,23
Feb,31,17

type: column
title: Monthly Revenue
x.title: Amount
y.title: Month
y.min: 1
y.max: 40
y.suffix: $
$$

### uml图例
$$uml
partition Conductor {
  (*) --> "Climbs on Platform"
  --> === S1 ===
  --> Bows
}

partition Audience #LightSkyBlue {
  === S1 === --> Applauds
}

partition Conductor {
  Bows --> === S2 ===
  --> WavesArmes
  Applauds --> === S2 ===
}

partition Orchestra #CCCCEE {
  WavesArmes --> Introduction
  --> "Play music"
}
$$

### 代码模块
\`\`\`js
console.log('foo')
\`\`\`
\`\`\`javascript
console.log('bar')
\`\`\`
\`\`\`html
<div id="editor"><span>baz</span></div>
\`\`\`
\`\`\`wrong
[1 2 3]
\`\`\`
\`\`\`clojure
[1 2 3]
\`\`\`
| @cols=2:merged |
| --- | --- |
| table | table2 |

### 其他示例

![image](https://uicdn.toast.com/toastui/img/tui-editor-bi.png)
# Awesome Editor!

It has been _released as opensource in 2018_ and has ~~continually~~ evolved to **receive 10k GitHub ⭐️ Stars**.

## Create Instance

You can create an instance with the following code and use \`getHtml()\` and \`getMarkdown()\` of the [Editor](https://github.com/nhn/tui.editor).

\`\`\`js
const editor = new Editor(options);
\`\`\`

> See the table below for default options
> > More API information can be found in the document

| name | type | description |
| --- | --- | --- |
| el | \`HTMLElement\` | container element |

## Features

* CommonMark + GFM Specifications
   * Live Preview
   * Scroll Sync
   * Auto Indent
   * Syntax Highlight
        1. Markdown
        2. Preview

## Support Wrappers

> * Wrappers
>    1. [x] React
>    2. [x] Vue
>    3. [ ] Ember
`

export default function markdownEditor() {
    const [mode, setMode] = useState<any>(true)
    const editorRef = useRef(null)
    const [el, setEl] = useState<any>()
    useEffect(() => {
        setEl(editorRef.current)
    }, [editorRef])
    return (
        <div>
            <Title value={'Markdown编辑器'}/>
            <MyCard title={'Markdown编辑器'}>
                <div className={'w-full flex justify-end mb-3'}>
                    <Switch
                        checkedChildren="垂直两列"
                        unCheckedChildren="水平标签"
                        defaultChecked
                        onChange={(checked) => {
                            setMode(checked)
                        }}/>
                </div>
                <Editor
                    ref={editorRef}
                    initialValue={initialValue}
                    previewStyle={mode ? 'vertical' : 'tab'}
                    height="65vh"
                    initialEditType="markdown"
                    useCommandShortcut={true}
                    language={'zh-CN'}
                    plugins={[chart, [codeSyntaxHighlight, {highlighter: Prism}], colorSyntax, tableMergedCell, uml]}
                />
                <div className={'w-full flex justify-end mt-3'}>
                    <Button
                        className={'mr-3'}
                        size={'large'}
                        type={'primary'}
                        onClick={() => {
                            downLoadFile('md', el['editorInst'].getMarkdown())
                        }}
                    >
                        导出为Markdown文件
                    </Button>
                    <Button
                        size={'large'}
                        type={'primary'}
                        onClick={()=>{
                            downLoadFile('html', el['editorInst'].getHTML())
                        }}
                    >
                        导出为html文件
                    </Button>
                </div>
            </MyCard>
            <Readme>
                <Explain>
                    如对该编译器有疑问，请访问 <a href="https://github.com/nhn/tui.editor">tui.editor</a>
                </Explain>
            </Readme>
        </div>
    );
}

 
