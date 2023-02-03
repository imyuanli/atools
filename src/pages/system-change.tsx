import Title  from "@/components/title";
import MyCard from "@/components/my-card";
import {
  Input,
  Select,
} from 'antd';
import './system-change.less'
import {useEffect, useState} from "react";

interface systemProps {
  value: any;
  number: number;
  name: string
}

export default function systemChange() {
  const [conversionInput,setConversionInput] = useState('')
  const [systemArr,setSystemArr] = useState<systemProps[]>(
    [{
      value: '',
      name: '二进制',
      number: 2
    },{
      value: '',
      name: '八进制',
      number: 8
    },{
      value: '',
      name: '十进制',
      number: 10
    },{
      value: '',
      name: '十六进制',
      number: 16
    },{
      value: '',
      name: '三十二进制',
      number: 32
    },]
  )
  let [result,setResult] = useState([])
  useEffect(() => {
    systemArr.map((item : any,index) => {
      const res = [...systemArr]
      if(conversionInput == '') {
        res[index].value = ''
      }else {
        if (item.number == 2) {
          res[index].value = strToBinary(conversionInput,2)
        }else if(item.number == 8) {
          res[index].value = strToBinary(conversionInput,8)
        }else if(item.number == 10) {
          res[index].value = strToBinary(conversionInput,10)
        }else if(item.number == 16) {
          res[index].value = strToBinary(conversionInput,16)
        }else if(item.number == 32) {
          res[index].value = strToBinary(conversionInput,32)
        }
      }
      setSystemArr([...res])
    })
  }, [conversionInput])

  function checkRate(input:any) { 
    var re = /^[0-9]+.?[0-9]*/;//判断字符串是否为数字//判断正整数/[1−9]+[0−9]∗]∗/ 
    let isNumber = re.test(input)
    return isNumber
  }
  
  //将字符串转换成二进制形式，中间用空格隔开
  function strToBinary(str: any,number:number) {
    let result = [];
    let list = str.split(" ");
    for(let i=0;i<list.length;i++){
        if(i != 0){
          result.push(" ");
        }
      let item = list[i];
      var binaryStr:string = ''
      if (checkRate(item)) {
        binaryStr = parseInt(item).toString(number)
      } else {
        binaryStr = item.charCodeAt().toString(number);
      }
      if (binaryStr == 'NaN') continue
      result.push(binaryStr);
    }    
    return result.join("");
  }

  // 获取input值
  const changeConversion = (e : any) => {
    setConversionInput(() => {
      return e.target.value
    })
  }
  return (
    <div>
      <Title value={'数据转换'}/>
      <MyCard title={'进制转换'}>
          <Input  onChange={changeConversion} value={conversionInput} style={{ width: '100%' }} allowClear defaultValue="不同类型的值可用空格隔开" />
          <div>
            {
              systemArr.map((item,index) => {
                return (
                  <div className="sysytemList" key={index}>
                    <span>{item.name}：{item.value}</span>
                  </div>
                )
              })
            }
          </div>
      </MyCard>
      <MyCard title={'说明'}>
        <div>
          请规范的输入相应进制，否则将无法正确计算
        </div>
      </MyCard>
    </div>
  )
}