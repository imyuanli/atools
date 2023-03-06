import {Outlet} from 'umi';
import './index.css'
import 'antd/es/style/themes/default.less';
import 'antd/dist/antd.less'; // 引入官方提供的 less 样式入口文件
import {
    ArrowLeftOutlined, CoffeeOutlined,
    DownloadOutlined, InfoOutlined, LinkOutlined,
    MailOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined, QqOutlined,
    SettingOutlined, ShareAltOutlined,
    VerticalAlignTopOutlined, WeiboOutlined,
} from "@ant-design/icons";
import {BackTop, Button, Layout, Menu, MenuProps, message, Popover, Tooltip} from "antd";
import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "@@/exports";
import {Link} from "@umijs/renderer-react";
import copy from "copy-to-clipboard";

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
    const pathname = location.pathname
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
    if (pathname.startsWith('/console')) {
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
    if (pathname === '/login') {
        return (
            <div className={'main'}>
                <div className={'content'}>
                    <Outlet/>
                </div>
            </div>
        )
    }

    //官网
    const navigate = useNavigate()
    const goBackPreLocation = () => {
        navigate(-1)
    }

    //按钮box
    const getBtn = (style: any, placement: any) => {
        return (
            <>
                <Tooltip className={style} placement={placement} title={'设置'}>
                    <Button
                        type="primary"
                        shape="circle"
                        icon={<SettingOutlined/>}
                        size={'large'}
                    />
                </Tooltip>
                <Tooltip className={style} placement={placement} title={'请作者喝一杯咖啡'}>
                    <Button
                        type="primary"
                        shape="circle"
                        icon={<CoffeeOutlined/>}
                        size={'large'}
                    />
                </Tooltip>
                <Tooltip className={style} placement={placement} title={'更新日志&帮助'}>
                    <Button
                        type="primary"
                        shape="circle"
                        icon={<InfoOutlined/>}
                        size={'large'}
                    />
                </Tooltip>
                <Tooltip className={style} placement={placement} title={'下载背景图片'}>
                    <Button
                        type="primary"
                        shape="circle"
                        icon={<DownloadOutlined/>}
                        size={'large'}
                    />
                </Tooltip>
            </>
        )
    }

    //title
    const title = document.title
    const url = "https://atools.imyuanli.cn" + pathname
    return (
        <div className={'main'}>
            <div className={'content'}>
                <Outlet/>
                <div className={'absolute right-3 top-3'}>
                    <div className={'flex-col flex'}>
                        {/*{*/}
                        {/*    <>*/}
                        {/*        <div className={'flex-col hidden  md:block'}>*/}
                        {/*            <div className={'flex flex-col'}>*/}
                        {/*                {getBtn('mb-3', 'left')}*/}
                        {/*            </div>*/}
                        {/*        </div>*/}
                        {/*        <div className={'block  md:hidden mb-3'}>*/}
                        {/*            <div className={'flex-center'}>*/}
                        {/*                <Popover*/}
                        {/*                    placement="left"*/}
                        {/*                    content={getBtn('mr-3', 'bottom')}*/}
                        {/*                    trigger="click"*/}
                        {/*                >*/}
                        {/*                    <Button*/}
                        {/*                        type="primary"*/}
                        {/*                        shape="circle"*/}
                        {/*                        icon={<MenuFoldOutlined/>}*/}
                        {/*                        size={'large'}*/}
                        {/*                    />*/}
                        {/*                </Popover>*/}
                        {/*            </div>*/}
                        {/*        </div>*/}
                        {/*    </>*/}
                        {/*}*/}
                        <Popover
                            placement="leftTop"
                            content={
                                <>
                                    <a
                                        href={`http://connect.qq.com/widget/shareqq/index.html?title=${title}&url=${url}`}
                                        target="_blank"
                                    >
                                        <div className={'hover:bg-gray-200'}>
                                            <Button type={'link'}>
                                                <QqOutlined/>
                                                <span>QQ</span>
                                            </Button>
                                        </div>
                                    </a>
                                    <a
                                        href={`https://service.weibo.com/share/share.php?title=${title}&url=${url}`}
                                        target="_blank"
                                    >
                                        <div className={'hover:bg-gray-200'}>
                                            <Button type={'link'}>
                                                <WeiboOutlined/>
                                                <span>新浪微博</span>
                                            </Button>
                                        </div>
                                    </a>
                                    <div className={'hover:bg-gray-200'} onClick={
                                        () => {
                                            copy(url);
                                            message.success("复制成功")
                                        }
                                    }>
                                        <Button type={'link'}>
                                            <LinkOutlined/>
                                            <span>复制链接</span>
                                        </Button>
                                    </div>
                                </>
                            }
                            trigger="click"
                            className={'mb-3'}
                        >
                            <Button
                                type="primary"
                                shape="circle"
                                icon={<ShareAltOutlined/>}
                                size={'large'}
                            />
                        </Popover>
                        {
                            pathname !== '/' &&
                          <Tooltip placement="left" title={'返回上一页'}>
                            <Button
                              type="primary"
                              shape="circle"
                              icon={<ArrowLeftOutlined/>}
                              size={'large'}
                              onClick={goBackPreLocation}
                            />
                          </Tooltip>
                        }
                    </div>
                </div>
                <BackTop
                    style={{
                        right: '0.75rem',
                        bottom: '4rem'
                    }}
                    visibilityHeight={100}
                >
                    <Button
                        type="primary"
                        shape="circle"
                        icon={<VerticalAlignTopOutlined/>}
                        size={'large'}
                    />
                </BackTop>
                {/*<div className={'fixed right-3 bottom-3'}>*/}
                {/*    <Tooltip placement="left" title={'收藏'}>*/}
                {/*        <Button*/}
                {/*            type="primary"*/}
                {/*            shape="circle"*/}
                {/*            icon={<StarOutlined/>}*/}
                {/*            size={'large'}*/}
                {/*        />*/}
                {/*    </Tooltip>*/}
                {/*</div>*/}
            </div>
        </div>
    );
}
