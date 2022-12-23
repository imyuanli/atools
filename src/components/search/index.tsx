import {Button, Input, Result} from "antd";
import {FileSearchOutlined, SearchOutlined} from "@ant-design/icons";
import {useState} from "react";
import {DEFAULT_ROUTER} from "@/constant";
import MyCard from "@/components/my-card";
import {Link} from "@umijs/renderer-react";

export default function Search() {
    //聚焦
    const [isFocus, setIsFocus] = useState(false)

    //搜索结果
    const [inputVal, setInputVal] = useState(null)
    const [resultArr, setResultArr] = useState<any>([])
    const handleChange = (e: any) => {
        let val = e.target.value
        setInputVal(val)
        let arr: Array<any> = []
        if (val) {
            arr = DEFAULT_ROUTER.filter((item: any) => {
                return item.name.toLowerCase().indexOf(val.toLowerCase()) >= 0
            })
        }
        setResultArr([...arr])
    }
    return (
        <div>
            <div
                className={`flex-center  ${isFocus ? 'bg-blue-300 text-white' : 'bg-white'} p-3 rounded-lg shadow-lg duration-100`}>
                <Input
                    prefix={<SearchOutlined className={'text-2xl mr-3'}/>}
                    placeholder="输入关键字搜索"
                    size={'large'}
                    style={{color: `${isFocus ? 'white' : ''}`}}
                    bordered={false}
                    onFocus={() => {
                        setIsFocus(true)
                    }}
                    onBlur={() => {
                        setIsFocus(false)
                    }}
                    onChange={handleChange}
                    allowClear={true}
                />
            </div>
            {
                inputVal &&
                (

                    <MyCard isIndex={resultArr.length > 0} title={'搜索结果'} icon={<FileSearchOutlined/>}>
                        {
                            resultArr.length > 0 ?
                                resultArr?.map((router: any, k: number) => {
                                    return (
                                        <Link key={k} to={router?.link} className={'inline-grid'}>
                                            <Button className={`rounded-md ${router?.state}`} size={'large'}>
                                                {router?.name}
                                            </Button>
                                        </Link>
                                    )
                                })
                                :
                                <div className={'flex-center'}>
                                    <Result
                                        style={{padding: 0}}
                                        title="没有找到相关结果"
                                    />
                                </div>
                        }
                    </MyCard>
                )
            }
        </div>
    );
}
