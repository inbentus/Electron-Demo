import Vue from 'vue'
import App from './App.vue'
import { schInstance } from './services/screen';
import { ipcRenderer } from 'electron';

Vue.config.productionTip = false

ipcRenderer.on('SET_SCREEN_SOURCE', async (_event, sourceId) => {
  console.log(`Renderer has screen source: ${sourceId}`);
  schInstance.setSource(sourceId);
})

ipcRenderer.send('GET_VIDEO_SOURCE')

new Vue({
  render: h => h(App),
}).$mount('#app')
