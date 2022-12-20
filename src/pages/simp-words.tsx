import Title from "@/components/title";
import MyCard from "@/components/my-card";
import {Button} from "antd";

export default function SimpWords() {
    return (
        <div>
            <Title value={'舔狗日记'}/>
            <MyCard>
                <div className={'p-16 text-xl'}>
                    今天的你依旧高冷，在我不断的嘘寒问暖下你终于不再矜持了，回了我一个s b，我查遍了英语词典，终于明白了这两个字母的意思，s是sweet，b是baby，原来你是在喊我sweet
                    baby，我也爱你❤，你现在在干嘛呢？我想你了
                </div>
                <div className={'flex w-full justify-end items-center'}>
                    <Button type={'primary'} size={'large'}>再来亿篇</Button>
                </div>
            </MyCard>
        </div>
    );
}
