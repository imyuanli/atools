// @flow 
import * as React from 'react';
import MyCard from "@/components/my-card";
import {DatePicker} from "antd";
import Title from "@/components/title";
import {useEffect, useState} from "react";
import 'dayjs/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import dayjs from "dayjs";
import {HourglassOutlined} from "@ant-design/icons";

type Props = {};
const LifeGrid = (props: Props) => {
    //出生日期
    const [birthday, setBirthday] = useState<any>(null)
    //过去的时光
    const [pastTime,setPastTime] = useState<any>(null)
    //剩下的时光
    const [remainTime,setRemainTime] = useState<any>(null)

    const setDateData = () => {
        const date = dayjs(birthday);
        const thisDay = dayjs();
        const deathDate = date.add(80, 'year'); // 80岁的时候
        if(birthday){
            setPastTime({
                year: thisDay.diff(date, 'year', true).toFixed(1),
                month: thisDay.diff(date, 'month', true).toFixed(1),
                day: thisDay.diff(date, 'day', true).toFixed(1),
                hour: thisDay.diff(date, 'hour', true).toFixed(1),
                minute: thisDay.diff(date, 'minute', true).toFixed(1),
                second: thisDay.diff(date, 'second', true).toFixed(1)
            })
            setRemainTime({
                year: deathDate.diff(thisDay, 'year', true).toFixed(1),
                month: deathDate.diff(thisDay, 'month', true).toFixed(1),
                day: deathDate.diff(thisDay, 'day', true).toFixed(1),
                hour: deathDate.diff(thisDay, 'hour', true).toFixed(1),
                minute: deathDate.diff(thisDay, 'minute', true).toFixed(1),
                second: deathDate.diff(thisDay, 'second', true).toFixed(1)
            })
        }
    }

    useEffect(() => {
        setDateData()
    }, [birthday])
    useEffect(() => {
        console.log(pastTime)
        console.log(remainTime)
    }, [pastTime,remainTime])
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
                />
            </MyCard>
            {
                pastTime &&
                <MyCard title={'过去的时光'} icon={<HourglassOutlined />}>
                    <div>
                        {pastTime?.year} 年
                    </div>
                </MyCard>
            }
            {
                remainTime && <MyCard title={'剩下的时光'} icon={<HourglassOutlined />}>
                </MyCard>
            }
        </div>
    );
};
export default LifeGrid