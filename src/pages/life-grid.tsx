// @flow 
import * as React from 'react';
import MyCard from "@/components/my-card";
import Title from "@/components/title";
import {useEffect, useState} from "react";
import 'dayjs/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import dayjs from "dayjs";
import {FieldTimeOutlined, HourglassOutlined, ShareAltOutlined} from "@ant-design/icons";
import './life-grid.less'
import Copy from "@/components/copy";
import {useLocation} from "react-router";
import queryString from 'query-string';
// import DatePicker from "@/components/DatePicker";
import moment from "moment";
import {DatePicker} from "antd";

type Props = {};
const LifeGrid = (props: Props) => {
    //出生日期
    const [birthday, setBirthday] = useState<any>(null)
    //过去的时光
    const [pastTime, setPastTime] = useState<any>(null)
    //剩下的时光
    const [remainTime, setRemainTime] = useState<any>(null)

    //获取分享的信息
    const location = useLocation()
    const parsed = queryString.parse(location.search);
    useEffect(() => {
        let date = parsed?.date
        if (date) {
            // @ts-ignore
            setBirthday(Buffer.from(date, 'base64').toString())
        }
    }, [])

    const setDateData = () => {
        const date = dayjs(birthday);
        const deathDate = date.add(80, 'year'); // 80岁的时候
        if (birthday) {
            setPastTime({
                year: dayjs().diff(date, 'year', true).toFixed(1),
                month: dayjs().diff(date, 'month', true).toFixed(1),
                day: dayjs().diff(date, 'day', true).toFixed(1),
                hour: dayjs().diff(date, 'hour', true).toFixed(1),
                minute: dayjs().diff(date, 'minute', true).toFixed(1),
                second: dayjs().diff(date, 'second', true).toFixed(1)
            })
            setRemainTime({
                year: deathDate.diff(dayjs(), 'year', true).toFixed(1),
                month: deathDate.diff(dayjs(), 'month', true).toFixed(1),
                day: deathDate.diff(dayjs(), 'day', true).toFixed(1),
                hour: deathDate.diff(dayjs(), 'hour', true).toFixed(1),
                minute: deathDate.diff(dayjs(), 'minute', true).toFixed(1),
                second: deathDate.diff(dayjs(), 'second', true).toFixed(1)
            })
        }
    }
    //人生进度
    const [result, setResult] = useState<any>(null)
    const [length, setLength] = useState<any>(null)

    useEffect(() => {
        console.log(birthday)
        setDateData()
        getResults()
        //每秒刷新
        if (birthday) {
            const timer = setInterval(setDateData, 1000);
            return () => clearInterval(timer);
        }
    }, [birthday]);
    //格子
    const getResults = () => {
        if (!birthday) return false
        const blockArr: Array<any> = [];
        const date = dayjs(birthday);
        const oneBlockHour = 24 * 72; // 一个方块代表的小时
        const haveChildren = 28; // 生孩子的年龄

        const pastDate = dayjs().diff(date, 'day'); // 已经过去的时间(天)

        const deathDate = date.add(80, 'year'); // 80岁的时候
        const fromDeathDate = deathDate.diff(dayjs(), 'day'); // 距离80岁还能活的时间(天)

        const retiredDate = date.add(65, 'year'); // 65岁退休的时候
        const fromRetiredDate = retiredDate.diff(dayjs(), 'day'); // 距离65岁还能活的时间(天)

        const childrenDate = date.add(18 + haveChildren, 'year'); // 如果28岁生孩子，孩子18岁的时候
        const fromChildrenDate = childrenDate.diff(dayjs(), 'day'); // 距离孩子18岁还能活的时间(天)

        const parentsDate = date.add(80 - haveChildren, 'year'); // 距离父母死亡
        const fromParentsDate = parentsDate.diff(dayjs(), 'day'); // 距离父母死亡还能活的时间(天)

        const past = ~~(pastDate / 72); // 已经过去的方块

        const sleep = ~~((8 * fromDeathDate) / oneBlockHour); // 碎觉所需的方块
        const work =
            fromRetiredDate <= 0
                ? 0
                : ~~((8 * fromRetiredDate) / oneBlockHour); // 工作所需的方块
        const child =
            fromChildrenDate <= 0
                ? 0
                : ~~((5 * fromChildrenDate) / oneBlockHour); // 陪伴孩子
        const parents =
            fromParentsDate <= 0
                ? 0
                : ~~(((fromParentsDate / 31) * 24) / oneBlockHour); // 陪伴父母
        let surplus = 400 - (sleep + past + work + child + parents);
        if (surplus <= 0) surplus = 0;

        const data = {
            past,
            sleep,
            work,
            child,
            parents,
            surplus
        };
        Object.keys(data).forEach(e => {
            // @ts-ignore
            for (let i = 0; i < data[e]; i++) {
                blockArr.push({
                    type: e
                });
            }
        });
        setResult([...blockArr])
        setLength({...data})
    }

    //分享
    const share = () => {
        return `${window.location.href}?date=${Buffer.from(birthday).toString('base64')}`;
    }
    return (
        <div>
            <Title value={'人生小格'}/>
            <MyCard>
                <DatePicker
                    style={{width: '100%'}}
                    placeholder={'请选择你的出生日期'}
                    onChange={(_: any, dateString: any) => {
                        setBirthday(dateString)
                    }}
                    size={'large'}
                    locale={locale}
                    defaultValue={moment(birthday, 'YYYY-MM-DD')}
                    format={'YYYY-MM-DD'}
                />
            </MyCard>
            {
                pastTime &&
                <MyCard title={'过去的时光'} icon={<HourglassOutlined/>}>
                    <div className={'grid grid-cols-3 gap-4 justify-items-center md:text-base md:text-xl'}>
                        <div>
                            {pastTime?.year} 年
                        </div>
                        <div>
                            {pastTime?.month} 月
                        </div>
                        <div>
                            {pastTime?.day} 日
                        </div>
                        <div>
                            {pastTime?.hour} 时
                        </div>
                        <div>
                            {pastTime?.minute} 分
                        </div>
                        <div>
                            {pastTime?.second} 秒
                        </div>
                    </div>
                </MyCard>
            }
            {
                remainTime &&
                <MyCard title={'剩下的时光'} icon={<HourglassOutlined/>}>
                    <div className={'grid grid-cols-3 gap-4 justify-items-center md:text-base md:text-xl'}>
                        <div>
                            {remainTime?.year} 年
                        </div>
                        <div>
                            {remainTime?.month} 月
                        </div>
                        <div>
                            {remainTime?.day} 日
                        </div>
                        <div>
                            {remainTime?.hour} 时
                        </div>
                        <div>
                            {remainTime?.minute} 分
                        </div>
                        <div>
                            {remainTime?.second} 秒
                        </div>
                    </div>
                </MyCard>
            }
            {
                (result && length) && <MyCard title={'人生进度'} icon={<FieldTimeOutlined/>}>
                    <div className="box">
                        {
                            result.map((item: any, index: any) => {
                                return (
                                    <div key={index}
                                         className={`block ${item.type} ${index === 323 && index >= length.past ? 'retired' : ''} ${index === (length.past - 1) ? 'flash' : ''}`}/>
                                )
                            })
                        }
                    </div>
                </MyCard>
            }
            {
                birthday && <MyCard title={'分享人生进度'} icon={<ShareAltOutlined/>}>
                    <div className={'bg-blue-50 p-3 rounded-lg relative'}>
                        <Copy value={share()}/>
                        <span>{share()}</span>
                    </div>
                </MyCard>
            }
        </div>
    );
};
export default LifeGrid