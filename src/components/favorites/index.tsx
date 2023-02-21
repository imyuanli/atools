import MyCard from "@/components/my-card";
import React, {useEffect, useState} from "react";
import {StarOutlined} from "@ant-design/icons";
import RouterBtn from "@/components/router-btn";

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
                        favouriteList?.map((router: any, index: number) => {
                            return (
                                <div key={index}>
                                    <RouterBtn router={router}/>
                                </div>
                            )
                        })
                    }
              </MyCard>
            }
        </>
    );
}
