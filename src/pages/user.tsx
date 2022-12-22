import Title from "@/components/title";
import MyCard from "@/components/my-card";
import {Button} from "antd";

export default function User() {
    return (
        <div>
            <Title value={'用户信息'}/>
            <MyCard>
                <div>
                    必应壁纸
                </div>
            </MyCard>
        </div>
    );
}
