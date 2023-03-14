import {get_comfort_word} from "@/service/service";
import ASentence from "@/components/a sentence";

export default function ComfortWord() {
    return (<ASentence title={'安慰文案'} api={get_comfort_word} text={'安慰一下'} readme={'乖乖，不要不高兴啦～'}/>);
}
