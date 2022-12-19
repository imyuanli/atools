import './index.css'

export default function MyCard(props: any) {
    const {title, icon, children, isIndex} = props
    const style = 'grid gap-4 grid-cols-2 md:grid-cols-4'
    return (
        <div
            className={`my-12 pt-9 p-6 shadow-lg bg-white rounded-lg relative border-2 ${isIndex ? style : ""}`}>
            {
                title &&
                <div className={'card-title'}>
                    {icon}
                    <div className={'font-bold ml-2'}>{title}</div>
                </div>
            }
            {children}
        </div>
    );
}
