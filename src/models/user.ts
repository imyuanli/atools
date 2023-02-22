import {get_user_info} from "@/service/service";

export default {
    namespace: 'user',
    state: {
        userInfo: null,
    },
    reducers: {
        setUserInfo(state: any, {payload}: any) {
            state.userInfo = payload
            return state
        },
    },
    effects: {
        * getUserInfo({payload}: any, {put, call}: any) {
            // @ts-ignore
            const res:any = yield call(get_user_info);
            yield put({type: 'setUserInfo', payload: res})
        },
    },
    subscriptions: {
        setup({ dispatch}:any) {
            dispatch({type: 'getUserInfo'});
        },
        setupHistory({dispatch,history}:any){
            history.listen(({location}:any) => {
                if(location.pathname == '/user'){
                    dispatch({type: 'getUserInfo'});
                }
            })
        }
    }
};
