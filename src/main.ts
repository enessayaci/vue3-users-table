import './globals.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import rippleDirective from './directives/ripple'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.directive('ripple', rippleDirective);

app.mount('#app')
