import Title from "@/components/title";
import MyCard from "@/components/my-card";
import figlet from 'figlet';
import standard from 'figlet/importable-fonts/Standard.js'
import DASCII from 'figlet/importable-fonts/3D-ASCII.js'

export default function wordArt() {
    console.log(DASCII)
    figlet.parseFont('3D Diagonal', DASCII);
    figlet.text('', {
        font: '3D Diagonal',
    }, function(err:any, data:any) {
        console.log(data);
    });
    return (
        <div>
            <Title value={'艺术字生成'}/>
            <MyCard title={'艺术字配置'}>

            </MyCard>
            <MyCard title={'生成结果'}>

            </MyCard>
        </div>
    );
}

 
