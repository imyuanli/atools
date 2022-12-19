import {UserOutlined, HomeOutlined} from "@ant-design/icons";
import './index.css'
import {Link} from "@umijs/renderer-react";
export default function Index(props: any) {
    const {value} = props
    return (
        <div className={'flex justify-center items-center flex-col w-full mt-12 mb-24'}>
            <div className={'text-2xl font-bold mb-3'}>
                {value ? `${value} - 一个木函` : '一个木函 - 多功能效率工具箱'}
            </div>
            <div className={'flex justify-center items-center text-green-600'}>
                {
                    value &&
                    <div className={'title-btn mr-3'}>
                        <HomeOutlined className={'mr-1'}/>
                        <span><Link to="/">返回首页</Link></span>
                    </div>
                }
                {/*<div className={'title-btn'}>*/}
                {/*    <UserOutlined className={'mr-1'}/>*/}
                {/*    <span>未登录</span>*/}
                {/*</div>*/}
            </div>
        </div>
    );
}
