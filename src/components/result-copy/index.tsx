import Copy from "@/components/copy";

export default function ResultCopy(props: any) {
    const {result} = props
    return (
       <div className={'relative'}>
           <div className={'bg-color-op p-3 rounded-md mt-2 overflow-auto'}>
               <div className={'break-keep'}>{result}</div>
               <Copy value={result}/>
           </div>
       </div>
    );
}
