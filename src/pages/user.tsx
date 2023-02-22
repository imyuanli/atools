import Title from "@/components/title";
import MyCard from "@/components/my-card";
import {useSetState} from "ahooks";
import {Avatar, Button, Divider, Input, Tag} from "antd";
import {FormOutlined, GiftOutlined, UserOutlined} from "@ant-design/icons";
import dayjs from "dayjs";
import {useSelector} from "@@/exports";
import withAuth from "@/hocs/withAuth";

function User() {
    const userInfo = useSelector((state: any) => state.user.userInfo);
    const [data, setData] = useSetState({
        userName: "",
        isChange: false,
    })
    const {isChange}: { isChange: boolean } = data
    return (
        <div>
            <Title value={'用户中心'} isLogin={true}/>
            <MyCard>
                <div>
                    <div className={'flex-center flex-col mb-6'}>
                        <div className={'mb-6'}>
                            <Avatar size={64} icon={<UserOutlined/>}/>
                        </div>
                        <div className={'flex-center w-full mb-3 text-base'}>
                            {
                                isChange ?
                                    <Input style={{width: 300}} placeholder="Basic usage"/>
                                    :
                                    <div>
                                        <span>{userInfo?.user_name}</span>
                                        <FormOutlined
                                            onClick={() => {
                                                setData({
                                                    isChange: true,
                                                    userName: userInfo?.user_name
                                                })
                                            }}
                                            className={'ml-1 cursor-pointer hover:text-purple-400'}
                                        />
                                    </div>
                            }
                        </div>
                        <div className={'flex-center text-sm'}>
                            <div>
                                <Tag>注册时间</Tag>
                                <span>{dayjs(userInfo?.create_time).format('YYYY-MM-DD')}</span>
                            </div>
                            <Divider type={'vertical'}/>
                            <div>
                                <Tag>FTID</Tag>
                                <span>{userInfo?.ft_id}</span>
                            </div>
                            <Divider type={'vertical'}/>
                            <div>
                                <GiftOutlined className={'text-xl mr-1'}/>
                                <span>未开通会员</span>
                            </div>
                        </div>
                    </div>
                    <div className={'flex justify-between w-full'}>
                        <div></div>
                        <Button danger>退出账号</Button>
                    </div>
                </div>
            </MyCard>
        </div>
    );
}

export default withAuth(User)
