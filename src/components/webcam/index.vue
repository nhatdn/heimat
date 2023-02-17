<template>
  <div class="webcam">
    <button class="webcam-close btn" @click="close()">
      <icon class="icon" name="close"></icon>
    </button>
    <div class="container webcam-wrapper">
      <div class="webcam-content">
        <div class="webcam-graphic">
          <div class="webcam-container container-webcam">
            <video
              id="webcam"
              autoplay
              playsinline
              :height="400"
              :width="520"
            ></video>
          </div>
          <canvas id="canvas" class="d-none"></canvas>
          <!-- <div class="snapshot-container">
          </div> -->
        </div>
        <audio id="snapSound" src="audio/snap.wav" preload="auto"></audio>
        <div class="webcam-buttons">
          <button
            v-show="!isStart"
            class="btn btn-summit"
            @click="openWebcam()"
          >
            Take
          </button>
          <button
            v-show="isStart"
            class="btn btn-summit"
            @click="takePicture()"
          >
            snapshot
          </button>
          <button
            v-show="isStart"
            class="btn btn-summit"
            @click="saveChangeAvatar()"
          >
            save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { UserRepository } from "@/repositories";
import Webcam from "webcam-easy";
export default {
  data() {
    return {
      isStart: false,
      newAvatar: null,
      myWebcam: null,
    };
  },
  methods: {
    openWebcam() {
      const webcamElement = document.getElementById("webcam");
      const canvasElement = document.getElementById("canvas");
      const snapSoundElement = document.getElementById("snapSound");
      this.myWebcam = new Webcam(
        webcamElement,
        "user",
        canvasElement,
        snapSoundElement
      );
      this.myWebcam
        .start()
        .then(() => {
          this.isStart = true;
        })
        .catch((err) => {
          console.log(err);
        });
      console.log(this.myWebcam);
    },

    takePicture() {
      var picture = this.myWebcam.snap();
      this.newAvatar = this.dataURLtoFile(picture, "nhat.jpg");
      console.log(this.newAvatar);
    },

    dataURLtoFile(dataurl, filename) {
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    },

    close() {
      if (this.isStart) this.myWebcam.stop();
      this.$emit("closePreview");
    },

    async saveChangeAvatar() {
      let formData = new FormData();
      formData.append("avatar", this.newAvatar);
      await UserRepository.update(formData);
      this.close();
      this.$emit("finish");
    },
  },
};
</script>

<style lang="scss" scoped>
// .container-webcam {
//   width: 20rem;
//   height: 16rem;
//   border-radius: 2rem;
// }
// #webcam {
//   width: 19rem;
//   height: 16rem;
// }
#canvas {
  width: 34rem;
  height: 24rem;
}
.webcam {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  background-color: rgba($color: #000000, $alpha: 0.92);
  &-wrapper {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &-close {
    position: fixed;
    top: 5rem;
    right: 5rem;
    color: transparent;
    .icon {
      @include icon(3.2rem);
    }
  }
  &-graphic {
    padding-top: 4rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 4rem;
  }
  &-content {
    margin: auto 0;
  }
  &-buttons {
    display: flex;
    justify-content: center;
    padding: 2rem 0;
  }
  .btn {
    color: #ffffff;
    text-align: center;
    user-select: none;
    outline: none;
    background-color: transparent;
    border: 1px solid transparent;
    padding: 0.7rem 1.4rem;
    font-size: 1.4rem;
    text-transform: capitalize;
    border-radius: 0.5rem;
    margin-right: 1rem;
    @include transition(
      color 0.15s ease-in-out,
      background-color 0.15s ease-in-out,
      border-color 0.15s ease-in-out,
      box-shadow 0.15s ease-in-out
    );
    cursor: pointer;
    &-summit {
      background-color: $secondary;
      &:hover {
        border: 1px solid $secondary;
      }
    }
    &-cancel {
      background-color: $primary;
      &:hover {
        border: 1px solid $primary;
      }
    }
  }
}
</style>