import {Outlet} from 'umi';
import './index.css'
import 'antd/dist/antd.css'
import {
    BulbOutlined, HomeOutlined,
    MenuFoldOutlined,
    QuestionCircleOutlined,
    SettingOutlined,
    UserOutlined
} from "@ant-design/icons";
import {Button, Divider, Drawer, Tooltip} from "antd";
import {useState} from "react";
import {Link, useNavigate} from "@umijs/renderer-react";
import Title from "@/components/title";


const menuItems = [
    {
        label: '返回首页',
        icon: <HomeOutlined/>,
        link: '/'
    },
    // {
    //     label: '更新日志',
    //     icon: <BulbOutlined/>,
    //     link: '/update_history',
    // },
    // {
    //     label: '反馈',
    //     icon: <UserOutlined/>,
    //     link: '/help',
    // },
    // {
    //     label: '帮助',
    //     icon: <QuestionCircleOutlined/>,
    //     link: '/help',
    // },
    // {
    //     label: '设置',
    //     icon: <UserOutlined/>,
    //     link: '/setting',
    // },
]
export default function Layout() {
    //菜单
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    //由主页面传递得title参数
    const [title, setTitle] = useState()
    const context = {
        title,
        setTitle
    }

    //链接跳转
    const navigate = useNavigate()
    const goToPage = (link: any) => {
        onClose()
        navigate(link)
    }
    return (
        <div className={'main'}>
            <div className={'absolute right-3 top-3 flex-col flex'}>
                <Tooltip title="菜单" placement={"left"}>
                    <Button type="primary" shape="circle" className={'m-2'} icon={<MenuFoldOutlined/>} size={"large"}
                            onClick={showDrawer}/>
                </Tooltip>
                {/*<Tooltip title="设置" placement={"left"}>*/}
                {/*    <Button type="primary" shape="circle" className={'m-2'} icon={<SettingOutlined/>} size={"large"}/>*/}
                {/*</Tooltip>*/}
            </div>
            <Drawer
                width={300}
                onClose={onClose}
                open={open}
                closable={false}
            >
                <div>
                    <div className={'w-full flex-center text-3xl font-bold mb-3'}>
                        WoodBox
                    </div>
                    <div className={'flex-center flex-col'}>
                        {/*<Link to={'/login'}*/}
                        {/*      className={'text-gray-800 text-lg p-3 flex-center w-full hover:bg-gray-100 hover:text-gray-800'}*/}
                        {/*>*/}
                        {/*    <UserOutlined/>*/}
                        {/*    <span className={'ml-2'}>未登录</span>*/}
                        {/*</Link>*/}
                        <Divider/>
                        {
                            menuItems.map((item: any, index: number) => {
                                return (
                                    <div
                                        onClick={() => {
                                            goToPage(item?.link)
                                        }}
                                        key={index}
                                        className={'text-gray-800 text-lg p-3 flex-center w-full cursor-pointer hover:bg-gray-100'}
                                    >
                                        {item?.icon}
                                        <span className={'ml-2'}>{item?.label}</span>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </Drawer>
            <div className={'content'}>
                <Title value={title}/>
                <Outlet context={context}/>
            </div>
        </div>
    );
}
