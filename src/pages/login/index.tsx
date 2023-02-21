import Title from "@/components/title";
import {Button, Card, Input, message, Tabs} from "antd";
import {KeyOutlined, MailOutlined} from "@ant-design/icons";
import {useSetState} from "ahooks";
import {get_login, get_login_code} from "@/service/service";
import {useEffect} from "react";
import store from 'store'
import {useNavigate} from "@@/exports";

export default function Login() {
    const navigate= useNavigate()
    useEffect(()=>{
        if(store.get('token')){
            navigate('/')
        }
    },[])

    const [data, setData] = useSetState({
        email: "",
        code: "",
        time: 59,
        codeLoading: false,
    })
    //定时器
    let interval: any = ""
    //解析数据
    let {email, code, time, codeLoading} = data

    //校验邮箱格式
    const checkEmail = (value: any) => {
        const emailRule = /^[a-zA-Z0-9]+([._\\-]*[a-zA-Z0-9])*@([a-zA-Z0-9]+[-a-zA-Z0-9]*[a-zA-Z0-9]+.){1,63}[a-zA-Z0-9]+$/g
        return emailRule.test(value)
    }

    //获取验证码
    const getLoginCode = () => {
        if (!email) {
            message.warn('请先输入邮箱')
            return
        }
        if (!checkEmail(email)) {
            message.warn('请输入正确格式的邮箱')
            return
        }
        if (interval) {
            clearInterval(interval)
        }
        setData({codeLoading: true})
        interval = setInterval(() => {
            setData((state) => {
                return {
                    ...state,
                    time: state.time - 1
                }
            })
        }, 1000)
        // 获取 验证码
        get_login_code({email}).then()
    }
    useEffect(() => {
        if (time <= -1) {
            // 定时器超过时间后，可以重新发送验证码
            clearInterval(interval)
            // 可点击
            setData({
                codeLoading: false,
                time: 59
            })
        }
    }, [time])

    //登录
    const handleLogin = () => {
        if (!email) {
            message.warn('请先输入邮箱')
            return
        }
        if (!checkEmail(email)) {
            message.warn('请输入正确格式的邮箱')
            return
        }
        if (!code) {
            message.warn('请输入您获取到的验证码')
            return
        }
        // if (code.length !== 6) {
        //     message.warn('验证码不正确')
        //     return
        // }
        get_login({email, code}).then(
            (res:any) => {
                if (!res.errno){
                    store.set('token', res.token)
                    navigate('/')
                }
            }
        )
    }
    return (
        <div>
            <Title value={'登录'} isLogin={true}/>
            <div className={'flex-center'}>
                <Card style={{width: 400}} className={'shadow-lg'}>
                    <Tabs
                        defaultActiveKey="1"
                        centered={true}
                        items={[
                            {
                                label: `快速登录`,
                                key: '1',
                                children:
                                    <div>
                                        <Input
                                            prefix={<MailOutlined/>}
                                            placeholder="请输入邮箱"
                                            className={'my-6'}
                                            type={'email'}
                                            onChange={(e) => {
                                                setData({email: e.target.value})
                                            }}
                                        />
                                        <Input
                                            prefix={<KeyOutlined/>}
                                            placeholder="输入验证码"
                                            onChange={(e) => {
                                                setData({code: e.target.value})
                                            }}
                                            suffix={
                                                <Button disabled={codeLoading} onClick={getLoginCode}>
                                                    {
                                                        codeLoading ?
                                                            <span>{time}秒后重发</span>
                                                            :
                                                            <span>获取验证码</span>
                                                    }
                                                </Button>
                                            }
                                        />
                                        <Button
                                            type={'primary'}
                                            className={'mt-6 mb-3 w-full'}
                                            onClick={handleLogin}
                                        >
                                            登录
                                        </Button>
                                        <div className={'text-red-500 w-full flex-center'}> * 未注册过的邮箱将自动创建FT账号</div>
                                    </div>,
                            }
                        ]}
                    />
                </Card>
            </div>
        </div>
    );
}
