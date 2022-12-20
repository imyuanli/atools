import {
    AppstoreOutlined, FileImageOutlined,FontSizeOutlined
} from '@ant-design/icons';

export const ROUTERS = [
    {
        title: '图片工具',
        router: [
            {
                name: '必应壁纸',
                value: '/bing-image'
            },
        ],
        icon: <FileImageOutlined />
    },
    {
        title: '文本工具',
        router: [
            {
                name: '密码生成器',
                value: '/password-generator'
            },
            {
                name: '舔狗日记',
                value: '/simp-words'
            }
        ],
        icon: <FontSizeOutlined />
    }
]