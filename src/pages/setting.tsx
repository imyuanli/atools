import Title from "@/components/title";
import MyCard from "@/components/my-card";
import {Button} from "antd";

export default function User() {
    return (
        <div>
            <Title value={'网站设置'}/>
            <MyCard title={'基本设置'}>

            </MyCard>
            <MyCard title={'主题设置'}>

            </MyCard>
            <MyCard title={'背景设置'}>

            </MyCard>
            <MyCard title={'其他设置'}>

            </MyCard>
        </div>
    );
}
