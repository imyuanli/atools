import {
    AppstoreOutlined, ToolOutlined, FileImageOutlined, FontSizeOutlined
} from '@ant-design/icons';

export const ROUTERS = [
    {
        title: '图片工具',
        router: [
            {
                name: '必应壁纸',
                value: '/bing-image',
                state: 'error'
            },
        ],
        icon: <FileImageOutlined/>
    },
    {
        title: '文本工具',
        router: [
            {
                name: '密码生成器',
                value: '/password-generator',
                state: 'hot'
            },
            {
                name: '舔狗日记',
                value: '/simp-words',
                state: 'recommend'
            },
            {
                name: '心灵毒鸡汤',
                value: '/soul-words',
            }
        ],
        icon: <FontSizeOutlined/>
    },
    {
        title: '其他工具',
        router: [
            {
                name: 'MBTI测试',
                value: '/mbti-test',
                state: 'new'
            },
        ],
        icon: <ToolOutlined/>
    },
]