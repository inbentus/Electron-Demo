<template>
  <div id="app">
    Hello Friends!

    <img src="./assets/Rotating_Tux.gif" width="550" />

    {{ recording ? "Recording!!" : "Video functionality" }}

    <!-- <video autoplay controls/> -->

    <div class="actions">
      <button @click="handleRecording">
        Click for start/stop recording screen
      </button>
    </div>
  </div>
</template>

<script lang="js">
import { schInstance } from './services/screen';

export default {
  name: 'App',
  data() {
    return {
      recording: false,
    }
  },
  methods: {
    async handleRecording() {
      if (schInstance.recording) {
        this.stopRecording()
      } else {
        this.startRecording()
      }
    },
    async startRecording() {
      console.log('startRecording')
      await schInstance.requestRecording()
      console.log('Requested recording')

      await schInstance.createRecording()
      console.log('Recording created')

      this.recording = true
    },
    async stopRecording() {
      console.log('stopRecording')
      const recording = await schInstance.stopRecording()

      this.recording = false

      if (recording) {
        console.log('Recording successfully created!')

        // const video = document.querySelector('video')
        const videoURL = URL.createObjectURL(recording);
        // video.src = videoURL

        // Save video
        window.location.href = videoURL
      } else {
        console.error('Unable to create recording')
      }

      schInstance.releaseRecording()
    }
  },
  computed: {
    isRecording() {
      return schInstance.recording
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: white;
  background-color: #2c3e50;

  padding: 20px;
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  gap: 1em;
}

.stop-recording-btn {
  color: white;
  background-color: red;
}
</style>
