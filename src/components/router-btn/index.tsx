import {Card, Tag, Tooltip} from "antd";
import {Link} from "@umijs/renderer-react";
import React from "react";
import './index.less'
import {numFormat} from "@/utils";

export default function RouterBtn(props: any) {
    const {routerList} = props
    const bodyStyle: any = {
        padding: 18,
        textAlign: 'center',
        fontSize: 18
    }
    const tagStyle: any = {
        marginLeft: 3,
        marginRight: 3,
        fontWeight: 600,
        fontSize: 13,
        padding: 1
    }
    return (
        <>
            {
                routerList.map((item: any, index: any) => {
                    return (
                        <div key={index + item.name} className={'router-btn'}>
                            {
                                item?.state === 'error' ?
                                    <Tooltip title="维护中，禁止访问">
                                        <div className={'relative'}>
                                            <Card
                                                className={`rounded-md w-full shadow-md`}
                                                bodyStyle={bodyStyle}
                                                style={{
                                                    cursor: "not-allowed",
                                                }}
                                                hoverable={true}
                                                actions={[
                                                    <div className={'flex justify-start items-end ml-1'}>
                                                        <span>已被使用</span>
                                                        <Tag
                                                            color={'#9f9f9f'}
                                                            style={tagStyle}
                                                        >
                                                            {numFormat(item.views)}
                                                        </Tag>
                                                        <span>次</span>
                                                    </div>
                                                ]}
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
                                            className={`rounded-md w-full shadow-md`}
                                            bodyStyle={bodyStyle}
                                            hoverable={true}
                                            actions={[
                                                <div className={'flex justify-start items-end ml-1'}>
                                                    <span>已被使用</span>
                                                    <Tag
                                                        color={'#9f9f9f'}
                                                        style={tagStyle}
                                                    >
                                                        {numFormat(item.views)}
                                                    </Tag>
                                                    <span>次</span>
                                                </div>
                                            ]}
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
