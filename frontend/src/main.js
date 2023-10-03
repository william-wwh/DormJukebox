import Toasted from "@hoppscotch/vue-toasted"
import { createApp } from 'vue'
import App from './App.vue'

import './assets/App.css'
import "@hoppscotch/vue-toasted/style.css"

const app = createApp(App)

app.use(Toasted) // You can pass options as a second parameter

app.mount('#app')