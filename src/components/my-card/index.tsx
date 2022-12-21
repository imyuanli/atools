import './index.css'

export default function MyCard(props: any) {
    const {title, icon, children, isIndex} = props
    const style = 'grid gap-4 grid-cols-2 md:grid-cols-4'
    return (
        <div
            className={`my-16 pt-12 p-9 shadow-lg bg-white rounded-lg relative border-2 ${isIndex ? style : ""}`}>
            {
                title &&
                <div className={'card-title text-base'}>
                    {icon && icon}
                    <div className={'ml-2'}>{title}</div>
                </div>
            }
            {children}
        </div>
    );
}
