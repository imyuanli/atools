import {Outlet} from 'umi';
import './index.css'
import 'antd/es/style/themes/default.less';
import 'antd/dist/antd.less'; // 引入官方提供的 less 样式入口文件
import {
    MailOutlined, MenuFoldOutlined, MenuUnfoldOutlined, SettingOutlined,
} from "@ant-design/icons";
import {Layout, Menu, MenuProps} from "antd";
import React, {useEffect, useState} from "react";
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
    }
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

    //登录页面
    if (location.pathname === '/login') {
        return (
            <div className={'main'}>
                <div className={'content'}>
                    <Outlet/>
                </div>
            </div>
        )
    }

    //官网
    return (
        <div className={'main'}>
            <div className={'content'}>
                <Outlet/>
            </div>
        </div>
    );
}
