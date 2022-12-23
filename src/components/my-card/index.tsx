import './index.css'
import React from "react";

interface props {
    title?: string,
    icon?: any,
    children: any,
    isIndex?: any
}
const MyCard: React.FunctionComponent<props> = ({title, icon, children, isIndex}) => {
    const style = 'grid gap-4 grid-cols-2 md:grid-cols-4'
    return (
        <div
            className={`my-12 pt-12 px-9 pb-6 shadow-lg bg-white rounded-lg relative border-2 ${isIndex ? style : ""}`}>
            {
                title &&
                <div className={'card-title text-base'}>
                    {
                        icon && <div className={'mr-2'}>{icon}</div>
                    }
                    <div>{title}</div>
                </div>
            }
            {children}
        </div>
    );
}
export default MyCard