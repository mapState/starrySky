<template>
  <div class="main">
    <div class="top">
      <img src="../../static/img/logo.png" alt class="logo" />
      <p class="title">星空文学APP</p>
      <span class="btn download" @click="downLoad">下载</span>
      <span class="btn" @click="openTuer">打开</span>
    </div>
    <div class="content">
      <div class="ctitle">{{content.chapterTitle}}</div>
      <div class="ctext">{{content.chapterContent}}</div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "Home",
  data() {
    return {
      detail: {},
      list: [],
      bookUrl: "sreader://com.foin.sreader/open",
      chapterUrl: "sreader://com.foin.sreader/open",
      url: "http://39.101.217.117/app-release.apk", //下载apk
      content: {}
    };
  },
  mounted() {
    //base64 = new base.Base64();
    let query = this.$route.query;
    // query.title = decodeURI(query.title);
    // query.content = decodeURI(query.content);
    this.content = query;
    console.log(this.content);
    let { bookId, chapterIndex, shareId } = this.$route.query;
    if (shareId) {
      this.getContent(shareId);
    }else{
      this.$toast("未获取到shareId");
    }
    if (bookId) {
      this.bookUrl =
        "sreader://com.foin.sreader/open?bookId=" +
        bookId +
        "&chapterIndex=" +
        chapterIndex;
      this.chapterUrl =
        "sreader://com.foin.sreader/open?bookId=" +
        bookId +
        "&chapterIndex=" +
        chapterIndex;
    } else {
      this.$toast("未获取到bookId");
    }
  },
  methods: {
    getContent(shareId) {
      this.axios
        .get("/getShare", {
          params: {
            shareId
          }
        })
        .then(res => {
          console.log(res);
          this.content = res.data;
        });
    },
    read() {
      if (this.isBlackApp()) {
        // 头部APP让网页显示提示在浏览器中打开
        this.$toast("请复制网址到手机浏览器打开");
      } else {
        // 不是头部APP就直接打开
        this.openApp(this.chapterUrl);
      }
    },
    downLoad() {
      !document.webkitHidden &&
        !document.hidden &&
        void (location.href = this.url);
    },
    openTuer() {
      if (this.isBlackApp()) {
        // 头部APP让网页显示提示在浏览器中打开
        this.$toast("请复制网址到手机浏览器打开");
      } else {
        // 不是头部APP就直接打开
        this.openApp(this.bookUrl);
      }
    },
    openApp(url) {
      //这里需要有个安卓和ios平台的判断分别取不同的SchemeURL
      this.jumpApp(url); //此函数负责打开APP的,scheme协议地址由安卓端跟ios端提供
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
        this.$toast("暂不支持IOS系统");
      } else {
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
  width: 100%;
  background-color: #cec29c;
  overflow: hidden;
  /* overflow: auto; */
}
.top {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 50px;
  background: rgba(28, 95, 230, 1);
  display: flex;
  align-items: center;
}
.logo {
  width: 30px;
  height: 30px;
  margin-left: 16px;
  margin-right: 7px;
}
.title {
  font-size: 15px;
  font-family: PingFang SC;
  font-weight: bold;
  color: rgba(255, 255, 255, 1);
  margin-right: 106px;
}
.btn {
  width: 50px;
  height: 20px;
  background: rgba(255, 255, 255, 1);
  border-radius: 10px;
  text-align: center;
  line-height: 20px;
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(28, 95, 230, 1);
}
.download {
  margin-right: 15px;
}
.content {
  width: 375px;
  margin-top: 50px;
  background-color: #cec29c;
  min-height: 812px;
}
.ctitle {
  width: 375px;
  font-size: 18px;
  font-family: PingFang SC;
  font-weight: 400;
  color: rgba(129, 113, 77, 1);
  height: 35px;
  padding: 37px 23px;
  word-wrap: break-word;
  word-break: normal;
}
.ctext {
  width: 375px;
  font-size: 18px;
  font-family: PingFang SC;
  font-weight: 400;
  color: rgba(16, 16, 16, 1);
  line-height: 27px;
  word-wrap: break-word;
  word-break: normal;
  padding: 10px 23px;
}
</style>>

