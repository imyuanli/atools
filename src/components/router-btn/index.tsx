import {Button, Card, Tooltip} from "antd";
import {Link} from "@umijs/renderer-react";
import React from "react";
import './index.less'

export default function RouterBtn(props: any) {
    const {routerList} = props
    const bodyStyle={padding:12}
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
                                            <Card
                                                className={`rounded-md w-full flex-center shadow-md`}
                                                bodyStyle={bodyStyle}
                                                style={{
                                                    cursor: "not-allowed",
                                                }}
                                            >
                                                {item?.name}
                                            </Card>
                                            <div className={`badge ${item?.state}`}/>
                                        </div>
                                    </Tooltip>
                                    :
                                    <Link
                                        to={`/tools/${item?.link}`}
                                        className={'relative block'}
                                    >
                                        <Card
                                            className={`rounded-md w-full flex-center shadow-md`}
                                            bodyStyle={bodyStyle}
                                            hoverable={true}
                                        >
                                            {item?.name}
                                        </Card>
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
