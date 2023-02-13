import {Button, Drawer, Input, message, Select, Table} from "antd";
import {useState} from "react";
import {useSetState} from "ahooks";
import {AppstoreOutlined, FileImageOutlined, FontSizeOutlined, RetweetOutlined, ToolOutlined} from "@ant-design/icons";
import {DEFAULT_STATE} from "@/constant";
import {insert_new_tool} from "@/service/service";

interface dataItem {
    name: string,
    link: string,
    state: string,
    type: string,
    vip: any,
    views?: any,
    date?: any,
}

export default function BingImage() {
    const columns = [
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '路由',
            dataIndex: 'link',
            key: 'link',
        },
        {
            title: '状态',
            dataIndex: 'state',
            key: 'state',
        },
        {
            title: '类型',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'VIP',
            dataIndex: 'vip',
            key: 'vip',
            render: (v: any) => <div>
                <span>{v ? '需要' : '不需要'}</span>
            </div>,
        },
        {
            title: '使用次数',
            dataIndex: 'views',
            key: 'views',
        },
        {
            title: '创建日期',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            render: () => <div>
                <Button className={'mr-3'}>编辑</Button>
                <Button danger>下架</Button>
            </div>,
        },
    ];
    const [dataSource, setDataSource] = useState<dataItem[]>([
        {
            name: '人生小格',
            link: '/life-grid',
            state: 'new',
            type: 'usually',
            vip: false,
            views: 599,
            date: 2015,
        }
    ])

    //添加工具
    const [isOpen, setIsOpen] = useState(false);
    const showDrawer = () => {
        setIsOpen(true);
    };
    const closeDrawer = () => {
        setIsOpen(false);
    };
    //工具数据
    const obj = {
        name: '',
        link: '',
        state: 'new',
        type: 'usually',
        vip: false,
    }
    const [toolData, setToolData] = useSetState<dataItem>(obj)
    //添加工具
    const addNewTool = () => {
        if (!toolData.name) {
            message.warn('添加工具名称')
            return
        }
        if (!toolData.link) {
            message.warn('添加工具路由')
            return
        }
        // todo 替换成远程接口
        insert_new_tool({toolData}).then(
            (res)=>{
                console.log(res)
            }
        )

        const res = [...dataSource]
        res.push(toolData)
        // @ts-ignore
        setDataSource([...res])

        closeDrawer()
        setToolData({...obj})
    };


    //分类
    const DEFAULT_TYPE = [
        {
            value: 'usually',
            label: '常用工具',
            icon: <AppstoreOutlined/>
        },
        {
            value: 'picture',
            label: '图片工具',
            icon: <FileImageOutlined/>
        },
        {
            value: 'text',
            label: '文本工具',
            icon: <FontSizeOutlined/>
        },
        {
            value: 'data',
            label: '数据换算',
            icon: <RetweetOutlined/>
        },
        {
            value: 'other',
            label: '其他工具',
            icon: <ToolOutlined/>
        },
    ]
    //添加新的分类
    const [isTypeOpen, setIsTypeOpen] = useState(false);
    const showTypeDrawer = () => {
        setIsTypeOpen(true);
    };
    const closeTypeDrawer = () => {
        setIsTypeOpen(false);
    };
    const typeInitObj = {
        label: '',
        value: '',
        icon: ''
    }
    const [typeData, setTypeData] = useSetState(typeInitObj)
    const addNewType = () => {
        if (!typeData.label) {
            message.warn('添加类型名称')
            return
        }
        if (!typeData.value) {
            message.warn('添加类型')
            return
        }
        if (!typeData.icon) {
            message.warn('添加类型图标')
            return
        }
        // todo 替换成远程接口
        console.log('typeData:', typeData);
        closeTypeDrawer()
        setTypeData({...typeInitObj})
    };

    return (
        <div>
            <div className={'mb-3 flex justify-end'}>
                <Button type="primary" className={'mr-3'} onClick={showDrawer}>添加工具</Button>
                <Button type="primary" onClick={showTypeDrawer}>添加分类</Button>
            </div>
            <Table dataSource={dataSource} columns={columns}/>
            <Drawer
                title="添加新工具"
                open={isOpen}
                onClose={closeDrawer}
                width={'40%'}
                footer={
                    <div className={'flex justify-end'}>
                        <Button size={'large'} type={'primary'} onClick={addNewTool}>添加</Button>
                        {/*<Button size={'large'} type={'primary'}>更新</Button>*/}
                        <Button size={'large'} className={'ml-3'}>取消</Button>
                    </div>
                }
            >
                <div>
                    <div className={'mb-6'}>
                        <div className={'mb-1'}>名称</div>
                        <Input
                            value={toolData.name}
                            onChange={
                                (e) => {
                                    setToolData({
                                        name: e.target.value
                                    })
                                }
                            }
                        />
                    </div>
                    <div className={'mb-6'}>
                        <div className={'mb-1'}>路由</div>
                        <Input
                            value={toolData.link}
                            onChange={
                                (e) => {
                                    setToolData({
                                        link: e.target.value
                                    })
                                }
                            }
                        />
                    </div>
                    <div className={'mb-6'}>
                        <div className={'mb-1'}>状态</div>
                        <Select
                            value={toolData.state}
                            style={{width: '100%'}}
                            onChange={
                                (value) => {
                                    setToolData({
                                        state: value
                                    })
                                }
                            }
                            options={DEFAULT_STATE}
                        />
                    </div>
                    <div className={'mb-6'}>
                        <div className={'mb-1'}>类型</div>
                        <Select
                            value={toolData.type}
                            style={{width: '100%'}}
                            onChange={
                                (value) => {
                                    setToolData({
                                        type: value
                                    })
                                }
                            }
                            options={DEFAULT_TYPE}
                        />
                    </div>
                    <div className={'mb-6'}>
                        <div className={'mb-1'}>是否需要VIP</div>
                        <Select
                            value={toolData.vip}
                            style={{width: '100%'}}
                            onChange={
                                (value) => {
                                    setToolData({
                                        vip: value
                                    })
                                }
                            }
                            options={[
                                {
                                    value: true,
                                    label: '需要',
                                },
                                {
                                    value: false,
                                    label: '不需要',
                                },
                            ]}
                        />
                    </div>
                </div>
            </Drawer>
            <Drawer
                title="添加新分类"
                open={isTypeOpen}
                onClose={closeTypeDrawer}
                width={'40%'}
                footer={
                    <div className={'flex justify-end'}>
                        <Button size={'large'} type={'primary'} onClick={addNewType}>添加</Button>
                        {/*<Button size={'large'} type={'primary'}>更新</Button>*/}
                        <Button size={'large'} className={'ml-3'}>取消</Button>
                    </div>
                }
            >
                <div>
                    <div className={'mb-6'}>
                        <div className={'mb-1'}>类型名称</div>
                        <Input
                            value={typeData.label}
                            onChange={
                                (e) => {
                                    setTypeData({
                                        label: e.target.value
                                    })
                                }
                            }
                        />
                    </div>
                    <div className={'mb-6'}>
                        <div className={'mb-1'}>类型</div>
                        <Input
                            value={typeData.value}
                            onChange={
                                (e) => {
                                    setTypeData({
                                        value: e.target.value
                                    })
                                }
                            }
                        />
                    </div>
                    <div className={'mb-6'}>
                        <div className={'mb-1'}>类型图标</div>
                        <Input
                            value={typeData.icon}
                            onChange={
                                (e) => {
                                    setTypeData({
                                        icon: e.target.value
                                    })
                                }
                            }
                        />
                    </div>
                </div>
            </Drawer>
        </div>
    );
}
