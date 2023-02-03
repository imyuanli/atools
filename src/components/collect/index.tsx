import {Button, message} from "antd";
import {StarFilled, StarOutlined} from "@ant-design/icons";
import {useLocation} from "react-router";
import {useEffect, useState} from "react";

export default function Collect(props: any) {
    const {routerList, setRouterList} = props
    const location = useLocation()

    //是不是首页
    const [notIndex, setNoTIndex] = useState(true)

    //是不是被收藏
    const [isCollect, setIsCollect] = useState<any>(false)
    useEffect(() => {
        const {pathname} = location
        if (pathname == "/") {
            setNoTIndex(false)
        } else {
            setNoTIndex(true)
        }
        setIsCollect(getToolIsCollect(pathname))
    }, [location, routerList])

    //获取该工具是否被收藏
    const getToolIsCollect = (link: any) => {
        const res = routerList.find((item: any) => {
            return item?.link == link
        })
        return res?.isCollect
    }

    //收藏和取消收藏
    const handleChangeCollect = () => {
        const res = routerList.find((item: any) => {
            return item?.link == location?.pathname
        })
        res.isCollect = !res.isCollect
        setRouterList([...routerList])
        message.success(res.isCollect ? '收藏成功' : '取消收藏成功')
    }
    return (
        <>
            {
                notIndex &&
                <div className={'fixed right-1 md:right-3 bottom-3'}>
                    <Button onClick={handleChangeCollect} shape={'circle'} size={'large'} type={'primary'} icon={
                        isCollect ? <StarFilled/> : <StarOutlined/>}/>
                </div>
            }
        </>
    );
}
