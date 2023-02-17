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
        * getUserInfo(_action: any, {put}: any) {
            const payload = {name: 123,role:'2'}
            yield put({type: 'setUserInfo', payload})
        },
    },
    subscriptions: {    // 该选项中的函数自定义命名?函数的触发时机是初始时，主要用来初始化模块状态或者做一些准备性工作
        // 注意：subscription 需要返回 unlisten 方法，用于取消数据订阅。
        setup({history, dispatch}: any) {
            dispatch({type: 'getUserInfo'});
        },
    },
};
