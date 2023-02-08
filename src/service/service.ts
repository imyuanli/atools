import request from './request'
import BASE_URL from './base_url'

export async function get_dog_diary() {
    return request.get(BASE_URL + `/get_dog_diary/`)
}

export async function get_short_url(payload: any) {
    return request.post(BASE_URL + `/get_short_url/`, payload)
}

export async function get_short_revert(payload: any) {
    return request.post(BASE_URL + `/get_short_revert/`, payload)
}
