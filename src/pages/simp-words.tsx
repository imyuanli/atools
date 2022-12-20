import Title from "@/components/title";
import MyCard from "@/components/my-card";
import {Button, message} from "antd";
import {useEffect, useState} from "react";
import {res} from "pino-std-serializers";
import {get_dog_message} from "@/service/service";

export default function SimpWords() {
    const [dogMessage, setDogMessage] = useState("")
    const getDogMessage = () => {
        get_dog_message().then((res: any) => {
            if (res.data) {
                setDogMessage(res.data.content)
            } else {
                message.warning('res.msg')
            }
        })
    }
    useEffect(() => {
        getDogMessage()
    }, [])
    return (
        <div>
            <Title value={'舔狗日记'}/>
            <MyCard>
                {
                    dogMessage ?
                        <>
                            <div className={'p-16 text-xl'}>
                                {dogMessage}
                            </div>
                            <div className={'flex w-full justify-end items-center'}>
                                <Button type={'primary'} size={'large'} onClick={getDogMessage}>再来亿篇</Button>
                            </div>
                        </>
                        :
                        <div>等待一会</div>
                }
            </MyCard>
        </div>
    );
}
