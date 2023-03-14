import Title from "@/components/title";
import MyCard from "@/components/my-card";
import Copy from "@/components/copy";
import ApiBtn from "@/components/api-btn";
import Loading from "@/components/loading";
import Readme from "@/components/readme";
import Explain from "@/components/explain";
import React, {useEffect, useState} from "react";

interface props {
    title: string,
    api: any,
    text: string,
    readme?: string
}

const ASentence: React.FunctionComponent<props> = ({title, api, text, readme}) => {
    const [result, setResult] = useState<any>(null)
    const getResult = () => {
        setResult(null)
        api().then((res: any) => {
            if (!res.errno) setResult(res)
            else setResult(null)
        }).catch((e: any) => {
            setResult(null)
        })
    }
    useEffect(() => {
        getResult()
    }, [])
    return (
        <div>
            <Title value={title}/>
            <MyCard>
                {
                    result ?
                        <div className={'relative'}>
                            <Copy value={result}/>
                            <div className={'p-16 text-xl whitespace-pre-wrap flex justify-center  items-center'}
                                 dangerouslySetInnerHTML={{__html: result}}
                            />
                            <ApiBtn
                                text={text}
                                func={getResult}
                            />
                        </div>
                        :
                        <Loading/>
                }
            </MyCard>
            {readme && <Readme>
                <Explain>
                    {readme}
                </Explain>
              </Readme>}
        </div>
    );
}


export default ASentence