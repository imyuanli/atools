import {
    AppstoreOutlined, ToolOutlined, FileImageOutlined, FontSizeOutlined
} from '@ant-design/icons';

// 分类
export const typeList = [
    // {
    //     type: 'usually',
    //     title: '常用工具',
    //     icon: <AppstoreOutlined/>
    // },
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
export const routerList = [
    {
        name: '必应壁纸',
        link: '/bing-image',
        state: 'error',
        type: 'picture',
        isCollect:false,
    },
    {
        name: '密码生成器',
        link: '/password-generator',
        state: 'hot',
        type: 'text',
        isCollect:false,
    },
    {
        name: '舔狗日记',
        link: '/simp-words',
        state: 'recommend',
        type: 'text',
        isCollect:false,
    },
    {
        name: '心灵毒鸡汤',
        link: '/soul-words',
        state: "",
        type: 'text',
        isCollect:false,
    },
    {
        name: 'MBTI测试',
        link: '/mbti-test',
        state: 'new',
        type: 'other',
        isCollect:false,
    }
]