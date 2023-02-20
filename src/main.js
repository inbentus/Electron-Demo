import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

try {
  const { ipcRenderer } = require('electron');
  ipcRenderer.on('SET_SCREEN_SOURCE', async (_event, sourceId) => {
    console.log(`Successfully retrieved screen source: ${sourceId}`);
  });
} catch (error) {
  console.warn('Could not set screen source. Running without electron?');
}

new Vue({
  render: h => h(App),
}).$mount('#app')
