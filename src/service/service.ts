import request from './request'
import BASE_URL from './base_url'

export async function get_dog_message() {
    return request.get(BASE_URL + `/get_dog_diary/`)
}
