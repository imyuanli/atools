import Title from "@/components/title";
import MyCard from "@/components/my-card";
import TextArea from "antd/es/input/TextArea";
import {SwapOutlined} from "@ant-design/icons";
import {Select, Tabs} from "antd";
import {useEffect} from "react";
import {useDebounce, useSetState} from "ahooks";
import ApiBtn from "@/components/api-btn";
import {get_translate_result} from "@/service/service";
import Copy from "@/components/copy";
import Readme from "@/components/readme";
import Explain from "@/components/explain";

const options = [
    {
        value: 'zh',
        label: '简体中文',
    },
    {
        value: 'zh-TW',
        label: '繁体中文',
    },
    {
        value: 'en',
        label: '英语',
    },
    {
        value: 'ja',
        label: '日语',
    },
    {
        value: 'ko',
        label: '韩语',
    },
    {
        value: 'fr',
        label: '法语',
    },
    {
        value: 'es',
        label: '西班牙语',
    },
    {
        value: 'it',
        label: '意大利语',
    },
    {
        value: 'de',
        label: '德语',
    },
    {
        value: 'tr',
        label: '土耳其语',
    },
    {
        value: 'ru',
        label: '俄语',
    },
    {
        value: 'pt',
        label: '葡萄牙语',
    },
    {
        value: 'vi',
        label: '越南语',
    },
    {
        value: 'id',
        label: '印尼语',
    },
    {
        value: 'th',
        label: '泰语',
    },
    {
        value: 'ms',
        label: '马来语',
    },
    {
        value: 'ru',
        label: '俄语',
    },
]
const Translate = () => {
    const [data, setData] = useSetState({
        value: '',
        source: 'auto',
        target: 'en',
        result: '',
        tabId: 'qq',
    })
    const {value, source, target, result, tabId} = data
    const debouncedValue = useDebounce(value, {wait: 500});

    //防抖
    useEffect(() => {
        if (debouncedValue) {
            getTranslate()
        }
    }, [debouncedValue, target])

    //翻译
    const getTranslate = () => {
        get_translate_result({
            text: value,
            source,
            target,
        }).then((res: any) => {
            if (!res.errno) setData({
                result: res,
            })
        })
    }

    //网页内嵌
    const getTranslateIframe = () => {
        const obj: any = {
            'sogou': 'https://fanyi.sogou.com/text',
            'qq': 'https://fanyi.qq.com',
            'youdao': 'https://fanyi.youdao.com',
            'bing': 'https://www.bing.com/translator',
            'cnki': 'https://dict.cnki.net/index',
        }
        const key = obj[tabId]
        return (
            <iframe src={key} scrolling={'no'} frameBorder={10} height={800} width={'100%'}/>
        )
    }
    return (
        <div>
            <Title value={'在线翻译'}/>
            <MyCard title={'在线翻译'}>
                <div className={'flex items-center mb-3'}>
                    <Select
                        defaultValue={source}
                        style={{width: 120}}
                        onChange={(value) => {
                            setData({
                                source: value
                            })
                        }}
                        options={[
                            {
                                value: 'auto',
                                label: '自动检测',
                            },
                            ...options
                        ]}
                    />
                    <div className={'mx-3'}>
                        <SwapOutlined style={{fontSize: 25}}/>
                    </div>
                    <Select
                        defaultValue={target}
                        style={{width: 120}}
                        onChange={(value) => {
                            setData({
                                target: value
                            })
                        }}
                        options={options}
                    />
                </div>
                <div className={'flex w-full'}>
                    <TextArea
                        rows={6}
                        placeholder="输入文字，即可翻译"
                        allowClear
                        style={{resize: 'none'}}
                        autoSize={{minRows: 6}}
                        onChange={(e) => {
                            setData({
                                value: e.target.value
                            })
                        }}
                    />
                    <div style={{minHeight: 140}} className={'w-full bg-gray-100 relative'}>
                        {result}
                        <Copy value={result}/>
                    </div>
                </div>
                <ApiBtn text={'翻译'} func={getTranslate}/>
            </MyCard>
            <MyCard title={'翻译聚合'}>
                <Tabs
                    activeKey={tabId}
                    onChange={(value) => {
                        setData({
                            tabId: value
                        })
                    }}
                    items={[
                        {
                            label: `腾讯翻译`,
                            key: 'qq',
                            children: getTranslateIframe(),
                        },
                        {
                            label: `有道翻译`,
                            key: 'youdao',
                            children: getTranslateIframe(),
                        },
                        {
                            label: `微软翻译`,
                            key: 'bing',
                            children: getTranslateIframe(),
                        },
                        {
                            label: `搜狗翻译`,
                            key: 'sogou',
                            children: getTranslateIframe(),
                        },
                        {
                            label: `CNKI学术翻译`,
                            key: 'cnki',
                            children: getTranslateIframe(),
                        },
                    ]}
                />
            </MyCard>
            <Readme>
                <Explain>
                    在线翻译，每秒只能调用5次哦
                </Explain>
            </Readme>
        </div>
    );
}


export default Translate