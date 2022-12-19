import {Outlet} from 'umi';
import './index.css'

export default function Layout() {
    return (
        <div className={'main'}>
            <div className={'content'}>
                <Outlet/>
            </div>
        </div>
    );
}
