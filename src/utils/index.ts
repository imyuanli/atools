export const getPercentage = (num: any, total: any) => {
    if (num == 0 || total == 0) {
        return 0;
    }
    return Math.round(num / total * 10000) / 100.00  // 小数点后两位百分比
}


//渐变色
const randum = function (max: any) { //随机数
    return Math.round(Math.random() * max);
}
const hexify = function (x: any) { //转换16进制
    return ('0' + parseInt(x).toString(16)).slice(-2);
}
const randex = function () { //随机16进制色彩值
    return '#' + hexify(randum(255)) + hexify(randum(255)) + hexify(randum(255));
};
export const getBlender = function () { //随机渐变
    if (!!Math.round(Math.random())) {
        return 'radial-gradient(circle at ' + randum(100) + '% ' + randum(100) + '%, ' + randex() + ', ' + randex() + ')';
    } else {
        return 'linear-gradient(' + randum(360) + 'deg, ' + randex() + ', ' + randex() + ')';
    }
};
