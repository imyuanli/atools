import {useNavigate} from "@@/exports";
import {useEffect} from "react";
import withAuthRole from "@/hocs/withAuthRole";

function Console() {
    const navigate = useNavigate()
    useEffect(() => {
        navigate('/console/tool')
    }, [])
}

export default withAuthRole(Console)