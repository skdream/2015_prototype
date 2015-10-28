/**
 * Created by brianzheng on 2015/9/16.
 */
var report = require("./report");
var config = require("./jsconfig");
var lbs = {
    getPosition: function(callback) {
        try {
            var options = {
                enableHighAccuracy: true
            };
            window.navigator.geolocation.getCurrentPosition(function(position) {
                // 获取当前位置经纬度
                var lng = position.coords.longitude;
                var lat = position.coords.latitude;
                callback && callback({
                    "longitude": lng,
                    "latitude": lat
                });
            }, function() {
                report.log({
                    url: config.baseUrl,
                    action: "getCurrentPosition-fail"
                });
            }, options);
        } catch (e) {
            report.log({
                url: config.baseUrl,
                action: "geolocation-not-found"
            });
        }
    }
};
module.exports = lbs;