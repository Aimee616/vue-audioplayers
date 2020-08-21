<template>
  <div class="audio-player">
    <audio ref="audioPlayer" :src="src" :loop="loop" :preload="preload">
      Your browser does not support audio tags.
    </audio>
    <div
      v-if="audioStyle != 'music'"
      class="audio-control style-normal"
      :style="`border: 2px solid ${theme};`"
    >
      <div
        class="left"
        ref="playerAudioBtn"
        @click="handlePlayer"
        :style="`background: ${theme};`"
      >
        <div :class="['btn', { 'btn-pause': playing }]"></div>
      </div>
      <div class="right">
        <div class="progress" ref="audioProgress" @click="handleProgress">
          <div class="progress-active" :style="`background: ${theme};`"></div>
          <!-- <div
            class="progress-dot"
            @mousedown="handleMousedown"
            @mouseup="handleMouseup"
            :style="`background: ${theme};`"
          ></div> -->
          <div class="progress-dot" :style="`background: ${theme};`"></div>
        </div>
        <div class="times">
          <span class="played-time">{{ playedTime }}</span>
          <span class="total-time">{{ totalTime }}</span>
        </div>
      </div>
    </div>
    <div v-if="audioStyle === 'music'" class="audio-control style-music">
      <div class="audio-animation">
        <div :class="['music-waves', { 'waves-active': playing }]">
          <div class="waves-item">
            <span class="ani-li"></span>
          </div>
          <div class="waves-item"><span class="ani-li"></span></div>
          <div class="waves-item"><span class="ani-li"></span></div>
          <div class="waves-item"><span class="ani-li"></span></div>
          <div class="waves-item"><span class="ani-li"></span></div>
          <div class="waves-item"><span class="ani-li"></span></div>
          <div class="waves-item"><span class="ani-li"></span></div>
          <div class="waves-item"><span class="ani-li"></span></div>
          <div class="waves-item"><span class="ani-li"></span></div>
          <div class="waves-item"><span class="ani-li"></span></div>
          <div class="waves-item"><span class="ani-li"></span></div>
          <div class="waves-item"><span class="ani-li"></span></div>
          <div class="waves-item"><span class="ani-li"></span></div>
          <div class="waves-item"><span class="ani-li"></span></div>
          <div class="waves-item"><span class="ani-li"></span></div>
          <div class="waves-item"><span class="ani-li"></span></div>
          <div class="waves-item"><span class="ani-li"></span></div>
          <div class="waves-item"><span class="ani-li"></span></div>
          <div class="waves-item"><span class="ani-li"></span></div>
          <div class="waves-item"><span class="ani-li"></span></div>
          <div class="waves-item"><span class="ani-li"></span></div>
          <div class="waves-item"><span class="ani-li"></span></div>
          <div class="waves-item"><span class="ani-li"></span></div>
          <div class="waves-item"><span class="ani-li"></span></div>
          <div class="waves-item"><span class="ani-li"></span></div>
          <div class="waves-item"><span class="ani-li"></span></div>
          <div class="waves-item"><span class="ani-li"></span></div>
          <div class="waves-item"><span class="ani-li"></span></div>
          <div class="waves-item"><span class="ani-li"></span></div>
          <div class="waves-item"><span class="ani-li"></span></div>
          <div class="waves-item"><span class="ani-li"></span></div>
          <div class="waves-item"><span class="ani-li"></span></div>
          <div class="waves-item"><span class="ani-li"></span></div>
          <div class="waves-item"><span class="ani-li"></span></div>
          <div class="waves-item"><span class="ani-li"></span></div>
          <div class="waves-item"><span class="ani-li"></span></div>
          <div class="waves-item"><span class="ani-li"></span></div>
          <div class="waves-item"><span class="ani-li"></span></div>
          <div class="waves-item"><span class="ani-li"></span></div>
          <div class="waves-item"><span class="ani-li"></span></div>
        </div>
      </div>
      <div class="audio-tools">
        <div
          class="left"
          @click="handlePlayer"
          :style="`background: ${theme};`"
        >
          <div :class="['btn', { 'btn-pause': playing }]"></div>
        </div>
        <div class="right">
          <div class="progress" ref="audioProgress" @click="handleProgress">
            <div class="progress-active" :style="`background: ${theme};`"></div>
          </div>
          <div class="times">
            <span class="played-time">{{ playedTime }}</span>
            <span class="total-time">{{ totalTime }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 三种风格： normal，music
    audioStyle: {
      type: String,
      default: "normal",
      required: false
    },
    src: {
      type: String,
      required: true
    },
    // autoplay: {
    //   type: Boolean,
    //   default: false,
    //   required: false
    // },
    loop: {
      type: Boolean,
      default: true,
      required: false
    },
    preload: {
      type: String,
      default: "auto",
      required: false
    },
    theme: {
      type: String,
      default: "yellowgreen",
      required: false
    }
  },
  data() {
    return {
      audio: null,
      audioProgress: null,
      progressActive: null,
      progressDot: null,
      playing: false,
      duration: 0,
      totalTime: "00:00",
      playedTime: "00:00",
      playTimer: null,
      color: "#000"
    };
  },
  created() {
    this.playing = this.autoplay;
  },
  mounted() {
    let _this = this;
    this.audio = this.$refs.audioPlayer;
    this.audioProgress = this.$refs.audioProgress;
    this.progressActive = this.audioProgress.children[0];
    this.progressDot = this.audioProgress.children[1];
    this.audio.addEventListener("canplay", () => {
      this.duration = Math.floor(this.audio.duration);
      this.totalTime = this.formatTime(this.duration);
      // if (this.autoplay) {
      // this.audio.autoplay = true
      // this.handlePlayer();
      // this.listenPlayingTime();
      // this.playing = true;
      // }
    });
  },
  methods: {
    // 播放或者暂停
    handlePlayer() {
      console.log(this.$refs);
      this.playing ? this.pause() : this.play();
    },
    // 监听音乐播放进度
    listenPlayingTime() {
      this.playTimer = setInterval(() => {
        let _currentTime = Math.floor(this.audio.currentTime);
        let ended = this.audio.ended;
        if (ended && !this.loop) {
          _currentTime = 0;
          this.playing = false;
          clearInterval(this.playTimer);
        }
        this.calculateCurrentTime(_currentTime);
      }, 1000);
    },
    // 播放
    play() {
      this.audio.play();
      this.listenPlayingTime();
      this.playing = true;
    },
    // 暂停
    pause() {
      this.audio.pause();
      clearInterval(this.playTimer);
      this.playing = false;
    },

    // 计算当前时间
    calculateCurrentTime(time) {
      this.playedTime = this.formatTime(time);
      let _width = this.audioProgress.getBoundingClientRect().width;
      this.progressActive.style.width = (time / this.duration) * _width + "px";
      if (this.progressDot) {
        this.progressDot.style.left = (time / this.duration) * _width + "px";
      }
    },

    // 点击进度条
    handleProgress(e) {
      let _width = this.audioProgress.getBoundingClientRect().width;
      let _currentTime = Math.floor((e.layerX / _width) * this.duration);
      this.audio.currentTime = _currentTime;
      this.play();
    },

    // // 拖动进度条 按下事件
    // handleMousedown(e) {
    //   e.stopPropagation();
    //   e.preventDefault();
    //   document.addEventListener("mousemove", this.handleMouseMove);
    //   document.addEventListener("mouseup", this.handleMouseUp);
    //   document.addEventListener("mouseleave", this.handleMouseUp);
    // },
    // // 鼠标移动
    // handleMouseMove(e) {
    //   e.stopPropagation();
    //   e.preventDefault();
    //   let _offsetX = this.audioProgress.getBoundingClientRect().left;
    //   let _width = this.audioProgress.getBoundingClientRect().width;
    //   console.log(e.clientX, _offsetX);
    //   console.log(e);
    //   if (e.clientX < _offsetX) {
    //     this.progressDot.style.left = 0;
    //     this.progressActive.style.width = 0;
    //     this.audio.currentTime = 0;
    //     this.listenPlayingTime(this.audio.currentTime);
    //   } else if (e.clientX > _offsetX + _width) {
    //     this.progressDot.style.right = 0;
    //     this.progressActive.style.width = "100%";
    //     this.audio.currentTime = this.duration;
    //     this.listenPlayingTime(this.duration);
    //   } else {
    //     this.progressActive.style.width = e.clientX - _offsetX + "px";
    //     this.progressDot.style.left = e.clientX - _offsetX + "px";
    //     let _currentTime = Math.floor(
    //       ((e.clientX - _offsetX) / _width) * this.duration
    //     );
    //     this.listenPlayingTime(_currentTime);
    //   }
    //   // var l = e.clientX - disX;

    //   // if (value) {
    //   //   if (x) {
    //   //     el.style.left = l + "px";
    //   //   }
    //   //   if (y) {
    //   //     el.style.top = t + "px";
    //   //   }

    //   //   if ((x && y) || (!x && !y)) {
    //   //     el.style.left = l + "px";
    //   //     el.style.top = t + "px";
    //   //   }
    //   // }
    // },
    // handleMouseup(e) {
    //   e.stopPropagation();
    //   e.preventDefault();
    //   console.log("11111111111111");
    //   document.removeEventListener("mousemove", this.handleMouseMove);
    //   document.removeEventListener("mouseup", this.handleMouseUp);
    //   // console.log(123)
    //   // e.stopPropagation();
    //   // console.log(e);
    // },
    // 格式化时间
    formatTime(num) {
      let _sec = num % 60;
      let _min = Math.floor(num / 60);
      return `${_min < 10 ? "0" + _min : _min}:${
        _sec < 10 ? "0" + _sec : _sec
      }`;
    }
  }
};
</script>

<style lang="scss" scoped vars="{ color }">
.audio-player {
  box-sizing: border-box;
  .audio {
    display: none;
  }
  .audio-control {
    &.style-normal {
      display: flex;
      flex-direction: row;
      width: 200px;
      height: 60px;
      padding: 0 8px;
      border-radius: 30px;
      border: 2px solid yellowgreen;
      align-items: center;
      box-shadow: 0 0 16px #ccc;
      .left {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: yellowgreen;
        margin-right: 8px;
        &:hover {
          transform: scale(1.1);
          opacity: 0.9;
        }
        .btn {
          width: 100%;
          height: 100%;
          background: url("data:image/png;base64,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")
            50% no-repeat;
          background-size: 40% 40%;
          &.btn-pause {
            background: url("data:image/png;base64,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")
              50% no-repeat;
            background-size: 40% 40%;
          }
        }
      }
      .right {
        flex: 1;
        display: flex;
        flex-direction: column;
        .progress {
          position: relative;
          width: 100%;
          height: 4px;
          background: #eee;
          border-radius: 2px;
          margin-top: 16px;

          .progress-active {
            position: absolute;
            top: 0;
            left: 0;
            width: 0;
            height: 4px;
            border-radius: 2px;
            background: yellowgreen;
          }
          .progress-dot {
            position: absolute;
            top: -2px;
            left: 0;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            // background: yellowgreen;
            background: var(--color);
            transform: translateX(-50%);
            &:hover {
              transform: scale(1.5);
            }
          }
        }
        .times {
          display: flex;
          flex-direction: row;
          margin-top: 4px;
          justify-content: space-between;
          font-size: 12px;
          color: #999;
        }
      }
    }
    &.style-music {
      width: 200px;
      height: 180px;
      background: #fff;
      border-radius: 4px;
      padding: 16px;
      box-shadow: 0 0 16px #ccc;
      .audio-animation {
        width: 100%;
        height: 120px;
        margin-bottom: 16px;
        .music-waves {
          display: flex;
          flex-direction: row;
          width: 100%;
          height: 100%;
          .waves-item {
            position: relative;
            height: 100%;
            width: 4px;
            overflow: hidden;
            margin-right: 1px;
            span {
              position: absolute;
              bottom: 0;
              display: block;
              height: 2px;
              width: 4px;
              background: yellowgreen;
            }
          }
        }
      }
      .audio-tools {
        display: flex;
        flex-direction: row;
        .left {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: yellowgreen;
          margin-right: 8px;
          &:hover {
            transform: scale(1.1);
            opacity: 0.9;
          }
          .btn {
            width: 100%;
            height: 100%;
            background: url("data:image/png;base64,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")
              50% no-repeat;
            background-size: 40% 40%;
            &.btn-pause {
              background: url("data:image/png;base64,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")
                50% no-repeat;
              background-size: 40% 40%;
            }
          }
        }
        .right {
          flex: 1;
          display: flex;
          flex-direction: column;
          .progress {
            position: relative;
            width: 100%;
            height: 4px;
            background: #eee;
            margin-top: 16px;

            .progress-active {
              position: absolute;
              top: 0;
              left: 0;
              width: 0;
              height: 4px;
              background: yellowgreen;
            }
          }
          .times {
            display: flex;
            flex-direction: row;
            margin-top: 4px;
            justify-content: space-between;
            font-size: 12px;
            color: #999;
          }
        }
      }
    }
  }
}
.waves-active {
  .waves-item:nth-child(1) span,
  .waves-item:nth-child(8) span,
  .waves-item:nth-child(16) span,
  .waves-item:nth-child(20) span,
  .waves-item:nth-child(31) span,
  .waves-item:nth-child(39) span {
    animation: waves 1s linear 0s infinite alternate;
    -webkit-animation: waves 6s linear 0s infinite alternate;
  }

  .waves-item:nth-child(2) span,
  .waves-item:nth-child(10) span,
  .waves-item:nth-child(19) span,
  .waves-item:nth-child(27) span,
  .waves-item:nth-child(30) span,
  .waves-item:nth-child(13) span,
  .waves-item:nth-child(40) span {
    animation: waves 3s linear 0s infinite alternate;
    -webkit-animation: waves 2s linear 0s infinite alternate;
  }

  .waves-item:nth-child(3) span,
  .waves-item:nth-child(7) span,
  .waves-item:nth-child(21) span,
  .waves-item:nth-child(24) span,
  .waves-item:nth-child(35) span {
    animation: waves 2s linear 0s infinite alternate;
    -webkit-animation: waves 1s linear 0s infinite alternate;
  }

  .waves-item:nth-child(4) span,
  .waves-item:nth-child(14) span,
  .waves-item:nth-child(17) span,
  .waves-item:nth-child(22) span,
  .waves-item:nth-child(36) span {
    animation: waves 2.5s linear 0s infinite alternate;
    -webkit-animation: waves 0.8s linear 0s infinite alternate;
  }

  .waves-item:nth-child(5) span,
  .waves-item:nth-child(9) span,
  .waves-item:nth-child(18) span,
  .waves-item:nth-child(33) span {
    animation: waves 5s linear 0s infinite alternate;
    -webkit-animation: waves 0.7s linear 0s infinite alternate;
  }

  .waves-item:nth-child(6) span,
  .waves-item:nth-child(11) span,
  .waves-item:nth-child(26) span,
  .waves-item:nth-child(34) span {
    animation: waves 8s linear 0s infinite alternate;
    -webkit-animation: waves 0.5s linear 0s infinite alternate;
  }
  .waves-item:nth-child(12) span,
  .waves-item:nth-child(23) span,
  .waves-item:nth-child(29) span,
  .waves-item:nth-child(32) span,
  .waves-item:nth-child(38) span {
    animation: waves 4s linear 0s infinite alternate;
    -webkit-animation: waves 0.8s linear 0s infinite alternate;
  }
  .waves-item:nth-child(15) span,
  .waves-item:nth-child(25) span,
  .waves-item:nth-child(28) span,
  .waves-item:nth-child(37) span {
    animation: waves 6s linear 0s infinite alternate;
    -webkit-animation: waves 0.6s linear 0s infinite alternate;
  }
}

@-webkit-keyframes waves {
  10% {
    height: 20%;
  }
  20% {
    height: 60%;
  }
  40% {
    height: 40%;
  }
  50% {
    height: 100%;
  }
  100% {
    height: 50%;
  }
}

@keyframes waves {
  10% {
    height: 20%;
  }
  20% {
    height: 60%;
  }
  40% {
    height: 40%;
  }
  50% {
    height: 100%;
  }
  100% {
    height: 50%;
  }
}
</style>
