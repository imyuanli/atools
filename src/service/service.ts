import request from './request'
import BASE_URL from './base_url'

//登录
export async function get_login_code(payload: any) {
    return request.post(BASE_URL + `get_login_code/`, payload)
}

export async function get_login(payload: any) {
    return request.post(BASE_URL + `get_login/`, payload)
}

export async function get_user_info() {
    return request.get(BASE_URL + `get_user_info/`)
}

export async function update_user_name(payload: any) {
    return request.post(BASE_URL + `update_user_name/`, payload)
}


//控制台
export async function get_tools_list() {
    return request.get(BASE_URL + `get_tools_list/`)
}

export async function update_tool_views(payload: any) {
    return request.post(BASE_URL + `update_tool_views/`, payload)
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

export async function get_one_answer() {
    return request.get(BASE_URL + `get_one_answer/`)
}

export async function get_one_word() {
    return request.get(BASE_URL + `get_one_word/`)
}

export async function get_comfort_word() {
    return request.get(BASE_URL + `get_comfort_word/`)
}

export async function get_joke() {
    return request.get(BASE_URL + `get_joke/`)
}

export async function get_url_whois(payload?: any) {
    return request.get(BASE_URL + `get_url_whois/`, payload)
}

export async function get_translate_result(payload?: any) {
    return request.post(BASE_URL + `get_translate_result/`, payload)
}

