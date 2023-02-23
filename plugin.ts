import {IApi} from 'umi';


export default (api: IApi) => {
    api.modifyHTML(($) => {
        return $;
    });
    api.addHTMLMetas(() => [{name: 'title', content: 'aTools'}]);
    api.addHTMLMetas(() => [{name: 'author', content: '鸢离&bear'}]);
    api.addHTMLMetas(() => [{name: '360-site-verification', content: '98dfcbc9fc7479f4e80113fdea48630d'}]);
    api.addHTMLMetas(() => [{name: 'sogou_site_verification', content: 'iIvM8yMoeB'}]);
    api.addHTMLMetas(() => [{name: 'keywords', content: 'aTools,在线工具,便民工具,站长工具,工具箱,工具站,小工具,在线软件,实用工具,程序员工具,开发人员工具,代码格式化、压缩、加密、解密,下载链接转换,json格式化,正则测试工具,favicon在线制作,字帖工具,中文简繁体转换,迅雷下载链接转换,进制转换,二维码,照片压缩,pdf合并'}]);
    api.addHTMLMetas(() => [{name: 'description', content: 'aTools是个免费且实用的在线工具网站,为大家提供在线的工具,无需下载开箱即用,工具箱,在线工具,开发人员工具,代码格式化,压缩,加密,解密,json格式化,正则测试工具,字帖工具,中文简繁体转换,进制转换,二维码,便民工具,站长工具等功能。'}]);
    api.addHTMLMetas(() => [{name: 'robots', content: 'aTools,在线工具,便民工具,站长工具,工具箱,工具站,小工具,在线软件,实用工具,程序员工具,开发人员工具,代码格式化、压缩、加密、解密,下载链接转换,json格式化,正则测试工具,favicon在线制作,字帖工具,中文简繁体转换,迅雷下载链接转换,进制转换,二维码,照片压缩,pdf合并'}]);
    api.addEntryCodeAhead(() => [`console.log('entry code ahead')`]);
    api.addEntryCode(() => [`console.log('entry code')`]);
    // api.onDevCompileDone((opts) => {
    //     opts;
    //     // console.log('> onDevCompileDone', opts.isFirstCompile);
    // });
    // api.onBuildComplete((opts) => {
    //     opts;
    //     // console.log('> onBuildComplete', opts.isFirstCompile);
    // });
    // api.chainWebpack((memo) => {
    //     memo;
    // });
    // api.onStart(() => {});
    // api.onCheckCode((args) => {
    //     args;
    //     // console.log('> onCheckCode', args);
    // });
};