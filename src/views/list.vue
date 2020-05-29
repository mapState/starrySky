<template>
  <div class="main">
    <div class="top">
      <img src="../../static/img/logo.png" alt class="logo" />
      <p class="title">星空文学APP</p>
      <span class="btn download" @click="downLoad">下载</span>
      <span class="btn" @click="openTuer">打开</span>
    </div>
    <div class="cover">
      <!-- <img :src="$view+detail.bookImage" alt class="hImg" /> -->
        <div class="a">
            <img :src="$view+detail.bookImage" alt class="bookImg" />
        <div class="detail">
          <div class="name">{{detail.bookName}}</div>
          <div class="type">
            <span class="typeText dot">{{detail.bookAuthor}}</span>
            <span class="typeText dot">{{detail.type==1?'完结':'连载'}}</span>
            <span class="typeText">{{Math.round(detail.bookSize/10000)}}万字</span>
          </div>
          <div class="info">简介：{{detail.bookIntroduce}}</div>
        </div>
        </div>
    </div>
    <div class="list">
      <div class="listTitle">章节目录</div>
      <div class="listItem" v-for="(item,index) in list" :key="index">{{item.chapterName}}</div>
    </div>
    <div class="start" @click="read">开始阅读</div>
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
      bookUrl:'sreader://com.foin.sreader/open',
      chapterUrl:'sreader://com.foin.sreader/open',
      url:'http://39.101.217.117/app-release.apk',//下载apk
    };
  },
  mounted() {
    let {bookId}=this.$route.query
    if(bookId){
        this.bookUrl='sreader://com.foin.sreader/open?bookId='+bookId
        this.chapterUrl='sreader://com.foin.sreader/open?bookId='+bookId
        this.getList(bookId);
        this.getPage(bookId);
    }else{
        this.$toast('未获取到bookId')
    }
  },
  methods: {
    read(){
       if (this.isBlackApp()) {
        // 头部APP让网页显示提示在浏览器中打开
        this.$toast('请复制网址到手机浏览器打开')
      } else {
        // 不是头部APP就直接打开
        this.openApp(this.chapterUrl);
      }
    },
    getList(bookId) {
      this.axios
        .get("/bookDetail", {
          params: {
            bookId
          }
        })
        .then(res => {
          console.log(res);
          this.detail = res.data;
        });
    },
    getPage(bookId) {
      this.axios
        .get("/chapterList", {
          params: {
            bookId,
            pageNo: 1,
            pageSize: 10000000
          }
        })
        .then(res => {
          console.log(res);
          this.list = res.data;
        });
    },
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
.top {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 50px;
  background: rgba(28, 95, 230, 1);
  display: flex;
  align-items: center;
  z-index: 99;
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
.cover {
  position: relative;
  width: 375px;
  height: 251px;
  margin-top: 50px;
  padding-top: 77px;
  box-sizing: border-box;
  display: flex;
  background-color: #3D3836;
  opacity: .9;
}
.hImg{
  position: absolute;
  left:0;
  top:0;
  width:100%;
  height:100%;
  filter: blur(60px);
}
.a{
  width:100%;
  height: 109px;
  display: flex;
}
.bookImg {
  width: 90px;
  height: 109px;
  border-radius: 1px;
  margin-left: 19px;
}
.detail {
  flex: 1;
  height: 109px;
  padding-left: 16px;
  box-sizing: border-box;
}
.name {
  width: 100%;
  font-size: 18px;
  font-family: PingFang SC;
  font-weight: bold;
  color: rgba(255, 255, 255, 1);
}
.type {
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 13px;
  font-family: PingFang SC;
  font-weight: 400;
  color: rgba(203, 203, 203, 1);
  margin-top: 19px;
  margin-bottom: 28px;
}
.typeText {
  position: relative;
  margin-right: 20px;
}
.dot::after {
  display: block;
  content: "";
  position: absolute;
  width: 2px;
  height: 2px;
  border-radius: 50%;
  background-color: #fff;
  top: 50%;
  transform: translateY(-50%);
  right: -10px;
}
.info {
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 400;
  color: rgba(203, 203, 203, 1);
  line-height: 16px;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  padding-right:10px;
  box-sizing: border-box;
}
.list {
  padding-left: 15px;
  margin-top: -50px;
  width: 375px;
  height: 640px;
  background: rgba(255, 255, 255, 1);
  border-radius: 22px 22px 0px 0px;
  padding-bottom: 60px;
  position: relative;
  z-index: 4;
}
.listTitle {
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: bold;
  color: rgba(0, 0, 0, 1);
  padding-top: 25px;
  padding-bottom: 20px;
}
.listItem {
  font-size: 15px;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  line-height: 20px;
  padding: 19px 0;
  border-top: 1px solid #ddd;
}
.start {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 44px;
  font-size: 16px;
  background: linear-gradient(
    78deg,
    rgba(29, 97, 239, 1),
    rgba(81, 145, 244, 1)
  );
  opacity: 1;
  z-index: 7;
  text-align: center;
  line-height: 44px;
  font-family: PingFang SC;
  font-weight: bold;
  color: rgba(255, 255, 255, 1);
}
</style>>

