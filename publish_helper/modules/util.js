/**
 * Created by brianzheng on 2015/9/5.
 */
/*
 * 检测对象是否是空对象(不包含任何可读属性)。
 * 方法只既检测对象本身的属性，不检测从原型继承的属性。
 */
var util = {};
util = {
    isOwnEmpty: function (obj) {
        for (var name in obj) {
            if (obj.hasOwnProperty(name)) {
                return false;
            }
        }
        return true;
    },
    /**
     * 将 URL 参数格式转化成对象。依赖 Array.prototype.forEach() 函数
     *
     * @for exports.util
     * @method toObject
     * @param {String} params 要转换的 key-value 字符串，默认分隔符为 &
     * @return {Object}
     */
    toObject: function (params) {
        var _result = {}, _pairs, _pair, _key, _value;

        if (typeof params === 'object') {
            return params;
        } else if (params === '') {
            return {};
        }

        _pairs = String(params).replace('?', '').replace('#', '').split('&');

        _pairs.forEach(function(keyVal) {
            _pair = keyVal.split('=');
            _key = _pair[0];
            _value = _pair.slice(1).join('=');
            _result[decodeURIComponent(_key)] = decodeURIComponent(_value);

        });

        return _result;
    },
    /**
     * 将对象转化成 URL 参数格式
     *
     * @for exports.util
     * @method toParams
     * @param {Object} object 要转换的对象，默认分隔符为 &
     * @return {String} 返回字符串，如：a=1&b=2
     */
    toParams: function (object) {
        var arr = [],
            type,
            value;

        if (typeof object === 'string') {
            return object;
        }

        for (var key in object) {
            if (object.hasOwnProperty(key)) {
                value = object[key];
                type = typeof value;

                if (type === 'object' || type === 'array') {
                    value = JSON.stringify(value);
                }

                arr.push(key + "=" + encodeURIComponent(value));
            }
        }

        return arr.join("&");
    }
};
module.exports = util;