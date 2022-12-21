import {HomeOutlined, UserOutlined} from "@ant-design/icons";
import './index.css'
import {Link} from "@umijs/renderer-react";

export default function Index(props: any) {
    const {value} = props
    return (
        <div className={'flex-center flex-col w-full mt-12'}>
            <div className={'text-2xl font-bold text-white'}>
                {value ? `${value} - WoodBox` : 'WoodBox - 一个多功能免费工具箱'}
            </div>
            <div className={'flex-center mt-3'}>
                {
                    value &&
                    <div className={'title-btn mr-3'}>
                        <Link to="/" className={'link'}>
                            <HomeOutlined className={'mr-1'}/>
                            返回首页
                        </Link>
                    </div>
                }
                <div className={'title-btn'}>
                    <UserOutlined className={'mr-1'}/>
                    <span>未登录</span>
                </div>
            </div>
        </div>
    );
}
