/**
 * Created by brianzheng on 2015/9/5.
 */
var decodeJson = require('./decode');
var report = require("./report");
var config = require("./jsconfig");
var mttbrowser = require("./mttbrowser");
var template = require("./lib/template");
var exposure = require("./exposure");
var adBlock = null;
var adController = {
    decode: function(opts) {
        decodeJson.decodeObj(opts.common);
        //decodeJson.decodeArr(opts.adText);
        decodeJson.decodeArr(opts.adBtn);
        opts.topicTitle = decodeURIComponent(opts.topicTitle);
    },
    render: function(opts) {
        var that = this;
        setTimeout(function() {
            Zepto("body").append("<div id='g_BPD_ad_block'></div>");
            adBlock = Zepto("#g_BPD_ad_block");
            var html = template("cap_base_tpl", opts);
            adBlock.html(html);
            //that.closeAd(opts);
            exposure.statisticsExposure(adBlock, opts); // tbs夹带曝光
            that.redirectPage();
        },2500);
    },
    // 跳转规则
    redirectPage: function() {
        var $capOpenQb = Zepto(".cap_open_qb");
        var datalink = $capOpenQb.attr("data-link");
        $capOpenQb.on("click", function() {
            mttbrowser.openQB($capOpenQb, datalink);
        })
    },
    // 关闭浮层
    //closeAd: function(opts) {
    //    Zepto("#g_BPD_ad_blockClose").on("click", function(e) {
    //        e.stopPropagation();
    //        e.preventDefault();
    //        var tmpObj = {
    //            "url": config.baseUrl,
    //            "action": "close"
    //        };
    //        var dataExt = Zepto(this).attr("data-recommander");
    //        dataExt = eval('(' + dataExt + ')');
    //        // 二次对象聚合
    //        Zepto.extend(tmpObj, dataExt);
    //        Zepto.extend(tmpObj, opts.common);
    //        console.log(opts.common);
    //
    //        report.log(tmpObj);
    //        adBlock.hide();
    //    });
    //},
    init: function(opts) {
        if (!opts.isRemind && opts.isAdPush) {
            this.decode(opts);
            // 模板渲染与节点监听
            this.render(opts);
        }
    }
}
module.exports = adController;
