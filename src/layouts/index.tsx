import {Outlet} from 'umi';
import './index.css'

export default function Layout() {
    return (
        <div className={'main'}>
            <div className={'custom-background'} />
            <div className={'cover'}></div>
            <div className={'content'}>
                <Outlet/>
            </div>
        </div>
    );
}
