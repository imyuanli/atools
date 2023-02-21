import Title from "@/components/title";
import MyCard from "@/components/my-card";
import {Button, Tooltip} from "antd";
import {Link} from "@umijs/renderer-react";
import React from "react";

export default function RouterBtn(props: any) {
    const {router} = props
    return (
        <>
            {
                router?.state === 'error' ?
                    <Tooltip title="维护中，禁止访问">
                        <div className={'relative'}>
                            <Button
                                className={`rounded-md w-full `}
                                size={'large'}
                                style={{
                                    cursor:"not-allowed",
                                }}
                            >
                                {router?.name}
                            </Button>
                            <div className={`badge ${router?.state}`}/>
                        </div>
                    </Tooltip>
                    :
                    <Link
                        to={router?.link}
                        className={'relative block'}
                    >
                        <Button
                            className={`rounded-md w-full`}
                            size={'large'}
                        >
                            {router?.name}
                        </Button>
                        <div className={`badge ${router?.state}`}/>
                    </Link>
            }
        </>
    );
}
