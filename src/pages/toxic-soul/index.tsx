import Title from "@/components/title";
import MyCard from "@/components/my-card";
import {Button} from "antd";
import {useEffect, useState} from "react";
import {get_soul_message} from "@/service/alapi/service";
import Loading from "@/components/loading";
import Readme from "@/components/readme";
import Explain from "@/components/explain";

export default function ToxicSoul() {
    const [message, setMessage] = useState("")
    const getDogMessage = () => {
        get_soul_message().then((res: any) => {
            if (res) {
                setMessage(res.content)
            }
        })
    }
    useEffect(() => {
        getDogMessage()
    }, [])
    return (
        <div>
            <Title value={'心灵毒鸡汤'}/>
            <MyCard>
                {
                    message ?
                        <>
                            <div className={'p-16 text-xl flex justify-center items-center'}>
                                {message}
                            </div>
                            <div className={'flex w-full justify-end items-center'}>
                                <Button type={'primary'} size={'large'} onClick={getDogMessage}>再来亿碗</Button>
                            </div>
                        </>
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
