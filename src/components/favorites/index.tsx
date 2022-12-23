import MyCard from "@/components/my-card";
import {useEffect, useState} from "react";
import {StarOutlined} from "@ant-design/icons";
import {Link} from "@umijs/renderer-react";
import {Button} from "antd";

export default function Favorites(props: any) {
    const {routerList} = props
    //过滤未收藏的数据
    const [favouriteList, setFavouriteList] = useState<any>([])
    useEffect(() => {
        const res = routerList.filter((item: any) => {
            return item?.isCollect
        })
        setFavouriteList([...res])
    }, [routerList])
    return (
        <>
            {
                favouriteList.length > 0 && <MyCard title={'收藏夹'} icon={<StarOutlined/>} isIndex={true}>
                    {
                        favouriteList?.map((router: any, k: number) => {
                            return (
                                <Link key={k} to={router?.link} className={'inline-grid'}>
                                    <Button className={`rounded-md`} size={'large'}>
                                        {router?.name}
                                    </Button>
                                </Link>
                            )
                        })
                    }
                </MyCard>
            }
        </>
    );
}
