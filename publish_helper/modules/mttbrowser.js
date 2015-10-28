/**
 * Created by brianzheng on 2015/9/16.
 */
var loadJs = require("./loadJs");
var config = require("./jsconfig");
var report = require("./report");
var MttBrowser = {
    // 调起QB并跳转
    runQBWithUrl: function(link) {
        var apkInfo = {
            "packagename": config.qbapk,
            "url": link,
            "channelid": config.qqapk, // 产品申请
            "posid": config.posId // 产品申请
        };
        alert(JSON.stringify(apkInfo));
        try {
            alert('tbs 调起qb');
            window.tbsJs.packages().runApk(JSON.stringify(apkInfo));
        } catch (e) {
            alert('mttbrowser协议调起');
            report.log(
                {
                    action: "runQBWithUrl",
                    url: config.baseUrl
                }
            );
            setTimeout(function() {
                location.href = "mttbrowser://url=" + link + ",packagename=" + config.qqapk + ",ad_params=gdt|topic|3111";
            }, 300);
        }
    },
    // 获取tbs版本
    getTbsVersion: function() {
        var ua = navigator.userAgent;
        // tbs 参考ua ，例如TBS/025436:表示TBS1.3版本
        // Mozilla/5.0 (Linux; U; Android 4.1.1; zh-cn; GT-N7100 Build/JRO03C) AppleWebKit/533.1 (KHTML, like Gecko)Version/4.0 MQQBrowser/5.4 TBS/025410 Mobile Safari/533.1 MicroMessenger/6.1.0.57_r1024329.540 NetType/WIFI
        var reg = /TBS\/(\d{6})/;
        var res = reg.exec(ua);
        return res && Math.round(res[1]);
    },
    // 调起简版QB并跳转
    runSimpleQBWithUrl: function(link) {
        var tbsVersion = this.getTbsVersion();
        alert(tbsVersion);
        if (tbsVersion > 25464) {
            loadJs(config.tbsapi, function() {
                var params = {
                    url: link,
                    "packagename": config.qbapk,
                    "channelid": config.qqapk, // 产品申请
                    "posid": config.posId // 产品申请
                };
                try {
                    alert('tbs midpage');
                    tbs.midpage.openMidPage(params, function(info) {
                        console.log(info);
                    });
                } catch (e) {
                    alert('mttbrowser midpage');
                    report.log(
                        {
                            action: "runSimpleQBWithUrl",
                            url: config.baseUrl
                        }
                    );
                    setTimeout(function() {
                        location.href = "mttbrowser://url=" + link + ",packagename=" + config.qqapk + ",ad_params=gdt|topic|15";
                    }, 300);
                }
            });
        } else {
            report.log(
                {
                    action: "tbsVersion<25464",
                    url: config.baseUrl
                }
            );
            setTimeout(function() {
                location.href = link;
            }, 300);
        }
    },
    openQB: function(dom, link) {
        var that = this;
        loadJs(config.qqapi, function() {
            mqq.app.isAppInstalled(config.qbapk, function(result) {
                var isQB = result ? true : false;
                if (isQB) {
                    that.runQBWithUrl(link);
                } else {
                    that.runSimpleQBWithUrl(link);
                }
            });
        });
    }
};
module.exports = MttBrowser;