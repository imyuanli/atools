import {get_joke} from "@/service/service";
import ASentence from "@/components/a-sentence";

export default function OneWord() {
    return (<ASentence title={'搞笑语录'} api={get_joke} text={'再来亿篇'} readme={'每日搞笑一句话，开心一整天'}/>);
}
