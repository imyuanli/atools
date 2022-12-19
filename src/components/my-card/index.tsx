import './index.css'

export default function MyCard(props: any) {
    const {title, icon, children} = props
    return (
        <div
            className={'my-12 pt-9 p-6 grid gap-4 grid-cols-2 shadow-lg bg-white rounded-lg relative border-2 md:grid-cols-4'}>
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
