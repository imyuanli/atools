import {Navigate} from 'umi'

const withAuth = (Component: any) => () => {
    //首先得登录，登陆完后还需要鉴权
    let token = 1
    let role = 0
    if (token && role) {
        return <Component/>;
    } else {
        return <Navigate to="/login"/>;
    }
}
export default  withAuth