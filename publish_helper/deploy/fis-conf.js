fis.set('build-config', {
    "cdnDomain": "http://res.imtt.qq.com", // cdn域名
    "appname": "cloud_based_adp", // 应用名
    "channel": "front-end-project", // 频道类型
    "real_dir": "real" // 正式目录
});

// 正式css文件发布
fis.media('real-css-deploy').match('/css/*.css', {
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
        "path": "/" + fis.get("build-config").channel + "/" + fis.get("build-config").real_dir + "/css"
    })
});

// 正式js文件发布
fis.media('real-js-deploy').match('/js/*.js', {
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
        "path": "/" + fis.get("build-config").channel + "/" + fis.get("build-config").real_dir + "/js"
    })
});