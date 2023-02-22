import {Button, Tooltip} from "antd";
import {Link} from "@umijs/renderer-react";
import React from "react";
import './index.less'

export default function RouterBtn(props: any) {
    const {routerList} = props
    return (
        <>
            {
                routerList.map((item:any,index:any) => {
                    return (
                        <div key={index+item.name} className={'router-btn'}>
                            {
                                item?.state === 'error' ?
                                    <Tooltip title="维护中，禁止访问">
                                        <div className={'relative'}>
                                            <Button
                                                className={`rounded-md w-full `}
                                                size={'large'}
                                                style={{
                                                    cursor: "not-allowed",
                                                }}
                                            >
                                                {item?.name}
                                            </Button>
                                            <div className={`badge ${item?.state}`}/>
                                        </div>
                                    </Tooltip>
                                    :
                                    <Link
                                        to={`/tools/${item?.type}${item?.link}`}
                                        className={'relative block'}
                                    >
                                        <Button
                                            className={`rounded-md w-full`}
                                            size={'large'}
                                        >
                                            {item?.name}
                                        </Button>
                                        <div className={`badge ${item?.state}`}/>
                                    </Link>
                            }
                        </div>
                    )
                })
            }
        </>

    );
}
