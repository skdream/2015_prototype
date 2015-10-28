/**
 * Created by brianzheng on 2015/9/16.
 */
var report = require("./report");
var config = require("./jsconfig");
var reportNum = 0;
var exposure = {
    /**
     * 获取目标节点距离页面顶部高度
     * @param {HTML Element} [el]
     */
    _getTargetY: function(el) {
        var tp = el.offsetTop;
        if (el.offsetParent) {
            while (el = el.offsetParent) {
                tp += el.offsetTop;
            }
        }
        return tp;
    },
    /**
     * 检查需要懒加载的节点是否进入可视区域
     * @param {HTML Element} [el]
     */
    isBounding: function(el) {
        var scrollY = document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset || 0;//页面滚动条高度
        var seeY = window.innerHeight || document.documentElement.clientHeight;//浏览器可视区域高度
        var targetY = this._getTargetY(el);
        var edge = 1; //计算实际有效曝光的调整系数
        //当目标节点进入可使区域
        if (Math.abs((targetY + edge) - scrollY) < seeY) {
            return true;
        } else {
            return false;
        }
    },
    /**
     * 广告曝光度监控
     */
    statisticsExposure: function(adBlock, dataObj) {
        var that = this;
        window.addEventListener("scroll", function() {
            var isShow = that.isBounding(adBlock[0]);
            if (isShow) {
                reportNum++;
            }
            if (isShow && reportNum == 1) {
                var tmpObj = {};
                Zepto.extend(tmpObj, dataObj.common);
                report.log(
                    Zepto.extend(tmpObj, {
                        action: "exps",
                        url: config.baseUrl
                    })
                );
            }
        }, false);
    }
};
module.exports = exposure;