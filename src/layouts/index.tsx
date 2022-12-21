import {Outlet} from 'umi';
import './index.css'
import 'antd/dist/reset.css'

export default function Layout() {
    return (
        <div className={'main'}>
            <div className={'content'}>
                <Outlet/>
            </div>
        </div>
    );
}
