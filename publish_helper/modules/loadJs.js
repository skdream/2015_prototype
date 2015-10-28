/**
 * loadjs加载器
 * // 单个加载
 * loadJs("http://sc.qq.com/a.js", function(data) {
 *     console.log(data);
 * });
 * // 多个加载
 * loadJs(["http://sc.qq.com/a.js", "http://sc.qq.com/b.js"], function(data) {
 *     console.log(data);
 * });
 * Created by brianzheng on 2015/7/18.
 */
var _loadSinglejs = function(url,callback) {
    var head = document.getElementsByTagName("head")[0];
    var script = document.createElement('script');
    script.onload = script.onreadystatechange = script.onerror = function () {
        if (script && script.readyState && /^(?!(?:loaded|complete)$)/.test(script.readyState)) return;
        script.onload = script.onreadystatechange = script.onerror = null;
        script.src = '';
        script.parentNode.removeChild(script);
        script = null;
        callback();
    };
    script.charset = "utf-8";
    script.src = url;
    try {
        head.appendChild(script);
    } catch (exp) {}
};
var loadJs = function(url,callback) {
    if(Object.prototype.toString.call(url)==='[object Array]'){ //是否数组
        this.suc = 0;           //加载计数
        this.len = url.length;  //数组长度
        var a = this;
        for(var i = 0;i < url.length;i++){
            _loadSinglejs(url[i],function(){ a.suc++; if(a.suc == a.len) try{callback();}catch(e){} });
        }
    } else if(typeof(url) == 'string'){
        _loadSinglejs(url,callback);
    }
};
module.exports = loadJs;