import Title from "@/components/title";
import MyCard from "@/components/my-card";
import {EditOutlined, LockOutlined} from "@ant-design/icons";
// import Readme from "@/components/readme";
import {Button, Checkbox, Slider} from "antd";
import {useEffect, useState} from "react";
import {CheckboxValueType} from "antd/es/checkbox/Group";
// import Copy from "@/components/copy";

export default function PasswordGenerator() {
    const [pwdLength, setPwdLength] = useState<number>(16);
    const [pwdCount, setPwdCount] = useState<number>(1);
    const [checkRes, setCheckRes] = useState<any>(['number', 'lower']);
    const [result, setResult] = useState<any>([]);
    //多选按钮
    const options = [
        {label: '数字', value: 'number'},
        {label: '小写字母', value: 'lower'},
        {label: '大写字母', value: 'upper'},
        {label: '特殊符号', value: 'symbol'},
    ];
    const onChange = (checkedValues: CheckboxValueType[]) => {
        setCheckRes(checkedValues)
    }

    //生成密码
    useEffect(() => {
        generatePassword(pwdLength, pwdCount, checkRes)
    }, [pwdLength, pwdCount, checkRes])
    //点击生成密码
    const onClick = () => {
        generatePassword(pwdLength, pwdCount, checkRes)
    }

    //生成密码
    const generatePassword = (length: number, count: number, typeArr: any) => {
        // 对象的所有函数名，我们将使用它们来创建密码的随机字母
        const randomFunc = {
            lower: getRandomLower,
            upper: getRandomUpper,
            number: getRandomNumber,
            symbol: getRandomSymbol,
        };
        // 生成器函数
        // 所有负责返回一个随机值的函数，我们将使用它来创建密码。
        function getRandomLower() {
            return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
        }

        function getRandomUpper() {
            return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
        }

        function getRandomNumber() {
            return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
        }

        function getRandomSymbol() {
            const symbols = '~!@#$%^&*()_+{}":?><;.,';
            return symbols[Math.floor(Math.random() * symbols.length)];
        }

        //结果
        let result = []
        if (typeArr.length === 0) {
            return "";
        }
        for (let j = 0; j < count; j++) {
            let password = "";
            for (let i = 0; i < length; i++) {
                typeArr.forEach((type: any) => {
                    // @ts-ignore
                    password += randomFunc[type]();
                });
            }
            let newStrAll: any = [];
            password.split('').forEach((item, index, array) => {
                let newIndex = Math.round(Math.random() * newStrAll.length);
                newStrAll.splice(newIndex, 0, item);
            });
            result.push(newStrAll.join('').slice(0, length))
        }
        setResult([...result])
    }
    return (
        <div>
            <Title value={'密码生成器'}/>
            <MyCard title={'生成选项'} icon={<EditOutlined/>}>
                <div>
                    <div className={'mb-1'}>密码长度 (4~64)</div>
                    <Slider defaultValue={pwdLength}
                            min={4}
                            max={64}
                            onChange={(e) => {
                                setPwdLength(e)
                            }}
                    />
                    <div className={'mb-1'}>密码数量</div>
                    <Slider defaultValue={pwdCount}
                            min={1}
                            max={50}
                            onChange={(e) => {
                                setPwdCount(e)
                            }}
                    />
                </div>
                <Checkbox.Group className={'mt-3'} options={options} defaultValue={checkRes} onChange={onChange}/>
                <div className={'flex justify-end items-center mt-3'}>
                    <Button style={{maxWidth: 120}} className={'w-1/6'} size={'large'} type={'primary'}
                            onClick={onClick}>生成</Button>
                </div>
            </MyCard>
            <MyCard title={'生成结果'} icon={<LockOutlined/>}>
                <div className={'bg-blue-50 p-3 rounded-lg relative'}>
                    {/*<Copy value={result.toString()}/>*/}
                    {
                        result.map((item: string, index: number) => {
                            return (
                                <p key={index}>{item}</p>
                            )
                        })
                    }
                </div>
            </MyCard>
            {/*<Readme explain={'请至少选择一个密码组成成分\n' + '密码完全在浏览器生成，请放心使用'}/>*/}
        </div>
    );
}
