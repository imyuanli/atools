import Title from "@/components/title";
import MyCard from "@/components/my-card";
import {useEffect, useRef, useState} from "react";
import {Transformer} from 'markmap-lib';
import {Markmap} from 'markmap-view/dist/index.esm';
import {Input} from "antd";

const transformer = new Transformer();
const initValue = `
# 一级标题
## 二级标题1
### 三级标题1
### 三级标题2
## 二级标题2
- [超级链接](https://github.com/gera2ld/markmap)
## 二级标题3
- 思维点
- **加粗** ~~删除~~ *斜体* ==高亮==
- 多行
  文本
- \`单行代码\`
啊实打实的啊实打实阿松大
`;

const {TextArea} = Input;
export default function MarkMap() {
    const [value, setValue] = useState(initValue);
    const refSvg: any = useRef();
    const refMm = useRef();

    useEffect(() => {
        // Create markmap and save to refMm
        if (refMm.current) return;
        refMm.current = Markmap.create(refSvg.current);
    }, [refSvg.current]);

    useEffect(() => {
        // Update data for markmap once value is changed
        const mm: any = refMm.current;
        if (!mm) return;
        const {root} = transformer.transform(value);
        mm.setData(root);
        mm.fit();
    }, [refMm.current, value]);
    return (
        <div>
            <Title value={'便捷思维导图'}/>
            <MyCard title={'Markdown'}>
                <div className={'flex'}>
                    <TextArea
                        autoSize={{minRows: 5, maxRows: 20}}
                        className="w-full h-full border border-gray-400 "
                        value={value}
                        onChange={
                            (e: any) => {
                                setValue(e.target.value);
                            }
                        }
                    />
                </div>
            </MyCard>
            <MyCard title={'思维导图'}>
                <div
                    className={'flex-center'}
                    style={{
                        height: 400
                    }}
                    id={'markmap'}
                >
                    <svg className="w-full h-full " ref={refSvg}/>
                </div>
            </MyCard>
        </div>
    );
}

 
