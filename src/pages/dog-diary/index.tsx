import Title from "@/components/title";
import MyCard from "@/components/my-card";
import {useEffect, useState} from "react";
import {get_dog_diary} from "@/service/service";
import Loading from "@/components/loading";
import Readme from "@/components/readme";
import Explain from "@/components/explain";
import ApiBtn from "@/components/api-btn";
import Copy from "@/components/copy";

export default function DogDiary() {
    const [dogMessage, setDogMessage] = useState("")
    const getDogMessage = () => {
        setDogMessage("")
        get_dog_diary().then((res: any) => {
            if (res.data) {
                setDogMessage(res.data)
            } else {
                setDogMessage("")
            }
        }).catch((e) => {
            setDogMessage("")
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
                        <div className={'relative'}>
                            <Copy value={dogMessage}/>
                            <div className={'p-16 text-xl whitespace-pre-wrap'}>
                                {dogMessage}
                            </div>
                            <ApiBtn
                                text={'再来亿篇'}
                                func={getDogMessage}
                            />
                        </div>
                        :
                        <Loading/>
                }
            </MyCard>
            <Readme>
                <Explain>
                    舔一个是狗！舔一群是狼！加油成为战狼吧！
                </Explain>
            </Readme>
        </div>
    );
}
