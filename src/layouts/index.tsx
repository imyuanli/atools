import {Outlet} from 'umi';
import './index.css'
import {useEffect, useState} from "react";
import {getBlender} from "@/utils";

export default function Layout() {
    const [blender, setBlender] = useState<any>("")
    useEffect(() => {
        setBlender(getBlender())
    }, [])
    return (
        <div className={'main'}>
            <div className={'cover'} style={{backgroundImage: blender}}/>
            <div className={'custom-background'}/>
            <div className={'content'}>
                <Outlet/>
            </div>
        </div>
    );
}
