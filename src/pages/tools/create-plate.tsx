import Title from "@/components/title";
import MyCard from "@/components/my-card";
import {Input, message} from "antd";
import ApiBtn from "@/components/api-btn";
import {useSetState} from "ahooks";
import Loading from "@/components/loading";
import Readme from "@/components/readme";
import Explain from "@/components/explain";

const createPlate = () => {
    const [data, setData] = useSetState({
        msg: '',
        result: '',
        loading: false,
    })
    const {msg, result, loading} = data
    const getResult = () => {
        if (!data?.msg) {
            message.warn('请先填写文字')
            return
        }
        setData({loading: true})
        setTimeout(() => {
            setData({
                loading: false,
                result: msg
            })
        }, 300)
    }
    return (
        <div>
            <Title value={'小人举牌'}/>
            <MyCard title={'填写文本'}>
                <Input
                    placeholder={'请输入你想显示的文本'}
                    onChange={(e) => {
                        setData({
                            msg: e.target.value
                        })
                    }}
                    className={'mb-3'}
                    allowClear
                />
                <ApiBtn text={'生成图片'} func={getResult}/>
            </MyCard>
            {
                (loading || result) &&
              <MyCard title={'生成结果'}>
                <div className={'flex-center'}>
                    {
                        loading ?
                            <Loading/>
                            :
                            result ?
                                <img
                                    src={`https://v.api.aa1.cn/api/api-jupai/index.php?msg=${result}`}
                                    alt={'小人举牌'}
                                />
                                :
                                <div>暂无</div>
                    }
                </div>
              </MyCard>
            }
            <Readme>
                <Explain>
                  生成的结果，长按图片进行下载哦
                </Explain>
            </Readme>
        </div>
    );
}


export default createPlate