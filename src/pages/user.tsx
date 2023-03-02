import Title from "@/components/title";
import MyCard from "@/components/my-card";
import {useSetState} from "ahooks";
import ImgCrop from 'antd-img-crop';
import {Button, Divider, Input, message, Tag, Upload, UploadFile, UploadProps} from "antd";
import {FormOutlined, GiftOutlined, LoadingOutlined, PlusOutlined, UserOutlined} from "@ant-design/icons";
import dayjs from "dayjs";
import {useSelector} from "@@/exports";
import withAuth from "@/hocs/withAuth";
import {useEffect, useState} from "react";
import {RcFile, UploadChangeParam} from "antd/es/upload";
import {IMG_URL} from "@/utils";
import BASE_URL from "@/service/base_url";

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
    return (
        <div>
            <Title value={'用户中心'} isLogin={true}/>
            <MyCard>
                <div>
                    <div className={'flex-center flex-col mb-6'}>
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
                        <div className={'flex-center w-full mb-3 text-base'}>
                            {
                                isChange ?
                                    <Input style={{width: 300}} placeholder="Basic usage"/>
                                    :
                                    <div>
                                        <span>{user_name}</span>
                                        <FormOutlined
                                            onClick={() => {
                                                setData({
                                                    isChange: true,
                                                    userName: user_name
                                                })
                                            }}
                                            className={'ml-1 cursor-pointer hover:text-purple-400'}
                                        />
                                    </div>
                            }
                        </div>
                        <div className={'flex-center text-sm'}>
                            <div>
                                <Tag>注册时间</Tag>
                                <span>{dayjs(create_time).format('YYYY-MM-DD')}</span>
                            </div>
                            <Divider type={'vertical'}/>
                            <div>
                                <Tag>FTID</Tag>
                                <span>{ft_id}</span>
                            </div>
                            <Divider type={'vertical'}/>
                            <div>
                                <GiftOutlined className={'text-xl mr-1'}/>
                                <span>未开通会员</span>
                            </div>
                        </div>
                    </div>
                    <div className={'flex justify-between w-full'}>
                        <div></div>
                        <Button danger>退出账号</Button>
                    </div>
                </div>
            </MyCard>
        </div>
    );
}

export default withAuth(User)
