import Copy from "@/components/copy";

export default function ResultCopy(props: any) {
    const {result} = props
    return (
        <div className={'bg-blue-50 p-4 rounded-lg relative mt-2'}>
            <div className={'break-words'}>{result}</div>
            <Copy value={result}/>
        </div>
    );
}
