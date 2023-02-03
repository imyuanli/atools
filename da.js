// var randum = function(max) { //随机数
//     return Math.round(Math.random() * max);
// }
// var hexify = function(x) { //转换16进制
//     return ('0' + parseInt(x).toString(16)).slice(-2);
// }
// var randex = function() { //随机16进制色彩值
//     return '#' + hexify(randum(255)) + hexify(randum(255)) + hexify(randum(255));
// };
// var blender = function() { //随机渐变
//     if (!!Math.round(Math.random())) {
//         return 'radial-gradient(circle at ' + randum(100) + '% ' + randum(100) + '%, ' + randex() + ', ' + randex() + ')';
//     } else {
//         return 'linear-gradient(' + randum(360) + 'deg, ' + randex() + ', ' + randex() + ')';
//     }
// };
//
// console.log(blender())


// 分类
// import {FileImageOutlined, FontSizeOutlined, ToolOutlined} from "@ant-design/icons";

const typeList = [
    {
        type: 'picture',
        title: '图片工具',
    },
    {
        type: 'text',
        title: '文本工具',
    },
    {
        type: 'other',
        title: '其他工具',
    },
    {
        type: 'conversion',
        title: '数据换算',
    },
]

const arr = []
//路由
const routerList = [
    {
        name: '必应壁纸',
        link: '/bing-image',
        state: 'error',
        type: 'picture',
        isCollect: false,
    },
    {
        name: '密码生成器',
        link: '/password-generator',
        state: 'hot',
        type: 'text',
        isCollect: false,
    },
    {
        name: '舔狗日记',
        link: '/simp-words',
        state: 'recommend',
        type: 'text',
        isCollect: false,
    },
    {
        name: '心灵毒鸡汤',
        link: '/soul-words',
        state: "",
        type: 'text',
        isCollect: false,
    },
    {
        name: 'MBTI测试',
        link: '/mbti-test',
        state: 'new',
        type: 'other',
        isCollect: false,
    },
    {
        name: '进制转换',
        link: '/system-change',
        state: '',
        type: 'conversion',
        isCollect: false,
    }
]

const a = routerList.reduce((prev, cur) => {
    let type = cur['type'];
    if (Object.keys(prev).includes(type)) {
        prev[type].push(cur)
    }
    return prev
}, {
    picture: [],
    text: [],
    other: [],
})
console.log(a)