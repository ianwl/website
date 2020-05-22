<template>
  <div class="jobs">
    <div class="header">
      <img class="big-img" :src="bigImage" alt="recruitment" />
      <div class="subject">Work together for success!</div>
      <div class="footer">Welcome! Let's create your profile</div>
      <a-dropdown>
        <a-menu slot="overlay" @click="handleMenuClick">
          <template v-for="(item, index) in searchJob">
            <a-menu-item :key="index">{{ item }}</a-menu-item>
          </template>
        </a-menu>
        <a-button class="search">
          搜尋職缺
          <a-icon type="search" />
        </a-button>
      </a-dropdown>
      <div class="to-bottom" @click="toBottom(stepBottom)"></div>
    </div>
    <div class="welfare">
      <div class="title">{{welfare.title}}</div>
      <div class="content">{{welfare.content}}</div>
    </div>
    <div class="welfare-card">
      <div v-show="screenwidth<810 && showLeftBtn === true" class="left-btn" @click="turnLeft">
        <img src="@/assets/img/icons8-expand_arrow_2x.png" alt="jobs-left-bnt" />
      </div>
      <div v-show="screenwidth<810 && showRightBtn === true" class="right-btn" @click="turnRight">
        <img src="@/assets/img/icons8-expand_arrow_2x.png" alt="jobs-right-bnt" />
      </div>
      <div v-if="Object.keys(welfare).length>0" class="cards" :style="{left:`${left}px`}">
        <div class="outer">
          <span>{{welfareTitleToIndexMap[0]}}</span>
          <div class="card">
            <div class="inner">
              <div v-for="(item, index) in welfare[welfareTitleToIndexMap[0]]" :key="index" class="content">
                <div class="subject">{{item.name}}</div>
                <div v-html="item.content"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="outer">
          <span>{{welfareTitleToIndexMap[1]}}</span>
          <div class="card">
            <div class="inner">
              <div v-for="(item, index) in welfare[welfareTitleToIndexMap[1]].slice(0, 4)" :key="index" class="content">
                <div class="subject">{{item.name}}</div>
                <div v-html="item.content"></div>
              </div>
              <div class="border"></div>
              <div
                v-for="(item, index) in welfare[welfareTitleToIndexMap[1]].slice(4, 10)"
                :key="'welfare'+index"
                class="content"
              >
                <div class="subject">{{item.name}}</div>
                <div v-html="item.content"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="outer">
          <span>{{welfareTitleToIndexMap[2]}}</span>
          <div class="card">
            <div class="inner">
              <div v-for="(item, index) in welfare[welfareTitleToIndexMap[2]]" :key="index" class="content">
                <div class="subject">{{item.name}}</div>
                <div v-html="item.content"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="vacancy">
      <div class="title">最新職缺</div>
      <div class="content">技最新職缺，我們將不定期更新最新職缺，若有適合您的職缺可以進行訂閱，系統將自動通知您的信箱。</div>
      <div class="subscribe" @click="toBottom(stepBottom)">
        立即訂閱
        <img src="@/assets/img/icons8-expand_arrow-1_2x.png" alt="subscribe-btn" />
      </div>
    </div>
    <div class="vacancy-card">
      <div v-for="(item, index) in jobs" :key="index">
        <JobCard v-bind="item" :selected="selectedJOb" :screenwidth="screenwidth" ref="vacancy"/>
      </div>
    </div>
    <transition name="background-opacity">
      <div
        class="background-opacity"
        v-show="showApplyForm && screenwidth<810"
        @click="showApplyForm = false"
      ></div>
    </transition>
    <transition name="slide-out">
      <div class="apply-form" v-show="showApplyForm || screenwidth>810">
        <div class="close-btn" v-show="screenwidth<810" @click="showApplyForm = false">
          <img src="@/assets/img/icons8-expand_arrow-1_2x.png" alt="applyFormCloseBtn" />
        </div>
        <div class="containar">
          <div class="picture">
            <div class="photo">
              <img class="icon-photo" src="@/assets/img/folder_filled_2x.png" />
            </div>
            <div class="content-btn">
              <p class="hint">
                請選擇進3個月的求職照片。
                <br />照片大小限3MB
              </p>
              <p class="choose-photo">選擇照片</p>
            </div>
          </div>
          <div class="form">
            <div class="row1">
              <div>
                <div class="form-name">姓名</div>
                <input text="text" placeholder="請輸入真實姓名" />
              </div>
              <div>
                <div class="form-name">手機</div>
                <input text="text" placeholder="+886-000-000-000" />
              </div>
            </div>
            <div class="row2">
              <div>
                <div class="form-name">信箱</div>
                <input text="text" placeholder="@gmail.com" />
              </div>
              <div>
                <div class="form-name">職業</div>
                <input text="text" placeholder="輸入您目前的職業性質" />
              </div>
            </div>
            <div class="row3">
              <div>
                <div class="form-name">地址</div>
                <input text="text" placeholder="縣市-區-路" />
              </div>
            </div>
            <div class="row4">
              <div class="subscribe">立即訂閱</div>
              <div class="hint" v-if="screenwidth>810">沒看到適合您的職缺嗎！ 別擔心，訂閱即可收到最新職缺通知。</div>
              <div class="hint" v-else>建立您的人履歷，將由專員親自與您聯繫。</div>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <div class="small-apply-form" v-show="screenwidth<810">
      <div class="subscribe" @click="showApplyForm = true">
        立即訂閱
        <img src="@/assets/img/icons8-expand_arrow-1_2x.png" alt="subscribe-btn" />
      </div>
      <div class="hint">
        沒看到適合您的職缺嗎！
        <br />別擔心，訂閱即可收到最新職缺通知。
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import JobCard from "@/components/JobCard.vue";
import {fetchRecruiting} from "@/api/recruiting";
import {groupBy} from "@/utils";

export default {
  name: "Jobs",
  components: {
    JobCard
  },
  created() {
    fetchRecruiting([]).then(response=>{

      if(response.success){

        this.jobs=response.rows.jobs
        const tempWelfare =response.rows.welfare

        this.welfare=groupBy(tempWelfare,'title')

      }

    })
  },
  props: ["screenwidth"],
  data() {
    return {
      baseDomain: process.env.VUE_APP_BASE_DOMAIN,
      welfare: {},
      jobs: [],
      welfareTitleToIndexMap: {
        0: '基本權益',
        1: '獎金發放',
        2: '休假申請'
      },
      stepBottom: 200, //此数据是控制动画快慢的
      stepJob: 50,
      selectedJOb: "",
      showLeftBtn: false,
      showRightBtn: true,
      left: 0,
      showApplyForm: false
    };
  },
  computed: {
    bigImage() {
      let img = { src: require("@/assets/img/team_computer.jpg") };
      if (this.screenwidth < 810 && this.screenwidth > 576) {
        img = { src: require("@/assets/img/team_ipad.jpg") };
      }
      if (this.screenwidth < 576) {
        img = { src: require("@/assets/img/team_ipone.jpg") };
      }
      return img.src;
    },
    numOfJobs: function() {
      return this.jobs.length;
    },
    searchJob: function() {
      let result = this.jobs.map(jobs => jobs.name);
      // this.$set(this.config, 'options', result)
      // let result = this.jobs.vacancy.map(item => Object.values(item)[1]);
      return result;
    }
  },
  methods: {
    turnLeft() {
      if (this.screenwidth > 576) {
        this.showLeftBtn = false;
        this.showRightBtn = true;
        this.left = 0;
      } else {
        this.left += 343;
        this.showRightBtn = this.left !== -686 ? true : false;
        this.showLeftBtn = this.left !== 0 ? true : false;
      }
    },
    turnRight() {
      if (this.screenwidth > 576) {
        this.showLeftBtn = true;
        this.showRightBtn = false;
        this.left = -(1029 - this.screenwidth + 40);
      } else {
        this.left -= 343;
        this.showRightBtn = this.left !== -686 ? true : false;
        this.showLeftBtn = this.left !== 0 ? true : false;
      }
    },
    toBottom(i) {
      let clientHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      let scrollHeight = document.documentElement.scrollHeight;
      let height = scrollHeight - clientHeight - 10; //超出窗口上界的值就是底部的scrolTop的值
      document.documentElement.scrollTop += i;
      let c;
      if (document.documentElement.scrollTop < height) {
        c = setTimeout(() => this.toBottom(i), 16);
      } else {
        clearTimeout(c);
      }
    },
    handleMenuClick(e) {
      let height = this.$refs.vacancy[e.key].$el.offsetTop - 30;
      this.selectedJOb = this.jobs[e.key].name;
      this.toJobCard(this.stepJob, height);
    },
    toJobCard(i, height) {
      document.documentElement.scrollTop += i;
      let c;
      if (document.documentElement.scrollTop < height) {
        c = setTimeout(() => this.toJobCard(i, height), 16);
      } else {
        clearTimeout(c);
      }
    }
  },
  beforeDestroy() {
    document.documentElement.scrollTop = 0;
  }
};
</script>
<style lang="scss">
@import "../assets/style/utils/_variables.scss";
@media screen and (min-width: $bigWidth) {
  .jobs {
    width: 100%;
    min-width: 1243px;
    .header{
      height:100vh;
    }
    .subject {
    }
    .search {
      width: 560px;
      margin-top: 5%;
    }
    .footer {
      position: absolute;
      bottom: 35px;
    }
    .welfare .content,
    .vacancy .content {
      width: 540px;
    }
    .vacancy {
      flex-direction: column;
      .subscribe {
        width: 216px;
      }
    }
    .welfare-card .cards {
      width: 1092px;
      justify-content: center;
      left: 0;
      right: 0;
      margin: auto;
      .outer {
        margin: 0 10px;
        span {
          margin-bottom: 25px;
        }
      }
    }
    .vacancy-card {
      width: 1092px;
    }
    .apply-form {
      margin-top: 60px;
      .containar {
        padding-top: 80px;
        height: 570px;
        justify-content: center;
        .picture {
          width: 200px;
          display: flex;
          flex-direction: column;
          align-items: center;
          .photo {
            width: 151px;
            height: 166px;
            img {
              width: 50px;
              height: 50px;
            }
          }
          .hint {
            margin-top: 30px;
          }
          .choose-photo {
            width: 158px;
            height: 46px;
            margin-top: 10px;
          }
        }
        .form {
          margin-left: 90px;
          width: 560px;
          input {
            width: 207px;
          }
          .row1,
          .row2 {
            justify-content: space-around;
          }
          .row2 {
            margin: 30px 0;
          }
          .row3 {
            display: flex;
            justify-content: center;
            input {
              width: 487px;
            }
          }
          .row4 {
            align-items: flex-end;
            margin: 15px 35px 100px;
          }
        }
      }
    }
    .small-apply-form {
      flex-direction: row;
    }
  }
}
@media screen and (min-width: $smallWidth) and (max-width: $bigWidth) {
  .jobs {
    width: 100%;
    .header{
      height:60vh;
    }
    .subject {
    }
    .search {
      width: 70%;
      margin-top: 5%;
    }
    .footer {
      position: absolute;
      bottom: 35px;
    }
    .welfare .content,
    .vacancy .content {
      width: 540px;
    }
    .vacancy {
      flex-direction: column;
      .subscribe {
        width: 216px;
      }
    }
    .welfare-card .cards {
      justify-content: flex-start;
      .outer {
        margin: 0 5px;
        span {
          margin-bottom: 15px;
          text-align: left;
          padding-left: 10px;
        }
      }
    }
    .vacancy-card {
      width: 728px;
    }
    .apply-form {
      // height: 139px;
      position: fixed;
      bottom: 0;
      z-index: 3;
      height: 80%;
      .containar {
        box-sizing: border-box;
        flex-direction: column;
        // margin-top: 35px;
        overflow: auto;
        padding: 0 15px;
        height: 100%;
        margin-top: 35px;
        .picture {
          margin-top: 5%;
          display: flex;
          // height: 130px;
          .photo {
            width: 117px;
            height: 130px;
            margin-right: 5%;
            img {
              width: 50px;
              height: 50px;
            }
          }
          .content-btn {
            margin-top: auto;
            .hint {
              height: 30px;
            }
            .choose-photo {
              // height: 46px;
              margin-top: 10px;
              width: 100%;
            }
          }
        }
        .form {
          width: 100%;
          margin-top: 30px;
          input {
            width: 100%;
          }
          .row1,
          .row2,
          .row3,
          .row4 {
            // margin: 0 5%;
            div {
              width: 46%;
            }
          }
          .row1,
          .row2 {
            justify-content: space-between;
          }
          .row2 {
            margin: 30px 0;
          }
          .row4 {
            align-items: center;
            margin: 30px 20px 60px;
          }
        }
      }
    }
    .small-apply-form {
      flex-direction: row;
      .subscribe {
        margin-right: 7%;
      }
      .hint {
        text-align: left;
        line-height: 18px;
      }
    }
  }
}
@media screen and (max-width: $smallWidth) {
  .jobs {
    width: 100%;
    .header{
      height:100vh;
    }
    .subject {
      text-align: left;
      padding-left: 10%;
      padding-right: 2%;
    }
    .search {
      width: 80%;
      margin-top: 10%;
    }
    .footer {
      width: 76%;
      text-align: left;
      margin-top: 2%;
    }
    .welfare .content,
    .vacancy .content {
      width: 100%;
      padding: 0 7%;
      box-sizing: border-box;
    }
    .vacancy {
      flex-direction: column;
      .subscribe {
        width: 40%;
      }
    }
    .welfare-card .cards {
      justify-content: flex-start;
      .outer {
        margin: 0 5px;
        span {
          margin-bottom: 15px;
          text-align: left;
          padding-left: 10px;
        }
      }
    }
    .vacancy-card {
      width: 364px;
    }

    .apply-form {
      // height: 139px;
      position: fixed;
      bottom: 0;
      z-index: 3;
      height: 80%;
      .containar {
        box-sizing: border-box;
        flex-direction: column;
        overflow: auto;
        padding: 0 15px;
        height: 100%;
        margin-top: 35px;
        align-items: center;
        .picture {
          margin-top: 10%;
          // height: 166px;
          display: flex;
          // height: 140px;
          width: 90%;
          .photo {
            width: 117px;
            height: 130px;
            margin-right: 12%;
            img {
              width: 50px;
              height: 50px;
            }
          }
          .content-btn {
            margin-top: auto;
            .hint {
              p {
                margin: 0;
              }
            }
            .choose-photo {
              // width: 150px;
              margin-top: 0;
              width: 100%;
            }
          }
        }
        .form {
          width: 100%;
          margin-top: 30px;
          input {
            width: 100%;
          }
          .row1,
          .row2,
          .row3,
          .row4 {
            display: flex;
            // flex-direction: row;
            flex-wrap: wrap;
            justify-content: center;
            // margin: 0 5%;
            div {
              & + div {
                margin-top: 28px;
              }
              width: 90%;
            }
          }
          .row2 {
            margin: 28px 0;
          }
          .row4 {
            align-items: center;
            margin: 10% 0 20%;
          }
        }
      }
    }
    .small-apply-form {
      flex-direction: column;
      .subscribe {
        margin-right: 0%;
      }
      .hint {
        margin-top: 10px;
        text-align: center;
        line-height: unset;
      }
    }
  }
}
.ant-dropdown-menu {
  max-height: 280px;
  overflow: scroll;
}
.jobs {
  margin: 0 auto;
  .header {
    width: 100%;
    // height: 100vh;
    // background-image: url("~@/assets/img/recruitment.jpg");
    background-repeat: no-repeat;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .big-img {
      width: 100%;
      height: 100%;
      filter: blur(3px);
      position: absolute;
      z-index: -1;
    }
    .subject {
      // margin-top: 270px;
      display: inline-block;
      font-size: 48px;
      color: #fff;
      line-height: 1.2;
    }
    .search {
      // width: 560px;
      height: 56px;
      background-color: white;
      font-size: 20px;
      border-radius: 8px;

      i {
        margin-left: 20px;
      }
    }
    .footer {
      // margin-top: 400px;

      font-size: 12px;
      color: #fff;
    }
    .to-bottom {
      width: 50px;
      height: 50px;
      position: absolute;
      background-color: rgb(95, 172, 240);
      background-image: url("~@/assets/img/icons8-expand_arrow_2x.png");
      background-repeat: no-repeat;
      background-size: 32px 32px;
      background-position: center;
      right: 15px;
      bottom: 50px;
      cursor: pointer;
    }
  }
  .welfare {
    width: 100%;
    .title {
      margin-top: 80px;
      font-size: 24px;
      font-weight: bold;
    }
    .content {
      margin: 30px auto;
      font-size: 16px;
    }
  }
  .welfare-card {
    position: relative;
    overflow: hidden;
    height: 596px;
    .left-btn,
    .right-btn {
      position: absolute;
      width: 43px;
      height: 43px;
      background-color: rgba(0, 0, 0, 0.8);
      opacity: 0.7;
      bottom: 240px;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1;
      img {
        width: 22px;
        height: 22px;
      }
    }
    .left-btn {
      left: 4%;
      img {
        transform: rotate(90deg);
      }
    }
    .right-btn {
      right: 4%;
      img {
        transform: rotate(-90deg);
      }
    }
    .cards {
      display: flex;
      position: absolute;
      left: 0;
      transition: all 0.3s;
      padding: 0 20px;
      .outer {
        width: 333px;
        flex-shrink: 0;
        span {
          margin-top: 35px;
          display: block;
        }
        .card {
          ::-webkit-scrollbar {
            width: 2px;
          }
          height: 496px;
          border-radius: 8px;
          border-style: solid;
          background-color: rgb(235, 235, 235);
          border-width: 0px;
          border-color: rgb(214, 214, 214);
          box-shadow: rgb(0, 0, 0) 0px 0px 1px;
          padding: 10px;
          .inner {
            margin-right: 25px;
            margin-left: 25px;
            overflow: auto;
            height: 490px;
            .border {
              margin-top: 20px;
              border-bottom: 1px solid rgb(0, 0, 0);
            }
            .content {
              font-size: 14px;
              margin-top: 20px;
              text-align: left;
              line-height: 23px;
              .subject {
                font-weight: bold;
              }
            }
          }
        }
      }
    }
  }
  .vacancy,
  .small-apply-form {
    width: 100%;
    height: 250px;
    display: flex;
    justify-content: center;
    align-items: center;
    .title {
      font-size: 24px;
      font-weight: bold;
    }
    .content {
      margin-top: 30px;
      font-size: 16px;
    }
    .subscribe {
      position: relative;
      height: 48px;
      background-color: rgba(0, 0, 0, 0.8);
      color: rgb(255, 255, 255);
      border-radius: 10px;
      margin-top: 40px;
      line-height: 46px;
      cursor: pointer;
      img {
        position: absolute;
        margin: auto;
        right: 10%;
        top: 0;
        bottom: 0;
        width: 22px;
        height: 22px;
        transform: rotate(-90deg);
      }
    }
  }
  .vacancy-card {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin: auto;
  }

  .background-opacity-enter,
  .background-opacity-leave-to {
    opacity: 0;
  }
  .background-opacity-enter-active,
  .background-opacity-leave-active {
    transition: all 0.5s ease-in-out;
  }
  .background-opacity {
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
  }
  .slide-out-enter,
  .slide-out-leave-to {
    bottom: -800px;
  }
  .slide-out-enter-active,
  .slide-out-leave-active {
    transition: all 0.5s ease-in-out;
  }
  .apply-form {
    width: 100%;
    .close-btn {
      position: absolute;
      top: 0;
      width: 100%;
      height: 35px;
      line-height: 35px;
      border-top-left-radius: 10px;
      background-image: -webkit-linear-gradient(
        270deg,
        rgb(255, 255, 255),
        rgb(235, 235, 235)
      );
      border-top-right-radius: 10px;
      box-shadow: rgb(0, 0, 0) 0px 0px 1px;
      img {
        width: 24px;
        height: 24px;
      }
    }
    .containar {
      width: 100%;
      background-color: rgb(235, 235, 235);
      display: flex;
      .picture {
        .photo {
          background-color: rgb(255, 255, 255);
          border-radius: 8px;
          border: 1px solid rgb(214, 214, 214);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .content-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          .hint {
            color: rgb(145, 145, 145);
            font-size: 12px;
            text-align: left;
          }
          .choose-photo {
            margin-bottom: 0;
            border-style: solid;
            background-color: rgb(255, 255, 255);
            border-width: 1px;
            border-color: rgb(214, 214, 214);
            border-radius: 10px;
            line-height: 46px;
            cursor: pointer;
          }
        }
      }
      .form {
        .form-name {
          padding-left: 10px;
        }
        ::placeholder {
          color: rgb(145, 145, 145);
          // padding: 10px;
          font-size: 12p;
        }
        input {
          border: 1px rgb(214, 214, 214) solid;
          height: 46px;
          border-radius: 10px;
          margin-top: 15px;
          padding: 0px 15px;
          box-sizing: border-box;
        }
        .row1,
        .row2 {
          text-align: left;
          display: flex;
        }
        .row3 {
          text-align: left;
        }
        .row4 {
          display: flex;
          flex-direction: column;
          .subscribe {
            width: 241px;
            height: 46px;
            background-color: rgba(0, 0, 0, 0.8);
            color: rgb(255, 255, 255);
            font-size: 18px;
            border-radius: 10px;
            margin-top: 30px;
            line-height: 46px;
            cursor: pointer;
          }
          .hint {
            width: 228px;
            height: 21px;
            letter-spacing: 0px;
            font-size: 12px;
            line-height: 18px;
            overflow-wrap: break-word;
            color: rgb(121, 121, 121);
            margin-top: 10px;
          }
        }
      }
    }
  }
  .small-apply-form {
    height: 139px;
    background-color: rgb(235, 235, 235);
    margin-top: 60px;
    margin-bottom: 56px;
    // height: ;
    .subscribe {
      width: 241px;
      height: 46px;
      background-color: rgb(0, 0, 0);
      color: rgb(255, 255, 255);
      font-size: 18px;
      border-radius: 10px;
      cursor: pointer;
      margin-top: 0;
    }
    .hint {
      width: 228px;
      display: inline-block;
      letter-spacing: 0px;
      font-size: 12px;
      overflow-wrap: break-word;
      color: rgb(121, 121, 121);
    }
  }
}
</style>
