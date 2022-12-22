import {UserOutlined, HomeOutlined} from "@ant-design/icons";
import './index.css'
import {Link} from "@umijs/renderer-react";

export default function Index(props: any) {
    const {value} = props
    return (
        <div className={'flex-center flex-col w-full mt-12'}>
            <div className={'text-3xl font-bold mb-3'}>
                {value ?
                    <div className={'flex'}>
                        <span>{value}</span>
                        <span className={'hidden ml-1 md:block'}>- WoodBox</span>
                    </div> :
                    <div className={'flex'}>
                        <span>WoodBox</span>
                        <span className={'hidden ml-1 md:block'}>- 多功能工具</span>
                    </div>
                }
            </div>
            <div className={'flex-center'}>
                {
                    value &&
                    <Link to={'/'}  className={'mr-3'}>
                        <HomeOutlined/>
                        <span className={'ml-1'}>返回首页</span>
                    </Link>
                }
                <Link to={'/login'}>
                    <UserOutlined/>
                    <span className={'ml-1'}>未登录</span>
                </Link>
            </div>
        </div>
    );
}
