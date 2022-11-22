import { createApp } from "vue";
import Notifications from "@kyvg/vue3-notification";
import { createPinia } from "pinia";
import VCalender from "v-calendar";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";
import "v-calendar/dist/style.css";

const app = createApp(App);

app.use(createPinia());
app.use(Notifications);
app.use(VCalender, {});
app.use(router);

//GLOBAL CONSTANTS
app.config.globalProperties.$server_base_url = "http://127.0.0.1:5000/api/";

app.config.globalProperties.$GET = "GET";
app.config.globalProperties.$POST = "POST";
app.config.globalProperties.$PUT = "PUT";
app.config.globalProperties.$DELETE = "DELETE";

app.mount("#app");
