import {get_soul_message} from "@/service/service";
import ASentence from "@/components/a-sentence";

export default function ToxicSoul() {
    return (<ASentence title={'心灵毒鸡汤'} api={get_soul_message} text={'再来亿碗'} readme={'鸡汤虽好可不要贪杯哦~'}/>);
}
