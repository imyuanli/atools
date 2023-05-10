import {get_tools_list} from "@/service/service";

export default {
    namespace: 'tools',
    state: {
        toolArr: null,
    },
    reducers: {
        setToolArr(state: any, {payload}: any) {
            state.toolArr = payload
            return state
        },
    },
    effects: {
        * getAllTools({payload}: any, {put, call}: any) {
            try {
                // @ts-ignore
                const res: any = yield call(get_tools_list);
                yield put({type: 'setToolArr', payload: res})
            } catch (e) {
                yield put({type: 'setToolArr', payload: []})
            }
        },
    },
    subscriptions: {
        setup({dispatch}: any) {
            dispatch({type: 'getAllTools'});
        }
    }
};
