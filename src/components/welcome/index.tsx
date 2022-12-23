import MyCard from "@/components/my-card";
import {Button} from "antd";
import {CloseOutlined} from "@ant-design/icons";
import {useLocalStorageState} from "ahooks";

export default function Welcome() {
    //欢迎组件持久化
    const [welcome, setWelcome] = useLocalStorageState<any>(
        'welcome',
        {
            defaultValue: true,
        },
    );
    return (
        <div>
            {
                welcome &&
                <MyCard>
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
        </div>
    );
}
