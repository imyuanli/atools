import React from "react";
import './index.less'
import {DEFAULT_STATE} from "@/utils";

export default function StatusMark() {
    return (
        <div className={'flex status-mark'}>
            {
                DEFAULT_STATE.map((item, index) => {
                    return (
                        <div key={index} className={'flex-center mr-3'}>
                            <div className={`badge ${item.value} mr-1`}/>
                            <div className={`${item.value}-text`}>{item.label}</div>
                        </div>
                    )
                })
            }
        </div>
    );
}
