import {useNavigate} from "@@/exports";
import {useEffect} from "react";

export default function Console() {
    const navigate = useNavigate()
    useEffect(() => {
        navigate('/console/tool')
    }, [])
}
