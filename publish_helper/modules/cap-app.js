/**
 * Created by brianzheng on 2015/9/5.
 */
;(function() {
    var Zepto = require("./lib/Zepto.min");
    var jsonObj = require('../test/data');
    var ua = require("./ua");
    var util = require("./util");
    var adController = require("./adController");

    function run(opts) {
        if (util.isOwnEmpty(opts)) {
            opts = jsonObj;
        }
        adController.init(opts);
    }
    window.CAP = window.CAP || {};
    window.CAP.run = run;
})();
