import {Button} from "antd";


const ApiBtn = ({text, func}: any) => {
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

export default ApiBtn
