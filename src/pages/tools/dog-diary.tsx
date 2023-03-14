import {get_dog_diary} from "@/service/service";
import ASentence from "@/components/a sentence";

export default function DogDiary() {
    return (<ASentence title={'舔狗日记'} api={get_dog_diary} text={'再来亿篇'} readme={'舔一个是狗！舔一群是狼！加油成为战狼吧！'}/>);
}
