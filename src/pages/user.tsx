import Title from "@/components/title";
import MyCard from "@/components/my-card";
import {useSetState} from "ahooks";
import ImgCrop from 'antd-img-crop';
import {Button, Input, message, Modal, Upload, UploadFile, UploadProps} from "antd";
import {
    CalendarOutlined, DeleteOutlined, ExclamationCircleOutlined, FieldNumberOutlined,
    GiftOutlined, KeyOutlined,
    LoadingOutlined, MailOutlined,
    PlusOutlined,
    UserOutlined
} from "@ant-design/icons";
import dayjs from "dayjs";
import {useDispatch, useNavigate, useSelector} from "@@/exports";
import withAuth from "@/hocs/withAuth";
import {useEffect, useState} from "react";
import {RcFile, UploadChangeParam} from "antd/es/upload";
import {IMG_URL} from "@/utils";
import BASE_URL from "@/service/base_url";
import Readme from "@/components/readme";
import Explain from "@/components/explain";
import {update_user_name} from "@/service/service";
import store from 'store'

function User() {
    const dispatch = useDispatch();
    const userInfo = useSelector((state: any) => state.user.userInfo);
    const {ft_id, avatar, user_name, create_time, email} = userInfo || {}
    //名称
    const [data, setData] = useSetState({
        nameModal: false,
        newName: user_name,
        userLoading: false,

        //邮箱相关
        emailModal: false,
        oldEmailLoading: '',
        code: "",
        newEmail: ""
    })

    //上传头像
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();
    useEffect(() => {
        setImageUrl(avatar)
        setData({newName: user_name})
    }, [userInfo])
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined/> : <PlusOutlined/>}
            <div style={{marginTop: 8}}>Upload</div>
        </div>
    );
    //限制大小
    const beforeUpload = (file: RcFile) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('只允许你上传JPG/PNG');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('文件大小不能超过2M');
        }
        return isJpgOrPng && isLt2M;
    };
    const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'error') {
            setLoading(false);
            message.error('文件上传失败')
            return;
        }
        if (info.file.status === 'done') {
            setLoading(false);
            setImageUrl(info?.file?.response.data);
        }
    };

    //ui
    const infoBoxClass = 'flex justify-between items-center w-full mb-2'
    const iconStyle = {fontSize: 18, marginRight: 2}
    const infoTitleClass = 'text-gray-500 text-base mr-3'
    const infoClass = 'font-semibold text-base'

    //组件封装
    const getInfoBox = (
        icon: any,
        title: string,
        info: string,
        btnName?: string,
        onClick?: any,
        btnClass?: boolean
    ) => {
        return (
            <div className={infoBoxClass}>
                <div className={'flex-center'}>
                    {icon}
                    <span className={infoTitleClass}>{title}</span>
                    <span className={infoClass}>{info}</span>
                </div>
                {btnName &&
                  <Button style={{padding: 0}} danger={btnClass} onClick={onClick} type={'link'}>{btnName}</Button>}
            </div>
        )
    }
    //开通会员
    const showVip = () => {
        message.success('本网站暂时不需要开通VIP，谢谢您的支持')
    }

    const {
        //名称相关
        newName,
        nameModal,
        userLoading,

        //邮箱
        emailModal,
    } = data
    //修改名称

    const openNameModal: any = () => {
        setData({nameModal: true})
    }
    const closeNameModal = () => {
        setData({nameModal: false})
    }
    const onChangeName = () => {
        if (!newName) {
            message.warn('请输入名字')
        }
        setData({userLoading: true})
        update_user_name({user_name: newName}).then(
            (res: any) => {
                if (!res.errno) {
                    dispatch({type: 'user/getUserInfo'}).then(() => {
                        if (!userLoading) {
                            closeNameModal()
                            setData({userLoading: false})
                        }
                    })
                } else {
                    setData({userLoading: false})
                }
            }
        ).catch(() => {
            setData({userLoading: false})
        })
    }

    //修改邮箱
    const openEmailModal: any = () => {
        setData({emailModal: true})
    }
    const closeEmailModal = () => {
        setData({emailModal: false})
    }

    const navigate = useNavigate()
    //退出登录
    const getLogout = () => {
        Modal.confirm({
            title: '退出登录',
            icon: <ExclamationCircleOutlined/>,
            content: '是否确认退出登录？',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                store.remove('token')
                dispatch({
                    type: 'user/clearUserInfo'
                })
                message.success('退出成功');
                navigate('/')
            }
        });

    }

    return (
        <div>
            <Title value={'用户中心'} isLogin={true}/>
            <MyCard title={'个人信息'}>
                <div className={'flex-center flex-col'}>
                    <div className={'mb-6'}>
                        <ImgCrop rotate>
                            <Upload
                                name="file"
                                listType="picture-card"
                                showUploadList={false}
                                action={`${BASE_URL}upload_avatar/`}
                                beforeUpload={beforeUpload}
                                onChange={handleChange}
                                data={{ftId: ft_id}}
                            >
                                {imageUrl ?
                                    <img src={`${IMG_URL}/${imageUrl}`}
                                         alt="avatar"
                                         style={{width: '100%'}}/>
                                    :
                                    uploadButton
                                }
                            </Upload>
                        </ImgCrop>
                    </div>
                    {getInfoBox(<GiftOutlined style={iconStyle}/>, "会员类型", "免费会员", "开通会员", showVip)}
                    {getInfoBox(<UserOutlined style={iconStyle}/>, "名称", user_name, "更换名称", openNameModal)}
                    {getInfoBox(<FieldNumberOutlined style={iconStyle}/>, "FTID", ft_id)}
                    {getInfoBox(<CalendarOutlined style={iconStyle}/>, "注册日期", dayjs(create_time).format('YYYY-MM-DD'))}
                    <div className={'flex-center w-full mt-3'} onClick={getLogout}>
                        <Button danger>退出账号</Button>
                    </div>
                </div>
            </MyCard>
            {/*<MyCard title={'账户与安全'}>*/}
            {/*    {getInfoBox(<MailOutlined style={iconStyle}/>, "邮箱", email, "更换邮箱", openEmailModal)}*/}
            {/*    /!*{getInfoBox(<KeyOutlined style={iconStyle}/>, "密码", '', "更换密码", openNameModal)}*!/*/}
            {/*    /!*{getInfoBox(*!/*/}
            {/*    /!*    <DeleteOutlined style={iconStyle}/>,*!/*/}
            {/*    /!*    "注销",*!/*/}
            {/*    /!*    '永久注销aTools帐号',*!/*/}
            {/*    /!*    "注销账号",*!/*/}
            {/*    /!*    openNameModal,*!/*/}
            {/*    /!*    true*!/*/}
            {/*    /!*)}*!/*/}
            {/*</MyCard>*/}
            <Readme>
                <Explain>
                    任何问题请咨询我们的微信：xxxx
                </Explain>
                <Explain>
                    激活码激活失败：仔细核对是否正确输入了激活码，请不要手动输入，直接复制粘贴即可
                </Explain>
            </Readme>
            <Modal
                title="修改名称"
                open={nameModal}
                onOk={onChangeName}
                onCancel={closeNameModal}
                okText={'确认'}
                cancelText={'取消'}
                confirmLoading={userLoading}
            >
                <Input
                    onChange={
                        (e: any) => {
                            setData({
                                newName: e.target.value
                            })
                        }
                    }
                    placeholder="请输入名称"
                    value={newName}
                    maxLength={12}
                    showCount
                    allowClear
                />
            </Modal>
            {/*<Modal*/}
            {/*    title="修改邮箱"*/}
            {/*    open={emailModal}*/}
            {/*    onOk={}*/}
            {/*    onCancel={}*/}
            {/*    okText={'确认'}*/}
            {/*    cancelText={'取消'}*/}
            {/*    confirmLoading={}*/}
            {/*>*/}
            {/*</Modal>*/}
        </div>
    );
}

export default withAuth(User)
