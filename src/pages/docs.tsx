import yayJpg from '../assets/yay.jpg';
import {useOutletContext} from "umi";
import {useEffect} from "react";
import Title from "@/components/title";

export default function Docs() {
    return (
        <div>
            <Title value={'docs'}/>
        </div>
    );
}
