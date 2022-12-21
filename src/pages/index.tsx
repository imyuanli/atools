import {Link} from "@umijs/renderer-react";
import Title from "@/components/title";
import MyCard from "@/components/my-card";
import {ROUTERS} from "@/constant";
import {Button} from "@mui/material";
// import Readme from "@/components/readme";
import './index.css'

export default function Index() {
    let sum = 0
    return (
        <div>
            <Title/>
            {
                ROUTERS.map((router: any, index) => {
                    return (
                        <MyCard key={index} title={router?.title} icon={router?.icon} isIndex={true}>
                            {
                                router?.router.map((item: any, k: number) => {
                                    sum += 1
                                    return (
                                        <Link key={k} to={item?.value} className={'inline-grid'}>
                                            <div className={`item-box flex-center badge ${item?.state}`}>
                                                {item?.name}
                                            </div>
                                        </Link>
                                    )
                                })
                            }
                        </MyCard>
                    )
                })
            }
            {/*<Readme explain={`当前处于高速更新迭代中，敬请期待 (当前共有${sum}个工具)`}/>*/}
        </div>
    );
}
