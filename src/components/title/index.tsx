import {UserOutlined, HomeOutlined} from "@ant-design/icons";
import './index.css'
import {Link} from "@umijs/renderer-react";

export default function Index(props: any) {
    const {value} = props
    return (
        <div className={'flex-center flex-col w-full mt-12'}>
            <div className={'text-2xl font-bold mb-3'}>
                {value ? `${value} - WoodBox` : 'WoodBox - 多功能工具'}
            </div>
            <div className={'flex-center'}>
                {
                    value &&
                    <Link to={'/'}>
                        <HomeOutlined/>
                        <span className={'ml-1'}>返回首页</span>
                    </Link>
                }
                <Link to={'/login'} className={'ml-3'}>
                    <UserOutlined/>
                    <span className={'ml-1'}>未登录</span>
                </Link>
            </div>
        </div>
    );
}
