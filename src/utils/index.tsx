import {
    AppstoreOutlined,
    ToolOutlined,
    FileImageOutlined,
    FontSizeOutlined,
    RetweetOutlined,
    PlaySquareOutlined,
    CodeOutlined, DribbbleOutlined, SwapOutlined, BookOutlined, FileSyncOutlined
} from '@ant-design/icons';

//网站名称
export const DEFAULT_TITLE = 'aTools'

//分类
export const DEFAULT_TYPE = [
    {
        value: 'file',
        label: '文档转换',
        icon: <FileSyncOutlined />
    },
    {
        value: 'picture',
        label: '图片工具',
        icon: <FileImageOutlined/>
    },
    {
        value: 'av',
        label: '影音工具',
        icon: <PlaySquareOutlined />
    },
    {
        value: 'life',
        label: '生活娱乐',
        icon: <DribbbleOutlined />
    },
    {
        value: 'code',
        label: '开发工具',
        icon: <CodeOutlined />
    },
    {
        value: 'study',
        label: '教育学习',
        icon: <BookOutlined />
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

//图片api
export const IMG_URL = 'https://qiniu.imyuanli.cn'

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

export const numFormat = (views: any) => {
    let res
    if (views >= 10000) {
        res = Math.floor(views / 1000) / 10 + 'W+';
    } else if (views >= 1000) {
        res = Math.round(views / 100) / 10 + 'K+';
    }
    return res;
}