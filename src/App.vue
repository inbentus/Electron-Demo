<template>
  <div id="app">
    Hello Friends!

    <img src="./assets/Rotating_Tux.gif" width="550" />

    {{ recording ? 'Recording!!' : 'Video functionality' }}

    <div class="actions">
      <button  @click="handleRecording">
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
        this.recording = false
        this.stopRecording()
      } else {
        this.recording = true
        this.startRecording()
      }
    },
    async startRecording() {
      console.log('startRecording')
      await schInstance.requestRecording()
      console.log('Requested recording')

      await schInstance.createRecording()
      console.log('Recording created')
    },
    async stopRecording() {
      console.log('stopRecording')
      const recording = await schInstance.stopRecording()

      if (recording) {
        console.log('Recording successfully created!')

        const video = {}
        video.src = URL.createObjectURL(recording);
        window.location.href = video.src
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
