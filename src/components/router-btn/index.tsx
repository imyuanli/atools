import {Card, Tag, Tooltip} from "antd";
import {Link} from "@umijs/renderer-react";
import React from "react";
import './index.less'
import {DEFAULT_STATE, numFormat} from "@/utils";
import dayjs from "dayjs";

export default function RouterBtn(props: any) {
    const {routerList} = props
    const bodyStyle: any = {
        padding: 24,
        textAlign: 'center',
        fontSize: 18
    }
    const tagStyle: any = {
        marginLeft: 3,
        marginRight: 3,
        fontWeight: 600,
        fontSize: 12,
        padding: '0 4px',
    }

    const getAction = (views: any) => {
        return (
            <div className={'flex-center ml-1'}>
                <span>已被使用</span>
                <Tag
                    color={'#9CA3AF'}
                    style={tagStyle}
                >
                    {numFormat(views)}
                </Tag>
                <span>次</span>
            </div>
        )
    }

    //自动计算状态
    const getToolsState = (item: any) => {
        const {state, create_time, views} = item
        if (state == 'idle') {
            let nowTime = dayjs()
            const day = dayjs(nowTime).diff(dayjs(create_time), 'days')
            if (views >= 4500) {
                return getStateTag('HOT', '#f50')
            } else {
                if (day < 10) {
                    return getStateTag('NEW', '#87d068')
                }
            }
        } else {
            const res:any = DEFAULT_STATE.find((i: any) => i.value == state)
            return getStateTag(res?.label, res?.color)
        }
    }
    const getStateTag = (text: string, color?: string) => {
        return (
            <div
                className={'text-white  font-bold text-xs p-0.5 scale-90'}
                style={{backgroundColor: color}}
            >
                {text}
            </div>
        )
    }
    return (
        <>
            {
                routerList.map((item: any, index: any) => {
                    return (
                        <div key={index.tid} className={'router-btn'}>
                            {
                                item?.state === 'bug' ?
                                    <Tooltip title="维护中，禁止访问">
                                        <div className={'relative'}>
                                            <Card
                                                className={`rounded-md w-full shadow-md`}
                                                bodyStyle={bodyStyle}
                                                style={{
                                                    cursor: "not-allowed",
                                                }}
                                                actions={[getAction(item.views)]}
                                            >
                                                <div className={'truncate font-bold text-link'}>
                                                    {item?.name}
                                                </div>
                                                <div className={'absolute right-1 top-1'}>
                                                    {getStateTag('BUG', '#bfbfbf')}
                                                </div>
                                            </Card>
                                        </div>
                                    </Tooltip>
                                    :
                                    <Link
                                        to={`/tools/${item?.link}`}
                                        className={'relative block'}
                                    >
                                        <Card
                                            className={`rounded-md w-full shadow-md relative`}
                                            bodyStyle={bodyStyle}
                                            hoverable={true}
                                            actions={[getAction(item.views)]}
                                            size="small"
                                        >
                                            <div className={'truncate font-bold text-link'}>
                                                {item?.name}
                                            </div>
                                            <div className={'absolute right-1 top-1'}>
                                                {getToolsState(item)}
                                            </div>
                                        </Card>
                                    </Link>
                            }
                        </div>
                    )
                })
            }
        </>

    );
}
