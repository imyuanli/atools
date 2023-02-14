import {
    AppstoreOutlined, ToolOutlined, FileImageOutlined, FontSizeOutlined, RetweetOutlined
} from '@ant-design/icons';

//分类
export const DEFAULT_TYPE = [
    {
        value: 'usually',
        label: '常用工具',
        icon: <AppstoreOutlined/>
    },
    {
        value: 'picture',
        label: '图片工具',
        icon: <FileImageOutlined/>
    },
    {
        value: 'text',
        label: '文本工具',
        icon: <FontSizeOutlined/>
    },
    {
        value: 'data',
        label: '数据换算',
        icon: <RetweetOutlined/>
    },
    {
        value: 'other',
        label: '其他工具',
        icon: <ToolOutlined/>
    },
]

//路由
export const DEFAULT_ROUTER = [
    //常用
    {
        name: '人生小格',
        link: '/life-grid',
        state: 'new',
        type: 'usually',
        isCollect: false,
    },
    {
        name: '短网址生成',
        link: '/short-url',
        state: 'new',
        type: 'usually',
        isCollect: false,
    },
    {
        name: '短网址还原',
        link: '/short-revert',
        state: 'new',
        type: 'usually',
        isCollect: false,
    },

    //图片
    {
        name: '必应壁纸',
        link: '/bing-image',
        state: 'error',
        type: 'picture',
        isCollect: false,
    },
    {
        name: 'ACG表情包制作',
        link: '/acg-make',
        state: 'hot',
        type: 'picture',
        isCollect: false,
    },

    //文本
    {
        name: '密码生成器',
        link: '/pwd-generator',
        state: 'hot',
        type: 'text',
        isCollect: false,
    },
    {
        name: '舔狗日记',
        link: '/dog-diary',
        state: 'recommend',
        type: 'text',
        isCollect: false,
    },
    {
        name: '心灵毒鸡汤',
        link: '/toxic-soul',
        state: "",
        type: 'text',
        isCollect: false,
    },
    {
        name: '盘古之白',
        link: '/pangu',
        state: "new",
        type: 'text',
        isCollect: false,
    },

    //数据转换
    {
        name: '字节数转换',
        link: '/byte-transform',
        state: 'new',
        type: 'data',
        isCollect: false,
    },
    {
        name: '进制转换',
        link: '/radix-transform',
        state: 'new',
        type: 'data',
        isCollect: false,
    },
    {
        name: '温度转换',
        link: '/temperature-trans',
        state: 'new',
        type: 'data',
        isCollect: false,
    },
    {
        name: '数字转中文',
        link: '/number-transform',
        state: 'new',
        type: 'data',
        isCollect: false,
    },

    //其他
    {
        name: 'MBTI测试',
        link: '/mbti',
        state: 'new',
        type: 'other',
        isCollect: false,
    },
]

//图片api
export const IMG_URL = 'https://qiniu.imyuanli.cn/wbt'

//默认状态
export const DEFAULT_STATE = [
    {
        value: 'idle',
        label: '无状态',
    },
    {
        value: 'new',
        label: '新功能',
    },
    {
        value: 'recommend',
        label: '推荐',
    },
    {
        value: 'hot',
        label: '热门',
    },
    {
        value: 'vip',
        label: 'VIP',
    },
    {
        value: 'error',
        label: 'Bug',
    },
]

//百分比
export const getPercentage = (num: any, total: any) => {
    if (num == 0 || total == 0) {
        return 0;
    }
    return Math.round(num / total * 10000) / 100.00  // 小数点后两位百分比
}

