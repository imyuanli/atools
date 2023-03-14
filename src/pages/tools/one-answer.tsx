import {get_one_answer} from "@/service/service";
import ASentence from "@/components/a-sentence";

export default function oneAnswer() {
    return (
        <ASentence title={'一个答案'} api={get_one_answer} text={'再问一次'} readme={'当你不知道该怎么下决定 不如问问我的意见'}/>
    );
}

 
