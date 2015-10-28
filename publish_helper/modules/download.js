/**
 * 下载功能
 */
var pageStatus = require("./ua");
var report = require("./report");
var download = {
    /**
     * 获取下载状态
     */
    getDownloadStatus: function(url) {
        var options = {
            "url": url,
            "checkpolicy": 2
        };
        var status;
        if(window.browser && window.browser.download && window.browser.download.getDownloadStatus ){
            status = window.browser.download.getDownloadStatus(options);
        }else{
            alert("Not a QQ browser or version too low.");
        }
        return status;
    },
    start: function() {
        /**
         * 下载功能监听
         */
        var adBlockBtn = Zepto(".cap_read_icon");
        if (pageStatus == "qb") {
            try {
                browser.app.getAppVersion(function(version){
                    if (version >= 6.1) {
                        var dataLink = adBlockBtn.attr("data-link");
                        var info = {
                            "url": dataLink,
                            "checkpolicy": 2, // 2=> 表示按下载url鉴权
                            "needtoast": "false",
                            "needdialog": "false"
                        };
                        var status = that.getDownloadStatus(dataLink);
                        if (status === "TASK_STATUS_COMPLETED") {
                            //alert("下载完成，请在设置面板找到文件下载apk进行安装");
                        } else {
                            adBlockBtn.attr("href", "javascript:;");
                            adBlockBtn.on("click", function (e) {
                                if (window.browser && window.browser.download && window.browser.download.startDownload) {
                                    window.browser.download.startDownload(info);
                                } else {
                                    // 错误上报
                                    report.log({
                                        url: "http://adsense.imtt.qq.com/ajax",
                                        action: "error",
                                        type: "browser api use exception click",
                                        message: e
                                    });
                                }
                            }, false);
                        }
                    }
                });
            } catch (e) {
                // 错误上报
                report.log({
                    url: "http://adsense.imtt.qq.com/ajax",
                    action: "error",
                    type: "browser api use exception",
                    message: e
                });
            }
        }
    }
};
module.exports = download;