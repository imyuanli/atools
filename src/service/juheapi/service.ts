import request from "@/service/juheapi/request";

const key = "948f5bcfac5cd6fcb48b3eab6a3061d7"
// const key = "123123"
const BASE_URL = 'http://apis.juhe.cn'

export async function get_mbti_questions(payload?: any) {
    return request.post(BASE_URL + `/fapig/character_test/questions`, {...payload,key})
}