import Title from "@/components/title";
import MyCard from "@/components/my-card";
import {useEffect} from "react";
import {useSetState} from "ahooks";
import {get_user_info} from "@/service/service";
import Loading from "@/components/loading";
import {Avatar, Button, Divider, Input, Tag} from "antd";
import {FormOutlined, GiftOutlined, UserOutlined} from "@ant-design/icons";
import dayjs from "dayjs";

export default function User() {
    const [data, setData] = useSetState({
        loading: false,
        userInfo: null,
        userName: "",
        isChange: false,
    })
    const {userInfo, loading, isChange}: { userInfo: any, loading: boolean, isChange: boolean } = data
    useEffect(() => {
        setData({
            loading: true
        })
        get_user_info().then(
            (res: any) => {
                if (!res.errno) {
                    setData({
                        userInfo: res,
                        loading: false,
                    })
                } else setData({loading: false})
            }
        ).catch(() => {
            setData({loading: false})
        })
    }, [])


    return (
        <div>
            <Title value={'用户中心'} isLogin={true}/>
            {
                loading ?
                    <Loading/>
                    :
                    <MyCard>
                        <div>
                            <div className={'flex-center flex-col mb-6'}>
                                <div className={'mb-6'}>
                                    <Avatar size={64} icon={<UserOutlined/>}/>
                                </div>
                                <div className={'flex-center w-full mb-3 text-base'}>
                                    {
                                        isChange?
                                            <Input style={{width:300}}  placeholder="Basic usage" />
                                            :
                                            <div>
                                                <span>{userInfo?.user_name}</span>
                                                <FormOutlined
                                                    onClick={() => {
                                                        setData({
                                                            isChange:true,
                                                            userName:userInfo?.user_name
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
            }
        </div>
    );
}
