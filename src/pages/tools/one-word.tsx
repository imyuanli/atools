import {get_one_word} from "@/service/service";
import ASentence from "@/components/a sentence";

export default function OneWord() {
    return (<ASentence title={'每日一言'} api={get_one_word} text={'再来yi篇'}/>);
}
