import { createApp } from "vue";
import "./index.css";
import App from "./App.vue";

import { aliases, mdi } from "vuetify/iconsets/mdi-svg";

import { createVuetify, ThemeDefinition } from "vuetify";
const themeColors: ThemeDefinition = {
  dark: false,
};
const vuetify = createVuetify({
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    defaultTheme: "themeColors",
    themes: {
      themeColors,
    },
  },
});

const app = createApp(App);
app.use(vuetify);

app.mount("#app");
