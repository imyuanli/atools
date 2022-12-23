import {CloseOutlined, NotificationOutlined, SearchOutlined} from "@ant-design/icons";
import {Button, Input} from "antd";
import {Link} from "@umijs/renderer-react";
import Title from "@/components/title";
import './index.css'
import MyCard from "@/components/my-card";
import {ROUTERS} from "@/constant";
import Readme from "@/components/readme";
import {useLocalStorageState} from "ahooks";
import {useState} from "react";

export default function Index() {
    const [welcome, setWelcome] = useLocalStorageState<any>(
        'welcome',
        {
            defaultValue: true,
        },
    );
    const [isFocus, setIsFocus] = useState(false)
    let sum = 0
    return (
        <div>
            <Title/>
            {
                welcome && <MyCard>
                    <div className={'absolute -right-2 -top-2'}>
                        <Button shape={'circle'} type={'primary'} icon={<CloseOutlined/>}
                                onClick={() => {
                                    setWelcome(false)
                                }}
                        />
                    </div>
                    <div className={'text-2xl font-semibold mb-3'}>欢迎使用 WoodBox</div>
                    <div className={'text-lg'}>
                        目前共开发了数十款有趣的小功能，数量还在持续增加中。如果觉得某一款不错，不妨安利给他人使用。遇到任何问题或建议都能在
                        <span className={'mx-1 color-main cursor-pointer hover:underline'}>留言反馈</span>
                        进行留言
                    </div>
                </MyCard>
            }
            <div
                className={`flex-center ${isFocus ? 'bg-color-main scale-105 text-white' : 'bg-white'} p-3 rounded-lg shadow-lg duration-100`}>
                <SearchOutlined className={'text-2xl mr-3'}/>
                <Input
                    placeholder="输入关键字搜索"
                    style={{color: `${isFocus ? 'white' : ''}`}}
                    size={'large'}
                    bordered={false}
                    onFocus={() => {
                        setIsFocus(true)
                    }}
                    onBlur={() => {
                        setIsFocus(false)
                    }}
                />
            </div>
            {
                ROUTERS.map((router: any, index) => {
                    return (
                        <MyCard key={index} title={router?.title} icon={router?.icon} isIndex={true}>
                            {
                                router?.router.map((item: any, k: number) => {
                                    sum += 1
                                    return (
                                        <Link key={k} to={item?.value} className={'inline-grid'}>
                                            <Button className={`badge rounded-md ${item?.state}`} size={'large'}>
                                                {item?.name}
                                            </Button>
                                        </Link>
                                    )
                                })
                            }
                        </MyCard>
                    )
                })
            }
            <Readme explain={` 当前处于高速更新迭代中，敬请期待 (当前共有${sum}个工具)`}/>
        </div>
    );
}
