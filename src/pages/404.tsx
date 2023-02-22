import MyCard from "@/components/my-card";
import {Button, Result} from "antd";

export default function BingImage() {
    return (
        <div>
            <MyCard>
                <Result
                    status="404"
                    title="404"
                    subTitle="访问的页面不存在"
                    extra={<Button type="primary">Back Home</Button>}
                />
            </MyCard>
        </div>
    );
}
