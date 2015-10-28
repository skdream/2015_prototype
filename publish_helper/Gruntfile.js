module.exports = function(grunt) {
  var name = '<%= pkg.name %>-v<%= pkg.version%>';

      grunt.initConfig({
        //发布
        publish_helper: {
            options: {
                login:[{
                    "userName": "brianzheng"
                }, {
                    "userName": "teddylin"
                }],
                deploy: {
                    notUploadCDN: true
                },
                taf: [
                    {
                        "taskName": "MTT.TExplorerServer",
                        "timeStamp": "$TimeStamp$",
                        "tasks": [
                            {
                                "serverName": "MTT.TExplorerServer",
                                "serverId": "MTT.TExplorerServer_10.229.135.84",
                                "serverPrefix": "MTT",
                                "serverLiteName": "TExplorerServer",
                                "nodeName": "10.229.135.84",
                                "targetConfigs": [
                                    {
                                        "src": "index.html",
                                        "target": "template.html"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            async: function () {
                console.log('finish');
            }
        }
    });

  grunt.loadNpmTasks('grunt-publish-helper');
  grunt.registerTask('publish', ['publish_helper']);
};
