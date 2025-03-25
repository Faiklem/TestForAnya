import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

import { OhVueIcon, addIcons } from 'oh-vue-icons'
import {
	RiArrowGoBackLine,
	RiMusic2Fill,
	RiMusic2Line,
} from 'oh-vue-icons/icons'

addIcons(RiMusic2Fill, RiMusic2Line, RiArrowGoBackLine)

const app = createApp(App)
app.component('v-icon', OhVueIcon)
app.mount('#app')
