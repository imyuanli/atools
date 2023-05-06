import {Navigate} from 'umi'
import store from 'store'
import {message} from "antd";
import {useLocation, useNavigate} from "@@/exports";

const withAuth = (Component: any) => () => {
    const token = store.get('token')
    const location = useLocation()
    const redirect = location?.pathname
    //首先得登录
    if (token) {
        // todo 登录完后鉴权
        return <Component/>;
    } else {
        message.warn('请先登陆一下')
        return <Navigate to={`/login?redirect=${redirect}`} replace={true}/>;
    }
}
export default withAuth