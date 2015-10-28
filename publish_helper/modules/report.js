/**
 * 统计上报与异常上报
 * module.exports = Report;
 * Report.log("http://adsense.imtt.qq.com/ajax", {
 *     "r": sID,
 *     "ch": ch,
 *     "src": src
 * });
 * Created by brianzheng on 2015/7/18.
 */
var Util = require("./util");
var Report;
var imgStack = {};

Report = {
    /* 底层发日志的函数 */
    request: function(url) {
        if(url) {
            var timeStamp = new Date().getTime();
            var img = new Image();
            /* 添加随机字符串，避免被 cache 住。*/
            url += '&rand=' + ( timeStamp + Math.random() );
            imgStack['--IMAGE' + timeStamp] = img;
            img.onload = img.onerror = img.onabort = function(){
                img.onload = img.onerror = img.onabort = null;
                imgStack['--IMAGE' + timeStamp] = null;
                img = null;
            };
            img.src = url;
        }
    },
    /* 对 request 的一次封装，用来向任意服务器发日志*/
    log : function(data) {
        var baseUrl = (data && data.url);
        var resultParams;
        var index = baseUrl.indexOf('?');
        if (index != -1) {
            resultParams = ("&" + Util.toParams(data));
        } else {
            resultParams = ("?" + Util.toParams(data));
        }
        this.request(baseUrl + resultParams);
    },
    error: function(data) {
        console.error && console.error(data) || console.log(data);
        this.log(data);
    }
};
module.exports = Report;