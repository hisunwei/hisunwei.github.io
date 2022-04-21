import { createApp } from 'vue'
import App from './App.vue'

import axios from 'axios'
import VueAxios from 'vue-axios'

const app = createApp(App).mount('#app')

app.use(VueAxios, axios)
app.provide('axios', app.config.globalProperties.axios)
