import {Navigate, useSelector} from "@@/exports";
import {message} from "antd";

const withAuthRole = (Component: any) => () => {
    const {loading: {models: {user}}, user: {userInfo}} = useSelector((state: any) => state)
    if (!user) {
        if (userInfo && userInfo?.role == 3) {
            return <Component/>
        } else {
            message.error("您的权限不足")
            return <Navigate to={`/`} replace={true}/>
        }
    }
}

export default withAuthRole;
