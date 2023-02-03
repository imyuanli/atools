import Copy from "@/components/copy";
import * as React from "react";

export default function BaseTransform(props: any) {
    const {name, value} = props
    return (
        <div className="mt-3 p-3 rounded-lg bg-blue-50 relative">
            <div>
                {name && <span>{name}：</span>}
                {value}
            </div>
            <Copy value={value}/>
        </div>

    );
}
