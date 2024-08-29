import { createApp } from 'vue'
import App from './App.vue'
import router from './components/router'

import 'bootstrap/dist/css/bootstrap.min.css'; // Import the minified CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import the minified JS bundle
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import Bootstrap Icons



createApp(App).use(router).mount('#app')
