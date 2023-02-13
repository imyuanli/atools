import React from "react";
import './index.less'

export default function StatusMark() {
    //状态数组
    const stateArr = [
        {
            name: '热门',
            state: 'hot',
        },
        {
            name: '新功能',
            state: 'new',
        },
        {
            name: '推荐',
            state: 'recommend',
        },
        {
            name: '维护中',
            state: 'error',
        }
    ]
    return (
        <div className={'flex status-mark'}>
            {
                stateArr.map((item, index) => {
                    return (
                        <div key={index} className={'flex-center mr-3'}>
                            <div className={`badge ${item.state} mr-1`}/>
                            <div className={`${item.state}-text`}>{item.name}</div>
                        </div>
                    )
                })
            }
        </div>
    );
}
