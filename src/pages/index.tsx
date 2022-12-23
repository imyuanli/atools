import {Button} from "antd";
import {useTitle} from "ahooks";
import {useEffect} from "react";
import {Link} from "@umijs/renderer-react";
import './index.css'
import MyCard from "@/components/my-card";
import {ROUTERS} from "@/constant";
import Readme from "@/components/readme";
import {useOutletContext} from "@@/exports";
import Welcome from "@/components/welcome";
import Search from "@/components/search";

export default function Index() {
    //设置页面title
    useTitle('WoodBox');

    //设置title
    const {setTitle}: any = useOutletContext();

    //页面初始化
    useEffect(() => {
        setTitle(null)
    }, [])

    //总共有多少工具
    let sum = 0
    return (
        <div>
            <Welcome/>
            <Search/>
            {
                ROUTERS.map((router: any, index) => {
                    return (
                        <MyCard key={index} title={router?.title} icon={router?.icon} isIndex={true}>
                            {
                                router?.router.map((item: any, k: number) => {
                                    sum += 1
                                    return (
                                        <Link key={k} to={item?.value} className={'inline-grid'}>
                                            <Button className={`badge rounded-md ${item?.state}`} size={'large'}>
                                                {item?.name}
                                            </Button>
                                        </Link>
                                    )
                                })
                            }
                        </MyCard>
                    )
                })
            }
            <Readme explain={` 当前处于高速更新迭代中，敬请期待 (当前共有${sum}个工具)`}/>
        </div>
    );
}
