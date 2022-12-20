export const getPercentage = (num: any, total: any) => {
    if (num == 0 || total == 0) {
        return 0 ;
    }
    return Math.round(num / total * 10000) / 100.00  // 小数点后两位百分比
}