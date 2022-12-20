import {
    AppstoreOutlined,/*商品*/
} from '@ant-design/icons';

export const ROUTERS = [
    {
        title: '常用工具',
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
        icon: <AppstoreOutlined/>
    }
]