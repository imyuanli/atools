import request from './request'
import BASE_URL from './base_url'

//登录
export async function get_login_code(payload: any) {
    return request.post(BASE_URL + `get_login_code/`, payload)
}

export async function get_login(payload: any) {
    return request.post(BASE_URL + `get_login/`, payload)
}

export async function get_user_info(payload: any) {
    return request.get(BASE_URL + `get_user_info/`, payload)
}

//控制台
export async function get_all_tools() {
    return request.get(BASE_URL + `get_all_tools/`)
}

export async function get_no_delete_tools() {
    return request.get(BASE_URL + `get_no_delete_tools/`)
}

export async function insert_new_tool(payload: any) {
    return request.post(BASE_URL + `insert_new_tool/`, payload)
}

export async function update_tool(payload: any) {
    return request.post(BASE_URL + `update_tool/`, payload)
}

//工具接口
export async function get_dog_diary() {
    return request.get(BASE_URL + `get_dog_diary/`)
}

export async function get_short_url(payload: any) {
    return request.post(BASE_URL + `get_short_url/`, payload)
}

export async function get_short_revert(payload: any) {
    return request.post(BASE_URL + `get_short_revert/`, payload)
}

export async function get_soul_message() {
    return request.get(BASE_URL + `get_soul_message/`)
}

export async function get_mbti_question_list(payload: any) {
    return request.get(BASE_URL + `get_mbti_question_list/`, payload)
}


export async function get_mbti_result(payload: any) {
    return request.post(BASE_URL + `get_mbti_result/`, payload)
}


