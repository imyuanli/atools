import {AppstoreOutlined, SearchOutlined, UserOutlined} from "@ant-design/icons";
import {Button, Input} from "antd";
import {Link} from "@umijs/renderer-react";
import Title from "@/components/title";
import './index.css'
import MyCard from "@/components/my-card";

export default function Index() {
    return (
        <div>
            <Title/>
            <Input
                placeholder="输入关键字搜索"
                prefix={<SearchOutlined className="site-form-item-icon"/>}
                size={'large'}
            />
            <MyCard title={'常用工具'} icon={<AppstoreOutlined/>} isIndex={true}>
                <Link to="/password-generator" className={'inline-grid'}>
                    <Button size={'large'}>
                        密码生成器
                    </Button>
                </Link>
            </MyCard>
        </div>
    );
}
