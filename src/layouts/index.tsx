import {Outlet} from 'umi';
import {UserOutlined,SearchOutlined} from "@ant-design/icons";
import {Input} from 'antd';
import './index.css'
import {useState} from "react";

const {Search} = Input;

export default function Layout() {
    const onSearch = (value: string) => console.log(value);

    // const [title,setTitle] = useState()
    // const context={
    //     title,
    //     setTitle:setTitle
    // }
    return (
        <div className={'main'}>
            <div className={'content'}>
                <Outlet/>
            </div>
        </div>
    );
}
