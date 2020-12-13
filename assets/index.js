let music     = document.getElementById('bgm_player');
let music_btn = document.getElementById('btn_music');

$(document).ready(function () {
    // #findit
    // #plane
    // #paper

    let href =  window.location.href;
    let videoPlayer = videojs('player');
    // music.pause();
    videoPlayer.pause();
    videoPlayer.on('play', () => { 
      music.pause();
      music_btn.src = 'assets/pause.gif'; 
    });
    
    $("#btn_music").click(function(e){
        if (music.paused){
            music.play();
            music_btn.src = 'assets/play.gif';
        }
        else{
            music.pause();
            music_btn.src = 'assets/pause.gif'; 
        }
    });

    function downloadFile (downloadUrl, fileName) {
        // 创建表单
        const formObj = document.createElement('form');
        formObj.action = downloadUrl;
        formObj.method = 'get';
        formObj.style.display = 'none';
        // 创建input，主要是起传参作用
        const formItem = document.createElement('input');
        formItem.value = fileName; // 传参的值
        formItem.name = 'fileName'; // 传参的字段名
        // 插入到网页中
        formObj.appendChild(formItem);
        document.body.appendChild(formObj);
        formObj.submit(); // 发送请求
        document.body.removeChild(formObj); // 发送完清除掉
    }
  
    $("#btnDownloadExcel").click(function(e){
        let fileName = '寻找同心同行大家人活动推荐表.xlsx';
        alert(fileName);
        let url = "http://everyinsurance.producer100.com/assets/%E2%80%9C%E5%AF%BB%E6%89%BE%E5%90%8C%E5%BF%83%E5%90%8C%E8%A1%8C%E5%A4%A7%E5%AE%B6%E4%BA%BA%E2%80%9D%E6%B4%BB%E5%8A%A8%E6%8E%A8%E8%8D%90%E8%A1%A8.xlsx";
        // window.open(url);
        // location.href = url;
        downloadFile(url,fileName)
        return false;
    });

    $.getJSON({
        url:`http://wechat.producer100.com?href=${href}`,
        success:function(result){
            
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                beta: true,//设置为true可调用未开放的js接口
                appId: result.app_id, // 必填，公众号的唯一标识
                timestamp: result.timestamp, // 必填，生成签名的时间戳
                nonceStr: result.nonce_str, // 必填，生成签名的随机串
                signature: result.signature,// 必填，签名
                jsApiList: [ 'checkJsApi',
                            'updateTimelineShareData',
                            'onMenuShareAppMessage',
                            'onMenuShareQQ',
                            'onMenuShareWeibo',
                            'hideMenuItems',
                            'showMenuItems',
                            'hideAllNonBaseMenuItem',
                            'showAllNonBaseMenuItem',
                            'onRecordEnd',
                            'openLocation',
                            'getLocation',
                            'hideOptionMenu',
                            'showOptionMenu',
                            'chooseImage',
                            'uploadImage',
                            'previewImage',
                            'closeWindow',
                            'scanQRCode',
                            'chooseWXPay']
            });
            
            wx.error(function(res){
                console.log(res);
                alert(JSON.stringify(res));
            // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
            });

            let shareConf = {
                title : '寻找同心同行大家人开始啦！',//分享标题
                desc : '感谢你 看见你',//分享描述
                link : 'http://everyinsurance.producer100.com/',//分享链接
                imgUrl : 'http://everyinsurance.producer100.com/assets/share.jpg', //分享图标
                type : 'link',//分享类型，music、video或link，不填默认为link
                dataUrl : '',//如果type是music或video，则要提供数据链接，默认为空
                success : function(e){
                    //分享成功之后执行的操作
                    console.log("success share",e);
                },
                cancel:function(e){
                    //用户取消分享后执行的回调函数
                    console.log("error share",e);
                }
            };

            //因为我们需要调用相关接口，所以我们把所有操作放在，ready方法里面
            wx.ready(function(){
                //分享到朋友圈
                wx.onMenuShareAppMessage(shareConf);
                //分享到qq
                wx.onMenuShareQQ(shareConf);
                //分享到腾讯微博
                wx.onMenuShareWeibo(shareConf);
                //分享到腾讯微博
                wx.updateTimelineShareData(shareConf);
            });
        }
    });

 
});
