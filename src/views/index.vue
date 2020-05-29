<template>
  <div class="main">
    <img src="../../static/img/logo.png" alt class="logoImg" />
    <img src="../../static/img/text.png" alt class="textImg" />
    <span class="desc">全网正版书籍海量资源 无限阅读</span>
    <div class="downBtn" @click="downLoad">立即下载</div>
    <div class="tip">
      <span>已有APP?</span>
      <span class="open" @click="openTuer">立即打开</span>
    </div>
  </div>
</template>
<script>
let timer = null;
export default {
  name: "Home",
  data() {
    return {
      url:'http://39.101.217.117/app-release.apk',
      openUrl:'sreader://com.foin.sreader/open'
    };
  },
  mounted() {
    //this.openTuer();
    let {userId}=this.$route.query
    if(userId){
      this.openUrl=this.openUrl+'?userId='+userId
    }
    console.log(this.openUrl)
  },
  methods: {
    downLoad(){
        !document.webkitHidden &&
                  !document.hidden &&
                  void (location.href = this.url);
    },
    openTuer() {
      if (this.isBlackApp()) {
        // 头部APP让网页显示提示在浏览器中打开
        this.$toast('请复制网址到手机浏览器打开')
      } else {
        // 不是头部APP就直接打开
        this.openApp();
      }
    },
    openApp() {
      //这里需要有个安卓和ios平台的判断分别取不同的SchemeURL
      this.jumpApp(this.openUrl); //此函数负责打开APP的,scheme协议地址由安卓端跟ios端提供
      this.noApp(); //此函数负责如果没有打开APP或没有安装APP时跳转的地址处理
    },
    isBlackApp() {
      var u = navigator.userAgent.toLowerCase();
      return (
        /micromessenger/i.test(u) ||
        u.indexOf("weibo") > -1 ||
        u.indexOf("qq") > -1 ||
        u.indexOf("mqqbrowser") > -1
      );
    },
    jumpApp(t) {
      try {
        var e = navigator.userAgent.toLowerCase(),
          n = e.match(/cpu iphone os (.*?) like mac os/);
        if (
          ((n = null !== n ? n[1].replace(/_/g, ".") : 0), parseInt(n) >= 9)
        ) {
          window.location.href = t;
        } else {
          var r = document.createElement("iframe");
          (r.src = t), (r.style.display = "none"), document.body.appendChild(r);
        }
      } catch (e) {
        window.location.href = t;
      }
    },
    noApp() {
      //这里需要有个安卓和ios平台的判断分别取不同的下载地址
      var u = navigator.userAgent,
        app = navigator.appVersion;
      //var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1;
      var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      if (isIOS) {
        this.$toast('暂不支持IOS系统')
      }else{
          var t = Date.now(),
          r = this.url;
          timer = setTimeout(function() {
            return Date.now() - t > 2200
              ? (clearTimeout(timer), !1)
              : !document.webkitHidden &&
                  !document.hidden &&
                  void (location.href = r);
          }, 2000);
      }
    }
  }
};
</script>
<style scoped>
.main {
  background: url("../../static/img/bg.png");
  background-size: 100% 100%;
  height: 100%;
  position: fixed;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.logoImg {
  width: 73px;
  height: 73px;
  margin-top: 75px;
  margin-bottom: 12px;
}
.textImg {
  width: 62px;
  height: 19px;
  margin-bottom: 26px;
}
.desc {
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  opacity: 0.76;
}
.downBtn {
  position: fixed;
  bottom: 89px;
  left: 50%;
  transform: translateX(-50%);
  width: 180px;
  height: 44px;
  line-height: 44px;
  text-align: center;
  background: rgba(77, 95, 210, 1);
  border-radius: 22px;
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: bold;
  color: rgba(255, 255, 255, 1);
}
.tip {
  position: fixed;
  bottom: 58px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  display: flex;
  align-items: center;
}
.open {
  color: #54cefb;
}
</style>>

