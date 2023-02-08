import Title from "@/components/title";
import MyCard from "@/components/my-card";
import {useEffect, useState} from "react";
import Loading from "@/components/loading";
import Readme from "@/components/readme";
import Explain from "@/components/explain";
import ApiBtn from "@/components/api-btn";
import Copy from "@/components/copy";
import {get_soul_message} from "@/service/service";

export default function ToxicSoul() {
    const [message, setMessage] = useState("")
    const getSoulMessage = () => {
        setMessage("")
        get_soul_message().then((res: any) => {
            if (res.data) {
                setMessage(res.data)
            } else setMessage("")
        }).catch((e) => {
            setMessage("")
        })
    }
    useEffect(() => {
        getSoulMessage()
    }, [])
    return (
        <div>
            <Title value={'心灵毒鸡汤'}/>
            <MyCard>
                {
                    message ?
                        <div className={'relative'}>
                            <Copy value={message}/>
                            <div className={'p-16 text-xl whitespace-pre-wrap flex justify-center  items-center'}
                                 dangerouslySetInnerHTML={{__html: message}}
                            />
                            <ApiBtn
                                text={'再来亿碗'}
                                func={getSoulMessage}
                            />
                        </div>
                        :
                        <Loading/>
                }
            </MyCard>
            <Readme>
                <Explain>
                    鸡汤虽好可不要贪杯哦~
                </Explain>
            </Readme>
        </div>
    );
}
