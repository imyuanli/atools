import Title from "@/components/title";
import MyCard from "@/components/my-card";
import {Button, Card, Input, message, Tabs} from "antd";
import {KeyOutlined, MailOutlined} from "@ant-design/icons";
import {useSetState} from "ahooks";

export default function Login() {

    const [data, setData] = useSetState({
        email: "",
        code: "",
    })

    //校验邮箱格式
    const checkEmail = (email: any) => {
        const emailRule = /^[a-zA-Z0-9]+([._\\-]*[a-zA-Z0-9])*@([a-zA-Z0-9]+[-a-zA-Z0-9]*[a-zA-Z0-9]+.){1,63}[a-zA-Z0-9]+$/g
        return emailRule.test(email)
    }

    //获取验证码
    const getLoginCode = () => {
        const {email} = data
        if (!email) {
            message.warn('请先输入邮箱')
            return
        }
        if (!checkEmail(email)) {
            message.warn('请输入正确格式的邮箱')
            return
        }
        // 获取 验证码
    }

    //登录
    const handleLogin = () => {
        const {email, code} = data
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
        if (code.length !== 6) {
            message.warn('验证码不正确')
            return
        }
    }

    return (
        <div>
            <Title value={'登录'} isLogin={true}/>
            <div className={'flex-center'}>
                <Card style={{width: 400}}>
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
                                                <Button onClick={getLoginCode}>获取验证码</Button>
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
