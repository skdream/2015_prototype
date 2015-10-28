// 过滤deploy内部的js文件
fis.match('deploy/*', {
    release: false
});

fis.set('build-config', {
    "cdnDomain": "http://res.imtt.qq.com", // cdn域名
    "appname": "cloud_based_adp", // 应用名
    "channel": "front-end-project", // 频道类型
    "test_dir": "test", // 测试目录
    "real_dir": "real" // 正式目录
});
fis.set('project.md5Length', 16);

// 测试url
fis.set('test_url', fis.get('build-config').cdnDomain
    + '/'
    + fis.get('build-config').appname
    + '/'
    + fis.get('build-config').channel
    + '/'
    + fis.get('build-config').test_dir);

// 测试css文件编译归档
fis.media('test').match("/static/css/all_common.css", {
    release: "css/all_common",
    domain: fis.get("test_url")
});

// 测试js文件编译归档
fis.media('test').match('/static/js/bundle.js', {
    release: "js/bundle",
    domain: fis.get("test_url")
});

// 测试css文件发布
fis.media('test-css-deploy').match('/static/css/*.css', {
    deploy: fis.plugin('wsd-cdn-upload', {
        //如果配置了uploadurl，fis会把文件逐个post到cdn上
        "uploadurl": 'http://inner.up.cdn.qq.com:8080/uploadserver/uploadfile.jsp',
        // rtx名字
        "username": "brianzheng",
        // 找cdn运维申请
        "token": "F9E283D4D5972FDC4E025C42DAA40603",
        // 找cdn运维申请
        "appname": "cloud_based_adp",
        "base": "http://res.imtt.qq.com",
        // 上传到cdn平台目标目录
        "path": "/" + fis.get("build-config").channel + "/" + fis.get("build-config").test_dir + "/css"
    })
});

// 测试js文件发布
fis.media('test-js-deploy').match('/static/js/*.js', {
    deploy: fis.plugin('wsd-cdn-upload', {
        //如果配置了uploadurl，fis会把文件逐个post到cdn上
        "uploadurl": 'http://inner.up.cdn.qq.com:8080/uploadserver/uploadfile.jsp',
        // rtx名字
        "username": "brianzheng",
        // 找cdn运维申请
        "token": "F9E283D4D5972FDC4E025C42DAA40603",
        // 找cdn运维申请
        "appname": "cloud_based_adp",
        "base": "http://res.imtt.qq.com",
        // 上传到cdn平台目标目录
        "path": "/" + fis.get("build-config").channel + "/" + fis.get("build-config").test_dir + "/js"
    })
});

// 正式url
fis.set('real_url', fis.get('build-config').cdnDomain
    + '/'
    + fis.get('build-config').appname
    + '/'
    + fis.get('build-config').channel
    + '/'
    + fis.get('build-config').real_dir);

// 正式css文件编译归档
fis.media('real').match("/static/css/all_common.css", {
    release: "css/all_common",
    domain: fis.get("real_url"),
    useHash: true
});

// 正式js文件编译归档
fis.media('real').match('/static/js/bundle.js', {
    release: "js/bundle",
    domain: fis.get("real_url"),
    useHash: true
});

// 发布文件编译到生产工程根目录
fis.media('real').match('/deploy/*.js', {
    release: "fis-conf"
});


//fis.match('*.{css,js}', {
//  useHash: true
//});
//
//fis.match('::packager', {
//  postpackager: fis.plugin('loader', {
//    //allInOne: true
//  })
//});
//
//fis.match('*.{css,less}', {
//  packTo: './static/css/result.css'
//});
//
//fis.match("*.js", {
//  // fis-optimizer-uglify-js插件
//  optimizer: fis.plugin('uglify-js')
//});
//
//fis.match("*.css", {
//  // fis-optimizer-clean-css插件
//  optimizer: fis.plugin('clean-css')
//});
//
//fis.match('::package', {
//  spriter: fis.plugin('csssprites')
//});
//fis.match('*.css', {
//  useSprite: true
//});
