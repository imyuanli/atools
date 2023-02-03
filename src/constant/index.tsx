import {
    AppstoreOutlined, ToolOutlined, FileImageOutlined, FontSizeOutlined
} from '@ant-design/icons';

// 分类
export const DEFAULT_TYPE = [
    {
        type: 'usually',
        title: '常用工具',
        icon: <AppstoreOutlined/>
    },
    {
        type: 'picture',
        title: '图片工具',
        icon: <FileImageOutlined/>
    },
    {
        type: 'text',
        title: '文本工具',
        icon: <FontSizeOutlined/>
    },
    {
        type: 'other',
        title: '其他工具',
        icon: <ToolOutlined/>
    },
]

//路由
export const DEFAULT_ROUTER = [
    {
        name: '必应壁纸',
        link: '/bing-image',
        state: 'error',
        type: 'picture',
        isCollect:false,
    },
    {
        name: '密码生成器',
        link: '/pwd-generator',
        state: 'hot',
        type: 'text',
        isCollect:false,
    },
    {
        name: '舔狗日记',
        link: '/dog-diary',
        state: 'recommend',
        type: 'text',
        isCollect:false,
    },
    {
        name: '心灵毒鸡汤',
        link: '/toxic-soul',
        state: "",
        type: 'text',
        isCollect:false,
    },
    {
        name: 'MBTI测试',
        link: '/mbti',
        state: 'new',
        type: 'other',
        isCollect:false,
    },
    {
        name: '人生小格',
        link: '/life-grid',
        state: 'new',
        type: 'usually',
        isCollect:false,
    },
]