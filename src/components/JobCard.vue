<template>
  <div class="main" :class="selected === name?'selected':''" :style="{maxHeight:height}">
    <img
        class="btn"
        :src="image"
        alt="showListBtn"
        v-show="screenwidth<576 && showList===false"
        @click="showList = !showList"
    />
    <div class="avatar">
      <img :src="`${baseDomain}/storage/jobs/icon_member-${quota}.png`">
    </div>
    <div class="title">{{name}}</div>
    <div class="salary">
      NT
      <span class="num">{{salary}}</span>
      <i>↑</i>/ month
    </div>
    <transition name="opacity">
      <div class="requirement" v-show="showList || screenwidth>576">
        工作需求
        <span class="total">({{numOfRequirement}}項)</span>
      </div>
    </transition>
    <transition name="opacity">
      <div class="list" v-show="showList || screenwidth>576">
        <div v-for="(item, index) in requirementArray" :key="index" class="content">
          <div class="check">
            <input type="checkbox" />
          </div>
          <div class="item-list">{{item}}</div>
        </div>
      </div>
    </transition>
    <transition name="opacity">
      <div class="buttom" @click="openLink(link)" v-show="showList || screenwidth>576">
        <span class="apply">立即應徵</span>
      </div>
    </transition>
    <div class="bottom" v-show="screenwidth>576">請勾選工作需求後前往應徵。</div>
    <div class="close" @click="showList = false" v-show="showList">
      <img src="@/assets/img/icons8-expand_arrow-1_2x.png" alt="closeBtn" />
    </div>
  </div>
</template>

<script>
import {getJsonParseOrArray} from "@/utils";

export default {
  name: "JobCard",
  props: [
    "name",
    "salary",
    "requirement",
    "priority",
    "selected",
    "link",
    "screenwidth",
    "quota"
  ],
  data() {
    return {
      baseDomain: process.env.VUE_APP_BASE_DOMAIN,
      showList: false,
      requirementArray: getJsonParseOrArray(this.requirement)
    };
  },
  computed: {
    numOfRequirement: function() {
      return this.requirementArray.length;
    },
    image() {
      let img = [
        { src: require("@/assets/img/icons8-more-1_2x.png") },
        { src: require("@/assets/img/icons8-more-4_2x.png") }
      ];
      let i = this.selected === this.name ? img[0].src : img[1].src;
      return i;
    },
    height() {
      let i = "603px";
      if (this.screenwidth < 576 && this.showList === false) i = "140px";
      return i;
    }
  },
  methods: {
    openLink: function(url) {
      window.open(url, "_blank");
    }
  }
};
</script>

<style scoped lang="scss">
@import "../assets/style/utils/_variables.scss";
@media screen and (min-width: $bigWidth) {
  .main {
    border: 6px solid rgb(235, 235, 235);
  }
}
@media screen and (min-width: $smallWidth) and (max-width: $bigWidth) {
  .main {
    border: 6px solid rgb(235, 235, 235);
  }
}
@media screen and (max-width: $smallWidth) {
  .main {
    border: 1px solid rgb(235, 235, 235);
  }
}
::-webkit-scrollbar {
  width: 2px;
}
::-webkit-scrollbar-thumb {
  background: #d6d6d6;
  border-radius: 1px;
}
.main {
  .opacity-enter {
    opacity: 0;
  }
  .opacity-enter-active {
    transition: opacity 1s;
  }
  width: 322px;
  height: 603px;
  border-radius: 10px;
  margin: 30px 15px 0;
  position: relative;
  transition: max-height 0.4s;
  .btn {
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    right: -5px;
    width: 30px;
    height: 30px;
    transform: rotate(90deg);
  }
  .avatar {
    transform: translateX(35px) translateY(38px) rotateY(0deg);
    width: 64px;
    height: 64px;
    position: absolute;
    border-radius: 10px;
    box-shadow: rgb(192, 192, 192) 0px 0px 8px inset;
  }
  .title {
    transform: translateX(113px) translateY(29px) rotateY(0deg);
    font-size: 18px;
    padding: 8px;
    width: 161px;
    height: 26px;
    position: absolute;
    text-align: left;
    font-weight: 700;
    color: rgb(0, 0, 0);
  }
  .salary {
    transform: translateX(111px) translateY(65px) rotateY(0deg);
    width: 143px;
    height: 26px;
    position: absolute;
    padding: 8px;
    text-align: left;
    color: rgb(145, 145, 145);
    .num {
      font-size: 26px;
      color: rgb(0, 0, 0);
    }
    i {
      vertical-align: top;
    }
  }
  .requirement {
    transform: translateX(32px) translateY(116px) rotateY(0deg);
    width: 252px;
    height: 25px;
    position: absolute;
    padding: 8px;
    text-align: left;
    color: rgb(0, 0, 0);
    font-family: "Noto Sans HK";
    font-weight: bold;
    border-bottom: 1px solid rgb(145, 145, 145);
    .total {
      font-weight: normal;
    }
  }
  .list {
    // transform: translateX(32px) translateY(157px) rotateY(0deg);
    width: 268px;
    height: 315px;
    // position: absolute;
    border-bottom: 1px solid rgb(145, 145, 145);
    overflow: auto;
    margin: 157px auto 0;
    .content {
      width: 250px;
      text-align: left;
      padding: 15px 15px 15px 0;
      font-size: 14px;
      display: flex;
      .check {
        width: 50px;
        input[type="checkbox"] {
          position: relative;
          cursor: pointer;
          margin: 5px;
        }
        input[type="checkbox"]:before {
          content: "";
          display: block;
          position: absolute;
          background-color: white;
          width: 24px;
          height: 24px;
          top: -2px;
          left: -2px;
          border-radius: 3px;
          box-shadow: rgb(146, 146, 146) 0px 0px 4px inset;
        }
        input[type="checkbox"]:checked:after {
          content: "";
          display: block;
          width: 4px;
          height: 11px;
          border: solid #00bfff;
          border-width: 0 1.5px 1.5px 0;
          transform: rotate(45deg);
          position: absolute;
          top: 3px;
          left: 8px;
        }
      }
      .item-list {
        width: 250px;
      }
    }
  }
  .buttom {
    // transform: translateX(34px) translateY(495px) rotateY(0deg);
    width: 260px;
    height: 48px;
    // position: absolute;
    margin: 25px auto 0;
    border-style: solid;
    border-width: 1px;
    border-radius: 5px;
    box-shadow: rgb(145, 145, 145) 0px 0px 3px;
    background-image: -webkit-linear-gradient(
      225deg,
      rgb(99, 179, 242),
      rgb(81, 117, 224)
    );
    border-color: rgb(0, 111, 216);
    cursor: pointer;
    .apply {
      transform: translateX(126px) translateY(502px) rotateY(0deg);
      font-size: 16px;
      color: rgb(255, 255, 255);
      position: relative;
      top: 14px;
    }
  }
  .bottom {
    // transform: translateX(85px) translateY(554px) rotateY(0deg);
    // position: absolute;
    margin-top: 20px;
    color: rgb(0, 0, 0);
    font-family: "Noto Sans HK";
    font-size: 12px;
  }
}
.selected {
  background-color: unset;
  background-image: -webkit-linear-gradient(
    225deg,
    rgb(100, 182, 243),
    rgb(80, 116, 224)
  );
  border-radius: 10px;
  border: 1px solid rgb(0, 150, 255);
  .avatar {
    box-shadow: unset;
    background-color: white;
  }
  .title,
  .requirement,
  .list,
  .salary,
  .salary .num,
  .bottom {
    color: white;
  }
  .requirement,
  .list {
    border-bottom: 1px solid white;
  }
  .list .content .check input[type="checkbox"]:before {
    box-shadow: unset;
  }
  .buttom {
    background-image: unset;
    background-color: white;
    box-shadow: rgb(0, 0, 0) 0px 0px 3px;
    .apply {
      color: rgb(0, 150, 255);
    }
  }
}
.close {
  width: 324px;
  height: 34px;
  position: absolute;
  bottom: -1px;
  left: -1px;
  background-color: rgb(232, 235, 237);
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  box-shadow: rgb(94, 94, 94) 0px 0px 1px inset;
  line-height: 34px;
  img {
    width: 24px;
    height: 24px;
    transform: rotate(180deg);
  }
}
</style>
