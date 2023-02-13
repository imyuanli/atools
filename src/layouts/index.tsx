import {Outlet} from 'umi';
import './index.css'
import 'antd/es/style/themes/default.less';
import 'antd/dist/antd.less'; // 引入官方提供的 less 样式入口文件
import {
    AppstoreOutlined,
    MailOutlined, MenuFoldOutlined, MenuUnfoldOutlined, ReloadOutlined, SettingOutlined,
} from "@ant-design/icons";
import {Button, Layout, Menu, MenuProps, message, Modal, Tooltip} from "antd";
import React, {useEffect, useState} from "react";
import Collect from "@/components/collect";
import {DEFAULT_ROUTER} from "@/constant";
import {useLocalStorageState} from "ahooks";
import {useLocation} from "@@/exports";
import {Link} from "@umijs/renderer-react";

const {Header, Content, Footer, Sider} = Layout;
const items: MenuProps['items'] = [
    {
        label: (
            <Link to={'/console/tool'}>
                工具管理
            </Link>
        ),
        key: 'tool',
        icon: <MailOutlined/>,
    },
    {
        label: (
            <Link to={'/console/update'}>
                更新管理
            </Link>
        ),
        key: 'update',
        icon: <AppstoreOutlined/>,
    },
    {
        label: (
            <Link to={'/console/link'}>
                友链管理
            </Link>
        ),
        key: 'link',
        icon: <SettingOutlined/>,
    },
    {
        label: (
            <Link to={'/console/reward'}>
                打赏管理
            </Link>
        ),
        key: 'reward',
        icon: <SettingOutlined/>,
    },
];
export default function Index() {
    //控制台
    const location = useLocation();
    const [current, setCurrent] = useState('tool');

    //收缩
    const [collapsed, setCollapsed] = useState(false);

    //初次渲染对应的key
    useEffect(() => {
        const key = location.pathname.split('/console/')[1]
        setCurrent(key)
    }, [])

    //切换对应的key
    const onClick: MenuProps['onClick'] = e => {
        setCurrent(e.key);
    };


    if (location.pathname.startsWith('/console')) {
        return (
            <Layout style={{minHeight: '100vh'}}>
                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <div className={'flex-center m-3'}>
                        <img src="../favicon.ico" className={'w-24'} alt=""/>
                    </div>
                    <Menu
                        onClick={onClick}
                        selectedKeys={[current]}
                        theme="dark"
                        mode="inline"
                        items={items}
                    />
                </Sider>
                <Layout className="site-layout">
                    <Header style={{padding: 0, background: '#fff'}}>
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'ml-3 text-lg',
                            onClick: () => setCollapsed(!collapsed),
                        })}
                    </Header>
                    <Content className="bg-white m-3 p-6">
                        <Outlet/>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        )
    }


    //官网
    //将路由持久化
    const [routerList, setRouterList] = useLocalStorageState<any>(
        'routerList',
        {
            defaultValue: DEFAULT_ROUTER,
        },
    );
    //由主页面参数
    const context = {routerList}

    //清楚网站缓存
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOk = () => {
        //重置欢迎
        localStorage.removeItem("welcome")
        //重置你的收藏夹
        localStorage.removeItem("routerList")
        setIsModalOpen(false);

        //加个清除效果
        const hide = message.loading('正在删除', 0, () => {
            message.success('清除成功，即将自动刷新页面');
        });
        setTimeout(hide, 1000);
        setTimeout(() => {
            window.location.reload()
        }, 1500)
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const clearWebkitData = () => {
        setIsModalOpen(true);
    }
    return (
        <div className={'main'}>
            <div className={'absolute right-1 md:right-3 top-3 flex-col flex'}>
                <Tooltip title="清除网站缓存" placement={"left"}>
                    <Button type="primary" shape="circle" className={'mt-2'} icon={<ReloadOutlined/>} size={"large"}
                            onClick={clearWebkitData}/>
                </Tooltip>
            </div>
            <div className={'content'}>
                <Outlet context={context}/>
            </div>
            <Collect routerList={routerList} setRouterList={setRouterList}/>
            <Modal title="清楚网站缓存"
                   open={isModalOpen}
                   onOk={handleOk}
                   onCancel={handleCancel}
                   okText={'确定'}
                   cancelText={'再思考一下'}
            >
                是否要清除浏览器缓存？该操作不会删除你的用户数据，清除数据后页面将会刷新
            </Modal>
        </div>
    );
}
