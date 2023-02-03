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
  useEffect(() => {
    systemArr.map((item : any,index) => {
      const res = [...systemArr]
      if(conversionInput == '') {
        res[index].value = ''
      }else {
        if(item.number == 2) {
          res[index].value = parseInt(conversionInput).toString(2)
          if(Number.isNaN(res[index].value)) res[index].value = ''
        }else if(item.number == 8) {
          res[index].value = parseInt(conversionInput).toString(8)
        }else if(item.number == 10) {
          res[index].value = parseInt(conversionInput,10)
        }else if(item.number == 16) {
          // res[index].value = parseInt(conversionInput).toString(16)
          res[index].value = strToHexCharCode(strToUtf8Bytes(conversionInput));
          console.log(conversionInput,11);
          
        }else if(item.number == 32) {
          for(let i=0;i<conversionInput.length;i++) {
            if(res[index].value = '') {
              res[index].value = conversionInput.charCodeAt(i).toString(32);
            }else {
              res[index].value += "," + conversionInput.charCodeAt(i).toString(32);
            }
          }
        }
      }
      setSystemArr([...res])
    })
  },[conversionInput])

  function strToUtf8Bytes(str:any) {
    const utf8:any = [];
      for (let ii = 0; ii < str.length; ii++) {
      let charCode = str.charCodeAt(ii);
      if (charCode < 0x80) utf8.push(charCode);
      else if (charCode < 0x800) {
        utf8.push(0xc0 | (charCode >> 6), 0x80 | (charCode & 0x3f));
      } else if (charCode < 0xd800 || charCode >= 0xe000) {
        utf8.push(0xe0 | (charCode >> 12), 0x80 | ((charCode >> 6) & 0x3f), 0x80 | (charCode & 0x3f));
      } else {
        ii++;
        charCode = 0x10000 + (((charCode & 0x3ff) << 10) | (str.charCodeAt(ii) & 0x3ff));
        utf8.push(
        0xf0 | (charCode >> 18),
        0x80 | ((charCode >> 12) & 0x3f),
        0x80 | ((charCode >> 6) & 0x3f),
        0x80 | (charCode & 0x3f),
        );
      }
      }
      //兼容汉字，ASCII码表最大的值为127，大于127的值为特殊字符
      for(let jj=0;jj<utf8.length;jj++){
        var code = utf8[jj];
        if(code>127){
          utf8[jj] = code - 256;
        }
      }
      return utf8;
  }
  function strToHexCharCode(str:any){
		var hexCharCode = [];
		var chars = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"];
		for(var i = 0; i < str.length; i++) {
			  var bit = (str[i] & 0x0f0) >> 4;
			  hexCharCode.push(chars[bit]);
			  var bit = str[i] & 0x0f;
			  hexCharCode.push(chars[bit]);
		}
	   return hexCharCode.join("");
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
          <Input  onChange={changeConversion} value={conversionInput} style={{ width: '100%' }} allowClear defaultValue="" />
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