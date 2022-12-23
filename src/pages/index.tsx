import {Button} from "antd";
import {Link} from "@umijs/renderer-react";
import './index.css'
import MyCard from "@/components/my-card";
import {DEFAULT_TYPE} from "@/constant";
import Readme from "@/components/readme";
import {useOutletContext} from "@@/exports";
import Welcome from "@/components/welcome";
import Search from "@/components/search";
import Favorites from "@/components/favorites";
import Title from "@/components/title";

export default function Index() {
    const {routerList}: any = useOutletContext();
    //总共有多少工具
    let sum = 0
    return (
        <div>
            <Title/>
            <Welcome/>
            <Search/>
            <Favorites routerList={routerList}/>
            {
                DEFAULT_TYPE.map((list: any, index: any) => {
                    return (
                        <MyCard key={index} title={list?.title} icon={list?.icon} isIndex={true}>
                            {
                                routerList?.map((router: any, k: number) => {
                                    if (list?.type == router?.type) {
                                        sum += 1
                                        return (
                                            <Link key={k} to={router?.link} className={'inline-grid'}>
                                                <Button className={`badge rounded-md ${router?.state}`} size={'large'}>
                                                    {router?.name}
                                                </Button>
                                            </Link>
                                        )
                                    }
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
