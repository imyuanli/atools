import {Button, Drawer, Input, message, Popconfirm, Select, Table} from "antd";
import React, {useEffect} from "react";
import {useSetState} from "ahooks";
import {DEFAULT_STATE, DEFAULT_TYPE} from "@/utils";
import {get_no_delete_tools, insert_new_tool, update_tool} from "@/service/service";
import dayjs from "dayjs";
import withAuthRole from "@/hocs/withAuthRole";

interface dataItem {
    name: string,
    link: string,
    state: string,
    type: string,
    views?: any,
    date?: any,
}

function Tool() {
    //获取状态
    const getState = (value: any) => {
        const res = DEFAULT_STATE.find(item => item.value === value)
        return res?.label
    }
    //table的格式
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
            render: (value: any) => <div>
                <span>{getState(value)}</span>
            </div>,
        },
        {
            title: '类型',
            dataIndex: 'type',
            key: 'type',
            render: (value: any) => <div>
                {get_tool_type(value)}
            </div>,
        },
        {
            title: '使用次数',
            dataIndex: 'views',
            key: 'views',
        },
        {
            title: '创建日期',
            dataIndex: 'create_time',
            key: 'create_time',
            render: (value: any) => <div>
                {dayjs(value).format('YYYY-MM-DD HH:mm')}
            </div>,
        },
        {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            render: (value: any, record: any) => <div>
                <Button className={'mr-3'} onClick={() => updateTool(record)}>编辑</Button>
                <Popconfirm
                    title={`确定删除${record.name}?`}
                    onConfirm={()=>{handleConfirm(record)}}
                    okText="确认"
                    cancelText="取消"
                >
                    <Button danger>删除</Button>
                </Popconfirm>
            </div>,
        },
    ];
    //定义数据
    const [state, setState] = useSetState({
        dataSource: [],
        loading: false,
        isOpen: false,
        tid: null,
        resArr: []
    })
    const {
        dataSource,
        loading,
        isOpen,
        tid,
        resArr
    } = state
    //获取全部工具
    const getAllTools = () => {
        setState({loading: true})
        get_no_delete_tools().then(
            (res: any) => {
                if (!res.errno) {
                    setState({
                        dataSource: res,
                        loading: false
                    })
                } else setState({loading: false})
            }
        ).catch(() => {
            setTimeout(() => {
                setState({loading: false})
            }, 1500)
        })
    }
    //首次加载
    useEffect(() => {
        getAllTools()
    }, [])
    //添加工具
    const showDrawer = () => {
        setState({isOpen: true})
    };
    const closeDrawer = () => {
        setState({
            isOpen: false,
            tid: null
        })
    };
    //工具init数据
    const obj = {
        name: '',
        link: '',
        state: 'new',
        type: 'usually',
    }
    const [toolData, setToolData] = useSetState<dataItem>(obj)
    //添加工具
    const addOrUpdateTool = () => {
        if (!toolData.name) {
            message.warn('添加工具名称')
            return
        }
        if (!toolData.link) {
            message.warn('添加工具路由')
            return
        }
        //更新
        if (tid) {
            update_tool({
                tid,
                toolData
            }).then(
                (res: any) => {
                    if (!res.errno) {
                        getAllTools()
                    }
                }
            )
        }
        //添加工具
        else {
            insert_new_tool({toolData}).then(
                (res: any) => {
                    if (!res.errno) {
                        getAllTools()
                    }
                }
            )
        }
        closeDrawer()
        setToolData({...obj})
    }
    //更新工具
    const updateTool = (record: any) => {
        setState({tid: record.tid})
        setToolData({
            name: record.name,
            link: record.link,
            state: record.state,
            type: record.type,
        })
        showDrawer()
    }
    //删除工具
    const handleConfirm = (record:any)=> {
        update_tool({
            tid:record.tid,
            isDelete:1
        }).then(
            (res: any) => {
                if (!res.errno) {
                    message.success('删除成功')
                    getAllTools()
                }
            }
        )
    }

    //搜索
    const handleChange = (e: any) => {
        let val = e.target.value
        setState({
            resArr: dataSource.filter((item: any) => {
                return item.name.toLowerCase().indexOf(val.toLowerCase()) >= 0
            })
        })
    }

    // //添加新的分类
    // const [isTypeOpen, setIsTypeOpen] = useState(false);
    // const showTypeDrawer = () => {
    //     setIsTypeOpen(true);
    // };
    // const closeTypeDrawer = () => {
    //     setIsTypeOpen(false);
    // };
    // const typeInitObj = {
    //     label: '',
    //     value: '',
    //     icon: ''
    // }
    // const [typeData, setTypeData] = useSetState(typeInitObj)
    // const addNewType = () => {
    //     if (!typeData.label) {
    //         message.warn('添加类型名称')
    //         return
    //     }
    //     if (!typeData.value) {
    //         message.warn('添加类型')
    //         return
    //     }
    //     if (!typeData.icon) {
    //         message.warn('添加类型图标')
    //         return
    //     }
    //     // todo 替换成远程接口
    //     console.log('typeData:', typeData);
    //     closeTypeDrawer()
    //     setTypeData({...typeInitObj})
    // };

    const get_tool_type = (value:any)=>{
        const res = DEFAULT_TYPE.find((item:any)=>item.value == value)
        return res?.label
    }

    return (
        <div>
            <div className={'mb-3 flex justify-end'}>
                <Input
                    placeholder={'用名字搜索'}
                    onChange={handleChange}
                />
                <Button type="primary" className={'ml-3'} onClick={showDrawer}>添加工具</Button>
                {/*<Button type="primary" onClick={showTypeDrawer}>添加分类</Button>*/}
            </div>
            <Table
                pagination={{
                    pageSize: 15
                }}
                loading={loading}
                dataSource={resArr.length > 0 ? resArr : dataSource}
                columns={columns}
            />
            <Drawer
                title="添加新工具"
                open={isOpen}
                onClose={closeDrawer}
                width={'40%'}
                footer={
                    <div className={'flex justify-end'}>
                        <Button size={'large'} type={'primary'} onClick={addOrUpdateTool}>
                            {tid ? "更新" : "添加"}
                        </Button>
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
                </div>
            </Drawer>
            {/*<Drawer*/}
            {/*    title="添加新分类"*/}
            {/*    open={isTypeOpen}*/}
            {/*    onClose={closeTypeDrawer}*/}
            {/*    width={'40%'}*/}
            {/*    footer={*/}
            {/*        <div className={'flex justify-end'}>*/}
            {/*            <Button size={'large'} type={'primary'} onClick={addNewType}>添加</Button>*/}
            {/*            /!*<Button size={'large'} type={'primary'}>更新</Button>*!/*/}
            {/*            <Button size={'large'} className={'ml-3'}>取消</Button>*/}
            {/*        </div>*/}
            {/*    }*/}
            {/*>*/}
            {/*    <div>*/}
            {/*        <div className={'mb-6'}>*/}
            {/*            <div className={'mb-1'}>类型名称</div>*/}
            {/*            <Input*/}
            {/*                value={typeData.label}*/}
            {/*                onChange={*/}
            {/*                    (e) => {*/}
            {/*                        setTypeData({*/}
            {/*                            label: e.target.value*/}
            {/*                        })*/}
            {/*                    }*/}
            {/*                }*/}
            {/*            />*/}
            {/*        </div>*/}
            {/*        <div className={'mb-6'}>*/}
            {/*            <div className={'mb-1'}>类型</div>*/}
            {/*            <Input*/}
            {/*                value={typeData.value}*/}
            {/*                onChange={*/}
            {/*                    (e) => {*/}
            {/*                        setTypeData({*/}
            {/*                            value: e.target.value*/}
            {/*                        })*/}
            {/*                    }*/}
            {/*                }*/}
            {/*            />*/}
            {/*        </div>*/}
            {/*        <div className={'mb-6'}>*/}
            {/*            <div className={'mb-1'}>类型图标</div>*/}
            {/*            <Input*/}
            {/*                value={typeData.icon}*/}
            {/*                onChange={*/}
            {/*                    (e) => {*/}
            {/*                        setTypeData({*/}
            {/*                            icon: e.target.value*/}
            {/*                        })*/}
            {/*                    }*/}
            {/*                }*/}
            {/*            />*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</Drawer>*/}
        </div>
    );
}


export default withAuthRole(Tool)