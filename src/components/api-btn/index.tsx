import {Button} from "antd";

export default function ApiBtn(props: any) {
    const {text, func} = props
    return (
        <div className={'flex w-full justify-end items-center'}>
            <Button
                type={'primary'}
                size={'large'}
                onClick={func}
            >
                {text}
            </Button>
        </div>
    );
}
