import Title from "@/components/title";
import MyCard from "@/components/my-card";
import {useSetState} from "ahooks";
import ImgCrop from 'antd-img-crop';
import {Button, Divider, Input, message, Tag, Upload, UploadFile, UploadProps} from "antd";
import {
    CalendarOutlined, FieldNumberOutlined,
    FormOutlined,
    GiftOutlined,
    LoadingOutlined, MailOutlined,
    PlusOutlined,
    UserOutlined
} from "@ant-design/icons";
import dayjs from "dayjs";
import {useSelector} from "@@/exports";
import withAuth from "@/hocs/withAuth";
import {useEffect, useState} from "react";
import {RcFile, UploadChangeParam} from "antd/es/upload";
import {IMG_URL} from "@/utils";
import BASE_URL from "@/service/base_url";
import Readme from "@/components/readme";
import Explain from "@/components/explain";

function User() {
    const userInfo = useSelector((state: any) => state.user.userInfo);
    const [data, setData] = useSetState({
        userName: "",
        isChange: false,
    })
    const {isChange}: { isChange: boolean } = data
    const {ft_id, avatar, user_name, create_time} = userInfo || {}

    //上传头像
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();

    useEffect(() => {
        setImageUrl(avatar)
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

    const infoBoxClass = 'flex justify-between items-center w-full mb-2'
    const iconStyle={fontSize:18,marginRight:2}
    const infoTitleClass='text-gray-500 text-base mr-3'
    const infoClass='font-semibold text-base'






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
                    <div className={infoBoxClass}>
                        <div className={'flex-center'}>
                            <UserOutlined style={iconStyle} />
                            <span className={infoTitleClass}>名称</span>
                            <span className={infoClass}>{user_name}</span>
                        </div>
                        <Button type={'link'}>更换名称</Button>
                    </div>
                    <div className={infoBoxClass}>
                        <div>
                            <UserOutlined style={iconStyle} />
                            <span className={infoTitleClass}>FTID</span>
                            <span className={infoClass}>{ft_id}</span>
                        </div>
                        <Button type={'link'}>复制ID</Button>
                    </div>
                    <div className={infoBoxClass}>
                        <div>
                            <GiftOutlined style={iconStyle} />
                            <span className={infoTitleClass}>会员类型</span>
                            <span className={infoClass}>暂未开通会员</span>
                        </div>
                        <Button type={'link'}>开通会员</Button>
                    </div>
                    <div className={infoBoxClass}>
                        <div>
                            <CalendarOutlined style={iconStyle} />
                            <span className={infoTitleClass}>注册日期</span>
                            <span className={infoClass}>{dayjs(create_time).format('YYYY-MM-DD')}</span>
                        </div>
                        <Button type={'link'}>查看日期</Button>
                    </div>
                    <div className={'flex justify-end items-center w-full'}>
                        <Button danger>退出账号</Button>
                    </div>
                </div>
            </MyCard>
            <MyCard title={'账户与安全'}>
                <div className={'flex-center flex-col'}>
                    <div className={infoBoxClass}>
                        <div>
                            <MailOutlined style={iconStyle} />
                            <span className={infoTitleClass}>邮箱</span>
                            <span className={infoClass}>{dayjs(create_time).format('YYYY-MM-DD')}</span>
                        </div>
                        <Button type={'link'}>查看日期</Button>
                    </div>
                </div>
            </MyCard>
            <MyCard title={'我的订单'}>
            </MyCard>
            <Readme>
                <Explain>
                    任何问题请咨询我们的微信：xxxx
                </Explain>
                <Explain>
                    激活码激活失败：仔细核对是否正确输入了激活码，请不要手动输入，直接复制粘贴即可
                </Explain>
            </Readme>
        </div>
    );
}

export default withAuth(User)
