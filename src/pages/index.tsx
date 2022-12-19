import {AppstoreOutlined, SearchOutlined, UserOutlined} from "@ant-design/icons";
import {Button, Input} from "antd";
import {Link} from "@umijs/renderer-react";
import Title from "@/components/title";
import './index.css'

export default function Index() {
    return (
        <div>
            <Title/>
            <Input
                placeholder="输入关键字搜索"
                prefix={<SearchOutlined className="site-form-item-icon"/>}
                size={'large'}
            />
            <div className={'my-12 pt-9 p-6 grid gap-4 grid-cols-4 shadow-lg bg-white rounded-lg relative border-2'}>
                <div className={'card-title'}>
                    <AppstoreOutlined className={'mr-1'}/>
                    <span className={'font-bold'}>常用工具</span>
                </div>
                <Link to="/docs" className={'inline-grid'}>
                    <Button size={'large'}>
                        密码生成器
                    </Button>
                </Link>
                <Link to="/docs" className={'inline-grid'}>
                    <Button size={'large'}>
                        密码生成器
                    </Button>
                </Link>
                <Link to="/docs" className={'inline-grid'}>
                    <Button size={'large'}>
                        密码生成器
                    </Button>
                </Link>
                <Link to="/docs" className={'inline-grid'}>
                    <Button size={'large'}>
                        密码生成器
                    </Button>
                </Link>
                <Link to="/docs" className={'inline-grid'}>
                    <Button size={'large'}>
                        密码生成器
                    </Button>
                </Link>
                <Link to="/docs" className={'inline-grid'}>
                    <Button size={'large'}>
                        密码生成器
                    </Button>
                </Link>
            </div>
            <div className={'my-12 pt-9 p-6 grid gap-4 grid-cols-4 shadow-lg bg-white rounded-lg relative border-2'}>
                <div className={'card-title'}>
                    <AppstoreOutlined className={'mr-1'}/>
                    <span className={'font-bold'}>常用工具</span>
                </div>
                <Link to="/docs" className={'inline-grid'}>
                    <Button size={'large'}>
                        密码生成器
                    </Button>
                </Link>
                <Link to="/docs" className={'inline-grid'}>
                    <Button size={'large'}>
                        密码生成器
                    </Button>
                </Link>
                <Link to="/docs" className={'inline-grid'}>
                    <Button size={'large'}>
                        密码生成器
                    </Button>
                </Link>
            </div>
            <div className={'my-12 pt-9 p-6 grid gap-4 grid-cols-4 shadow-lg bg-white rounded-lg relative border-2'}>
                <div className={'card-title'}>
                    <AppstoreOutlined className={'mr-1'}/>
                    <span className={'font-bold'}>常用工具</span>
                </div>
                <Link to="/docs" className={'inline-grid'}>
                    <Button size={'large'}>
                        密码生成器
                    </Button>
                </Link>
                <Link to="/docs" className={'inline-grid'}>
                    <Button size={'large'}>
                        密码生成器
                    </Button>
                </Link>
                <Link to="/docs" className={'inline-grid'}>
                    <Button size={'large'}>
                        密码生成器
                    </Button>
                </Link>
            </div>
        </div>
    );
}
