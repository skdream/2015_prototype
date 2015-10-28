/**
 * Created by brianzheng on 2015/9/5.
 */
/**
 * Created by brianzheng on 2015/8/5.
 */
var Report = require('./report');
var Config = require('./jsconfig');
var decode = {};
decode = {
    /**
     * 数组内部字段解码
     */
    decodeArr: function(params) {
        if (Zepto.isArray(params)) {
            for (var i = 0; i < params.length; i++) {
                var elem = params[i];
                if (Zepto.isPlainObject(elem)) {
                    this.decodeObj(elem);
                } else {
                    params[i] = decodeURIComponent(elem);
                }
            }
        }
    },
    /**
     * 对象内部字段解码
     */
    decodeObj: function(params) {
        if (Zepto.isPlainObject(params)) {
            for (var key in params) {
                if (params.hasOwnProperty(key)) {
                    try {
                        params[key] = decodeURIComponent(params[key]);
                    } catch (e) {
                        params[key] = params[key];
                        Report.error({
                            url: Config.baseUrl,
                            action: "error",
                            message: "decodeObj-" + key + "-failed"
                        });
                    }
                }
            }
        }
    }
};
module.exports = decode;