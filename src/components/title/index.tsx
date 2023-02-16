import {UserOutlined, HomeOutlined, BugOutlined} from "@ant-design/icons";
import './index.css'
import {Link} from "@umijs/renderer-react";
import {useTitle} from "ahooks";

export default function Title(props: any) {
    const {value} = props
    //设置页面的title
    useTitle(value ? value : 'WoodBox')
    return (
        <div className={'flex-center flex-col w-full my-12'}>
            <div className={'text-3xl font-bold mb-3'}>
                {value ?
                    <div className={'flex'}>
                        <span>{value}</span>
                        <span className={'hidden ml-1 md:block'}>- FlashTools</span>
                    </div> :
                    <div className={'flex'}>
                        <span>FlashTools</span>
                        <span className={'hidden ml-1 md:block'}>- 你的工具伙伴</span>
                    </div>
                }
            </div>
            <div className={'flex-center mb-3'}>
                <Link to={'/login'} className={'mr-3'}>
                    <UserOutlined/>
                    <span className={'ml-1'}>未登录</span>
                </Link>
                <Link to={'/'} className={'mr-3'}>
                    <BugOutlined/>
                    <span className={'ml-1'}>我要反馈</span>
                </Link>
                {
                    value &&
                  <Link to={'/'}>
                    <HomeOutlined/>
                    <span className={'ml-1'}>返回首页</span>
                  </Link>
                }
            </div>
        </div>
    );
}
