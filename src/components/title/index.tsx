import {UserOutlined, HomeOutlined, BugOutlined} from "@ant-design/icons";
import './index.css'
import {Link} from "@umijs/renderer-react";
import {useTitle} from "ahooks";
import {useEffect} from "react";
import store from 'store'
import {useLocation, useNavigate, useSelector} from "@@/exports";
import {message} from "antd";
import {update_tool_views} from "@/service/service";

export default function Title(props: any) {
    const token = store.get('token')
    //根据状态自动判断
    const toolArr = useSelector((state: any) => state.tools.toolArr);
    const location = useLocation()
    const navigate = useNavigate()
    useEffect(() => {
        const {pathname} = location
        const res = toolArr.find((item: any) => pathname == `/tools/${item?.type}/${item?.link}`)
        if(res){
            //报错的工具
            if (res?.state == "error") {
                message.error('工具正在维护，不能访问')
                navigate('/', {replace: true})
            }

            //vip
            if (res?.state == "vip") {
                //如果没登陆
                if (!token) {
                    message.warn('请先登陆一下')
                    navigate(`/login?redirect=${pathname}`, {replace: true})
                    return
                }
                //登陆后鉴权
                else {
                    console.log("权限")
                }
            }

            //工具使用次数
            update_tool_views({tid:res.tid}).then()
        }
    }, [])

    const {value, isLogin} = props
    //设置页面的title
    useTitle(value ? value : 'WoodBox')
    return (
        <div className={'flex-center flex-col w-full my-12'}>
            <div className={'text-3xl font-bold mb-3'}>
                {value ?
                    <div className={'flex'}>
                        <span>{value}</span>
                        <span className={'hidden ml-1 md:block'}>- FlashTools</span>
                    </div> :
                    <div className={'flex'}>
                        <span>FlashTools</span>
                        <span className={'hidden ml-1 md:block'}>- 你的工具伙伴</span>
                    </div>
                }
            </div>
            <div className={'flex-center mb-3'}>
                {
                    !isLogin &&
                  <>
                      {
                          token ?
                              <Link to={'/user'} className={'mr-3'}>
                                  <UserOutlined/>
                                  <span className={'ml-1'}>用户中心</span>
                              </Link>
                              :
                              <Link to={'/login'} className={'mr-3'}>
                                  <UserOutlined/>
                                  <span className={'ml-1'}>未登录</span>
                              </Link>
                      }
                    <Link to={'/'} className={'mr-3'}>
                      <BugOutlined/>
                      <span className={'ml-1'}>我要反馈</span>
                    </Link>
                  </>
                }
                {
                    value &&
                  <Link to={'/'}>
                    <HomeOutlined/>
                    <span className={'ml-1'}>返回首页</span>
                  </Link>
                }
            </div>
        </div>
    );
}
