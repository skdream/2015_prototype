/**
 * Created by brianzheng on 2015/9/5.
 */
var UA = window.navigator.userAgent;
/**
 * 场景检查
 * qb: QQ浏览器内
 * qq: 手机QQ内
 * wx: 微信内
 * other: 其他应用（不可预知的情况较多，暂时不进行分类）
 */
var isQb = /mqqbrowser/ig.test(UA);
var pageStatus = 'other'
// 是否在手机QQ内
if (/mobile.*qq/gi.test(UA) === true) {
    pageStatus = "qq";
}
// 是否在微信内
else if (/micromessenger/gi.test(UA) === true) {
    pageStatus = 'wx';
}
// 是否在QQ浏览器内
else if (isQb) {
    pageStatus = "qb";
}
// 在其他应用
else {
    pageStatus = 'other';
}
module.exports = pageStatus;